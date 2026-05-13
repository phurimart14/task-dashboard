import { useState, useMemo, useEffect } from "react";
import { Plus } from "lucide-react";
import { useTaskStore } from "../store/useTaskStore";
import type {
  Task,
  Status,
  Priority,
  TaskFormData,
  SortBy,
} from "../types/task";
import TaskCard from "../components/task/TaskCard";
import FilterBar from "../components/task/FilterBar";
import Pagination from "../components/ui/Pagination";
import Modal from "../components/ui/Modal";
import TaskDetailView from "../components/task/TaskDetailView";
import TaskForm from "../components/task/TaskForm";

const TASKS_PER_PAGE = 6;

const COLUMNS: { status: Status; title: string; color: string }[] = [
  { status: "To Do", title: "To Do", color: "border-gray-400" },
  { status: "In Progress", title: "In Progress", color: "border-blue-400" },
  { status: "Done", title: "Done", color: "border-green-400" },
];

export default function DashboardPage() {
  const tasks = useTaskStore((state) => state.tasks);
  const globalSearch = useTaskStore((state) => state.globalSearch);
  const updateTask = useTaskStore((state) => state.updateTask);
  const addTask = useTaskStore((state) => state.addTask);
  // Filter states
  const [searchQuery, setSearchQuery] = useState("");
  const [priorityFilter, setPriorityFilter] = useState<Priority | "All">("All");
  const [statusFilter, setStatusFilter] = useState<Status | "All">("All");
  const [sortBy, setSortBy] = useState<SortBy>("default");
  const [currentPage, setCurrentPage] = useState(1);
  // Modal state
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [modalMode, setModalMode] = useState<"view" | "edit">("view");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  // Reset to page 1 เมื่อ filter เปลี่ยน
  useEffect(() => {
    setCurrentPage(1);
  }, [globalSearch, searchQuery, priorityFilter, statusFilter, sortBy]);

  // Filter tasks ตาม search + filters
  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      // Global Search (Item A)
      const globalMatch =
        globalSearch === "" ||
        task.title.toLowerCase().includes(globalSearch.toLowerCase()) ||
        task.priority.toLowerCase().includes(globalSearch.toLowerCase()) ||
        task.status.toLowerCase().includes(globalSearch.toLowerCase()) ||
        task.tag.toLowerCase().includes(globalSearch.toLowerCase()) ||
        task.project.toLowerCase().includes(globalSearch.toLowerCase());

      // Local Search (Item B)
      const matchSearch =
        searchQuery === "" ||
        task.title.toLowerCase().includes(searchQuery.toLowerCase());

      // Priority filter
      const matchPriority =
        priorityFilter === "All" || task.priority === priorityFilter;

      // Status filter
      const matchStatus =
        statusFilter === "All" || task.status === statusFilter;

      // ต้องตรงทุกเงื่อนไข (AND)
      return globalMatch && matchSearch && matchPriority && matchStatus;
    });
  }, [tasks, globalSearch, searchQuery, priorityFilter, statusFilter]);

  // Sort tasks
  const sortedTasks = useMemo(() => {
    if (sortBy === "default") return filteredTasks;

    const sorted = [...filteredTasks]; // copy array - ไม่ mutate ของเดิม

    if (sortBy === "date-asc") {
      return sorted.sort(
        (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
      );
    }
    if (sortBy === "date-desc") {
      return sorted.sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
      );
    }
    if (sortBy === "priority") {
      // High → Medium → Low
      const order: Record<Priority, number> = {
        "High Priority": 1,
        "Medium Priority": 2,
        Low: 3,
      };
      return sorted.sort((a, b) => order[a.priority] - order[b.priority]);
    }
    if (sortBy === "progress") {
      return sorted.sort((a, b) => a.progress - b.progress);
    }

    return sorted;
  }, [filteredTasks, sortBy]);

  // Pagination
  const totalPages = Math.ceil(sortedTasks.length / TASKS_PER_PAGE);

  const paginatedTasks = useMemo(() => {
    const start = (currentPage - 1) * TASKS_PER_PAGE;
    const end = start + TASKS_PER_PAGE;
    return sortedTasks.slice(start, end);
  }, [sortedTasks, currentPage]);

  const handleClearAll = () => {
    setSearchQuery("");
    setPriorityFilter("All");
    setStatusFilter("All");
    setSortBy("default");
  };

  const handleCardClick = (task: Task) => {
    setSelectedTask(task);
    setModalMode("view");
  };

  const handleCloseModal = () => {
    setSelectedTask(null);
    setModalMode("view"); // reset
  };

  const handleEditTask = () => {
    setModalMode("edit");
  };

  const handleSaveTask = (data: TaskFormData) => {
    if (!selectedTask) return;
    updateTask(selectedTask.id, data);
    handleCloseModal();
  };

  const handleNewTask = () => {
    setIsCreateModalOpen(true);
  };

  const handleCloseCreateModal = () => {
    setIsCreateModalOpen(false);
  };

  const handleCreateTask = (data: TaskFormData) => {
    addTask(data);
    handleCloseCreateModal();
  };

  return (
    <div className="space-y-6">
      {/* Header — Title + New Task button */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <button
          onClick={handleNewTask}
          className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium text-sm transition-colors"
        >
          <Plus size={18} />
          New Task
        </button>
      </div>

      {/* Filter Bar */}
      <FilterBar
        searchQuery={searchQuery}
        priorityFilter={priorityFilter}
        statusFilter={statusFilter}
        sortBy={sortBy}
        onSearchChange={setSearchQuery}
        onPriorityChange={setPriorityFilter}
        onStatusChange={setStatusFilter}
        onSortChange={setSortBy}
        onClearAll={handleClearAll}
      />

      {/* Results info */}
      <div className="text-sm text-gray-500">
        Showing {paginatedTasks.length} of {sortedTasks.length} task
        {sortedTasks.length !== 1 && "s"}
      </div>

      {/* 3 Columns */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {COLUMNS.map((column) => {
          const columnTasks = paginatedTasks.filter(
            (t) => t.status === column.status,
          );

          return (
            <div key={column.status} className="space-y-3">
              {/* Column Header */}
              <div
                className={`bg-white border-t-4 ${column.color} rounded-t-lg px-4 py-3 shadow-sm`}
              >
                <h2 className="font-semibold text-gray-900 flex items-center justify-between">
                  {column.title}
                  <span className="text-xs font-normal text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">
                    {columnTasks.length}
                  </span>
                </h2>
              </div>

              {/* Cards */}
              <div className="space-y-3">
                {columnTasks.map((task) => (
                  <TaskCard
                    key={task.id}
                    task={task}
                    onClick={handleCardClick}
                  />
                ))}

                {/* Empty state */}
                {columnTasks.length === 0 && (
                  <div className="text-center py-8 text-sm text-gray-400">
                    No tasks
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />

      {/* Task Detail / Edit Modal */}
      <Modal
        isOpen={selectedTask !== null}
        onClose={handleCloseModal}
        title={modalMode === "edit" ? "Edit Task" : "Task Details"}
      >
        {selectedTask && modalMode === "view" && (
          <TaskDetailView
            task={selectedTask}
            onEdit={handleEditTask}
            onClose={handleCloseModal}
          />
        )}
        {selectedTask && modalMode === "edit" && (
          <TaskForm
            initialData={selectedTask}
            onSubmit={handleSaveTask}
            onCancel={() => setModalMode("view")}
          />
        )}
      </Modal>

      {/* Create Task Modal */}
      <Modal
        isOpen={isCreateModalOpen}
        onClose={handleCloseCreateModal}
        title="Create New Task"
      >
        <TaskForm
          onSubmit={handleCreateTask}
          onCancel={handleCloseCreateModal}
        />
      </Modal>
    </div>
  );
}

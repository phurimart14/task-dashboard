import { useState, useMemo } from "react";
import { Plus } from "lucide-react";
import { useTaskStore } from "../store/useTaskStore";
import type { Task, Status, Priority } from "../types/task";
import TaskCard from "../components/task/TaskCard";
import FilterBar from "../components/task/FilterBar";

const COLUMNS: { status: Status; title: string; color: string }[] = [
  { status: "To Do", title: "To Do", color: "border-gray-400" },
  { status: "In Progress", title: "In Progress", color: "border-blue-400" },
  { status: "Done", title: "Done", color: "border-green-400" },
];

export default function DashboardPage() {
  const tasks = useTaskStore((state) => state.tasks);
  const globalSearch = useTaskStore((state) => state.globalSearch);

  // Filter states
  const [searchQuery, setSearchQuery] = useState("");
  const [priorityFilter, setPriorityFilter] = useState<Priority | "All">("All");
  const [statusFilter, setStatusFilter] = useState<Status | "All">("All");

  // Filter tasks ตาม search + filters
  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      // Global Search (Item A): ค้นได้ทุก field
      const globalMatch =
        globalSearch === "" ||
        task.title.toLowerCase().includes(globalSearch.toLowerCase()) ||
        task.priority.toLowerCase().includes(globalSearch.toLowerCase()) ||
        task.status.toLowerCase().includes(globalSearch.toLowerCase()) ||
        task.tag.toLowerCase().includes(globalSearch.toLowerCase()) ||
        task.project.toLowerCase().includes(globalSearch.toLowerCase());

      // Local Search (Item B): เฉพาะชื่อ task
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

  const handleClearAll = () => {
    setSearchQuery("");
    setPriorityFilter("All");
    setStatusFilter("All");
  };

  const handleCardClick = (task: Task) => {
    console.log("Clicked task:", task);
    // TODO: เปิด modal — step ถัดไป
  };

  const handleNewTask = () => {
    console.log("New task clicked");
    // TODO: เปิด modal create — step ถัดไป
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
        onSearchChange={setSearchQuery}
        onPriorityChange={setPriorityFilter}
        onStatusChange={setStatusFilter}
        onClearAll={handleClearAll}
      />

      {/* Results info */}
      <div className="text-sm text-gray-500">
        Showing {filteredTasks.length} task{filteredTasks.length !== 1 && "s"}
      </div>

      {/* 3 Columns */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {COLUMNS.map((column) => {
          const columnTasks = filteredTasks.filter(
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
    </div>
  );
}

import { Search, X } from "lucide-react";
import type { Priority, Status } from "../../types/task";

interface FilterBarProps {
  searchQuery: string;
  priorityFilter: Priority | "All";
  statusFilter: Status | "All";
  onSearchChange: (value: string) => void;
  onPriorityChange: (value: Priority | "All") => void;
  onStatusChange: (value: Status | "All") => void;
  onClearAll: () => void;
}

export default function FilterBar({
  searchQuery,
  priorityFilter,
  statusFilter,
  onSearchChange,
  onPriorityChange,
  onStatusChange,
  onClearAll,
}: FilterBarProps) {
  const hasActiveFilter =
    searchQuery !== "" || priorityFilter !== "All" || statusFilter !== "All";

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-3 flex flex-col md:flex-row gap-3">
      {/* Search Input */}
      <div className="relative flex-1">
        <Search
          size={16}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
        />
        <input
          type="text"
          placeholder="Search tasks..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full pl-9 pr-4 py-2 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      {/* Priority Dropdown */}
      <select
        value={priorityFilter}
        onChange={(e) => onPriorityChange(e.target.value as Priority | "All")}
        className="px-3 py-2 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 min-w-[150px]"
      >
        <option value="All">All Priorities</option>
        <option value="Low">Low</option>
        <option value="Medium Priority">Medium Priority</option>
        <option value="High Priority">High Priority</option>
      </select>

      {/* Status Dropdown */}
      <select
        value={statusFilter}
        onChange={(e) => onStatusChange(e.target.value as Status | "All")}
        className="px-3 py-2 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 min-w-[150px]"
      >
        <option value="All">Status: All</option>
        <option value="To Do">To Do</option>
        <option value="In Progress">In Progress</option>
        <option value="Done">Done</option>
      </select>
      {/* Clear Button */}
      {hasActiveFilter && (
        <button
          onClick={onClearAll}
          className="inline-flex items-center gap-1 px-3 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg"
          aria-label="Clear all filters"
        >
          <X size={16} />
          Clear
        </button>
      )}
    </div>
  );
}

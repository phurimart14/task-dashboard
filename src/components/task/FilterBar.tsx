import { Search, X, ArrowUpDown } from "lucide-react";
import type { Priority, Status, SortBy } from "../../types/task";
import { SORT_LABELS } from "../../types/task";
interface FilterBarProps {
  searchQuery: string;
  priorityFilter: Priority | "All";
  statusFilter: Status | "All";
  sortBy: SortBy;
  onSearchChange: (value: string) => void;
  onPriorityChange: (value: Priority | "All") => void;
  onStatusChange: (value: Status | "All") => void;
  onSortChange: (value: SortBy) => void;
  onClearAll: () => void;
}

export default function FilterBar({
  searchQuery,
  priorityFilter,
  statusFilter,
  sortBy,
  onSearchChange,
  onPriorityChange,
  onStatusChange,
  onSortChange,
  onClearAll,
}: FilterBarProps) {
  const hasActiveFilter =
    searchQuery !== "" ||
    priorityFilter !== "All" ||
    statusFilter !== "All" ||
    sortBy !== "default";

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-3 flex flex-col lg:flex-row lg:flex-wrap xl:flex-nowrap gap-3">
      {/* Search Input */}
      <div className="relative flex-1 min-w-[200px]">
        <Search
          size={16}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500"
        />
        <input
          type="text"
          placeholder="Search tasks..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full pl-9 pr-4 py-2 text-sm bg-gray-50 dark:bg-gray-700 border dark:text-white border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
        />
      </div>

      {/* Priority Dropdown */}
      <select
        value={priorityFilter}
        onChange={(e) => onPriorityChange(e.target.value as Priority | "All")}
        className="px-3 py-2 text-sm text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 min-w-32.5 transition-all"
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
        className="px-3 py-2 text-sm text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 min-w-32.5 transition-all"
      >
        <option value="All">Status: All</option>
        <option value="To Do">To Do</option>
        <option value="In Progress">In Progress</option>
        <option value="Done">Done</option>
      </select>

      {/* Sort Dropdown - NEW! */}
      <div className="relative">
        <ArrowUpDown
          size={14}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
        />
        <select
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value as SortBy)}
          className="pl-8 pr-3 py-2 text-sm text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 min-w-45 transition-all"
        >
          {Object.entries(SORT_LABELS).map(([value, label]) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
      </div>

      {/* Clear Button */}
      {hasActiveFilter && (
        <button
          onClick={onClearAll}
          className="inline-flex items-center gap-1 px-3 py-2 text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          aria-label="Clear all filters"
        >
          <X size={16} />
          Clear
        </button>
      )}
    </div>
  );
}

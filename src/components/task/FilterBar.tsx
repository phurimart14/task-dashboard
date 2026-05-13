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
          className="w-full pl-9 pr-4 py-2 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
        />
      </div>

      {/* Priority Dropdown */}
      <select
        value={priorityFilter}
        onChange={(e) => onPriorityChange(e.target.value as Priority | "All")}
        className="px-3 py-2 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 min-w-[150px] transition-all"
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
        className="px-3 py-2 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 min-w-[150px] transition-all"
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
          className="pl-8 pr-3 py-2 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 min-w-[200px] transition-all"
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
          className="inline-flex items-center gap-1 px-3 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
          aria-label="Clear all filters"
        >
          <X size={16} />
          Clear
        </button>
      )}
    </div>
  );
}

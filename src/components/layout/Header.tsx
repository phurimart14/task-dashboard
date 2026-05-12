import { Search, Bell, ChevronDown, X } from "lucide-react";
import { useTaskStore } from "../../store/useTaskStore";

export default function Header() {
  const globalSearch = useTaskStore((state) => state.globalSearch);
  const setGlobalSearch = useTaskStore((state) => state.setGlobalSearch);

  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6">
      {/* Page Title */}
      <h1 className="text-lg font-semibold text-gray-900">Dashboard</h1>

      {/* Right Section */}
      <div className="flex items-center gap-4">
        {/* Search (Header) - item A */}
        <div className="relative">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            type="text"
            placeholder="Search anything..."
            value={globalSearch}
            onChange={(e) => setGlobalSearch(e.target.value)}
            className="pl-9 pr-9 py-2 text-sm bg-gray-50 border border-gray-200 rounded-lg w-64 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          {globalSearch && (
            <button
              onClick={() => setGlobalSearch("")}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-1 hover:bg-gray-200 rounded"
              aria-label="Clear search"
            >
              <X size={14} className="text-gray-400" />
            </button>
          )}
        </div>

        {/* Notification */}
        <button
          className="relative p-2 rounded-lg hover:bg-gray-100"
          aria-label="Notifications"
        >
          <Bell size={20} className="text-gray-600" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>

        {/* User Avatar */}
        <button className="flex items-center gap-2 hover:bg-gray-100 px-2 py-1.5 rounded-lg">
          <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center text-sm font-semibold text-gray-700">
            AD
          </div>
          <ChevronDown size={16} className="text-gray-500" />
        </button>
      </div>
    </header>
  );
}

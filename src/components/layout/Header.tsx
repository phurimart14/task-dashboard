import { Search, Bell, ChevronDown, X, Menu } from "lucide-react";
import { useTaskStore } from "../../store/useTaskStore";

export default function Header() {
  const globalSearch = useTaskStore((state) => state.globalSearch);
  const setGlobalSearch = useTaskStore((state) => state.setGlobalSearch);
  const toggleMobileSidebar = useTaskStore(
    (state) => state.toggleMobileSidebar,
  );

  return (
    <header className="h-16 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between px-4 md:px-6 transition-colors">
      {/* === Left: Hamburger (mobile) + Title === */}
      <div className="flex items-center gap-3">
        {/* Hamburger - เฉพาะ mobile */}
        <button
          onClick={toggleMobileSidebar}
          className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300 transition-colors"
          aria-label="Open sidebar"
        >
          <Menu size={20} />
        </button>

        <h1 className="text-lg font-semibold text-gray-900 dark:text-white">
          Dashboard
        </h1>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-2 md:gap-4">
        {/* Global Search */}
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
            className="pl-9 pr-9 py-2 text-sm bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-gray-900 dark:text-gray-100 rounded-lg w-64 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          />
          {globalSearch && (
            <button
              onClick={() => setGlobalSearch("")}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-1 hover:bg-gray-200 dark:hover:bg-gray-600 rounded transition-colors"
              aria-label="Clear search"
            >
              <X size={14} className="text-gray-400" />
            </button>
          )}
        </div>

        {/* Notification - ซ่อนบน mobile เล็ก */}
        <button
          className="hidden sm:flex relative p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          aria-label="Notifications"
        >
          <Bell size={20} className="text-gray-600 dark:text-gray-400" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>

        {/* User Avatar */}
        <button className="flex items-center gap-2 hover:bg-gray-100 dark:hover:bg-gray-700 px-2 py-1.5 rounded-lg transition-colors">
          <div className="w-8 h-8 bg-gray-300 dark:bg-gray-600 rounded-full flex items-center justify-center text-sm font-semibold text-gray-700 dark:text-gray-200">
            AD
          </div>
          <ChevronDown size={16} className="text-gray-500 dark:text-gray-400" />
        </button>
      </div>
    </header>
  );
}

import { useState } from "react";
import {
  LayoutDashboard,
  ListChecks,
  Users,
  Settings,
  ChevronLeft,
  ChevronRight,
  Sun,
  Moon,
} from "lucide-react";
import clsx from "clsx";
import { useTaskStore } from "../../store/useTaskStore";

interface MenuItem {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
}

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const theme = useTaskStore((state) => state.theme);
  const toggleTheme = useTaskStore((state) => state.toggleTheme);

  const menuItems: MenuItem[] = [
    { icon: <LayoutDashboard size={20} />, label: "Dashboard", active: true },
    { icon: <ListChecks size={20} />, label: "My Tasks" },
    { icon: <Users size={20} />, label: "Team" },
    { icon: <Settings size={20} />, label: "Settings" },
  ];

  return (
    <aside
      className={clsx(
        "bg-[#131c26] dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 transition-all duration-300 flex flex-col h-screen",
        collapsed ? "w-16" : "w-60",
      )}
    >
      {/* Logo + Toggle Button */}
      <div className="h-16 flex items-center justify-between px-4 border-b border-gray-200 dark:border-gray-700">
        {!collapsed && (
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">
              T
            </div>
            <span className="font-bold text-white">TaskFlow</span>
          </div>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-400 ml-auto transition-colors"
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </button>
      </div>

      {/* Menu */}
      <nav className="flex-1 py-4 px-2">
        <ul className="space-y-1">
          {menuItems.map((item) => (
            <li key={item.label}>
              <button
                className={clsx(
                  "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                  item.active
                    ? "bg-blue-700 dark:bg-blue-900/30 text-white dark:text-blue-300"
                    : "text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700",
                )}
                title={collapsed ? item.label : undefined}
              >
                <span className="flex-shrink-0">{item.icon}</span>
                {!collapsed && <span>{item.label}</span>}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* Dark Mode Toggle - ที่ด้านล่างของ Sidebar */}
      <div className="border-t border-gray-200 dark:border-gray-700 p-2">
        <button
          onClick={toggleTheme}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-300 hover:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          title={
            collapsed
              ? `Switch to ${theme === "light" ? "dark" : "light"} mode`
              : undefined
          }
        >
          {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
          {!collapsed && (
            <span>{theme === "light" ? "Dark Mode" : "Light Mode"}</span>
          )}
        </button>
      </div>
    </aside>
  );
}

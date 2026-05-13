import { useState } from "react";
import {
  LayoutDashboard,
  ListChecks,
  Users,
  Settings,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import clsx from "clsx";

interface MenuItem {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
}

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);

  const menuItems: MenuItem[] = [
    { icon: <LayoutDashboard size={20} />, label: "Dashboard", active: true },
    { icon: <ListChecks size={20} />, label: "My Tasks" },
    { icon: <Users size={20} />, label: "Team" },
    { icon: <Settings size={20} />, label: "Settings" },
  ];

  return (
    <aside
      className={clsx(
        "bg-[#131C26] border-r border-gray-200 transition-all duration-300 flex flex-col h-screen",
        collapsed ? "w-16" : "w-60",
      )}
    >
      {/* Logo + Toggle Button */}
      <div className="h-16 flex items-center justify-between px-4 border-b border-gray-200">
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
          className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-500 ml-auto"
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
                    ? "bg-blue-500 text-white"
                    : "text-gray-500 hover:bg-gray-100",
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
    </aside>
  );
}

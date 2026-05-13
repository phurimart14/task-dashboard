import { Calendar } from "lucide-react";
import type { Task } from "../../types/task";
import Badge from "../ui/Badge";
import { format, parseISO } from "date-fns";
import clsx from "clsx";

interface TaskCardProps {
  task: Task;
  onClick: (task: Task) => void;
}

export default function TaskCard({ task, onClick }: TaskCardProps) {
  // กำหนดสีของ progress bar ตาม status
  const progressColor =
    task.status === "Done"
      ? "bg-green-500"
      : task.status === "In Progress"
        ? "bg-blue-500"
        : "bg-gray-400";

  return (
    <button
      onClick={() => onClick(task)}
      className="w-full text-left bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4 hover:shadow-lg hover:border-blue-300 dark:hover:border-blue-500 hover:-translate-y-0.5 transition-all duration-200"
    >
      {/* Title + Project */}
      <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-1">
        {task.title}
      </h3>
      <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">
        {task.project}
      </p>

      {/* Tag + Priority */}
      <div className="flex gap-1.5 mb-3 flex-wrap">
        <Badge variant="tag" value={task.tag} />
        <Badge variant="priority" value={task.priority} />
      </div>

      {/* Date + Status */}
      <div className="flex items-center gap-2 mb-3 text-xs text-gray-600 dark:text-gray-300">
        <Calendar size={12} />
        <span>{format(parseISO(task.date), "MMM dd")}</span>
        <Badge variant="status" value={task.status} />
      </div>

      {/* Progress */}
      <div className="mb-3">
        <div className="flex items-center justify-between mb-1">
          <span className="text-xs text-gray-600 dark:text-gray-300">
            Progress
          </span>
          <span className="text-xs font-medium text-gray-700 dark:text-gray-300">
            {task.progress}%
          </span>
        </div>
        <div className="h-1.5 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
          <div
            className={clsx("h-full transition-all", progressColor)}
            style={{ width: `${task.progress}%` }}
          />
        </div>
      </div>

      {/* Assignees */}
      <div className="flex -space-x-2">
        {task.assignees.slice(0, 3).map((assignee) => (
          <div
            key={assignee.id}
            className={clsx(
              "w-7 h-7 rounded-full border-2 border-white flex items-center justify-center text-xs font-semibold text-white",
              assignee.avatarColor,
            )}
            title={assignee.name}
          >
            {assignee.name.charAt(0)}
          </div>
        ))}
        {task.assignees.length > 3 && (
          <div className="w-7 h-7 rounded-full border-2 border-white bg-gray-200 flex items-center justify-center text-xs font-semibold text-gray-600">
            +{task.assignees.length - 3}
          </div>
        )}
      </div>
    </button>
  );
}

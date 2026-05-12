import { Calendar, Pencil } from "lucide-react";
import type { Task } from "../../types/task";
import Badge from "../ui/Badge";
import { format } from "date-fns";
import clsx from "clsx";

interface TaskDetailViewProps {
  task: Task;
  onEdit: () => void;
  onClose: () => void;
}

export default function TaskDetailView({
  task,
  onEdit,
  onClose,
}: TaskDetailViewProps) {
  const progressColor =
    task.status === "Done"
      ? "bg-green-500"
      : task.status === "In Progress"
        ? "bg-blue-500"
        : "bg-gray-400";

  return (
    <div className="space-y-5">
      {/* Title + Project */}
      <div>
        <h3 className="text-xl font-bold text-gray-900">{task.title}</h3>
        <p className="text-sm text-gray-500 mt-1">{task.project}</p>
      </div>

      {/* Tag + Priority + Status */}
      <div className="flex gap-2 flex-wrap">
        <Badge variant="tag" value={task.tag} />
        <Badge variant="priority" value={task.priority} />
        <Badge variant="status" value={task.status} />
      </div>

      {/* Date */}
      <div className="flex items-center gap-2 text-sm">
        <Calendar size={16} className="text-gray-400" />
        <span className="text-gray-600">Due date:</span>
        <span className="font-medium text-gray-900">
          {format(new Date(task.date), "MMM dd, yyyy")}
        </span>
      </div>

      {/* Progress */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-700">Progress</span>
          <span className="text-sm font-semibold text-gray-900">
            {task.progress}%
          </span>
        </div>
        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
          <div
            className={clsx("h-full transition-all", progressColor)}
            style={{ width: `${task.progress}%` }}
          />
        </div>
      </div>

      {/* Assignees */}
      <div>
        <p className="text-sm font-medium text-gray-700 mb-2">
          Assignees ({task.assignees.length})
        </p>
        <div className="flex flex-wrap gap-2">
          {task.assignees.map((assignee) => (
            <div
              key={assignee.id}
              className="flex items-center gap-2 bg-gray-50 rounded-full pl-1 pr-3 py-1"
            >
              <div
                className={clsx(
                  "w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold text-white",
                  assignee.avatarColor,
                )}
              >
                {assignee.name.charAt(0)}
              </div>
              <span className="text-sm text-gray-700">{assignee.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end gap-2 pt-4 border-t border-gray-200">
        <button
          onClick={onClose}
          className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg"
        >
          Close
        </button>
        <button
          onClick={onEdit}
          className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium"
        >
          <Pencil size={16} />
          Edit
        </button>
      </div>
    </div>
  );
}

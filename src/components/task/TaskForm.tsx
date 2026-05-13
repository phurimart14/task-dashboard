import { useState } from "react";
import type {
  Task,
  TaskFormData,
  Priority,
  Status,
  Tag,
} from "../../types/task";

interface TaskFormProps {
  initialData?: Task | null;
  onSubmit: (data: TaskFormData) => void;
  onCancel: () => void;
}

const PRIORITY_OPTIONS: Priority[] = [
  "Low",
  "Medium Priority",
  "High Priority",
];
const STATUS_OPTIONS: Status[] = ["To Do", "In Progress", "Done"];
const TAG_OPTIONS: Tag[] = ["Feature", "Bug", "Improvement", "Design"];

const DEFAULT_ASSIGNEES = [
  { id: "u1", name: "Alex Doe", avatarColor: "bg-blue-500" },
];

export default function TaskForm({
  initialData,
  onSubmit,
  onCancel,
}: TaskFormProps) {
  const [title, setTitle] = useState(initialData?.title ?? "");
  const [project, setProject] = useState(initialData?.project ?? "");
  const [tag, setTag] = useState<Tag>(initialData?.tag ?? "Feature");
  const [priority, setPriority] = useState<Priority>(
    initialData?.priority ?? "Medium Priority",
  );
  const [status, setStatus] = useState<Status>(initialData?.status ?? "To Do");
  const [date, setDate] = useState(
    initialData?.date ?? new Date().toISOString().split("T")[0],
  );
  const [progress, setProgress] = useState(initialData?.progress ?? 0);

  const [errors, setErrors] = useState<{ title?: string; project?: string }>(
    {},
  );

  const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newErrors: typeof errors = {};
    if (!title.trim()) newErrors.title = "กรุณากรอกชื่อ Task";
    if (!project.trim()) newErrors.project = "กรุณากรอกชื่อ Project";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onSubmit({
      title: title.trim(),
      project: project.trim(),
      tag,
      priority,
      status,
      date,
      progress,
      assignees: initialData?.assignees ?? DEFAULT_ASSIGNEES,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Title */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Task Title <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            if (errors.title) setErrors({ ...errors, title: undefined });
          }}
          placeholder="e.g., Implement Dark Mode"
          className={`w-full px-3 py-2 text-sm border rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
            errors.title
              ? "border-red-400"
              : "border-gray-200 dark:border-gray-600"
          }`}
        />
        {errors.title && (
          <p className="text-xs text-red-500 mt-1">{errors.title}</p>
        )}
      </div>

      {/* Project */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Project <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          value={project}
          onChange={(e) => {
            setProject(e.target.value);
            if (errors.project) setErrors({ ...errors, project: undefined });
          }}
          placeholder="e.g., Web App Redesign"
          className={`w-full px-3 py-2 text-sm border rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
            errors.project
              ? "border-red-400"
              : "border-gray-200 dark:border-gray-600"
          }`}
        />
        {errors.project && (
          <p className="text-xs text-red-500 mt-1">{errors.project}</p>
        )}
      </div>

      {/* Tag + Priority - 2 columns */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Tag
          </label>
          <select
            value={tag}
            onChange={(e) => setTag(e.target.value as Tag)}
            className="w-full px-3 py-2 text-sm border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
          >
            {TAG_OPTIONS.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Priority
          </label>
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value as Priority)}
            className="w-full px-3 py-2 text-sm border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
          >
            {PRIORITY_OPTIONS.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Status + Date - 2 columns */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Status
          </label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value as Status)}
            className="w-full px-3 py-2 text-sm border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
          >
            {STATUS_OPTIONS.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Due Date
          </label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full px-3 py-2 text-sm border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors [color-scheme:light] dark:[color-scheme:dark]"
          />
        </div>
      </div>

      {/* Progress */}
      <div>
        <div className="flex items-center justify-between mb-1">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Progress
          </label>
          <span className="text-sm font-semibold text-blue-600 dark:text-blue-400">
            {progress}%
          </span>
        </div>
        <input
          type="range"
          min="0"
          max="100"
          value={progress}
          onChange={(e) => setProgress(Number(e.target.value))}
          className="w-full accent-blue-600"
        />
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end gap-2 pt-4 border-t border-gray-200 dark:border-gray-700">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
        >
          {initialData ? "Save Changes" : "Create Task"}
        </button>
      </div>
    </form>
  );
}

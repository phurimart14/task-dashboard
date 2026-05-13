// Priority levels
export type Priority = "Low" | "Medium Priority" | "High Priority";

// Status (3 columns)
export type Status = "To Do" | "In Progress" | "Done";

// Tag categories
export type Tag = "Feature" | "Bug" | "Improvement" | "Design";

// Task model
export interface Task {
  id: string;
  title: string;
  project: string;
  tag: Tag;
  priority: Priority;
  status: Status;
  date: string; // ISO date
  progress: number; // 0-100
  assignees: Assignee[];
}

// ผู้รับผิดชอบ
export interface Assignee {
  id: string;
  name: string;
  avatarColor: string;
}

// Form data ตอน create/edit
export type TaskFormData = Omit<Task, "id">;

// Sort options
export type SortBy =
  | "date-asc"
  | "date-desc"
  | "priority"
  | "progress"
  | "default";

export const SORT_LABELS: Record<SortBy, string> = {
  default: "Default",
  "date-asc": "Date (Oldest first)",
  "date-desc": "Date (Newest first)",
  priority: "Priority (High → Low)",
  progress: "Progress (Low → High)",
};

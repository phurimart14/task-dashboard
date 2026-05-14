import clsx from "clsx";
import type { Priority, Status, Tag } from "../../types/task";

type BadgeVariant = "priority" | "status" | "tag";

interface BadgeProps {
  variant: BadgeVariant;
  value: Priority | Status | Tag;
}

export default function Badge({ variant, value }: BadgeProps) {
  const styles = getBadgeStyles(variant, value);

  return (
    <span
      className={clsx(
        "inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium",
        styles,
      )}
    >
      {value}
    </span>
  );
}

// ฟังก์ชันคำนวณสี ตาม variant + value
function getBadgeStyles(variant: BadgeVariant, value: string): string {
  if (variant === "priority") {
    if (value === "Low")
      return "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300";
    if (value === "Medium Priority")
      return "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300";
    if (value === "High Priority")
      return "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300";
  }
  if (variant === "status") {
    if (value === "To Do")
      return "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300";
    if (value === "In Progress")
      return "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300";
    if (value === "Done")
      return "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300";
  }
  if (variant === "tag") {
    if (value === "Feature")
      return "bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300";
    if (value === "Bug")
      return "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300";
    if (value === "Improvement")
      return "bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300";
    if (value === "Design")
      return "bg-pink-100 dark:bg-pink-900/30 text-pink-700 dark:text-pink-300";
  }
  return "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300";
}

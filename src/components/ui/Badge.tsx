import clsx from 'clsx';
import type { Priority, Status, Tag } from '../../types/task';

type BadgeVariant = 'priority' | 'status' | 'tag';

interface BadgeProps {
  variant: BadgeVariant;
  value: Priority | Status | Tag;
}

export default function Badge({ variant, value }: BadgeProps) {
  const styles = getBadgeStyles(variant, value);

  return (
    <span
      className={clsx(
        'inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium',
        styles
      )}
    >
      {value}
    </span>
  );
}

// ฟังก์ชันคำนวณสี ตาม variant + value
function getBadgeStyles(variant: BadgeVariant, value: string): string {
  if (variant === 'priority') {
    if (value === 'Low') return 'bg-gray-100 text-gray-700';
    if (value === 'Medium Priority') return 'bg-blue-100 text-blue-700';
    if (value === 'High Priority') return 'bg-red-100 text-red-700';
  }

  if (variant === 'status') {
    if (value === 'To Do') return 'bg-gray-100 text-gray-700';
    if (value === 'In Progress') return 'bg-blue-100 text-blue-700';
    if (value === 'Done') return 'bg-green-100 text-green-700';
  }

  if (variant === 'tag') {
    if (value === 'Feature') return 'bg-purple-100 text-purple-700';
    if (value === 'Bug') return 'bg-red-100 text-red-700';
    if (value === 'Improvement') return 'bg-amber-100 text-amber-700';
    if (value === 'Design') return 'bg-pink-100 text-pink-700';
  }

  return 'bg-gray-100 text-gray-700';
}
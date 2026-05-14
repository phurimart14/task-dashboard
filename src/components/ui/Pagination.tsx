import { ChevronLeft, ChevronRight } from "lucide-react";
import clsx from "clsx";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

// === Helper: สร้าง array ของหน้าที่จะแสดง (พร้อม ellipsis) ===
// Pattern: First, ..., Current-1, Current, Current+1, ..., Last
function getVisiblePages(
  currentPage: number,
  totalPages: number,
): (number | "ellipsis")[] {
  // ถ้าหน้าน้อย → แสดงทั้งหมด ไม่ต้อง truncate
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  const pages: (number | "ellipsis")[] = [];

  // First page เสมอ
  pages.push(1);

  // ถ้าหน้าปัจจุบันใกล้ first → ไม่ต้อง ellipsis ฝั่งซ้าย
  if (currentPage > 3) {
    pages.push("ellipsis");
  }

  // หน้าก่อน-หลังหน้าปัจจุบัน
  const start = Math.max(2, currentPage - 1);
  const end = Math.min(totalPages - 1, currentPage + 1);

  for (let i = start; i <= end; i++) {
    pages.push(i);
  }

  // ถ้าหน้าปัจจุบันใกล้ last → ไม่ต้อง ellipsis ฝั่งขวา
  if (currentPage < totalPages - 2) {
    pages.push("ellipsis");
  }

  // Last page เสมอ
  pages.push(totalPages);

  return pages;
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const visiblePages = getVisiblePages(currentPage, totalPages);

  return (
    <div className="flex items-center justify-center gap-1 sm:gap-2">
      {/* Previous */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="p-2 rounded-lg border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        aria-label="Previous page"
      >
        <ChevronLeft size={16} />
      </button>

      {/* Page Numbers + Ellipsis */}
      {visiblePages.map((page, index) => {
        if (page === "ellipsis") {
          return (
            <span
              key={`ellipsis-${index}`}
              className="px-1 sm:px-2 text-gray-400 dark:text-gray-500 select-none"
              aria-hidden="true"
            >
              ...
            </span>
          );
        }

        return (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={clsx(
              "min-w-[36px] h-9 px-2 sm:px-3 rounded-lg text-sm font-medium transition-all hover:scale-105",
              currentPage === page
                ? "bg-blue-600 text-white shadow-md"
                : "border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700",
            )}
            aria-label={`Page ${page}`}
            aria-current={currentPage === page ? "page" : undefined}
          >
            {page}
          </button>
        );
      })}

      {/* Next */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="p-2 rounded-lg border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        aria-label="Next page"
      >
        <ChevronRight size={16} />
      </button>
    </div>
  );
}

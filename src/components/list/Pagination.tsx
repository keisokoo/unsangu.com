"use client";
import clsx from "clsx";
import Link from "next/link";

interface PaginationProps {
  pageList: number[];
  currentPage: number;
  pageUrl: string;
}
export default function Pagination({
  pageList,
  currentPage,
  pageUrl,
}: PaginationProps) {
  return (
    <div className="flex w-full items-center justify-center gap-4 pb-8 pt-4">
      {pageList.map((page) => {
        return (
          <div key={page}>
            <Link
              href={`${pageUrl}?page=${page}`}
              className={clsx(
                {
                  "font-bold text-slate-900": page === currentPage,
                  "text-slate-400": page !== currentPage,
                },
                "hover:text-blue-600",
              )}
            >
              {page}
            </Link>
          </div>
        );
      })}
    </div>
  );
}

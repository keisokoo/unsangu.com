"use client";

import { getCategoryList } from "@/services/posts";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";

export default function CategoryList() {
  const { data: categories } = useQuery({
    queryKey: ["hydrate-category-list"],
    queryFn: getCategoryList,
  });
  return (
    <div className="flex flex-col gap-2">
      <div className="text-base font-bold">Categories</div>
      <div className="w-full overflow-hidden border-b border-t border-slate-300 py-4">
        <div className="flex flex-wrap gap-2">
          {categories?.map((category) => {
            const slug = category.slug;
            return (
              <Link
                key={category.id}
                href={`/posts/categories/${slug ? slug : category.id}`}
                className={"chip whitespace-nowrap text-sm capitalize"}
              >
                {category.name} ({category.count})
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}

import { CategoryType, PostType, ServiceDataType } from "@/services/types";
import { dateFormat } from "@/utils/format";
import clsx from "clsx";
import Link from "next/link";
import ListThumbnail from "./ListThumbnail";
import MDXSummary from "./MDXSummary";

type PostListItemProps = {
  post: ServiceDataType<PostType>;
  idx?: number;
  pageUrl: string;
  categories?: CategoryType[];
};
export default function PostListItem({
  post,
  pageUrl,
  idx,
  categories,
}: PostListItemProps) {
  const thumbnail = post.attributes.thumbnail;
  const summary = post.attributes?.summary?.trim();
  return (
    <div
      key={post.id}
      className="w-full border-t border-slate-300 first-of-type:border-none first-of-type:pt-0"
    >
      <Link
        href={`${pageUrl}/${post.id}`}
        className={clsx(
          { "pb-16": idx === 0, "pb-16 pt-8": idx !== 0 },
          "group flex flex-row gap-8 rounded-lg transition-all hover:bg-slate-100",
        )}
      >
        <div className="flex flex-1 flex-col gap-8">
          <div className="flex flex-row gap-4">
            {thumbnail.data && (
              <div className="lg:hidden">
                <ListThumbnail item={thumbnail} mobile />
              </div>
            )}
            <div className="flex flex-1 flex-col gap-2 lg:w-full">
              <div className="line-clamp-2 text-xl transition-colors group-hover:text-green-500 lg:text-2xl">
                {typeof idx === "number" && `${idx + 1}. `}
                {post.attributes.title}
              </div>
              <div className="flex items-center gap-2">
                <div className="text-xs group-hover:text-slate-400 lg:text-sm">
                  {dateFormat(post.attributes.updatedAt)}
                </div>
                {categories &&
                  categories.map((category) => {
                    return (
                      <button
                        key={category.id}
                        className="chip"
                        data-category={`/posts/categories/${
                          category.attributes.slug ?? category.id
                        }`}
                      >
                        {category.attributes.name}
                      </button>
                    );
                  })}
              </div>
            </div>
          </div>
          {summary && (
            <div className="text-slate-600 transition-colors group-hover:text-green-500 lg:text-base">
              <div className="line-clamp-4">{summary}</div>
            </div>
          )}
          {!summary && post.attributes.contents?.[0]?.details && (
            <div className="text-slate-600 transition-colors group-hover:text-green-600 lg:text-base">
              <MDXSummary text={post.attributes.contents[0].details} />
            </div>
          )}
        </div>
        {thumbnail.data && (
          <div className="hidden w-1/5 shrink-0 lg:block">
            <ListThumbnail item={thumbnail} />
          </div>
        )}
      </Link>
    </div>
  );
}

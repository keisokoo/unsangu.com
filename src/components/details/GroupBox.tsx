"use client";
import SvgRightArrow from "@/app/icons/RightArrow";
import CategoryListEvent from "@/events/CategoryListEvent";
import { getPostSeries } from "@/services/posts";
import { TargetProps } from "@/services/types";
import { useQuery } from "@tanstack/react-query";
import clsx from "clsx";
import Link from "next/link";

export default function GroupBox(props: TargetProps) {
  const { data: res } = useQuery({
    queryKey: ["hydrate-posts-by-series", props.params.slug],
    queryFn: () => getPostSeries(props.params.slug),
  });
  if (!res?.data?.attributes?.posts) return <></>;
  const { title, posts } = res.data.attributes;
  const currentPostIndex = posts.data.findIndex(
    (post) => post.id === Number(props.params.id),
  );
  const currentPost = posts.data[currentPostIndex];
  return (
    <div className={`page-width mx-auto my-0 lg:px-4`}>
      <div
        id="category-container"
        className="relative flex w-full  select-none flex-col bg-slate-100"
      >
        <div
          id="category-btn"
          className="flex cursor-pointer select-none items-center justify-between px-2 py-3 text-xs"
        >
          <div className="line-clamp-1 font-bold capitalize underline underline-offset-2">
            {title} - {currentPostIndex + 1}.{" "}
            {currentPost?.attributes.title ?? ""}
          </div>
          <div id="category-svg" className="flex items-center justify-center">
            <SvgRightArrow />
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <div
            id="category-list"
            className="absolute hidden flex-col gap-4 bg-slate-100"
          >
            {posts.data.map((post, idx) => {
              return (
                <div key={post.id}>
                  <Link
                    href={`/posts/${props.params.target}/${props.params.slug}/${post.id}`}
                    className={clsx(
                      {
                        "font-bold": currentPost?.id === post.id,
                      },
                      "line-clamp-1 text-sm capitalize",
                    )}
                  >
                    {idx + 1}. {post.attributes.title}
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
        <CategoryListEvent />
      </div>
    </div>
  );
}

"use client";

import { getRecentPosts } from "@/services/posts";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import PostListItem from "./list/PostListItem";

export default function RecentPosts() {
  const { data: posts } = useQuery({
    queryKey: ["hydrate-recent-posts"],
    queryFn: getRecentPosts,
  });
  return (
    <div className="relative flex flex-col gap-2">
      <div className="text-base font-bold">Posts</div>{" "}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 transform">
        <Link
          href={`/posts`}
          className="rounded-md bg-slate-400 px-2 py-1 text-sm text-slate-50 transition-[.3s] hover:bg-slate-200 hover:text-slate-600"
        >
          MORE
        </Link>
      </div>
      <div className="flex flex-col gap-0 border-b border-t border-slate-300 pb-8">
        {posts?.data &&
          posts.data.map((post, idx) => {
            return (
              <PostListItem key={post.id} post={post} pageUrl={`/posts`} />
            );
          })}
      </div>
    </div>
  );
}

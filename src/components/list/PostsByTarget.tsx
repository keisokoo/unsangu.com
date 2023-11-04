"use client";
import { getPosts } from "@/services/posts";
import { TargetProps } from "@/services/types";
import { getPages, getPagination } from "@/utils/pagination";
import { useQuery } from "@tanstack/react-query";
import Pagination from "./Pagination";
import PostListItem from "./PostListItem";

export default function PostsByTarget({
  params,
  searchParams: { page },
  ...props
}: TargetProps) {
  const currentPage = page ? Number(page) : 1;
  const slug = params.slug;
  const target = params.target;
  const { data: response } = useQuery({
    queryKey: ["hydrate-posts-with", currentPage, slug, target],
    queryFn: () => getPosts(currentPage, slug, target),
  });
  if (!response) return <div></div>;
  const { meta, data } = response;
  const { pagination } = meta;
  const pages = getPages(pagination.total ?? 0, pagination.pageSize ?? 1);
  const pageList = getPagination(1, pages);
  const pageUrl = params.slug
    ? `/posts/${params.target}/${params.slug}`
    : `/posts`;
  const isGroupList = params.target === "groups" && params.slug;
  if (data.length === 0)
    return (
      <div className="flex h-[400px] w-full items-center justify-center text-slate-600">
        아직 작성된 포스트가 없습니다.
      </div>
    );
  return (
    <div className="flex w-full flex-col gap-0 lg:flex-row lg:flex-wrap">
      {data.map((post, idx) => {
        const categories = !params.target
          ? post.attributes.categories.data ?? []
          : [];
        return (
          <PostListItem
            idx={isGroupList ? idx : undefined}
            key={post.id}
            post={post}
            categories={categories}
            pageUrl={pageUrl}
          />
        );
      })}
      <Pagination
        pageList={pageList}
        currentPage={currentPage}
        pageUrl={`${pageUrl}`}
      />
    </div>
  );
}

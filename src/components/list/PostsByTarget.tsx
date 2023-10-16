import { getPosts } from "@/services/posts";
import { TargetProps } from "@/services/types";
import { getPages, getPagination } from "@/utils/pagination";
import Pagination from "./Pagination";
import PostListItem from "./PostListItem";

export default async function PostsByTarget({
  params,
  searchParams: { page },
  ...props
}: TargetProps) {
  const currentPage = page ? Number(page) : 1;
  const slug = params.slug ?? "";
  const slugType = params.target ?? "categories";
  const response = await getPosts(currentPage, slug, slugType);
  if (!response) return <div>500 internal error.</div>;
  const { meta, data } = response;
  const { pagination } = meta;
  const pages = getPages(pagination.total ?? 0, pagination.pageSize ?? 1);
  const pageList = getPagination(1, pages);
  const pageUrl = params.slug
    ? `/posts/${params.target}/${params.slug}`
    : `/posts`;
  return (
    <div className="flex w-full flex-col gap-16 lg:flex-row lg:flex-wrap">
      {data.map((post) => {
        const categories = !params.target
          ? post.attributes.categories.data ?? []
          : [];
        return (
          <PostListItem
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

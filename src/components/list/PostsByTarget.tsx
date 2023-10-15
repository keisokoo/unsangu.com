import { getPosts } from "@/services/posts";
import { TargetProps } from "@/services/types";
import { dateFormat } from "@/utils/format";
import { getPages, getPagination } from "@/utils/pagination";
import Link from "next/link";
import ListThumbnail from "./ListThumbnail";
import MDXSummary from "./MDXSummary";
import Pagination from "./Pagination";

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
    : `/posts/${params.target}`;
  return (
    <div className="flex w-full flex-col gap-16 lg:flex-row lg:flex-wrap">
      {data.map((post) => {
        const thumbnail = post.attributes.thumbnail;
        const categories = params.target.includes("blog")
          ? post.attributes.categories.data ?? []
          : [];
        return (
          <div
            key={post.id}
            className="w-full border-t border-slate-300 py-8 first-of-type:border-none first-of-type:py-0"
          >
            <Link
              href={`${pageUrl}/${post.id}`}
              className="flex flex-row gap-8"
            >
              <div className="flex flex-1 flex-col gap-8">
                <div className="flex flex-row gap-4">
                  <div className="w-[84px] lg:hidden">
                    <ListThumbnail item={thumbnail} />
                  </div>
                  <div className="flex flex-1 flex-col gap-2 lg:w-full">
                    <div className="line-clamp-2 text-xl lg:text-2xl">
                      {post.attributes.title}
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="text-xs lg:text-sm">
                        {dateFormat(post.attributes.updatedAt)}
                      </div>
                      {categories.map((category) => {
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
                {post.attributes.summary && (
                  <div className="text-slate-600 lg:text-base">
                    <div className="line-clamp-4">
                      {post.attributes.summary}
                    </div>
                  </div>
                )}
                {!post.attributes.summary &&
                  post.attributes.contents?.[0]?.details && (
                    <div className="text-slate-600 lg:text-base">
                      <MDXSummary text={post.attributes.contents[0].details} />
                    </div>
                  )}
              </div>
              <div className="hidden w-1/5 shrink-0 lg:block">
                <ListThumbnail item={thumbnail} />
              </div>
            </Link>
          </div>
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

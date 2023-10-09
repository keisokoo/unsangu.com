import { getPosts } from "@/services/posts";
import { dateFormat } from "@/utils/format";
import { getFromServer } from "@/utils/getServerImage";
import { getPages, getPagination } from "@/utils/pagination";
import Image from "next/image";
import Link from "next/link";
import MDXSummary from "./MDXSummary";
import Pagination from "./Pagination";

interface Props {
  params: {
    categoryId: string;
  };
  searchParams: {
    page: string;
  };
  pageUrl: string;
}
export default async function PostList({
  params,
  searchParams: { page },
  pageUrl,
  ...props
}: Props) {
  const currentPage = page ? Number(page) : 1;
  const categoryId = params.categoryId ? Number(params.categoryId) : null;
  const response = await getPosts(currentPage, categoryId);
  if (!response) return <div>loading...</div>;
  const { meta, data } = response;
  const { pagination } = meta;
  const pages = getPages(pagination.total ?? 0, pagination.pageSize ?? 1);
  const pageList = getPagination(1, pages);
  return (
    <div className="flex w-full flex-col gap-4">
      {data.map((post) => {
        const thumbnail = post.attributes.thumbnail?.data?.attributes ?? null;
        return (
          <div key={post.id}>
            <Link href={`${pageUrl}/${post.id}`}>
              <div>
                {thumbnail ? (
                  <Image
                    className="aspect-video h-auto w-full object-cover"
                    src={getFromServer(thumbnail.url)}
                    alt={thumbnail.alternativeText ?? ""}
                    width={thumbnail.width}
                    height={thumbnail.height}
                    priority
                  />
                ) : (
                  <Image
                    className="aspect-video h-auto w-full object-cover"
                    src={"/og.png"}
                    alt={"none"}
                    width={1280}
                    height={720}
                    priority
                  />
                )}
              </div>
              <div>{post.attributes.title}</div>
              <div>{dateFormat(post.attributes.updatedAt)}</div>
              {post.attributes.contents?.[0]?.details && (
                <div>
                  <MDXSummary text={post.attributes.contents[0].details} />
                </div>
              )}
            </Link>
          </div>
        );
      })}
      <Pagination
        pageList={pageList}
        currentPage={currentPage}
        pageUrl={pageUrl}
      />
    </div>
  );
}

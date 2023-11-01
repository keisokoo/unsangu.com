import { getPostSeriesList } from "@/services/posts";
import { TargetProps } from "@/services/types";
import { dateFormat } from "@/utils/format";
import { getFromServer } from "@/utils/getServerImage";
import { getPages, getPagination } from "@/utils/pagination";
import Image from "next/image";
import Link from "next/link";
import Pagination from "./Pagination";
export default async function SeriesPage({
  searchParams: { page },
}: TargetProps) {
  const currentPage = page ? Number(page) : 1;
  const response = await getPostSeriesList(currentPage);
  if (!response) return <div>500 internal error.</div>;

  const { pagination } = response.meta;
  const pages = getPages(pagination.total ?? 0, pagination.pageSize ?? 1);
  const pageList = getPagination(1, pages);
  return (
    <div className={"page-default"}>
      <div className="flex flex-col gap-4">
        {response.data.map((item) => {
          const groupData = item.attributes;
          if (!groupData) return null;
          const { title, description, posts, updatedAt, thumbnail } = groupData;
          return (
            <Link
              href={`/posts/groups/${item.id}`}
              key={item.id}
              className="flex flex-col gap-1 rounded-md border border-slate-400 p-2 transition-all duration-150 hover:bg-slate-200"
            >
              <div className="flex justify-between gap-2">
                <Image
                  className="aspect-video h-[90px] w-[90px] rounded-lg object-cover"
                  src={getFromServer(thumbnail.data?.attributes.url ?? "")}
                  width={thumbnail.data?.attributes.width ?? 0}
                  height={thumbnail.data?.attributes.height ?? 0}
                  alt={title}
                />
                <div className="flex flex-1 flex-col gap-2">
                  <div className="line-clamp-1 text-2xl">{title}</div>

                  <div className="text-sm text-slate-500">
                    {dateFormat(updatedAt)}
                  </div>
                  <div className="text-base text-slate-400">
                    {posts.data.attributes.count}개의 포스트
                  </div>
                </div>
              </div>
              {description && (
                <div className="text-base text-slate-500">{description}</div>
              )}
            </Link>
          );
        })}
      </div>
      <Pagination
        pageList={pageList}
        currentPage={currentPage}
        pageUrl={`/posts/groups`}
      />
    </div>
  );
}

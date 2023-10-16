import { getPostSeriesList } from "@/services/posts";
import { TargetProps } from "@/services/types";
import { getPages, getPagination } from "@/utils/pagination";
import Link from "next/link";
import GroupListHeader from "./GroupListHeader";
import Pagination from "./Pagination";

export default async function SeriesPage({
  searchParams: { page },
}: TargetProps) {
  const currentPage = page ? Number(page) : 1;
  const response = await getPostSeriesList();
  if (!response) return <div>500 internal error.</div>;

  const { pagination } = response.meta;
  const pages = getPages(pagination.total ?? 0, pagination.pageSize ?? 1);
  const pageList = getPagination(1, pages);
  return (
    <div className="mx-auto my-0 w-full max-w-[784px] bg-slate-50 px-4 2xl:px-0">
      {response.data.map((item) => {
        return (
          <Link
            href={`/posts/groups/${item.id}`}
            key={item.id}
            className="flex flex-col gap-1 rounded-md border border-slate-400 p-2"
          >
            <GroupListHeader groupData={item.attributes} />
          </Link>
        );
      })}
      <Pagination
        pageList={pageList}
        currentPage={currentPage}
        pageUrl={`/posts/groups`}
      />
    </div>
  );
}

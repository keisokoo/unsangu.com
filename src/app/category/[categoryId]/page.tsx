import { getPostsByCategoryId } from "@/services/posts";
import { getPages, getPagination } from "@/utils/pagination";
import clsx from "clsx";
import { log } from "console";
import Link from "next/link";

interface Props {
  params: {
    categoryId: string;
  };
  searchParams: {
    page: string;
  };
}
export default async function CategoryPage({
  params,
  searchParams: { page },
  ...props
}: Props) {
  const currentPage = page ? Number(page) : 1;
  const res = await getPostsByCategoryId(
    Number(params.categoryId),
    currentPage,
  );
  log(props);
  if (!res || !res?.meta) return <div>loading...</div>;
  const { meta } = res;
  const { pagination } = meta;
  const pages = getPages(pagination.total ?? 0, pagination.pageSize ?? 0);
  const pageList = getPagination(1, pages);
  return (
    <div className="mx-auto my-0 max-w-[1280px] px-4 2xl:px-0">
      <div>
        {res?.data.map((post) => {
          return (
            <div key={post.id}>
              <div>
                <Link href={`/category/${params.categoryId}/${post.id}`}>
                  {post.attributes.title}
                </Link>
              </div>
            </div>
          );
        })}
      </div>
      <div className="flex">
        {pageList.map((page) => {
          return (
            <div key={page}>
              <Link
                href={`/category/${params.categoryId}?page=${page}`}
                className={clsx({ active: page === currentPage })}
              >
                {page}
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}

import CategorySidebar from "@/components/CategorySidebar";
import PostList from "./PostList";

interface Props {
  params: {
    categoryId: string;
  };
  searchParams: {
    page: string;
  };
  pageUrl: string;
}
export default async function ListPage({ ...props }: Props) {
  return (
    <main className="mx-auto my-0 w-full max-w-[1280px] bg-slate-50 px-4 2xl:px-0">
      <div className="flex flex-col justify-between gap-0 lg:flex-row lg:gap-4">
        <CategorySidebar {...props} />
        <div className="flex-1">
          <PostList {...props} />
        </div>
      </div>
    </main>
  );
}

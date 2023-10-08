import MDXbody from "@/components/MDXbody";
import { getCategoryList, getRecentPost } from "@/services/posts";
import Link from "next/link";

export default async function Home() {
  const res = await getRecentPost();
  const categories = await getCategoryList();
  if (!res) return <div>loading...</div>;
  if (!categories) return <div>loading...</div>;
  const title = res.attributes.title ?? "";
  const contents = res.attributes.contents ?? [];
  return (
    <main className="mx-auto my-0 flex w-full max-w-[1280px] flex-col items-center bg-slate-50 px-4 2xl:px-0">
      <div className="flex w-full flex-col items-center justify-center gap-4 text-slate-900">
        <MDXbody title={title} contents={contents} />
      </div>
      <div>
        {categories?.map((category) => {
          return (
            <div key={category.id}>
              <Link href={`/category/${category.id}`}>
                {category.name} ({category.count})
              </Link>
            </div>
          );
        })}
      </div>
    </main>
  );
}

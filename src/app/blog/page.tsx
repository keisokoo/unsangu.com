import MDXbody from "@/components/MDXbody";
import { getPostWithoutRecentPost, getRecentPost } from "@/services/posts";
import Link from "next/link";

export default async function BlogPage() {
  const res = await getRecentPost();
  if (!res) return <div>loading...</div>;
  const others = await getPostWithoutRecentPost(res.id);
  if (!others) return <div>loading...</div>;
  const title = res.attributes.title;
  const contents = res.attributes.contents;
  return (
    <main className="mx-auto my-0 flex w-full max-w-[1280px] flex-col items-center bg-slate-50 px-4 2xl:px-0">
      <div className="flex w-full flex-col items-center justify-center gap-4 text-slate-900">
        <div className="text-5xl">
          <Link href={`/blog/${res.id}`}>{title}</Link>
        </div>
        <MDXbody title={title} contents={contents} />
        <div className="flex w-full flex-col items-start">
          {others?.data.map((post) => {
            const title = post.attributes.title;
            return (
              <div key={post.id} className="text-4xl">
                <Link href={`/blog/${post.id}`}>{title}</Link>
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
}

import MDXContent from "@/components/details/MDXContent";
import { getApps } from "@/services/posts";

export default async function AppsPage() {
  const res = await getApps();
  if (!res) return <></>;
  const { box } = res.data.attributes;
  return (
    <article className="mx-auto my-0 w-full max-w-[784px] bg-slate-50 px-4 2xl:px-0">
      <div className="flex flex-col gap-20">
        {box.map((item) => {
          return (
            <div key={item.id} className="flex flex-col gap-4 py-4">
              <div className="text-xl">{item.title}</div>
              <div className="mt-2 border-t border-slate-300 py-2">
                <div className="prose prose-sm prose-slate w-full max-w-full md:prose-base lg:prose-lg">
                  <MDXContent text={item.contents} />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </article>
  );
}

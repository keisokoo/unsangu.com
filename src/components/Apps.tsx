"use client";
import MDXContent from "@/components/details/MDXContent";
import { getApps } from "@/services/posts";
import { useQuery } from "@tanstack/react-query";

export default function Apps() {
  const { data: res } = useQuery({
    queryKey: ["hydrate-apps"],
    queryFn: getApps,
  });
  if (!res) return <></>;
  const { box } = res.data.attributes;
  return (
    <article className={"page-default pb-40"}>
      <div className="flex flex-col gap-20">
        {box.map((item) => {
          return (
            <div key={item.id} className="flex flex-col gap-4 py-4">
              <div className="text-xl">{item.title}</div>
              <div className="mt-2 border-t border-slate-300 py-2">
                <div
                  className="prose prose-sm prose-slate w-full 
                max-w-full md:prose-base lg:prose-lg"
                >
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

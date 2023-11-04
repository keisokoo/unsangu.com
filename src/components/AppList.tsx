import { ServiceResponse } from "@/services/types";
import { notFound } from "next/navigation";
import MDXContent from "./details/MDXContent";
interface AppListProps {
  data?: ServiceResponse<{
    box: {
      id: number;
      title: string;
      contents: string;
    }[];
  }>;
}
export default function AppList({ data }: AppListProps) {
  if (!data) return notFound();
  const { box } = data.data.attributes;
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

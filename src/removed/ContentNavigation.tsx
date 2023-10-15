import { ContentsType } from "@/services/types";

interface ContentNavigationProps {
  contents: ContentsType[];
}
export default function ContentNavigation({
  contents,
}: ContentNavigationProps) {
  return (
    <div className="fixed left-0 top-1/2 hidden w-1/6 lg:block">
      <div className="sticky top-[60px] flex flex-col gap-2">
        {contents.map((content, idx) => {
          return (
            <div
              key={"paragraph_nav_" + content.id}
              data-href={`#content-${content.id}`}
              className="flex gap-1 text-sm text-slate-500"
            >
              <span className="text-slate-400">{idx + 1}</span>
              <div className="line-clamp-1 flex-1">{content.subject}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

import { ContentsType } from "@/services/types";

interface ContentNavigationProps {
  contents: ContentsType[];
}
export default function ContentNavigation({
  contents,
}: ContentNavigationProps) {
  return (
    <div className="sticky top-[60px]">
      {contents.map((content) => {
        return (
          <div
            key={"paragraph_nav_" + content.id}
            data-href={`#content-${content.id}`}
          >
            {content.subject}
          </div>
        );
      })}
    </div>
  );
}

import { CategoryType, ContentsType } from "@/services/types";
import dayjs from "dayjs";
import "dayjs/locale/ko";
import ContentNavigation from "./ContentNavigation";
import MDContent from "./MDContent";

dayjs.locale("ko");

interface Props {
  postTime: string;
  contents: ContentsType[];
  categories: CategoryType[];
}
export default function MDXbody({
  categories = [],
  postTime,
  contents,
}: Props) {
  console.log("categories", categories);
  categories = categories ?? [];
  return (
    <div id="mdx-container" className="flex w-full justify-between gap-4">
      <div className="w-full lg:w-5/6">
        {contents.map((content) => {
          return (
            <div key={"paragraph_" + content.id} id={"content-" + content.id}>
              <h1 className="text-4xl">{content.subject}</h1>
              <h6>{postTime}</h6>
              <div className="flex gap-2">
                {categories.map((category) => {
                  return (
                    <div key={category.id}>
                      <span>{category.attributes.name}</span>
                    </div>
                  );
                })}
              </div>
              <div className="prose prose-sm prose-slate w-full max-w-full md:prose-base lg:prose-lg">
                <MDContent text={content.details} />
              </div>
            </div>
          );
        })}
      </div>
      <div className="hidden w-1/6 lg:block">
        <ContentNavigation contents={contents} />
      </div>
    </div>
  );
}

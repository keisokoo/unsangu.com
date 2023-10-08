import { ContentsType } from "@/services/types";
import ContentNavigation from "./ContentNavigation";
import MDContent from "./MDContent";

interface Props {
  title: string;
  contents: ContentsType[];
}
export default function MDXbody({ title, contents }: Props) {
  return (
    <div id="mdx-container" className="flex w-full justify-between gap-4">
      <div className="w-full lg:w-5/6">
        {contents.map((content) => {
          return (
            <div key={"paragraph_" + content.id} id={"content-" + content.id}>
              <h1 className="text-4xl">{content.subject}</h1>
              <div className="prose prose-sm md:prose-base lg:prose-lg prose-slate w-full max-w-full">
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

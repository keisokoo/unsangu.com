import { PostType, ServiceDataType } from "@/services/types";
import { dateFormat } from "@/utils/format";
import { getFromServer } from "@/utils/getServerImage";
import dayjs from "dayjs";
import "dayjs/locale/ko";
import Image from "next/image";
import Link from "next/link";
import ContentNavigation from "./ContentNavigation";
import MDContent from "./MDContent";

dayjs.locale("ko");

interface Props {
  currentPost: ServiceDataType<PostType>;
}
export default function MDXbody({ currentPost }: Props) {
  const categories = currentPost.attributes.categories.data ?? [];
  const postTime = dateFormat(currentPost.attributes.updatedAt);
  const contents = currentPost.attributes.contents;
  const thumbnail = currentPost.attributes.thumbnail;
  const title = currentPost.attributes.title;
  return (
    <div className="flex w-full justify-between gap-4">
      <div className="w-full lg:w-5/6">
        {thumbnail?.data && (
          <div className="flex w-full items-center justify-center lg:pb-8">
            <Image
              className="max-h-[480px] w-full object-cover"
              src={getFromServer(thumbnail?.data?.attributes?.url ?? "")}
              alt={thumbnail?.data?.attributes?.alternativeText ?? ""}
              width={thumbnail?.data?.attributes?.width ?? 1}
              height={thumbnail?.data?.attributes?.height ?? 1}
            />
          </div>
        )}
        <div className="flex flex-col gap-4 pt-8 lg:pt-0">
          <h1 className="text-5xl font-semibold">{title}</h1>
          <div className="flex items-center gap-2">
            <div className="text-xs lg:text-sm">{postTime}</div>
            {categories.map((category) => {
              return (
                <div key={category.id} className="chip">
                  <Link
                    href={`/category/${
                      category.attributes.slug ?? category.id
                    }`}
                  >
                    {category.attributes.name}
                  </Link>
                </div>
              );
            })}
          </div>
          <div id="mdx-container" className="flex flex-col gap-24 pb-40 pt-12">
            {contents.map((content) => {
              return (
                <div
                  key={"paragraph_" + content.id}
                  id={"content-" + content.id}
                  className="min-h-[480px]"
                >
                  <h1 className="text-4xl font-medium">{content.subject}</h1>
                  <div className="mt-4 border-t border-slate-300 py-8">
                    <div className="prose prose-sm prose-slate w-full max-w-full md:prose-base lg:prose-lg">
                      <MDContent text={content.details} />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className="hidden w-1/6 lg:block">
        <ContentNavigation contents={contents} />
      </div>
    </div>
  );
}

import { ServiceDataType, Works, workTypeText } from "@/services/types";
import { dateFormat } from "@/utils/format";
import clsx from "clsx";
import MDXContent from "./details/MDXContent";

interface WorkItemProps {
  work: ServiceDataType<Works>;
}
const hide = true;
export default function WorkItem({ work }: WorkItemProps) {
  return (
    <div className="flex flex-col gap-0 rounded-2xl px-4">
      <div className="sticky top-[60px] z-10 flex items-center gap-4 bg-white py-2">
        {work.attributes.type && (
          <div
            className={clsx(
              {
                "bg-purple-200": work.attributes.type === "personal",
                "bg-green-200": work.attributes.type === "outsourcing",
                "bg-blue-200": work.attributes.type === "company",
              },
              "whitespace-nowrap rounded-md px-2 py-0.5",
            )}
          >
            {workTypeText(work.attributes.type)}
          </div>
        )}
        <div className="line-clamp-1 text-xl font-bold text-gray-800 lg:text-2xl">
          {work.attributes.title}
        </div>
      </div>
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-1">
          {work.attributes.sub_title && (
            <div className="text-base text-slate-500 lg:text-xl">
              {work.attributes.sub_title}
            </div>
          )}
          <div className="text-sm opacity-60">
            {dateFormat(work.attributes.start, "YYYY-MM")}
            {` ~ `}
            {work.attributes.end
              ? dateFormat(work.attributes.end, "YYYY-MM")
              : work.attributes.end_replace}
          </div>
        </div>
        <MDXContent text={work.attributes.contents} />
        <div className="flex flex-wrap gap-4 rounded-xl py-4">
          {work.attributes.stack?.map((stack, idx) => {
            return (
              <div
                key={stack + work.id + idx}
                className="rounded-sm bg-gray-200 px-2 py-0.5 text-sm"
              >
                {stack}
              </div>
            );
          })}
        </div>
        {!hide && (
          <>
            <div className="whitespace-pre-line text-sm leading-loose text-gray-600">
              {work.attributes.work_summary}
            </div>
            <div className="flex flex-col gap-2 text-sm">
              {work.attributes.links?.map((link, idx) => {
                return (
                  <div key={link.id + work.id + idx}>
                    <a
                      href={link.url}
                      className="flex items-center gap-2"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <span className="rounded-md bg-blue-100 px-2 py-1">
                        {link.text}
                      </span>
                      <span className="underline underline-offset-2">
                        {link.url}
                      </span>
                    </a>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

"use client";

import { getHost } from "@/actions/host";
import { getWorksByType, getWorksWithWorkCategory } from "@/services/posts";
import { WorkType, workTypeText, workTypes } from "@/services/types";
import { useQuery } from "@tanstack/react-query";
import clsx from "clsx";
import { useEffect, useState } from "react";
import WorkItem from "./WorkItem";
import MDXContent from "./details/MDXContent";
import dayjs from "dayjs";

export default function WorkList({}) {
  const [workType, set_workType] = useState<WorkType | null>(null);
  // const { data } = useQuery({
  //   queryKey: ["get-works-by-type", workType],
  //   queryFn: () => getWorksByType(workType),
  //   enabled: workType !== null,
  // });
  const { data: workCategory } = useQuery({
    queryKey: ["hydrate-work-category", workType],
    queryFn: () => getWorksWithWorkCategory(workType),
  });
  useEffect(() => {
    console.log("workCategory", workCategory);
  }, [workCategory]);
  return (
    <div className="page-default pb-40">
      <div className="ml-3 mt-8 flex flex-wrap gap-1">
        <div
          className={clsx(
            {
              "border-transparent bg-stone-200": workType !== null,
              "active-tab border-slate-400 bg-yellow-200": workType === null,
            },
            "current-tab",
          )}
          onClick={() => set_workType(null)}
        >
          {`전체`}
        </div>
        {workTypes.map((type) => {
          return (
            <div
              key={type}
              className={clsx(
                {
                  "active-tab border-slate-400 bg-yellow-200":
                    workType === type,
                  "border-transparent bg-stone-200": workType !== type,
                },
                "current-tab",
              )}
              onClick={() => set_workType(type)}
            >
              {workTypeText(type)}
            </div>
          );
        })}
      </div>
      <div
        className="flex min-h-screen flex-col rounded-md border border-slate-400"
        id="content"
      >
        {workCategory?.data &&
          workCategory.data.length > 0 &&
          workCategory.data.map((category) => {
            return (
              <div key={category.id} className="rounded-md bg-white px-4 py-8">
                <div className="text-3xl">{category.attributes.name}</div>
                <MDXContent text={category.attributes.description} />
                <div className="flex flex-col">
                  {category?.attributes.works?.data
                    ?.sort(
                      (a, b) =>
                        dayjs(b.attributes.start).valueOf() -
                        dayjs(a.attributes.start).valueOf(),
                    )
                    .map((work, idx) => {
                      return (
                        <div
                          key={work.id}
                          className={clsx(
                            {
                              "mt-8": idx === 0,
                            },
                            "border-t border-slate-300 pb-40 pt-4",
                          )}
                        >
                          <WorkItem work={work} />
                        </div>
                      );
                    })}
                </div>
              </div>
            );
          })}
        {/* {workType !== null && data?.data && data.data.length > 0 && (
          <div className="rounded-md bg-white px-4  py-8">
            <div className="flex flex-col gap-40">
              {data.data.map((work) => {
                return <WorkItem key={work.id} work={work} />;
              })}
            </div>
          </div>
        )} */}
      </div>
    </div>
  );
}

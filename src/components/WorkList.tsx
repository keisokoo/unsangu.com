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
  const { data: workCategory } = useQuery({
    queryKey: ["hydrate-work-category", workType],
    queryFn: () => getWorksWithWorkCategory(workType),
  });
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
              <div key={category.id} className="rounded-md bg-white pb-8 pt-40">
                <div className="flex flex-col gap-2 bg-white px-8">
                  <div className="text-4xl font-bold">
                    {category.attributes.name} (
                    {category?.attributes.works?.data?.length})
                  </div>
                  <MDXContent text={category.attributes.description} />
                </div>
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
                              "card-shadow border-t": idx !== 0,
                            },
                            "border-slate-300 bg-white px-4 pb-40 pt-4",
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
      </div>
    </div>
  );
}

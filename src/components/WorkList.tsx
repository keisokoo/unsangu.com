"use client";

import { getHost } from "@/actions/host";
import { getWorksByType, getWorksWithWorkCategory } from "@/services/posts";
import { WorkType, workTypeText, workTypes } from "@/services/types";
import { useQuery } from "@tanstack/react-query";
import clsx from "clsx";
import { useEffect, useState } from "react";
import WorkItem from "./WorkItem";
import MDXContent from "./details/MDXContent";

export default function WorkList({}) {
  const [workType, set_workType] = useState<WorkType | null>(null);
  const { data, isError, isPending } = useQuery({
    queryKey: ["get-works-by-type", workType],
    queryFn: () => getWorksByType(workType),
    enabled: workType !== null,
  });
  const { data: workCategory } = useQuery({
    queryKey: ["hydrate-work-category"],
    queryFn: getWorksWithWorkCategory,
    enabled: workType === null,
  });
  useEffect(() => {
    console.log("workCategory", workCategory);
  }, [workCategory]);
  return (
    <div className="page-default pb-40">
      <div className="p-8">
        <button
          onClick={async () => {
            const currentHost = await getHost();
            console.log("currentHost", currentHost);
          }}
        >
          getHost
        </button>
      </div>
      <div className="flex flex-wrap gap-4">
        <div
          className={clsx(
            {
              "bg-stone-200": workType !== null,
              "bg-yellow-200": workType == null,
            },
            "cursor-pointer whitespace-nowrap rounded-md px-2 py-0.5 transition-all hover:opacity-60",
          )}
          onClick={() => set_workType(null)}
        >
          {"전체"}
        </div>
        {workTypes.map((type) => {
          return (
            <div
              key={type}
              className={clsx(
                {
                  "bg-purple-200": "personal" === type && workType === type,
                  "bg-green-200": "outsourcing" === type && workType === type,
                  "bg-blue-200": "company" === type && workType === type,
                  "bg-stone-200": workType !== type,
                },
                "cursor-pointer whitespace-nowrap rounded-md px-2 py-0.5 transition-all hover:opacity-60",
              )}
              onClick={() => set_workType(type)}
            >
              {workTypeText(type)}
            </div>
          );
        })}
      </div>
      <div className="flex flex-col gap-80" id="content">
        {workType === null &&
          workCategory?.data &&
          workCategory.data.length > 0 &&
          workCategory.data.map((category) => {
            return (
              <div key={category.id} className="">
                <div className="text-3xl">{category.attributes.name}</div>
                <div className="prose prose-sm prose-slate w-full">
                  <MDXContent text={category.attributes.description} />
                </div>
                <div className="flex flex-col gap-40">
                  {category?.attributes.works?.data?.map((work) => {
                    return <WorkItem key={work.id} work={work} />;
                  })}
                </div>
              </div>
            );
          })}
        {workType !== null && data?.data && data.data.length > 0 && (
          <div className="flex flex-col gap-40">
            {data.data.map((work) => {
              return <WorkItem key={work.id} work={work} />;
            })}
          </div>
        )}
      </div>
    </div>
  );
}

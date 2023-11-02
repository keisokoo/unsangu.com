"use client";

import { getWorks } from "@/services/posts";
import { useQuery } from "@tanstack/react-query";

export default function WorkList({}) {
  const { data, isError, isPending } = useQuery({
    queryKey: ["hydrate-works"],
    queryFn: getWorks,
  });
  if (isPending) return <div>loading...</div>;
  if (isError) return <div>error</div>;
  return (
    <div>
      {data?.data?.map((work) => {
        return (
          <div key={work.id}>
            <div>{work.attributes.title}</div>
            <div>{work.attributes.contents}</div>
          </div>
        );
      })}
    </div>
  );
}

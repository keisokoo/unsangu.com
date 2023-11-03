"use client";
import { getRecentSeriesList } from "@/services/posts";
import { dateFormat } from "@/utils/format";
import { getFromServer } from "@/utils/getServerImage";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";

export default function RecentSeriesList() {
  const { data: groups } = useQuery({
    queryKey: ["hydrate-recent-series-list"],
    queryFn: getRecentSeriesList,
  });
  return (
    <div className="relative flex flex-col gap-2">
      <div className="text-base font-bold">Series</div>
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 transform">
        <Link
          href={`/posts/groups`}
          className="rounded-md bg-slate-400 px-2 py-1 text-sm text-slate-50 transition-[.3s] hover:bg-slate-200 hover:text-slate-600"
        >
          MORE
        </Link>
      </div>
      <div className="flex flex-col justify-between gap-4 border-b border-t border-slate-300 py-8 lg:flex-row">
        {groups?.data &&
          groups.data.map((group) => {
            const {
              title,
              description,
              posts: { data },
              updatedAt,
              thumbnail,
            } = group.attributes;
            const count = data.attributes.count;
            return (
              <div
                key={group.id}
                className="flex w-full flex-col gap-2 lg:w-[calc(50%-1rem)]"
              >
                <Link
                  href={`/posts/groups/${group.id}`}
                  className="group font-bold hover:bg-slate-100"
                >
                  <div className="flex flex-col gap-2">
                    <Image
                      className="aspect-video h-auto w-full object-cover transition-opacity group-hover:opacity-70"
                      src={getFromServer(thumbnail.data?.attributes.url ?? "")}
                      width={thumbnail.data?.attributes.width ?? 0}
                      height={thumbnail.data?.attributes.height ?? 0}
                      alt={title}
                    />
                    <h2 className="text-xl transition-colors group-hover:text-green-500 lg:text-2xl xl:text-3xl">
                      {title}
                    </h2>
                    {description && (
                      <div className="text-base text-slate-500 transition-colors group-hover:text-green-500">
                        {description}
                      </div>
                    )}
                    <div className="text-sm text-slate-500 transition-colors group-hover:text-green-500">
                      {dateFormat(updatedAt)}
                    </div>
                    <div className="text-sm text-slate-400 transition-colors group-hover:text-green-500">
                      {count}개의 포스트
                    </div>
                  </div>
                </Link>
              </div>
            );
          })}
      </div>
    </div>
  );
}

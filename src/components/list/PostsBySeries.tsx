"use client";
import { getPostSeries } from "@/services/posts";
import {
  GroupType,
  PostType,
  ServiceDataType,
  TargetProps,
} from "@/services/types";
import { useQuery } from "@tanstack/react-query";
import GroupListHeader from "./GroupListHeader";
import PostListItem from "./PostListItem";

const groupSort = (
  a: ServiceDataType<PostType>,
  b: ServiceDataType<PostType>,
  type: GroupType,
) => {
  const aDate =
    type === "numbering" ? a.attributes.createdAt : a.attributes.updatedAt;
  const bDate =
    type === "numbering" ? b.attributes.createdAt : b.attributes.updatedAt;
  const aData = new Date(aDate).getTime();
  const bData = new Date(bDate).getTime();
  return type === "numbering" ? aData - bData : bData - aData;
};

export default function PostsBySeries(props: TargetProps) {
  const { data: res } = useQuery({
    queryKey: ["hydrate-posts-by-series", props.params.slug],
    queryFn: () => getPostSeries(props.params.slug),
  });
  const pageUrl = `/posts/${props.params.target}/${props.params.slug}`;
  if (!res?.data?.attributes?.posts) return <></>;
  const { posts } = res.data.attributes;
  if (posts.data.length === 0)
    return (
      <div className="flex h-[400px] w-full items-center justify-center text-slate-600">
        아직 작성된 포스트가 없습니다.
      </div>
    );
  return (
    <>
      <div className="mb-8 border-b border-slate-300 pb-4">
        <GroupListHeader groupData={res.data.attributes} />
      </div>
      <div className="flex w-full flex-col gap-0 pb-40 lg:flex-row lg:flex-wrap">
        {posts.data
          .sort((a, b) => groupSort(a, b, res.data.attributes.type))
          .map((post, idx) => {
            return (
              <PostListItem
                key={post.id}
                post={post}
                idx={idx}
                pageUrl={pageUrl}
              />
            );
          })}
      </div>
    </>
  );
}

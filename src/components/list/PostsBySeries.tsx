import { getPostSeries, getPostSeriesCount } from "@/services/posts";
import { TargetProps } from "@/services/types";
import { checkOnlyNumber } from "@/utils/valid";
import GroupListHeader from "./GroupListHeader";
import PostListItem from "./PostListItem";

export default async function PostsBySeries(props: TargetProps) {
  if (props.params.target !== "groups") return <></>;
  if (!checkOnlyNumber(props.params.slug)) return <></>;
  const groupResponse = await getPostSeriesCount(props.params.slug);
  if (!groupResponse?.data?.attributes) return <></>;
  const res = await getPostSeries(props.params.slug);
  const pageUrl = `/posts/${props.params.target}/${props.params.slug}`;
  if (!res?.data?.attributes?.posts) return <></>;
  const { posts } = res.data.attributes;
  const groupData = groupResponse.data.attributes;
  if (posts.data.length === 0)
    return (
      <div className="flex h-[400px] w-full items-center justify-center text-slate-600">
        아직 작성된 포스트가 없습니다.
      </div>
    );
  return (
    <>
      <div className="mb-8 border-b border-slate-300 pb-4">
        <GroupListHeader groupData={groupData} />
      </div>
      <div className="flex w-full flex-col gap-0 pb-40 lg:flex-row lg:flex-wrap">
        {posts.data.map((post, idx) => {
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

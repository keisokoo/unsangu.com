import { getPostByID, getPostSeries } from "@/services/posts";
import { TargetProps } from "@/services/types";
import { getMetadata } from "@/utils/getMetadata";
import { checkOnlyNumber } from "@/utils/valid";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { ResolvingMetadata } from "next";
import getQueryClient from "../Registry/getQueryClient";
import ContentsDetails from "../details/ContentsDetails";

export async function generateMetadata(
  { params }: TargetProps,
  parent: ResolvingMetadata,
) {
  if (checkOnlyNumber(params.target)) {
    params.id = params.target;
  }
  return getMetadata(params, parent);
}
export default async function GetPostBy(props: TargetProps) {
  const targetIsPostId =
    checkOnlyNumber(props.params.target) &&
    !props.params.id &&
    !props.params.slug;
  const postIdNumberValid =
    props.params.id &&
    !isNaN(Number(props.params.id)) &&
    checkOnlyNumber(props.params.id);
  const postId = targetIsPostId
    ? Number(props.params.target)
    : postIdNumberValid
    ? Number(props.params.id)
    : null;
  const slug = targetIsPostId ? undefined : props.params.slug;
  const target = targetIsPostId ? undefined : props.params.target;
  if (!postId) return <div>Post ID is not valid.</div>;
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["hydrate-post-by", postId, slug, target],
    queryFn: () => getPostByID(postId, slug, target),
  });
  if (slug)
    await queryClient.prefetchQuery({
      queryKey: ["hydrate-posts-by-series", slug],
      queryFn: () => getPostSeries(slug),
    });
  const dehydratedState = dehydrate(queryClient);
  return (
    <HydrationBoundary state={dehydratedState}>
      <ContentsDetails postId={postId} slug={slug} target={target} {...props} />
    </HydrationBoundary>
  );
}

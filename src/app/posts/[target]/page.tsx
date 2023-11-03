import ContentsDetails from "@/components/details/ContentsDetails";
import PostsPage from "@/components/list/PostsPage";
import SeriesPage from "@/components/list/SeriesPage";
import dehydrated from "@/components/post-hydration/dehydrated";
import { TargetProps } from "@/services/types";
import { getMetadata } from "@/utils/getMetadata";
import { checkOnlyNumber, targetCheck } from "@/utils/valid";
import { HydrationBoundary } from "@tanstack/react-query";
import { ResolvingMetadata } from "next";
import { notFound } from "next/navigation";

export async function generateMetadata(
  { params }: TargetProps,
  parent: ResolvingMetadata,
) {
  if (checkOnlyNumber(params.target)) {
    params.id = params.target;
    return await getMetadata(params, parent);
  } else {
    return { ...parent };
  }
}
export default async function TargetPage({ ...props }: TargetProps) {
  if (
    !checkOnlyNumber(props.params.target) &&
    !targetCheck(props.params.target)
  ) {
    return notFound();
  }
  const dehydratedState = await dehydrated(props);
  return (
    <HydrationBoundary state={dehydratedState}>
      {checkOnlyNumber(props.params.target) ? (
        <ContentsDetails postId={Number(props.params.target)} {...props} />
      ) : props.params.target === "groups" ? (
        <SeriesPage {...props} />
      ) : (
        <PostsPage {...props} />
      )}
    </HydrationBoundary>
  );
}

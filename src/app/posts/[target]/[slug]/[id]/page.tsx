import ContentsDetails from "@/components/details/ContentsDetails";
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
  return await getMetadata(params, parent);
}
export default async function PostByID(props: TargetProps) {
  if (!targetCheck(props.params.target)) return notFound();
  const postIdNumberValid =
    props.params.id &&
    !isNaN(Number(props.params.id)) &&
    checkOnlyNumber(props.params.id);
  const postId = postIdNumberValid ? Number(props.params.id) : null;
  const slug = props.params.slug;
  const target = props.params.target;
  if (!postId) return notFound();
  const dehydratedState = await dehydrated(props);
  return (
    <HydrationBoundary state={dehydratedState}>
      <ContentsDetails postId={postId} slug={slug} target={target} {...props} />
    </HydrationBoundary>
  );
}

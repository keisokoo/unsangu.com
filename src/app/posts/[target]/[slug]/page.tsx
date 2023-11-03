import PostsPage from "@/components/list/PostsPage";
import dehydrated from "@/components/post-hydration/dehydrated";
import { TargetProps } from "@/services/types";
import { targetCheck } from "@/utils/valid";
import { HydrationBoundary } from "@tanstack/react-query";
import { notFound } from "next/navigation";

export default async function SlugPage({ ...props }: TargetProps) {
  if (!targetCheck(props.params.target)) return notFound();
  const dehydratedState = await dehydrated(props);
  return (
    <HydrationBoundary state={dehydratedState}>
      <PostsPage {...props} />
    </HydrationBoundary>
  );
}

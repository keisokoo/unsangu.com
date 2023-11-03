import PostsPage from "@/components/list/PostsPage";
import dehydrated from "@/components/post-hydration/dehydrated";
import { TargetProps } from "@/services/types";
import { HydrationBoundary } from "@tanstack/react-query";

export default async function TargetPage({ ...props }: TargetProps) {
  const dehydratedState = await dehydrated(props);
  return (
    <HydrationBoundary state={dehydratedState}>
      <PostsPage {...props} />
    </HydrationBoundary>
  );
}

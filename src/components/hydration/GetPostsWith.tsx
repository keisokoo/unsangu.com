import { getPosts } from "@/services/posts";
import { TargetProps } from "@/services/types";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import getQueryClient from "../Registry/getQueryClient";
import PostsByTarget from "../list/PostsByTarget";

export default async function GetPostsWith(props: TargetProps) {
  const {
    params,
    searchParams: { page },
  } = props;
  const currentPage = page ? Number(page) : 1;
  const slug = params.slug ?? "";
  const slugType = params.target ?? "categories";
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["hydrate-posts-with", currentPage, slug, slugType],
    queryFn: () => getPosts(currentPage, slug, slugType),
  });
  const dehydratedState = dehydrate(queryClient);
  return (
    <HydrationBoundary state={dehydratedState}>
      <PostsByTarget {...props} />
    </HydrationBoundary>
  );
}

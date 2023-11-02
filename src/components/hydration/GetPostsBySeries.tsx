import { getPostSeries } from "@/services/posts";
import { TargetProps } from "@/services/types";
import { checkOnlyNumber } from "@/utils/valid";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import getQueryClient from "../Registry/getQueryClient";
import PostsBySeries from "../list/PostsBySeries";

export default async function GetPostsBySeries(props: TargetProps) {
  if (props.params.target !== "groups") return <></>;
  if (!checkOnlyNumber(props.params.slug)) return <></>;
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["hydrate-posts-by-series", props.params.slug],
    queryFn: () => getPostSeries(props.params.slug),
  });
  const dehydratedState = dehydrate(queryClient);
  return (
    <HydrationBoundary state={dehydratedState}>
      <PostsBySeries {...props} />
    </HydrationBoundary>
  );
}

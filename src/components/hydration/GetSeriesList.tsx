import { getPostSeriesList } from "@/services/posts";
import { TargetProps } from "@/services/types";
import { checkOnlyNumber } from "@/utils/valid";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import getQueryClient from "../Registry/getQueryClient";
import SeriesPage from "../list/SeriesPage";

export default async function GetSeriesList(props: TargetProps) {
  const currentPage =
    props?.searchParams?.page && checkOnlyNumber(props?.searchParams?.page)
      ? Number(props?.searchParams?.page)
      : 1;
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["hydrate-series-list", currentPage],
    queryFn: () => getPostSeriesList(currentPage),
  });
  const dehydratedState = dehydrate(queryClient);
  return (
    <HydrationBoundary state={dehydratedState}>
      <SeriesPage {...props} />
    </HydrationBoundary>
  );
}

import {
  getCategoryList,
  getProfile,
  getRecentPosts,
  getRecentSeriesList,
} from "@/services/posts";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import Home from "../Home";
import getQueryClient from "../Registry/getQueryClient";

export default async function GetHome() {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["hydrate-profile"],
    queryFn: () => getProfile(),
  });
  await queryClient.prefetchQuery({
    queryKey: ["hydrate-category-list"],
    queryFn: () => getCategoryList(),
  });
  await queryClient.prefetchQuery({
    queryKey: ["hydrate-recent-series-list"],
    queryFn: () => getRecentSeriesList(),
  });
  await queryClient.prefetchQuery({
    queryKey: ["hydrate-recent-posts"],
    queryFn: () => getRecentPosts(),
  });
  const dehydratedState = dehydrate(queryClient);
  return (
    <>
      <HydrationBoundary state={dehydratedState}>
        <Home />
      </HydrationBoundary>
    </>
  );
}

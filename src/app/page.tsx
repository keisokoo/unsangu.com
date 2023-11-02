import getQueryClient from "@/components/Registry/getQueryClient";
import { getCategoryList, getProfile, getRecentPosts, getRecentSeriesList } from "@/services/posts";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
export default async function Home() {
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
  )
}

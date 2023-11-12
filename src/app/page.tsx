import CategoryList from "@/components/CategoryList";
import Profile from "@/components/Profile";
import RecentPosts from "@/components/RecentPosts";
import RecentSeriesList from "@/components/RecentSeries";
import getQueryClient from "@/components/Registry/getQueryClient";
import {
  getCategoryList,
  getProfile,
  getRecentPosts,
  getRecentSeriesList,
} from "@/services/posts";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
export default async function Home() {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["hydrate-profile"],
    queryFn: getProfile,
  });
  await queryClient.prefetchQuery({
    queryKey: ["hydrate-category-list"],
    queryFn: getCategoryList,
  });
  await queryClient.prefetchQuery({
    queryKey: ["hydrate-recent-series-list"],
    queryFn: getRecentSeriesList,
  });
  await queryClient.prefetchQuery({
    queryKey: ["hydrate-recent-posts"],
    queryFn: getRecentPosts,
  });
  const dehydratedState = dehydrate(queryClient);
  return (
    <HydrationBoundary state={dehydratedState}>
      <main className={"page-default pb-40"}>
        <Profile />
        <div className="flex flex-col gap-20">
          <RecentSeriesList />
          <CategoryList />
          <RecentPosts />
        </div>
      </main>
    </HydrationBoundary>
  );
}

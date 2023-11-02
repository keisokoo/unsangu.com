import Profile from "@/components/Profile";
import RecentSeriesList from "@/components/RecentSeries";
import getQueryClient from "@/components/Registry/getQueryClient";
import PostListItem from "@/components/list/PostListItem";
import {
  getCategoryList,
  getProfile,
  getRecentPosts,
  getRecentSeriesList,
} from "@/services/posts";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import Link from "next/link";
export default async function Home() {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["hydrate-profile"],
    queryFn: getProfile,
  });
  await queryClient.prefetchQuery({
    queryKey: ["hydrate-recent-series-list"],
    queryFn: getRecentSeriesList,
  });
  const categories = await getCategoryList();
  const groups = await getRecentSeriesList();
  const posts = await getRecentPosts();
  const dehydratedState = dehydrate(queryClient);
  return (
    <main className={"page-default pb-40"}>
      <HydrationBoundary state={dehydratedState}>
        <Profile />
        <div className="flex flex-col gap-20">
          <RecentSeriesList />
          <div className="flex flex-col gap-2">
            <div className="text-base font-bold">Categories</div>
            <div className="w-full overflow-hidden border-b border-t border-slate-300 py-4">
              <div className="flex flex-wrap gap-2">
                {categories?.map((category) => {
                  const slug = category.slug;
                  return (
                    <Link
                      key={category.id}
                      href={`/posts/categories/${slug ? slug : category.id}`}
                      className={"chip whitespace-nowrap text-sm capitalize"}
                    >
                      {category.name} ({category.count})
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="relative flex flex-col gap-2">
            <div className="text-base font-bold">Posts</div>{" "}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 transform">
              <Link
                href={`/posts`}
                className="rounded-md bg-slate-400 px-2 py-1 text-sm text-slate-50 transition-[.3s] hover:bg-slate-200 hover:text-slate-600"
              >
                MORE
              </Link>
            </div>
            <div className="flex flex-col gap-0 border-b border-t border-slate-300 pb-8">
              {posts?.data &&
                posts.data.map((post, idx) => {
                  return (
                    <PostListItem
                      key={post.id}
                      post={post}
                      pageUrl={`/posts`}
                    />
                  );
                })}
            </div>
          </div>
        </div>
      </HydrationBoundary>
    </main>
  );
}

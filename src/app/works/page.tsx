import getQueryClient from "@/components/Registry/getQueryClient";
import WorkList from "@/components/WorkList";
import { getWorksWithWorkCategory } from "@/services/posts";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";

export default async function WorksPage() {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["hydrate-work-category"],
    queryFn: getWorksWithWorkCategory,
  });
  const dehydratedState = dehydrate(queryClient);
  return (
    <HydrationBoundary state={dehydratedState}>
      <WorkList />
    </HydrationBoundary>
  );
}

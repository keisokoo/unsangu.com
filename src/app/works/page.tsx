import WorkList from "@/components/list/WorkList";
import { getWorks } from "@/services/posts";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import { cache } from "react";

export default async function WorksPage() {
  const getQueryClient = cache(() => new QueryClient());
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["hydrate-works"],
    queryFn: getWorks,
  });
  const dehydratedState = dehydrate(queryClient);
  return (
    <HydrationBoundary state={dehydratedState}>
      <WorkList />
    </HydrationBoundary>
  );
}

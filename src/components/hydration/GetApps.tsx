import { getApps } from "@/services/posts";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import Apps from "../Apps";
import getQueryClient from "../Registry/getQueryClient";

export default async function GetApps() {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["hydrate-apps"],
    queryFn: getApps,
  });
  const dehydratedState = dehydrate(queryClient);
  return (
    <HydrationBoundary state={dehydratedState}>
      <Apps />
    </HydrationBoundary>
  );
}

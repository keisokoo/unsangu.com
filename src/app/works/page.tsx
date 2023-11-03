import getQueryClient from "@/components/Registry/getQueryClient";
import { getWorks } from "@/services/posts";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";

export default async function WorksPage() {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["works"],
    queryFn: getWorks,
  });
  const dehydratedState = dehydrate(queryClient);
  return <HydrationBoundary state={dehydratedState}></HydrationBoundary>;
}

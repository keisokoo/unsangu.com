import { getCategoryList } from "@/services/posts";
import { TargetProps } from "@/services/types";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import getQueryClient from "../Registry/getQueryClient";
import Sidebar from "../list/Sidebar";

export default async function GetCategoryList({ ...props }: TargetProps) {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["hydrate-category-list"],
    queryFn: () => getCategoryList(),
  });
  const dehydratedState = dehydrate(queryClient);
  return (
    <HydrationBoundary state={dehydratedState}>
      <Sidebar {...props} />
    </HydrationBoundary>
  );
}

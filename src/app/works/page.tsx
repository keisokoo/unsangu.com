import Hydrate from "@/components/Registry/Hydrate.client";
import getQueryClient from "@/components/Registry/getQueryClient";
import { getWorks } from "@/services/posts";
import { dehydrate } from "@tanstack/react-query";

export default async function WorksPage() {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["works"],
    queryFn: getWorks,
  });
  const dehydratedState = dehydrate(queryClient);
  return <Hydrate state={dehydratedState}></Hydrate>;
}

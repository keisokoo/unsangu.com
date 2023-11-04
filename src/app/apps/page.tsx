import AppList from "@/components/AppList";
import { getApps } from "@/services/posts";

export default async function AppsPage() {
  const data = await getApps();
  // const queryClient = getQueryClient();
  // await queryClient.prefetchQuery({
  //   queryKey: ["hydrate-apps"],
  //   queryFn: getApps,
  // });
  // const dehydratedState = dehydrate(queryClient);
  return <AppList data={data} />;
}

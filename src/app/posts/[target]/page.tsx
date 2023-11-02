import GetPostBy from "@/components/hydration/GetPostBy";
import GetSeriesList from "@/components/hydration/GetSeriesList";
import PostsPage from "@/components/list/PostsPage";
import { TargetProps } from "@/services/types";
import { getMetadata } from "@/utils/getMetadata";
import { checkOnlyNumber, targetCheck } from "@/utils/valid";
import { ResolvingMetadata } from "next";

export async function generateMetadata(
  { params }: TargetProps,
  parent: ResolvingMetadata,
) {
  if (checkOnlyNumber(params.target)) {
    params.id = params.target;
    return getMetadata(params, parent);
  } else {
    return { ...parent };
  }
}
export default async function TargetPage({ ...props }: TargetProps) {
  if (checkOnlyNumber(props.params.target)) {
    return <GetPostBy {...props} />;
  } else if (!targetCheck(props.params.target)) {
    return <div>404 Not Found.</div>;
  } else if (props.params.target === "groups")
    return <GetSeriesList {...props} />;
  return <PostsPage {...props} />;
}

import PostDetails from "@/components/details/PostDetails";
import PostsPage from "@/components/list/PostsPage";
import SeriesPage from "@/components/list/SeriesPage";
import { getPostByID } from "@/services/posts";
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
    props.params.id = props.params.target;
    const postId = Number(props.params.target);
    const res = await getPostByID(postId);
    if (!res) return <div>404</div>;
    return <PostDetails item={res} {...props} />;
  }
  if (!targetCheck(props.params.target)) return <div>404</div>;
  if (props.params.target === "groups") return <SeriesPage {...props} />;
  return <PostsPage {...props} />;
}

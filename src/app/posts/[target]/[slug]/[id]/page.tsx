import PostDetails from "@/components/details/PostDetails";
import { getPostByID } from "@/services/posts";
import { TargetProps } from "@/services/types";
import { getMetadata } from "@/utils/getMetadata";
import { checkOnlyNumber } from "@/utils/valid";
import { ResolvingMetadata } from "next";

export async function generateMetadata(
  { params }: TargetProps,
  parent: ResolvingMetadata,
) {
  return getMetadata(params, parent);
}
export default async function PostByID(props: TargetProps) {
  const postId =
    props.params.id &&
    !isNaN(Number(props.params.id)) &&
    checkOnlyNumber(props.params.id)
      ? Number(props.params.id)
      : null;
  if (!postId) return <div>404</div>;
  const res = await getPostByID(
    Number(props.params.id),
    props.params.slug,
    props.params.target,
  );
  if (!res) return <div>500 internal error.</div>;
  return <PostDetails item={res} {...props} />;
}

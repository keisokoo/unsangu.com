import { getPostByID } from "@/services/posts";
import { TargetProps } from "@/services/types";
import { checkOnlyNumber } from "@/utils/valid";

export default async function PostDetailsByID(props: TargetProps) {
  const postId = props.params.id ?? props.params.slug;
  if (!checkOnlyNumber(postId)) return <div>404</div>;
  const slug = props.params.slug;
  const target = props.params.target;
  const res = await getPostByID(Number(postId), target, slug);
  return <div></div>;
}

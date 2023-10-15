import PostDetails from "@/components/PostDetails";
import PostsPage from "@/components/PostsPage";
import { getPostByID } from "@/services/posts";
import { TargetProps } from "@/services/types";
import { checkOnlyNumber, targetCheck } from "@/utils/valid";

export default async function SlugPage({ ...props }: TargetProps) {
  if (!targetCheck(props.params.target)) return <div>404</div>;
  if (props.params.target === "blog") {
    props.params.id = props.params.slug;
    const postId =
      props.params.id &&
      !isNaN(Number(props.params.id)) &&
      checkOnlyNumber(props.params.id)
        ? Number(props.params.id)
        : null;
    if (!postId) return <div>404</div>;
    const res = await getPostByID(Number(props.params.id));
    if (!res) return <div>500 internal error.</div>;
    return <PostDetails item={res} {...props} />;
  }
  return <PostsPage {...props} />;
}

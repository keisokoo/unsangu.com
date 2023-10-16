import PostsPage from "@/components/list/PostsPage";
import { TargetProps } from "@/services/types";
import { targetCheck } from "@/utils/valid";

export default async function SlugPage({ ...props }: TargetProps) {
  if (!targetCheck(props.params.target)) return <div>404</div>;
  return <PostsPage {...props} />;
}

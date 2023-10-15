import PostsPage from "@/components/PostsPage";
import { TargetProps } from "@/services/types";

export default function TargetPage({ ...props }: TargetProps) {
  props.params.target = "blog";
  return <PostsPage {...props} />;
}

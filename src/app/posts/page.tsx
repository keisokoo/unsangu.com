import PostsPage from "@/components/list/PostsPage";
import { TargetProps } from "@/services/types";

export default function TargetPage({ ...props }: TargetProps) {
  return <PostsPage {...props} />;
}

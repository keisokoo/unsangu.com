import PostsPage from "@/components/PostsPage";
import SeriesPage from "@/components/SeriesPage";
import { TargetProps } from "@/services/types";
import { targetCheck } from "@/utils/valid";

export default function TargetPage({ ...props }: TargetProps) {
  if (!targetCheck(props.params.target)) return <div>404</div>;
  if (props.params.target === "groups") return <SeriesPage {...props} />;
  return <PostsPage {...props} />;
}

import PostDetailsPage from "@/components/PostDetails";
import { getPostByID } from "@/services/posts";

interface Props {
  params: {
    categoryId: string;
    postId: string;
  };
}
export default async function PostInCategoryPage({ params }: Props) {
  const postId =
    params.postId && !isNaN(Number(params.postId))
      ? Number(params.postId)
      : null;
  const categoryId =
    params.categoryId && !isNaN(Number(params.categoryId))
      ? Number(params.categoryId)
      : null;
  if (!postId && !categoryId) return <div>error</div>;
  const res = await getPostByID(Number(params.postId), categoryId);
  if (!res) return <div>loading...</div>;
  return <PostDetailsPage categoryId={categoryId} item={res} />;
}

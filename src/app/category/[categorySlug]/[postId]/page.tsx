import PostDetailsPage from "@/components/PostDetails";
import { getPostByID } from "@/services/posts";

interface Props {
  params: {
    categorySlug: string;
    postId: string;
  };
}
export default async function PostInCategoryPage({ params }: Props) {
  const postId =
    params.postId && !isNaN(Number(params.postId))
      ? Number(params.postId)
      : null;
  const categorySlug = params.categorySlug;
  if (!postId || !categorySlug) return <div>error</div>;
  const res = await getPostByID(postId, categorySlug);
  if (!res) return <div>loading...</div>;
  return <PostDetailsPage categorySlug={categorySlug} item={res} />;
}

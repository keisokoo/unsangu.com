import PostDetailsPage from "@/components/PostDetailsPage";
import { getPostByID } from "@/services/posts";
import { getMetadata } from "@/utils/getMetadata";
import { ResolvingMetadata } from "next";

interface Props {
  params: {
    categorySlug: string;
    postId: string;
  };
}
export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata,
) {
  return getMetadata(
    {
      params: {
        postId: params.postId,
      },
      pageUrl: `/category/${params.categorySlug}`,
    },
    parent,
  );
}
export default async function PostInCategoryPage({ params }: Props) {
  const postId =
    params.postId && !isNaN(Number(params.postId))
      ? Number(params.postId)
      : null;
  const categorySlug = params.categorySlug;
  if (!postId || !categorySlug) return <div>error</div>;
  const res = await getPostByID(postId, categorySlug);
  if (!res) return <div>500 internal error.</div>;
  return <PostDetailsPage categorySlug={categorySlug} item={res} />;
}

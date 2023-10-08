import PostDetailsPage from "@/components/PostDetails";
import { getPostByID } from "@/services/posts";

interface Props {
  params: {
    id: string;
  };
}
export default async function PostPageById({ params }: Props) {
  const res = await getPostByID(Number(params.id));
  if (!res) return <div>loading...</div>;
  return <PostDetailsPage item={res} />;
}

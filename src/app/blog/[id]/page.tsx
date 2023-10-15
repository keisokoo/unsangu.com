import PostDetailsPage from "@/components/PostDetailsPage";
import { getCurrentPostById, getPostByID } from "@/services/posts";
import { getFromServer } from "@/utils/getServerImage";
import { ResolvingMetadata } from "next";

interface Props {
  params: {
    id: string;
  };
}
export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata,
) {
  const res = await getCurrentPostById(Number(params.id));
  if (!res) return;
  const previousImages = (await parent).openGraph?.images || [];
  const previousDescription = (await parent).description ?? "";
  return {
    metadataBase: new URL("https://acme.com"),
    alternates: {
      canonical: `/blog/${Number(params.id)}`,
    },
    title: res.currentPost.attributes.title,
    description: res.currentPost.attributes.summary ?? previousDescription,
    openGraph: {
      title: res.currentPost.attributes.title,
      description: res.currentPost.attributes.summary ?? previousDescription,
      images: [
        res.currentPost.attributes.thumbnail
          ? {
              url: getFromServer(
                res.currentPost.attributes.thumbnail.data.attributes.url,
              ),
              width: res.currentPost.attributes.thumbnail.data.attributes.width,
              height:
                res.currentPost.attributes.thumbnail.data.attributes.height,
              alt: res.currentPost.attributes.title,
            }
          : null,
        ...previousImages,
      ].filter(Boolean),
    },
  };
}
export default async function PostPageById({ params }: Props) {
  const res = await getPostByID(Number(params.id));
  if (!res) return <div>500 internal error.</div>;
  return <PostDetailsPage item={res} />;
}

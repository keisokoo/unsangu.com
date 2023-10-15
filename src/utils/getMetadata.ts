import { getCurrentPostById } from "@/services/posts";
import { ResolvingMetadata } from "next";
import { getFromServer } from "./getServerImage";

interface Props {
  params: {
    postId: string;
  };
  pageUrl: string;
}
export async function getMetadata(
  { params, pageUrl }: Props,
  parent: ResolvingMetadata,) {
  const res = await getCurrentPostById(Number(params.postId));
  if (!res) return;
  const previousImages = (await parent).openGraph?.images || [];
  const previousDescription = (await parent).description ?? "";
  return {
    metadataBase: new URL("https://acme.com"),
    alternates: {
      canonical: `${pageUrl}/${Number(params.postId)}`,
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
import { getPostMetadataById } from "@/services/posts";
import { TargetParams } from "@/services/types";
import { ResolvingMetadata } from "next";
import { getFromServer } from "./getServerImage";
import { checkOnlyNumber } from "./valid";

export async function getMetadata(
  params: TargetParams,
  parent: ResolvingMetadata,) {
  const postId = checkOnlyNumber(params.target) ? Number(params.target) : Number(params.id);
  const res = await getPostMetadataById(postId);
  if (!res) return;
  const previousImages = (await parent).openGraph?.images || [];
  const previousDescription = (await parent).description ?? "";
  const title = res.currentPost?.attributes?.title;
  const description = res.currentPost?.attributes?.summary ?? previousDescription;
  const thumbnail = res.currentPost?.attributes?.thumbnail?.data;
  return {
    metadataBase: new URL("https://unsangu.com"),
    alternates: {
      canonical: checkOnlyNumber(params.target) ? `/posts/${postId}` : `/posts/${params.target}/${params.slug}/${params.id}`,
    },
    title,
    description,
    openGraph: {
      title,
      description,
      images: [
        thumbnail
          ? {
            url: getFromServer(
              thumbnail.attributes.url,
            ),
            width: thumbnail.attributes.width ?? 1200,
            height:
              thumbnail.attributes.height ?? 630,
            alt: title,
          }
          : null,
        ...previousImages,
      ].filter(Boolean),
    },
  };
}
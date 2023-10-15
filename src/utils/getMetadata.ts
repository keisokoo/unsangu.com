import { getCurrentPostById } from "@/services/posts";
import { TargetParams } from "@/services/types";
import { ResolvingMetadata } from "next";
import { getFromServer } from "./getServerImage";

export async function getMetadata(
  params: TargetParams,
  parent: ResolvingMetadata,) {
  const res = await getCurrentPostById(params.target === 'blog' ? Number(params.slug ?? params.id) : Number(params.id));
  if (!res) return;
  const previousImages = (await parent).openGraph?.images || [];
  const previousDescription = (await parent).description ?? "";
  const title = res.currentPost?.attributes?.title;
  const description = res.currentPost?.attributes?.summary ?? previousDescription;
  const thumbnail = res.currentPost?.attributes?.thumbnail?.data;
  return {
    metadataBase: new URL("https://acme.com"),
    alternates: {
      canonical: params.target === 'blog' ? `/posts/${params.target}/${params.slug ?? params.id}` : `/posts/${params.target}/${params.slug}/${params.id}`,
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
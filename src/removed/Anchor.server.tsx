import { getOgMeta } from "@/services/posts";
import clsx from "clsx";
import { headers } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import { AnchorHTMLAttributes, ClassAttributes } from "react";
import { ExtraProps } from "react-markdown";
const getHost = () => {
  const host = headers().get("host");
  const protocol = host?.includes("localhost") ? "http" : "https";
  const currentUrl = `${protocol}://${host}`;
  return currentUrl;
};
export default async function AnchorServer({
  node,
  ...props
}: ClassAttributes<HTMLAnchorElement> &
  AnchorHTMLAttributes<HTMLAnchorElement> &
  ExtraProps) {
  const currentBlog =
    props.children?.toString().includes("$og") || props.href?.startsWith("/");
  if (currentBlog) {
    const currentUrl = getHost();
    const targetUrl = `${
      props.href?.startsWith("/") ? currentUrl : ""
    }${props.href!}`;
    const ogMeta = await getOgMeta(targetUrl);
    const Anchor = props.href?.startsWith("/") ? Link : "a";

    return (
      <Anchor
        href={props.href ?? ""}
        className={clsx("!no-underline", props.className)}
      >
        <span className="flex max-w-[300px] flex-col gap-2 border border-solid border-slate-400 p-2">
          {ogMeta?.image && (
            <Image
              src={ogMeta?.image}
              alt={ogMeta?.title ?? ""}
              width={Number(ogMeta.imageWidth) ?? 1}
              height={Number(ogMeta.imageHeight) ?? 1}
              className="!my-0 !h-auto !w-full !object-cover"
            />
          )}
          {ogMeta?.title && (
            <span className="text-sm text-gray-600">{ogMeta?.title}</span>
          )}
          {ogMeta?.description && (
            <span className="text-sm text-gray-400">{ogMeta?.description}</span>
          )}
        </span>
        <span className="text-green-500 underline">{`${props.children
          ?.toString()
          .replace("$og", "")} [${
          props.href?.startsWith("/") ? currentUrl : ""
        }${props.href}]`}</span>
      </Anchor>
    );
  }
  return (
    <a
      {...props}
      className="text-green-500"
      target="_blank"
      rel="noopener noreferrer"
    />
  );
}

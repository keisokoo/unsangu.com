"use client";

import { useQuery } from "@tanstack/react-query";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import {
  AnchorHTMLAttributes,
  ClassAttributes,
  useEffect,
  useState,
} from "react";
import { ExtraProps } from "react-markdown";
async function fetchOpenGraphData(url: string) {
  const response = await fetch(url, { cache: "no-cache" });
  const html = await response.text();

  const parser = new DOMParser();
  const doc = parser.parseFromString(html, "text/html");

  const metaTags = {
    title: (doc.querySelector('meta[property="og:title"]') as HTMLMetaElement)
      ?.content,
    description: (
      doc.querySelector('meta[property="og:description"]') as HTMLMetaElement
    )?.content,
    image: (doc.querySelector('meta[property="og:image"]') as HTMLMetaElement)
      ?.content,
    imageWidth: (
      doc.querySelector('meta[property="og:image:width"]') as HTMLMetaElement
    )?.content,
    imageHeight: (
      doc.querySelector('meta[property="og:image:height"]') as HTMLMetaElement
    )?.content,
  };

  return metaTags;
}
export default function Anchor({
  node,
  ...props
}: ClassAttributes<HTMLAnchorElement> &
  AnchorHTMLAttributes<HTMLAnchorElement> &
  ExtraProps) {
  const [currentBlog, set_currentBlog] = useState(false);
  const [currentUrl, set_currentUrl] = useState("");
  const [targetUrl, set_targetUrl] = useState("");
  useEffect(() => {
    if (typeof window === "undefined") return;
    const isBlogSelf =
      props.children?.toString().includes("$og") || props.href?.startsWith("/");
    const currentHost = window.location.origin;
    const url = `${
      props.href?.startsWith("/") ? currentHost : ""
    }${props.href!}`;
    set_targetUrl(url);
    set_currentBlog(!!isBlogSelf);
    set_currentUrl(currentHost);
    return () => {
      set_currentBlog(false);
      set_currentUrl("");
      set_targetUrl("");
    };
  }, [props]);
  if (currentBlog && targetUrl) {
    return (
      <OgAnchor
        {...props}
        targetUrl={targetUrl}
        currentBlog={currentBlog}
        currentUrl={currentUrl}
      />
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
function OgAnchor(
  props: ClassAttributes<HTMLAnchorElement> &
    AnchorHTMLAttributes<HTMLAnchorElement> & {
      targetUrl: string;
      currentBlog: boolean;
      currentUrl: string;
    },
) {
  const { currentBlog, currentUrl, targetUrl } = props;
  const { data: ogMeta } = useQuery({
    queryKey: ["get-og-meta", targetUrl],
    queryFn: () => fetchOpenGraphData(targetUrl),
    enabled: currentBlog && !!targetUrl,
    refetchOnWindowFocus: false,
  });
  if (ogMeta) {
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
}

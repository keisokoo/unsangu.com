"use client";
import SvgLeftArrow from "@/app/icons/LeftArrow";
import SvgRightArrow from "@/app/icons/RightArrow";
import { getPostByID, getRandomPost } from "@/services/posts";
import { TargetProps } from "@/services/types";
import { useQueries } from "@tanstack/react-query";
import clsx from "clsx";
import Link from "next/link";
import ContentBody from "./ContentBody";
import GroupBox from "./GroupBox";
import RandomPosts from "./RandomPosts";
import { notFound } from "next/navigation";

interface Props extends TargetProps {
  postId: number;
  slug?: string;
  target?: string;
}
export default function ContentsDetails({
  postId,
  slug,
  target,
  ...props
}: Props) {
  const [{ data: item, isError }, { data: randomPost }] = useQueries({
    queries: [
      {
        queryKey: ["hydrate-post-by", postId, slug, target],
        queryFn: () => getPostByID(postId, slug, target),
        enabled: !!postId,
      },
      {
        queryKey: ["hydrate-random-post", postId, slug, target],
        queryFn: () =>
          getRandomPost({
            postId: postId,
            categorySlug:
              props.params.target === "categories" ? props.params.slug : null,
          }),
        enabled: !!postId && props.params.target !== "groups",
        staleTime: 1000 * 60 * 60 * 24,
      },
    ],
  });
  const pageUrl = target && slug ? `/posts/${target}/${slug}` : `/posts`;
  const prevHref = item?.prevPost?.id ? `${pageUrl}/${item.prevPost.id}` : null;
  const nextHref = item?.nextPost?.id ? `${pageUrl}/${item.nextPost.id}` : null;
  if(!item?.currentPost) return notFound();
  if(isError) return notFound()
  return (
    <>
      {target === "groups" && <GroupBox {...props} />}
      <article className={"page-default"}>
        {item?.currentPost && <ContentBody currentPost={item.currentPost} />}
        <div className="flex w-full items-center justify-center gap-4 py-20">
          <Link
            href={prevHref ?? ""}
            className={clsx(
              {
                "opacity-0": !prevHref,
                "pointer-events-none": !prevHref,
                "cursor-default": !prevHref,
                "hover:bg-slate-100": prevHref,
              },
              "flex h-[40px] w-[calc(50%-1rem/2)] flex-1 cursor-pointer select-none items-center justify-start gap-4 bg-slate-200 px-4 py-2 pr-8",
            )}
          >
            {prevHref && <SvgLeftArrow className="shrink-0" />}
            <div className="w-full flex-1 overflow-hidden text-ellipsis whitespace-nowrap text-base font-medium">
              {item?.prevPost ? item.prevPost.attributes.title : ""}
            </div>
          </Link>
          <Link
            href={nextHref ?? ""}
            className={clsx(
              {
                "opacity-0": !nextHref,
                "pointer-events-none": !nextHref,
                "cursor-default": !nextHref,
                "hover:bg-slate-100": nextHref,
              },
              "flex h-[40px] w-[calc(50%-1rem/2)] flex-1 cursor-pointer select-none items-center justify-end gap-4 bg-slate-200 px-4 py-2 pl-8 text-right",
            )}
          >
            <div className="w-full flex-1 overflow-hidden text-ellipsis whitespace-nowrap text-base font-medium">
              {item?.nextPost ? item.nextPost.attributes.title : ""}
            </div>
            {nextHref && <SvgRightArrow className="shrink-0" />}
          </Link>
        </div>
        {randomPost && props.params.target !== "groups" && (
          <RandomPosts randomPost={randomPost} {...props} />
        )}
      </article>
    </>
  );
}

import SvgLeftArrow from "@/app/icons/LeftArrow";
import SvgRightArrow from "@/app/icons/RightArrow";
import { getRandomPost } from "@/services/posts";
import { PostType, ServiceDataType } from "@/services/types";
import { dateFormat } from "@/utils/format";
import { getFromServer } from "@/utils/getServerImage";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import ContentBody from "./ContentBody";
interface Props {
  item: {
    prevPost: ServiceDataType<PostType>;
    currentPost: ServiceDataType<PostType>;
    nextPost: ServiceDataType<PostType>;
  };
  categorySlug?: string | null;
}
export default async function PostDetailsPage({ item, categorySlug }: Props) {
  const randomPost = await getRandomPost({
    postId: item.currentPost.id,
    categorySlug,
  });
  const prevHref = item.prevPost
    ? categorySlug
      ? `/category/${categorySlug}/${item.prevPost.id}`
      : `/blog/${item.prevPost.id}`
    : null;
  const nextHref = item.nextPost
    ? categorySlug
      ? `/category/${categorySlug}/${item.nextPost.id}`
      : `/blog/${item.nextPost.id}`
    : null;
  if (!item.currentPost) return <div>not found.</div>;
  return (
    <div className="mx-auto my-0 max-w-[784px] px-4 2xl:px-0">
      {item.currentPost && <ContentBody currentPost={item.currentPost} />}
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
            {item.prevPost ? item.prevPost.attributes.title : ""}
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
            {item.nextPost ? item.nextPost.attributes.title : ""}
          </div>
          {nextHref && <SvgRightArrow className="shrink-0" />}
        </Link>
      </div>
      {randomPost && randomPost.length > 0 && (
        <div className="flex w-full flex-col gap-4 pb-12 pt-4">
          <h2 className="text-2xl font-bold">
            {categorySlug ? `${categorySlug.toUpperCase()} 카테고리의 ` : ""}
            다른 글
          </h2>
          <div className="flex w-full flex-wrap gap-4">
            {randomPost.map((post) => {
              return (
                <Link
                  href={`${
                    categorySlug
                      ? `/category/${categorySlug}/${post.id}`
                      : `/blog/${post.id}`
                  }`}
                  key={post.id}
                  className="flex w-[calc(50%-1rem/2*1)] flex-col gap-1 lg:w-[calc(25%-1rem/4*3)]"
                >
                  {post.thumbnail ? (
                    <Image
                      className="aspect-video w-full object-cover"
                      src={getFromServer(post.thumbnail.url)}
                      width={post.thumbnail.width}
                      height={post.thumbnail.height}
                      alt={post.title}
                    />
                  ) : (
                    <div className="relative bg-slate-600">
                      <Image
                        className="aspect-video h-auto w-full object-cover opacity-0"
                        src={"/rect.png"}
                        alt="dummy"
                        width={1}
                        height={1}
                      />
                      <div className="absolute left-0 top-0 flex h-full w-full select-none items-center justify-center text-xs font-bold text-slate-50 xl:text-sm">
                        NO IMAGE
                      </div>
                    </div>
                  )}
                  <div className="mt-2 line-clamp-1 w-full text-xl font-bold">
                    {post.title}
                  </div>
                  <div className="text-sm">{post.updatedAt}</div>
                  <div className="flex items-center gap-2">
                    <div className="text-xs lg:text-sm">
                      {dateFormat(post.updatedAt)}
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

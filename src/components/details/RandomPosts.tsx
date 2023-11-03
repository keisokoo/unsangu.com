"use client";
import { RandomPostType, TargetProps } from "@/services/types";
import { dateFormat } from "@/utils/format";
import { getFromServer } from "@/utils/getServerImage";
import { checkOnlyNumber } from "@/utils/valid";
import Image from "next/image";
import Link from "next/link";

interface RandomPostsProps extends TargetProps {
  randomPost: RandomPostType[];
}
export default function RandomPosts({ randomPost, params }: RandomPostsProps) {
  const slug = params.slug;
  const pageUrl = checkOnlyNumber(params.target)
    ? `/posts`
    : `/posts/${params.target}/${params.slug}`;
  return (
    <>
      {randomPost && randomPost.length > 0 && (
        <div className="flex w-full flex-col gap-4 pb-12 pt-4">
          <h2 className="text-2xl font-bold">
            {slug ? `${slug.toUpperCase()} 카테고리의 ` : ""}
            다른 글
          </h2>
          <div className="flex w-full flex-wrap gap-4">
            {randomPost.map((post) => {
              return (
                <Link
                  href={`${pageUrl}/${post.id}`}
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
    </>
  );
}

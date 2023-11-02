"use client";
import PostListItem from "@/components/list/PostListItem";
import {
  getCategoryList,
  getProfile,
  getRecentPosts,
  getRecentSeriesList,
} from "@/services/posts";
import { dateFormat } from "@/utils/format";
import { getFromServer } from "@/utils/getServerImage";
import { useQueries } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
export default function Home() {
  const queries = useQueries({
    queries: [
      {
        queryKey: ["hydrate-profile"],
        queryFn: () => getProfile(),
      },
      {
        queryKey: ["hydrate-category-list"],
        queryFn: () => getCategoryList(),
      },
      {
        queryKey: ["hydrate-recent-series-list"],
        queryFn: () => getRecentSeriesList(),
      },
      {
        queryKey: ["hydrate-recent-posts"],
        queryFn: () => getRecentPosts(),
      },
    ],
  });
  const [
    { data: profile },
    { data: categories },
    { data: groups },
    { data: posts },
  ] = queries;

  const profileData = profile?.data.attributes;

  const photo = profileData?.photo?.data?.attributes;
  if (!profileData) return <div>404</div>;
  if (!photo) return <div>404</div>;
  return (
    <main className={"page-default pb-40"}>
      <div className="flex flex-1 flex-col items-center justify-center gap-4 py-16">
        <div className="w-[100px]">
          <Link href={`/works`}>
            <Image
              src={photo.url ? getFromServer(photo.url) : "/og.png"}
              width={photo.width ?? 100}
              height={photo.height ?? 100}
              alt="profile"
              className="aspect-square rounded-full object-cover"
            />
          </Link>
        </div>
        <div className="flex flex-1 flex-col items-center justify-center gap-1">
          <div className="text-2xl font-bold">{profileData.name}</div>
          <p className="text-sm">{profileData.specialty}</p>
          <p className="text-xs text-slate-500">
            <a href={`mailto:${profileData.email}`}>{profileData.email}</a>
          </p>
        </div>
      </div>
      <div className="flex flex-col gap-20">
        <div className="relative flex flex-col gap-2">
          <div className="text-base font-bold">Series</div>
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 transform">
            <Link
              href={`/posts/groups`}
              className="rounded-md bg-slate-400 px-2 py-1 text-sm text-slate-50 transition-[.3s] hover:bg-slate-200 hover:text-slate-600"
            >
              MORE
            </Link>
          </div>
          <div className="flex justify-between gap-4 border-b border-t border-slate-300 py-8">
            {groups?.data &&
              groups.data.map((group) => {
                const {
                  title,
                  description,
                  posts: { data },
                  updatedAt,
                  thumbnail,
                } = group.attributes;
                const count = data.attributes.count;
                return (
                  <div
                    key={group.id}
                    className="flex w-[calc(50%-1rem)] flex-col gap-2"
                  >
                    <Link
                      href={`/posts/groups/${group.id}`}
                      className="group font-bold hover:bg-slate-100"
                    >
                      <div className="flex flex-col gap-2">
                        <Image
                          className="aspect-video h-auto w-full object-cover transition-opacity group-hover:opacity-70"
                          src={getFromServer(
                            thumbnail.data?.attributes.url ?? "",
                          )}
                          width={thumbnail.data?.attributes.width ?? 0}
                          height={thumbnail.data?.attributes.height ?? 0}
                          alt={title}
                        />
                        <h2 className="text-3xl transition-colors group-hover:text-green-500">
                          {title}
                        </h2>
                        {description && (
                          <div className="text-base text-slate-500 transition-colors group-hover:text-green-500">
                            {description}
                          </div>
                        )}
                        <div className="text-sm text-slate-500 transition-colors group-hover:text-green-500">
                          {dateFormat(updatedAt)}
                        </div>
                        <div className="text-sm text-slate-400 transition-colors group-hover:text-green-500">
                          {count}개의 포스트
                        </div>
                      </div>
                    </Link>
                  </div>
                );
              })}
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <div className="text-base font-bold">Categories</div>
          <div className="w-full overflow-hidden border-b border-t border-slate-300 py-4">
            <div className="flex flex-wrap gap-2">
              {categories?.map((category) => {
                const slug = category.slug;
                return (
                  <Link
                    key={category.id}
                    href={`/posts/categories/${slug ? slug : category.id}`}
                    className={"chip whitespace-nowrap text-sm capitalize"}
                  >
                    {category.name} ({category.count})
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
        <div className="relative flex flex-col gap-2">
          <div className="text-base font-bold">Posts</div>{" "}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 transform">
            <Link
              href={`/posts`}
              className="rounded-md bg-slate-400 px-2 py-1 text-sm text-slate-50 transition-[.3s] hover:bg-slate-200 hover:text-slate-600"
            >
              MORE
            </Link>
          </div>
          <div className="flex flex-col gap-0 border-b border-t border-slate-300 pb-8">
            {posts?.data &&
              posts.data.map((post, idx) => {
                return (
                  <PostListItem key={post.id} post={post} pageUrl={`/posts`} />
                );
              })}
          </div>
        </div>
      </div>
    </main>
  );
}

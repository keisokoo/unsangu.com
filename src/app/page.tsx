import PostListItem from "@/components/list/PostListItem";
import {
  getCategoryList,
  getProfile,
  getRecentPosts,
  getRecentSeriesList,
} from "@/services/posts";
import { dateFormat } from "@/utils/format";
import { getFromServer } from "@/utils/getServerImage";
import Image from "next/image";
import Link from "next/link";
export default async function Home() {
  const profile = await getProfile();
  if (!profile) return <div>404</div>;
  const profileData = profile.data.attributes;
  const categories = await getCategoryList();
  const groups = await getRecentSeriesList();
  const posts = await getRecentPosts();
  const photo = profileData.photo?.data?.attributes;
  return (
    <main className="mx-auto my-0 w-full max-w-[784px] bg-slate-50 px-4 pb-40 2xl:px-0">
      <div className="flex flex-1 flex-col items-center justify-center gap-4 py-16">
        <div className="w-[100px]">
          <Image
            src={photo.url ? getFromServer(photo.url) : "/og.png"}
            width={photo.width ?? 100}
            height={photo.height ?? 100}
            alt="profile"
            className="aspect-square rounded-full object-cover"
          />
        </div>
        <div className="flex flex-1 flex-col items-center justify-center gap-1">
          <h1 className="text-2xl font-bold">{profileData.name}</h1>
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
                      className="font-bold"
                    >
                      <div className="flex flex-col gap-2">
                        <Image
                          className="aspect-video h-auto w-full object-cover"
                          src={getFromServer(
                            thumbnail.data?.attributes.url ?? "",
                          )}
                          width={thumbnail.data?.attributes.width ?? 0}
                          height={thumbnail.data?.attributes.height ?? 0}
                          alt={title}
                        />
                        <h1 className="text-3xl">{title}</h1>
                        {description && (
                          <div className="text-base text-slate-500">
                            {description}
                          </div>
                        )}
                        <div className="text-sm text-slate-500">
                          {dateFormat(updatedAt)}
                        </div>
                        <div className="text-sm text-slate-400">
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
          <div className="flex flex-col gap-2 border-b border-t border-slate-300 py-8">
            {posts?.data &&
              posts.data.map((post) => {
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

import { getPostSeriesList } from "@/services/posts";
import { TargetProps } from "@/services/types";
import { dateFormat } from "@/utils/format";
import { getFromServer } from "@/utils/getServerImage";
import Image from "next/image";
import Link from "next/link";

export default async function SeriesPage(props: TargetProps) {
  const response = await getPostSeriesList();
  if (!response) return <div>500 internal error.</div>;
  return (
    <div className="mx-auto my-0 w-full max-w-[784px] bg-slate-50 px-4 2xl:px-0">
      {response.data.map((item) => {
        return (
          <Link
            href={`/posts/groups/${item.id}`}
            key={item.id}
            className="flex flex-col gap-1 rounded-md border border-slate-400 p-2"
          >
            {item.attributes.thumbnail.data && (
              <Image
                src={getFromServer(
                  item.attributes.thumbnail.data.attributes.url,
                )}
                width={item.attributes.thumbnail.data.attributes.width}
                height={item.attributes.thumbnail.data.attributes.height}
                alt={item.attributes.title}
              />
            )}
            <h1 className="text-2xl">{item.attributes.title}</h1>
            {item.attributes.description && (
              <div className="text-sm">{item.attributes.description}</div>
            )}
            <div className="text-sm">
              {dateFormat(item.attributes.updatedAt)}
            </div>
            <div>{item.attributes.posts.data.attributes.count}개의 포스트</div>
          </Link>
        );
      })}
    </div>
  );
}

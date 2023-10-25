import { GroupListResponse } from "@/services/types";
import { dateFormat } from "@/utils/format";
import { getFromServer } from "@/utils/getServerImage";
import Image from "next/image";

interface GroupListHeaderProps {
  groupData: GroupListResponse;
}

export default async function GroupListHeader({
  groupData,
}: GroupListHeaderProps) {
  if (!groupData) return <div>404</div>;
  const { title, description, posts, updatedAt, thumbnail } = groupData;
  return (
    <div className="flex flex-col gap-2">
      <Image
        className="aspect-video h-auto w-full object-cover"
        src={getFromServer(thumbnail.data?.attributes.url ?? "")}
        width={thumbnail.data?.attributes.width ?? 0}
        height={thumbnail.data?.attributes.height ?? 0}
        alt={title}
      />
      <div className="text-3xl">{title}</div>
      {description && (
        <div className="text-base text-slate-500">{description}</div>
      )}
      <div className="text-sm text-slate-500">{dateFormat(updatedAt)}</div>
      <div className="text-sm text-slate-400">
        {posts.data.attributes.count}개의 포스트
      </div>
    </div>
  );
}

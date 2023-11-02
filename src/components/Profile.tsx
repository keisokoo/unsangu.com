"use client";
import { getProfile } from "@/services/posts";
import { getFromServer } from "@/utils/getServerImage";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";

export default function Profile() {
  const { data: profile } = useQuery({
    queryKey: ["hydrate-profile"],
    queryFn: getProfile,
  });
  const profileData = profile?.data.attributes;
  if (!profileData) return <div>404</div>;
  const photo = profileData.photo?.data?.attributes;
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-4 py-16">
      <div className="w-[100px]">
        <Image
          src={photo.url ? getFromServer(photo.url) : "/og.png"}
          width={photo.width ?? 100}
          height={photo.height ?? 100}
          alt="profile"
          className="aspect-square rounded-full object-cover"
          priority
        />
      </div>
      <div className="flex flex-1 flex-col items-center justify-center gap-1">
        <div className="text-2xl font-bold">{profileData.name}</div>
        <p className="text-sm">{profileData.specialty}</p>
        <p className="text-xs text-slate-500">
          <a href={`mailto:${profileData.email}`}>{profileData.email}</a>
        </p>
      </div>
    </div>
  );
}

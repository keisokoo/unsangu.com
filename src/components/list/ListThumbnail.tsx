import { ImageResponseType } from "@/services/types";
import { getFromServer } from "@/utils/getServerImage";
import clsx from "clsx";
import Image from "next/image";

interface Props {
  item: ImageResponseType;
  mobile?: boolean;
}
export default function ListThumbnail({ item, mobile }: Props) {
  const thumbnail = item?.data?.attributes ?? null;
  return (
    <>
      {thumbnail ? (
        <Image
          className={clsx(
            { "w-[84px]": mobile, "w-full": !mobile },
            "aspect-square h-auto object-cover",
          )}
          src={getFromServer(thumbnail.url) + `?${thumbnail.hash}`}
          alt={thumbnail.alternativeText ?? ""}
          width={thumbnail.width}
          height={thumbnail.height}
          priority
        />
      ) : (
        <div className="relative hidden bg-slate-600">
          <Image
            className="aspect-square h-auto w-full object-cover opacity-0"
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
    </>
  );
}

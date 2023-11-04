import Image from "next/image";
import { DetailedHTMLProps, ImgHTMLAttributes } from "react";

export default function Picture(
  props: DetailedHTMLProps<
    ImgHTMLAttributes<HTMLImageElement>,
    HTMLImageElement
  >,
) {
  if (!props.src?.includes("api-unsangu.obj.kr"))
    // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
    return <img {...props} />;
  const substrings = props.alt?.split("{");
  if (substrings) {
    const alt = substrings?.[0].trim().replace(/,$/g, "");
    const width =
      substrings?.[1] && substrings?.[1].match(/\d+/g)?.[0]
        ? substrings[1].match(/\d+/g)![0]
        : 1280;
    const height =
      substrings?.[1] && substrings?.[1].match(/\d+/g)?.[1]
        ? substrings[1].match(/\d+/g)![1]
        : 720;
    return (
      <>
        <span className="text-sm text-gray-400">{alt}</span>
        <Image
          src={props.src!}
          alt={alt ?? "blog image"}
          width={Number(width)}
          height={Number(height)}
          priority={true}
          style={{ margin: "0 auto", width: "auto", height: "auto" }}
        />
      </>
    );
  }
}

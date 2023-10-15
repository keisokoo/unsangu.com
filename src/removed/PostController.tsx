import SvgLeftArrow from "@/app/icons/LeftArrow";
import SvgRightArrow from "@/app/icons/RightArrow";
import { PostType, ServiceDataType } from "@/services/types";
import Link from "next/link";

interface Props {
  prevPost: ServiceDataType<PostType>;
  nextPost: ServiceDataType<PostType>;
  categorySlug?: string | null;
}
export default function PostController({
  prevPost,
  nextPost,
  categorySlug,
}: Props) {
  const prevHref = prevPost
    ? categorySlug
      ? `/category/${categorySlug}/${prevPost.id}`
      : `/blog/${prevPost.id}`
    : null;
  const nextHref = nextPost
    ? categorySlug
      ? `/category/${categorySlug}/${nextPost.id}`
      : `/blog/${nextPost.id}`
    : null;
  return (
    <div id="post-controller">
      <div
        data-left=""
        className="fixed -left-2 top-[50vh] -translate-y-1/2 2xl:left-4"
      >
        <Link href={prevHref ?? ""} data-disabled={prevHref ? false : true}>
          <SvgLeftArrow />
        </Link>
      </div>
      <div
        data-right=""
        className="fixed -right-2 top-[50vh] -translate-y-1/2 2xl:right-4"
      >
        <Link href={nextHref ?? ""} data-disabled={nextHref ? false : true}>
          <SvgRightArrow />
        </Link>
      </div>
    </div>
  );
}

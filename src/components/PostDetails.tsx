import SvgLeftArrow from "@/app/icons/LeftArrow";
import SvgRightArrow from "@/app/icons/RightArrow";
import { PostType, ServiceDataType } from "@/services/types";
import Link from "next/link";
import DetailsEvent from "./DetailsEvent";
import MDXbody from "./MDXbody";
interface Props {
  item: {
    prevPost: ServiceDataType<PostType>;
    currentPost: ServiceDataType<PostType>;
    nextPost: ServiceDataType<PostType>;
  };
  categorySlug?: number | string | null;
}
export default function PostDetailsPage({ item, categorySlug }: Props) {
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
    <div className="mx-auto my-0 max-w-[1280px] px-4 2xl:px-0">
      {item.currentPost && <MDXbody currentPost={item.currentPost} />}
      <div id="page-controller">
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
      <DetailsEvent />
    </div>
  );
}

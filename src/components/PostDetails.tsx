import SvgLeftArrow from "@/app/icons/LeftArrow";
import SvgRightArrow from "@/app/icons/RightArrow";
import { PostType, ServiceDataType } from "@/services/types";
import { dateFormat } from "@/utils/format";
import Link from "next/link";
import DetailsEvent from "./DetailsEvent";
import MDXbody from "./MDXbody";
interface Props {
  item: {
    prevPost: ServiceDataType<PostType>;
    currentPost: ServiceDataType<PostType>;
    nextPost: ServiceDataType<PostType>;
  };
  categoryId?: number | null;
}
export default function PostDetailsPage({ item, categoryId }: Props) {
  const prevHref = item.prevPost
    ? categoryId
      ? `/category/${categoryId}/${item.prevPost.id}`
      : `/blog/${item.prevPost.id}`
    : null;
  const nextHref = item.nextPost
    ? categoryId
      ? `/category/${categoryId}/${item.nextPost.id}`
      : `/blog/${item.nextPost.id}`
    : null;
  return (
    <div className="mx-auto my-0 max-w-[1280px] px-4 2xl:px-0">
      <div>
        {item.currentPost && (
          <MDXbody
            categories={item.currentPost.attributes.categories.data}
            postTime={dateFormat(item.currentPost.attributes.updatedAt)}
            contents={item.currentPost.attributes.contents}
          />
        )}
      </div>
      <div id="page-controller">
        <div className="fixed left-0 top-[50vh] -translate-y-1/2">
          <Link href={prevHref ?? ""} data-disabled={prevHref ? false : true}>
            <SvgLeftArrow />
          </Link>
        </div>
        <div className="fixed right-0 top-[50vh] -translate-y-1/2">
          <Link href={nextHref ?? ""} data-disabled={nextHref ? false : true}>
            <SvgRightArrow />
          </Link>
        </div>
      </div>
      <DetailsEvent />
    </div>
  );
}

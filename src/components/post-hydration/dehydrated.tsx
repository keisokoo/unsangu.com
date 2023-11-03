import {
  getCategoryList,
  getPostByID,
  getPostSeries,
  getPostSeriesList,
  getPosts,
} from "@/services/posts";
import { TargetProps } from "@/services/types";
import { checkOnlyNumber } from "@/utils/valid";
import { dehydrate } from "@tanstack/react-query";
import getQueryClient from "../Registry/getQueryClient";

const dehydrated = async (props: TargetProps) => {
  const queryClient = getQueryClient();
  const targetIsPostId =
    checkOnlyNumber(props.params.target) &&
    !props.params.id &&
    !props.params.slug;
  const checkPostId =
    props.params.id &&
    !isNaN(Number(props.params.id)) &&
    checkOnlyNumber(props.params.id);
  if (targetIsPostId) {
    // 페이지 상세
    const postId = Number(props.params.target);
    await queryClient.prefetchQuery({
      queryKey: ["hydrate-post-by", postId, null, null],
      queryFn: () => getPostByID(postId),
    });
  } else {
    const {
      params,
      searchParams: { page },
    } = props;
    const slug = params.slug;
    const target = params.target;
    const currentPage = page ? Number(page) : 1;
    if (props.params.target === "groups") {
      if (props.params.slug) {
        // 그룹 상세 (그룹 내 포스트 목록)
        await queryClient.prefetchQuery({
          queryKey: ["hydrate-posts-by-series", props.params.slug],
          queryFn: () => getPostSeries(props.params.slug),
        });
      } else {
        // 그룹 목록
        await queryClient.prefetchQuery({
          queryKey: ["hydrate-series-list", currentPage],
          queryFn: () => getPostSeriesList(currentPage),
        });
      }
    } else if (!checkPostId) {
      // 페이지 목록 (그룹 목록 제외)
      await queryClient.prefetchQuery({
        queryKey: ["hydrate-posts-with", currentPage, slug, target],
        queryFn: () => getPosts(currentPage, slug, target),
      });
      // 카테고리 목록
      await queryClient.prefetchQuery({
        queryKey: ["hydrate-category-list"],
        queryFn: getCategoryList,
      });
    }
    if (checkPostId) {
      // 페이지 상세
      const postId = Number(props.params.id);
      await queryClient.prefetchQuery({
        queryKey: ["hydrate-post-by", postId, slug, target],
        queryFn: () => getPostByID(postId, slug, target),
      });
    }
  }
  const dehydratedState = dehydrate(queryClient);
  return dehydratedState;
};
export default dehydrated;

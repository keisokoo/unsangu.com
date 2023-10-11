import SvgRightArrow from "@/app/icons/RightArrow";
import { getCategoryList } from "@/services/posts";
import { CategoryListReturnType } from "@/services/types";
import { checkHasString } from "@/utils/valid";
import clsx from "clsx";
import Link from "next/link";
import CategoryListEvent from "./CategoryListEvent";
import ScriptPortal from "./ScriptPortal";

interface Props {
  params: {
    categorySlug: string;
  };
  searchParams: {
    page: string;
  };
  pageUrl: string;
}
const checkCategory = (category: CategoryListReturnType, slugOrId: string) => {
  return checkHasString(slugOrId)
    ? slugOrId === category.slug
    : slugOrId === String(category.id);
};
export default async function CategorySidebar({ ...props }: Props) {
  const categories = await getCategoryList();
  if (!categories) return <div>loading...</div>;
  const categorySlug = props.params.categorySlug;
  const currentCategory = categorySlug
    ? categories.find((category) => checkCategory(category, categorySlug))
    : null;
  return (
    <div
      id="category-container"
      className="sticky top-[61px] w-full select-none bg-slate-50 lg:relative lg:top-0 lg:w-1/6 lg:translate-x-0"
    >
      <div
        id="category-btn"
        className="flex cursor-pointer items-center justify-between px-2 py-3 text-xs lg:hidden"
      >
        <div>{currentCategory ? currentCategory.name : "All"}</div>
        <div id="category-svg" className="flex items-center justify-center">
          <SvgRightArrow />
        </div>
      </div>
      <div className="flex flex-col gap-4 lg:sticky lg:top-[60px]">
        <div
          id="category-list"
          className="absolute hidden flex-col gap-4 bg-slate-50 lg:relative lg:flex"
        >
          <Link
            href={"/blog"}
            className={clsx(
              {
                "font-bold": !currentCategory,
              },
              "text-sm",
            )}
          >
            All
          </Link>
          {categories?.map((category) => {
            const slug = category.slug;
            return (
              <div key={category.id}>
                <Link
                  href={`/category/${slug ? slug : category.id}`}
                  className={clsx(
                    {
                      "font-bold": checkCategory(category, categorySlug),
                    },
                    "text-sm capitalize",
                  )}
                >
                  {category.name} ({category.count})
                </Link>
              </div>
            );
          })}
        </div>
      </div>
      <ScriptPortal>
        <CategoryListEvent />
      </ScriptPortal>
    </div>
  );
}

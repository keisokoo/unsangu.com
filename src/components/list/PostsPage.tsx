import { TargetProps } from "@/services/types";
import GetCategoryList from "../hydration/GetCategoryList";
import GetPostsBySeries from "../hydration/GetPostsBySeries";
import GetPostsWith from "../hydration/GetPostsWith";

export default async function PostsPage({ ...props }: TargetProps) {
  return (
    <>
      <article className={"page-default"}>
        {props.params.target === "groups" ? (
          <>
            <div className="flex flex-col justify-between gap-0">
              <GetPostsBySeries {...props} />
            </div>
          </>
        ) : (
          <>
            <div className="flex flex-col justify-between gap-0 lg:flex-row lg:gap-4">
              <GetCategoryList {...props} />
              <div className="flex-1">
                <GetPostsWith {...props} />
              </div>
            </div>
          </>
        )}
      </article>
    </>
  );
}

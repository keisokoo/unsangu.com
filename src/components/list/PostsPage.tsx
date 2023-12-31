import { TargetProps } from "@/services/types";
import PostsBySeries from "./PostsBySeries";
import PostsByTarget from "./PostsByTarget";
import Sidebar from "./Sidebar";

export default async function PostsPage({ ...props }: TargetProps) {
  return (
    <>
      <article className={"page-default"}>
        {props.params.target === "groups" ? (
          <>
            <div className="flex flex-col justify-between gap-0">
              <PostsBySeries {...props} />
            </div>
          </>
        ) : (
          <>
            <div className="flex flex-col justify-between gap-0 lg:flex-row lg:gap-4">
              <Sidebar {...props} />
              <div className="flex-1">
                <PostsByTarget {...props} />
              </div>
            </div>
          </>
        )}
      </article>
    </>
  );
}

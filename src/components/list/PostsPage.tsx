import { TargetProps } from "@/services/types";
import PostsByTarget from "./PostsByTarget";
import Sidebar from "./Sidebar";

export default async function PostsPage({ ...props }: TargetProps) {
  return (
    <main className="mx-auto my-0 w-full max-w-[784px] bg-slate-50 px-4 2xl:px-0">
      <div className="flex flex-col justify-between gap-0 lg:flex-row lg:gap-4">
        {props.params.target !== "groups" && <Sidebar {...props} />}
        <div className="flex-1">
          <PostsByTarget {...props} />
        </div>
      </div>
    </main>
  );
}

import SvgHamburger from "@/app/icons/Hamburger";
import clsx from "clsx";
import Link from "next/link";
import RouteProgressBar from "./RouteProgressBar";

const navList = [
  {
    name: "Blog",
    path: "/posts",
  },
  {
    name: "Series",
    path: "/posts/groups",
  },
  {
    name: "Apps",
    path: "/apps",
  },
];
export default function TopNav() {
  return (
    <>
      <RouteProgressBar />
      <div
        id="nav-bar"
        className="sticky top-[3px] z-50 w-full select-none border-b border-slate-200 bg-slate-50 sm:border-none"
      >
        <div
          id="nav-container"
          className={`page-width mx-auto my-0 box-border flex w-full flex-col items-center justify-between px-0 sm:flex-row sm:gap-4`}
        >
          <div className="flex h-[57px] w-full items-center gap-4 px-4 sm:justify-start sm:pr-0 2xl:p-0">
            <SvgHamburger className="sm:hidden" />
            <Link
              nav-item=""
              id="home-link"
              href="/"
              className="font-roboto font-bold"
            >
              UNSANGU.COM
            </Link>
          </div>
          <div
            id="menu"
            className="hidden w-full flex-col justify-start gap-4 bg-slate-50 px-4 sm:box-content sm:flex sm:flex-row sm:items-center sm:justify-end sm:gap-8 sm:pl-0 lg:justify-end lg:gap-4 2xl:p-0"
          >
            {navList.map((nav) => {
              return (
                <Link
                  nav-item=""
                  className={clsx(
                    "py-4 pl-[48px] pr-4 font-roboto text-sm sm:pl-0 sm:pr-0",
                  )}
                  href={nav.path}
                  key={nav.name}
                >
                  {nav.name}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}

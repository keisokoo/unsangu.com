import SvgHamburger from "@/app/icons/Hamburger";
import clsx from "clsx";
import Link from "next/link";
import RouteProgressBar from "./RouteProgressBar";

const navList = [
  {
    name: "Blog",
    path: "/blog",
  },
  {
    name: "About",
    path: "/about",
  },
  {
    name: "Contact",
    path: "/contact",
  },
];
export default function TopNav() {
  return (
    <div
      id="nav-bar"
      className="sticky top-0 z-50 w-full select-none border-b border-slate-200 bg-slate-50 lg:border-none"
    >
      <RouteProgressBar />
      <div
        id="nav-container"
        className="mx-auto my-0 box-border flex w-full max-w-[1280px] flex-col items-center justify-between px-0 lg:flex-row lg:gap-4"
      >
        <div className="flex h-[57px] w-full items-center gap-4 px-4 sm:justify-start lg:w-5/6 lg:pr-0 2xl:p-0">
          <SvgHamburger className="lg:hidden" />
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
          className="hidden w-full flex-col justify-start gap-4 bg-slate-50 px-4 lg:box-content lg:flex lg:w-1/6 lg:flex-row lg:items-center lg:justify-between lg:pl-0 2xl:p-0"
        >
          {navList.map((nav) => {
            return (
              <Link
                nav-item=""
                className={clsx(
                  "py-4 pl-[48px] pr-4 font-roboto text-sm lg:pl-0 lg:pr-0",
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
  );
}

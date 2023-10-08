import SvgHamburger from "@/app/icons/Hamburger";
import Link from "next/link";

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
      className="sticky top-0 z-50 w-full select-none bg-slate-50"
    >
      <div
        id="nav-container"
        className="mx-auto my-0 flex w-full max-w-[1280px] flex-col items-center justify-between px-4 lg:flex-row lg:gap-4 2xl:px-0"
      >
        <div className="flex h-[60px] w-full items-center gap-4 sm:justify-start xl:w-3/4">
          <SvgHamburger className="lg:hidden" />
          <Link nav-item="" href="/" className="font-roboto font-bold">
            UNSANGU.COM
          </Link>
        </div>
        <div
          id="menu"
          className="hidden w-full flex-col justify-start gap-4 bg-slate-50 lg:flex lg:w-1/4 lg:flex-row lg:items-center lg:justify-end"
        >
          {navList.map((nav) => {
            return (
              <Link
                nav-item=""
                className="font-roboto py-4 pl-[48px] pr-4 text-lg lg:pl-0 lg:pr-0"
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

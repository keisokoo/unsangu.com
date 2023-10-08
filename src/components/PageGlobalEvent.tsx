"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
export default function PageGlobalEvent() {
  const pathname = usePathname();
  useEffect(() => {
    document.body.removeAttribute("open-menu");
  }, [pathname]);
  useEffect(() => {
    if (typeof window === "undefined") return;
    function toggleIcon() {
      if (document.body.hasAttribute("open-menu")) {
        document.body.removeAttribute("open-menu");
      } else {
        document.body.setAttribute("open-menu", "");
      }
    }
    window.matchMedia("(min-width: 1024px").addEventListener("change", () => {
      if (window.matchMedia("(min-width: 1024px").matches) {
        document.body.removeAttribute("open-menu");
      }
    });
    const burger = document.querySelector("#burger");
    const navItems = document.querySelectorAll("[nav-item]");
    navItems.forEach((navItem) => {
      navItem.addEventListener("click", (e) => {
        const currentTarget = e.currentTarget as HTMLAnchorElement;
        if (currentTarget.href === window.location.href) {
          e.preventDefault();
          document.body.removeAttribute("open-menu");
          return;
        }
      });
    });
    burger?.addEventListener("click", toggleIcon);
    return () => {
      burger?.removeEventListener("click", toggleIcon);
      document.body.removeAttribute("open-menu");
    };
  }, []);
  return <></>;
}

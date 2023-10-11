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
      if ((navItem as HTMLAnchorElement).href === window.location.href) {
        navItem.classList.add("font-bold");
      }
      navItem.addEventListener("click", (e) => {
        navItems.forEach((curr) => {
          if ((curr as HTMLAnchorElement).id === "home-link") return;
          curr.classList.remove("font-bold");
        });
        navItem.classList.add("font-bold");
        const currentTarget = e.currentTarget as HTMLAnchorElement;
        if (currentTarget.href === window.location.href) {
          e.preventDefault();
          document.body.removeAttribute("open-menu");
          return;
        }
      });
    });
    let overHundreds: null | boolean = null;
    const topBtn = document.querySelector(".top-btn-container");
    function toggleTopButton() {
      if (!topBtn) return;
      let current = false;
      if (document.documentElement.scrollTop > 100) {
        current = true;
      } else {
        current = false;
      }
      if (current === overHundreds) return;
      overHundreds = current;
      topBtn.classList.remove("hide");
      topBtn.classList.remove("show");
      void document.body.offsetWidth;
      if (overHundreds) {
        topBtn.classList.add("show");
      } else {
        topBtn.classList.add("hide");
      }
    }
    function scrollToTop() {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
    topBtn?.addEventListener("click", scrollToTop);
    window.addEventListener("scroll", toggleTopButton);
    toggleTopButton();
    burger?.addEventListener("click", toggleIcon);
    return () => {
      burger?.removeEventListener("click", toggleIcon);
      topBtn?.removeEventListener("click", scrollToTop);
      window.removeEventListener("scroll", toggleTopButton);
      document.body.removeAttribute("open-menu");
    };
  }, []);
  return <></>;
}

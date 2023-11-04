"use client";

import { codeCopy } from "@/utils/helpers";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

export default function GlobalEvent() {
  const pathname = usePathname();
  const router = useRouter();
  const { push } = router;
  useEffect(() => {
    document.body.removeAttribute("open-menu");
    const stickyElements = document.querySelectorAll("[data-sticky-header]");
    const stickyState: boolean[] = Array.from(stickyElements).map(() => false);
    let ticking = false;
    const moveThreshold = 5;
    let moved = false;
    const checkStickyState = () => {
      stickyElements.forEach((element, index) => {
        const rect = element.getBoundingClientRect();
        const stickyTop = window
          .getComputedStyle(element)
          .top.replace("px", "");
        const isSticky =
          rect.top <= Number(stickyTop) &&
          rect.bottom >= (element as HTMLElement).offsetHeight;

        if (isSticky !== stickyState[index]) {
          if (isSticky) {
            stickyElements[index].setAttribute("data-sticky-header", "true");
          } else {
            stickyElements[index].setAttribute("data-sticky-header", "false");
          }
          stickyState[index] = isSticky;
        }
      });
      ticking = false;
    };
    let lastScrollTop = 0;

    const contentBody = document.querySelector("#mdx-container");
    const handleStickyCheck = () => {
      const currentScrollTop =
        window.pageYOffset || document.documentElement.scrollTop;

      if (currentScrollTop > lastScrollTop) {
        if (contentBody && !document.body.classList.contains("hide"))
          document.body.classList.add("hide");
      } else {
        if (contentBody && document.body.classList.contains("hide"))
          document.body.classList.remove("hide");
      }

      lastScrollTop = currentScrollTop;
      if (!ticking) {
        window.requestAnimationFrame(() => {
          checkStickyState();
          ticking = false;
        });
        ticking = true;
      }
    };
    function toggleMenu(e: Event) {
      const target = e.target as HTMLElement;
      moved = false;
      if (!contentBody) return;
      if (!contentBody.contains(target)) return;
      if (target.tagName === "A") return;
      if (target.tagName === "BUTTON") return;
      if (
        target.tagName === "SVG" &&
        target.parentElement?.tagName === "BUTTON"
      )
        return;
      if (target.tagName === "INPUT") return;
      if (target.tagName === "TEXTAREA") return;
      if (target.tagName === "SELECT") return;
      if (target.tagName === "PRE") return;
      if (target.tagName === "CODE") return;
      if (target.tagName === "IMG") return;
      if (target.hasAttribute("data-href")) return;
      contentBody.addEventListener("mouseup", toggleMenuEnd);
      contentBody.addEventListener("mousemove", toggleMenuMoved);
      contentBody.addEventListener("mouseleave", removeToggleMenuEvent);
    }
    function toggleMenuMoved(e: Event) {
      const event = e as MouseEvent;
      if (
        moveThreshold < Math.abs(event.movementX) ||
        moveThreshold < Math.abs(event.movementY)
      )
        moved = true;
    }
    function removeToggleMenuEvent() {
      contentBody?.removeEventListener("mouseleave", removeToggleMenuEvent);
      contentBody?.removeEventListener("mouseup", toggleMenuEnd);
      contentBody?.removeEventListener("mousemove", toggleMenuMoved);
    }
    function toggleMenuEnd(e: Event) {
      if (!moved) document.body.classList.remove("hide");
      removeToggleMenuEvent();
    }

    function ContentNavigationEvent(e: Event) {
      let target = e.currentTarget as HTMLElement;
      if (target.hasAttribute("data-href")) {
        e.stopPropagation();
        e.preventDefault();
        const contentId = target.getAttribute("data-href") as string;
        const content = document.querySelector(contentId);
        if (!content) return;
        const top = content.getBoundingClientRect().top;
        window.scrollTo({ top: top + window.scrollY - 60, behavior: "smooth" });
      }
    }
    function CategoryButtonEvent(e: Event) {
      const target = e.currentTarget as HTMLElement;
      e.stopPropagation();
      e.preventDefault();
      push(target.getAttribute("data-category") as string);
    }
    const dataCategoryElements = document.querySelectorAll("[data-category]");
    dataCategoryElements.forEach((element) => {
      element.addEventListener("click", CategoryButtonEvent);
    });
    const dataHrefElements = document.querySelectorAll("[data-href]");
    dataHrefElements.forEach((element) => {
      element.addEventListener("click", ContentNavigationEvent);
    });
    contentBody?.addEventListener("mousedown", toggleMenu);
    const copyButtons = document.querySelectorAll("[data-clipboard]");
    copyButtons.forEach((copyButton) => {
      copyButton.addEventListener("click", codeCopy);
    });
    window.addEventListener("scroll", handleStickyCheck);

    return () => {
      copyButtons.forEach((copyButton) => {
        copyButton.removeEventListener("click", codeCopy);
      });
      dataHrefElements.forEach((element) => {
        element.removeEventListener("click", ContentNavigationEvent);
      });
      dataCategoryElements.forEach((element) => {
        element.removeEventListener("click", CategoryButtonEvent);
      });
      window.removeEventListener("scroll", handleStickyCheck);
      contentBody?.removeEventListener("mousedown", toggleMenu);
      removeToggleMenuEvent();
      document.body.classList.remove("hide");
    };
  }, [pathname, push]);
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
    burger?.addEventListener("click", toggleIcon);
    toggleTopButton();

    return () => {
      burger?.removeEventListener("click", toggleIcon);
      topBtn?.removeEventListener("click", scrollToTop);
      window.removeEventListener("scroll", toggleTopButton);
      document.body.removeAttribute("open-menu");
      document.body.classList.remove("hide");
    };
  }, [push]);
  return <></>;
}

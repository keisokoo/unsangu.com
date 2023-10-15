"use client";

import { useEffect } from "react";

export default function DetailsEvent() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    function toggleMenu(e: Event) {
      const target = e.target as HTMLElement;
      if (target.tagName === "A") return;
      if (target.tagName === "BUTTON") return;
      if (target.tagName === "INPUT") return;
      if (target.tagName === "TEXTAREA") return;
      if (target.tagName === "SELECT") return;
      if (target.tagName === "PRE") return;
      if (target.tagName === "CODE") return;
      if (target.tagName === "IMG") return;
      if (target.hasAttribute("data-href")) return;
      document.body.classList.toggle("hide");
    }
    const contentBody = document.querySelector("#mdx-container");
    contentBody?.addEventListener("click", toggleMenu);
    return () => {
      contentBody?.removeEventListener("click", toggleMenu);
      document.body.classList.remove("hide");
    };
  }, []);
  return <></>;
}

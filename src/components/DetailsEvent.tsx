"use client";

import { useEffect } from "react";

export default function DetailsEvent() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    function toggleMenu() {
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

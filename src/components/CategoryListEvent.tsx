"use client";

import { useEffect } from "react";

export default function CategoryListEvent() {
  useEffect(() => {
    const categoryContainer = document.querySelector("#category-container");
    function toggleCategoryList() {
      if (!categoryContainer) return;
      if (categoryContainer.hasAttribute("visible")) {
        categoryContainer.removeAttribute("visible");
      } else {
        categoryContainer.setAttribute("visible", "");
      }
    }
    const categoryBtn = document.querySelector("#category-btn");
    window.matchMedia("(min-width: 1024px)").addEventListener("change", (e) => {
      if (e.matches) {
        categoryContainer?.removeAttribute("visible");
      }
    });
    categoryBtn?.addEventListener("click", toggleCategoryList);
    return () => {
      categoryBtn?.removeEventListener("click", toggleCategoryList);
      categoryContainer?.removeAttribute("visible");
    };
  }, []);
  return <></>;
}

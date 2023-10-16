"use client";

import { useEffect } from "react";

export default function SeriesListEvent() {
  useEffect(() => {
    const seriesContainer = document.querySelector("#series-container");
    function toggleSeriesList() {
      if (!seriesContainer) return;
      if (seriesContainer.hasAttribute("visible")) {
        seriesContainer.removeAttribute("visible");
      } else {
        seriesContainer.setAttribute("visible", "");
      }
    }
    const seriesBtn = document.querySelector("#series-btn");
    window.matchMedia("(min-width: 1024px)").addEventListener("change", (e) => {
      if (e.matches) {
        seriesContainer?.removeAttribute("visible");
      }
    });
    seriesBtn?.addEventListener("click", toggleSeriesList);
    return () => {
      seriesBtn?.removeEventListener("click", toggleSeriesList);
      seriesContainer?.removeAttribute("visible");
    };
  }, []);
  return <></>;
}

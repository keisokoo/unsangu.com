"use client";
import { useEffect } from "react";

export default function ContentIntersection() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const id = entry.target.getAttribute("id");
          if (entry.isIntersecting) {
            document
              .querySelector(`div[data-href="#${id}"]`)
              ?.classList.add("active");
          } else {
            document
              .querySelector(`div[data-href="#${id}"]`)
              ?.classList.remove("active");
          }
        });
      },
      {
        threshold: 0,
      },
    );
    const containers = document.querySelectorAll("div[id^='content-']");
    containers.forEach((h1) => {
      observer.observe(h1);
    });
    return () => {
      containers.forEach((h1) => {
        observer.unobserve(h1);
      });
    };
  }, []);
  return <></>;
}

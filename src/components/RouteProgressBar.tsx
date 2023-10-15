"use client";
import clsx from "clsx";
import { usePathname, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
function isIOS(): boolean {
  if (typeof window === "undefined") return false;
  return /iPad|iPhone|iPod/.test(navigator.userAgent);
}
function easeInExpo(x: number): number {
  return x * x * x * x * x;
}
const ios = isIOS();
export default function RouteProgressBar() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const end = () => {
      setLoading(false);
    };
    end();
  }, [pathname, searchParams]);
  const handleStart = useCallback(() => {
    setLoading(true);
  }, []);
  useEffect(() => {
    let ticking = false;
    const start = (e: Event) => {
      const target = (e.target as HTMLAnchorElement).href
        ? (e.target as HTMLAnchorElement)
        : ((e.target as HTMLAnchorElement).closest("a") as HTMLAnchorElement) ??
          null;
      if (!target) return;
      if (target.href === window.location.href) return;
      handleStart();
    };
    const scrollPercentEvent = () => {
      const contentTarget = document.querySelector("#content");
      if (!contentTarget) return;
      let scrollPercent =
        (document.documentElement.scrollTop /
          (contentTarget.clientHeight - window.innerHeight)) *
        100;
      const barDom = document.querySelector(".scroll-percent");
      if (scrollPercent > 100) scrollPercent = 100;
      if (barDom) {
        barDom.setAttribute("style", `width: ${scrollPercent}%`);
      }
      ticking = false;
    };
    const handleScrollPercent = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          scrollPercentEvent();
          ticking = false;
        });
        ticking = true;
      }
    };
    document.addEventListener("click", start);
    document.addEventListener("scroll", handleScrollPercent);
    setLoading(false);
    return () => {
      document.removeEventListener("click", start);
      document.removeEventListener("scroll", handleScrollPercent);
    };
  }, [handleStart]);

  return (
    <>
      <div className={clsx({ active: loading }, "progress-bar")}>
        {!loading && <div className="scroll-percent"></div>}
      </div>
    </>
  );
}

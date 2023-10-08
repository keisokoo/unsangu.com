"use client";
import clsx from "clsx";
import { usePathname, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
function isIOS(): boolean {
  if (typeof window === "undefined") return false;
  return /iPad|iPhone|iPod/.test(navigator.userAgent);
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
    const start = (e: Event) => {
      const target = (e.target as HTMLAnchorElement).href
        ? (e.target as HTMLAnchorElement)
        : ((e.target as HTMLAnchorElement).closest("a") as HTMLAnchorElement) ??
          null;
      if (!target) return;
      if (target.href === window.location.href) return;
      handleStart();
    };
    const scrollPercentEvent = (e: Event) => {
      const target = e.target as Document;
      let scrollPercent =
        (target.documentElement.scrollTop /
          (target.documentElement.scrollHeight -
            target.documentElement.clientHeight)) *
        100;
      const barDom = document.querySelector(".scroll-percent");
      if (ios && scrollPercent > 95) scrollPercent = 100;
      if (barDom) {
        barDom.setAttribute("style", `width: ${scrollPercent}%`);
      }
    };
    document.addEventListener("click", start);
    document.addEventListener("scroll", scrollPercentEvent);
    setLoading(false);
    return () => {
      document.removeEventListener("click", start);
      document.removeEventListener("scroll", scrollPercentEvent);
    };
  }, [handleStart]);

  return (
    <>
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          zIndex: 9999,
        }}
        className={clsx({ active: loading }, "progress-bar")}
      >
        {!loading && <div className="scroll-percent"></div>}
      </div>
    </>
  );
}

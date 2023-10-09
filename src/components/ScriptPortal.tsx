"use client";
import { useEffect, useState } from "react";
import ReactDOM from "react-dom";

interface ScriptPortalProps {
  children: React.ReactNode;
}
export default function ScriptPortal({ children }: ScriptPortalProps) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);
  return (
    <>
      {isClient &&
        ReactDOM.createPortal(children, document.getElementById("script")!)}
    </>
  );
}

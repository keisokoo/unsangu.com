"use client";
import { getIcon } from "@/utils/syntax";
import { ClassAttributes, HTMLAttributes, ReactElement } from "react";
import { BiClipboard } from "react-icons/bi";
import { ExtraProps } from "react-markdown";

export default function Pre(
  props: ClassAttributes<HTMLPreElement> &
    HTMLAttributes<HTMLPreElement> &
    ExtraProps,
) {
  const language = (props?.children as ReactElement)?.props?.className?.replace(
    "language-",
    "",
  );
  const Icon = getIcon(language!);
  if (!language) return <pre {...props} />;
  return (
    <div data-code="" className="flex flex-col rounded-lg bg-[#1e1e1e]">
      <div className="flex items-center justify-between px-4 py-2">
        <div className="flex items-center gap-4 text-gray-400">
          <span className="text-lg">{Icon}</span>
          <span className="text-xs">{language}</span>
        </div>
        <button
          data-clipboard=""
          className="text-lg text-gray-400 active:text-green-500"
        >
          <BiClipboard />
        </button>
      </div>
      {props.children}
    </div>
  );
}

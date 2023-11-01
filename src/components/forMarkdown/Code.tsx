import { getCurrentLanguage } from "@/utils/syntax";
import { ClassAttributes, HTMLAttributes } from "react";
import { ExtraProps } from "react-markdown";
import SyntaxHighlighter from "react-syntax-highlighter/dist/esm/prism";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

export default function Code(
  props: ClassAttributes<HTMLElement> &
    HTMLAttributes<HTMLElement> &
    ExtraProps,
) {
  const currentLanguage = getCurrentLanguage(
    props.className?.replace("language-", ""),
  );

  if (!currentLanguage) return <code {...props} />;
  return (
    <SyntaxHighlighter
      language={currentLanguage}
      showLineNumbers={true}
      style={vscDarkPlus}
      lineNumberStyle={{
        color: "rgba(255, 255, 255, 0.5)",
        fontSize: "0.8rem",
        marginRight: "1rem",
      }}
    >
      {String(props.children)}
    </SyntaxHighlighter>
  );
}

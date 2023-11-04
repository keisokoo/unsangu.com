import { getCurrentLanguage } from "@/utils/syntax";
import { Highlight, themes } from "prism-react-renderer";
import { ClassAttributes, HTMLAttributes } from "react";
import { ExtraProps } from "react-markdown";

export default function CodePrism(
  props: ClassAttributes<HTMLElement> &
    HTMLAttributes<HTMLElement> &
    ExtraProps,
) {
  const currentLanguage = getCurrentLanguage(
    props.className?.replace("language-", ""),
  );

  if (!currentLanguage) return <code {...props} />;
  return (
    <Highlight
      language={currentLanguage}
      theme={themes.vsDark}
      code={String(props.children)}
    >
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <pre style={{ ...style, margin: "0" }}>
          {tokens.map((line, i) => (
            <div key={i} {...getLineProps({ line, className: "text-xs flex" })}>
              <span className="mr-4 flex w-8 select-none items-center justify-end text-xs opacity-30">
                {i + 1}
              </span>
              {line.map((token, key) => (
                <span key={key} {...getTokenProps({ token })} />
              ))}
            </div>
          ))}
        </pre>
      )}
    </Highlight>
  );
}

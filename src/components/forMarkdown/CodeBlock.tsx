import { getCurrentLanguage } from "@/utils/syntax";
import Prism from "prismjs";
import "prismjs/components/prism-bash.min";
import "prismjs/components/prism-javascript.min";
import "prismjs/components/prism-json.min";
import "prismjs/components/prism-jsx.min";
import "prismjs/components/prism-tsx.min";
import "prismjs/components/prism-typescript.min";
// import 'prismjs/plugins/line-numbers/prism-line-numbers.css';
// import 'prismjs/plugins/line-numbers/prism-line-numbers.min';
import { ClassAttributes, HTMLAttributes } from "react";
import { ExtraProps } from "react-markdown";
import "./vsdark.css";

export default function CodeBlock(
  props: ClassAttributes<HTMLElement> &
    HTMLAttributes<HTMLElement> &
    ExtraProps,
) {
  const currentLanguage = getCurrentLanguage(
    props.className?.replace("language-", ""),
  );
  const { children, node, className, ...rest } = props;

  const html = Prism.highlight(
    String(children),
    Prism.languages[currentLanguage] ?? Prism.languages["typescript"],
    currentLanguage,
  );
  if (!Prism.languages[currentLanguage])
    return <code {...rest}>{children}</code>;
  return (
    <pre
      data-syntax=""
      className={`line-numbers language-${currentLanguage}`}
    >
      <code
        className={`language-${currentLanguage}`}
        dangerouslySetInnerHTML={{ __html: html }}
        {...rest}
      ></code>
    </pre>
  );
}

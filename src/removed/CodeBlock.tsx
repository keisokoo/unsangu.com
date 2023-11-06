
import { getCurrentLanguage, replaceClassName } from "@/utils/syntax";
import Prism from "prismjs";
import "prismjs/components/prism-bash.min";
import "prismjs/components/prism-csharp.min";
import "prismjs/components/prism-cshtml.min";
import "prismjs/components/prism-css.min";
import "prismjs/components/prism-dart.min";
import "prismjs/components/prism-diff.min";
import "prismjs/components/prism-docker.min";
import "prismjs/components/prism-git.min";
import "prismjs/components/prism-go.min";
import "prismjs/components/prism-javascript.min";
import "prismjs/components/prism-json.min";
import "prismjs/components/prism-jsx.min";
import "prismjs/components/prism-markdown.min";
import "prismjs/components/prism-markup-templating.min";
import "prismjs/components/prism-markup.min";
import "prismjs/components/prism-powershell.min";
import "prismjs/components/prism-python.min";
import "prismjs/components/prism-rust.min";
import "prismjs/components/prism-scss.min";
import "prismjs/components/prism-sql.min";
import "prismjs/components/prism-tsx.min";
import "prismjs/components/prism-typescript.min";
import "prismjs/components/prism-yaml.min";

import { ClassAttributes, HTMLAttributes } from "react";
import { ExtraProps } from "react-markdown";
import "./vsdark.css";
import 'prismjs/plugins/line-numbers/prism-line-numbers.css';
import 'prismjs/plugins/diff-highlight/prism-diff-highlight.css';
// import "prismjs/themes/prism-okaidia.css";

export default function CodeBlock(
  props: ClassAttributes<HTMLElement> &
    HTMLAttributes<HTMLElement> &
    ExtraProps,
) {
  const parsed = replaceClassName(props.className)
  const currentLanguage = getCurrentLanguage(parsed.language);
  const { children, node, className, ...rest } = props;

  let NEW_LINE_EXP = /\n(?!$)/g;
  let lineNumbersWrapper;

  Prism.hooks.add('before-tokenize', function (env) {
    let match = env.code.match(NEW_LINE_EXP);
    let linesNum = match ? match.length + 1 : 1;
    let lines = new Array(linesNum + 1).join('<span></span>');

    lineNumbersWrapper = `<span aria-hidden="true" class="line-numbers-rows">${lines}</span>`;
  });

  const html = Prism.highlight(
    String(children),
    Prism.languages[currentLanguage] ?? Prism.languages["typescript"],
    currentLanguage,
  ) + lineNumbersWrapper;
  if (!Prism.languages[currentLanguage])
    return <code {...rest}>{children}</code>;
  return (
    <pre
      data-syntax=""
      className={`line-numbers language-${currentLanguage}`}
    >
      <code
        className={`diff-highlight language-${parsed.diff?`diff-`:''}${currentLanguage}`}
        dangerouslySetInnerHTML={{ __html: html }}
        {...rest}
      />
    </pre>
  );
}

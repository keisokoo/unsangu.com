'use client'
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
import "prismjs/components/prism-nginx.min";
import "prismjs/components/prism-jsx.min";
import "prismjs/components/prism-markdown.min";
import "prismjs/components/prism-markup.min";
import "prismjs/components/prism-powershell.min";
import "prismjs/components/prism-python.min";
import "prismjs/components/prism-rust.min";
import "prismjs/components/prism-scss.min";
import "prismjs/components/prism-sql.min";
import "prismjs/components/prism-tsx.min";
import "prismjs/components/prism-typescript.min";
import "prismjs/components/prism-yaml.min";
import "prismjs/components/prism-dart.min";

import 'prismjs/plugins/diff-highlight/prism-diff-highlight.min';
import 'prismjs/plugins/line-numbers/prism-line-numbers.min';
import { ClassAttributes, HTMLAttributes, useEffect, useState } from "react";
import { ExtraProps } from "react-markdown";
import "./vsdark.css";
import 'prismjs/plugins/line-numbers/prism-line-numbers.css';
import 'prismjs/plugins/diff-highlight/prism-diff-highlight.css';

export default function CodeBlock(
  props: ClassAttributes<HTMLElement> &
    HTMLAttributes<HTMLElement> &
    ExtraProps,
) {
  const parsed = replaceClassName(props.className)
  const currentLanguage = getCurrentLanguage(parsed.language);
  const { children, node, className, ...rest } = props;
  const [visible, set_visible] = useState(false);
  useEffect(() => {
    set_visible(true);
    Prism.highlightAll();
  },[])
  
  if (!Prism.languages[currentLanguage])
    return <code {...rest}>{children}</code>;
  return (
    <pre
      data-syntax=""
      className={`line-numbers language-${parsed.diff?`diff-`:''}${currentLanguage}`}
    >
      <code
        className={`diff-highlight ${visible?'opacity-100':'opacity-50'} transition-opacity language-${parsed.diff?`diff-`:''}${currentLanguage}`}
        {...rest}
      >{children}</code>
    </pre>
  );
}

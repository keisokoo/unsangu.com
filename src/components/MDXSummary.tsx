import { remark } from "remark";
import unlink from "remark-unlink";
import strip from "strip-markdown";

const markdown =
  "## This is a header\n\nThis is some text with a [link](#). **Bold text** and *italic*.";

function stripMarkdownText(markdownText: string) {
  markdownText = markdownText.replace(/\[.*\]/g, "[]");
  markdownText = remark()
    .use(unlink)
    .use(strip as any)
    .processSync(markdownText)
    .toString();
  markdownText =
    markdownText.length > 200
      ? markdownText.slice(0, 200) + " ..."
      : markdownText;
  return markdownText;
}

interface Props {
  text: string;
}
export default function MDXSummary({ text }: Props) {
  return <div>{stripMarkdownText(text)}</div>;
}

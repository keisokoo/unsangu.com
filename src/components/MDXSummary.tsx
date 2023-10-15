import { remark } from "remark";
import unlink from "remark-unlink";
import strip from "strip-markdown";

function stripMarkdownText(markdownText: string) {
  markdownText = markdownText.replace(/\[.*\]/g, "[]");
  markdownText = remark()
    .use(unlink)
    .use(strip as any)
    .processSync(markdownText)
    .toString();
  markdownText =
    markdownText.length > 400 ? markdownText.slice(0, 400) : markdownText;
  return markdownText;
}

interface Props {
  text: string;
}
export default function MDXSummary({ text }: Props) {
  return <div className="line-clamp-4">{stripMarkdownText(text)}</div>;
}

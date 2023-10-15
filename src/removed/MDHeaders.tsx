import { log } from "console";
import rehypeSlug from "rehype-slug";
import { remark } from "remark";
import remark2rehype from "remark-rehype";

function extractH1sFromMarkdown(markdownText: string) {
  const h1s: { id: string; value: string }[] = [];
  const ast = remark()
    .use(remark2rehype)
    .use(rehypeSlug)
    .runSync(remark().parse(markdownText));
  function traverse(node: any) {
    if (node.type === "element" && node.tagName === "h1") {
      h1s.push({
        id: node.properties.id,
        value: node.children[0].value,
      });
    }

    if (node.children) {
      node.children.forEach(traverse);
    }
  }
  traverse(ast);
  return h1s;
}
interface Props {
  text: string;
}
export default async function MDHeaders({ text }: Props) {
  const source = extractH1sFromMarkdown(text);
  log(source);
  return (
    <div className="sticky top-[60px]">
      {source.map((h1, i) => {
        return (
          <div key={`${h1}${i}`} data-href={`#${h1.id}`}>
            {h1.value}
          </div>
        );
      })}
    </div>
  );
}

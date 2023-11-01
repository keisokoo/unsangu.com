import Anchor from "@/components/forMarkdown/Anchor";
import Code from "@/components/forMarkdown/Code";
import Photo from "@/components/forMarkdown/Photo";
import Pre from "@/components/forMarkdown/Pre";
import Markdown from "react-markdown";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
interface Props {
  text: string;
}

export default async function MDXContent({ text }: Props) {
  return (
    <>
      <Markdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[
          [
            rehypeSlug,
            {
              properties: {
                className: ["anchor"],
              },
            },
          ],
        ]}
        className={`prose prose-sm prose-slate w-full 
max-w-full md:prose-base lg:prose-lg`}
        components={{
          img: Photo,
          pre: Pre,
          code: Code,
          /* @ts-expect-error Server Component */
          a: Anchor,
        }}
      >
        {text}
      </Markdown>
    </>
  );
}

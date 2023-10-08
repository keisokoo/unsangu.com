import { MDXRemote } from "next-mdx-remote/rsc";
import Image from "next/image";
import { ReactElement, isValidElement } from "react";
import SyntaxHighlighter from "react-syntax-highlighter/dist/esm/prism";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import ContentIntersection from "./ContentIntersection";

interface Props {
  text: string;
}

export default async function MDContent({ text }: Props) {
  return (
    <>
      <MDXRemote
        source={text}
        options={{
          mdxOptions: {
            remarkPlugins: [remarkGfm],
            rehypePlugins: [
              [
                rehypeSlug,
                {
                  properties: {
                    className: ["anchor"],
                  },
                },
              ],
            ],
          },
        }}
        components={{
          pre: (props) => {
            if (
              isValidElement(props?.children) &&
              (props?.children as ReactElement)?.props?.className?.includes(
                "language-",
              )
            )
              return <pre className="no-style">{props.children}</pre>;
            else return <pre>{props.children}</pre>;
          },
          code: (props) => {
            if (!props.className?.includes("language-"))
              return <code>{props.children}</code>;
            return (
              <SyntaxHighlighter
                language={props.className?.replace("language-", "")}
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
          },
          img: ({ ...props }) => {
            if (!props.src?.includes("api-unsangu.obj.kr"))
              // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
              return <img {...props} />;
            const substrings = props.alt?.split("{");
            const alt = substrings?.[0].trim();
            const width =
              substrings?.[1] && substrings?.[1].match(/\d+/g)?.[0]
                ? substrings[1].match(/\d+/g)![0]
                : 1280;
            const height =
              substrings?.[1] && substrings?.[1].match(/\d+/g)?.[1]
                ? substrings[1].match(/\d+/g)![1]
                : 720;
            return (
              <Image
                src={props.src!}
                alt={alt ?? "blog image"}
                width={Number(width)}
                height={Number(height)}
                priority={true}
              />
            );
          },
        }}
      />
      <ContentIntersection />
    </>
  );
}

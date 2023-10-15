import { getOgMeta } from "@/services/posts";
import clsx from "clsx";
import { MDXRemote } from "next-mdx-remote/rsc";
import { headers } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import { ReactElement } from "react";
import {
  BiClipboard,
  BiCode,
  BiCodeCurly,
  BiData,
  BiLogoCPlusPlus,
  BiLogoCss3,
  BiLogoDocker,
  BiLogoGoLang,
  BiLogoHtml5,
  BiLogoJava,
  BiLogoJavascript,
  BiLogoPostgresql,
  BiLogoPython,
  BiLogoTypescript,
  BiSolidTerminal,
} from "react-icons/bi";
import { SiC, SiCsharp, SiYaml } from "react-icons/si";
import SyntaxHighlighter from "react-syntax-highlighter/dist/esm/prism";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
const codeIcons: {
  [key: string]: JSX.Element;
} = {
  javascript: <BiLogoJavascript />,
  typescript: <BiLogoTypescript />,
  html: <BiLogoHtml5 />,
  css: <BiLogoCss3 />,
  scss: <BiLogoCss3 />,
  pgsql: <BiLogoPostgresql />,
  python: <BiLogoPython />,
  java: <BiLogoJava />,
  c: <SiC />,
  cpp: <BiLogoCPlusPlus />,
  csharp: <SiCsharp />,
  shell: <BiSolidTerminal />,
  powershell: <BiSolidTerminal />,
  default: <BiCode />,
  dockerfile: <BiLogoDocker />,
  yaml: <SiYaml />,
  json: <BiCodeCurly />,
  sql: <BiData />,
  go: <BiLogoGoLang />,
};
function getIcon(language?: string) {
  return language && codeIcons[language]
    ? codeIcons[language]
    : codeIcons.default;
}
export const getHost = async () => {
  const host = headers().get("host");
  const protocol = host?.includes("localhost") ? "http" : "https";
  const currentUrl = `${protocol}://${host}`;
  return currentUrl;
};
interface Props {
  text: string;
  currentUrl?: string;
}

export default async function MDXContent({ text, currentUrl }: Props) {
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
            const language = (
              props?.children as ReactElement
            )?.props?.className?.replace("language-", "");
            const Icon = getIcon(language!);
            return (
              <div
                data-code=""
                className="flex flex-col rounded-lg bg-[#1e1e1e]"
              >
                <div className="flex items-center justify-between px-4 py-2">
                  <div className="flex items-center gap-4 text-gray-400">
                    <span className="text-lg">{Icon}</span>
                    <span className="text-xs">{language}</span>
                  </div>
                  <button
                    data-clipboard=""
                    className="text-lg text-gray-400 active:text-green-500"
                  >
                    <BiClipboard />
                  </button>
                </div>
                {props.children}
              </div>
            );
          },
          code: (props) => {
            return (
              <SyntaxHighlighter
                language={
                  props.className?.replace("language-", "") ?? "typescript"
                }
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
          a: async (props) => {
            const currentBlog =
              props.children?.toString().includes("$og") ??
              props.href?.startsWith("/");
            if (currentBlog) {
              const currentUrl = await getHost();
              const ogMeta = await getOgMeta(
                `${
                  props.href?.startsWith("/") ? currentUrl : ""
                }${props.href!}`,
              );
              const Anchor = props.href?.startsWith("/") ? Link : "a";
              return (
                <Anchor
                  href={props.href ?? ""}
                  className={clsx("!no-underline", props.className)}
                >
                  <span className="flex max-w-[300px] flex-col gap-2 border border-solid border-slate-400 p-2">
                    {ogMeta?.image && (
                      <Image
                        src={ogMeta?.image}
                        alt={ogMeta?.title ?? ""}
                        width={Number(ogMeta.imageWidth) ?? 1}
                        height={Number(ogMeta.imageHeight) ?? 1}
                        className="!my-0 !h-auto !w-full !object-cover"
                      />
                    )}
                    {ogMeta?.title && (
                      <span className="text-sm text-gray-600">
                        {ogMeta?.title}
                      </span>
                    )}
                    {ogMeta?.description && (
                      <span className="text-sm text-gray-400">
                        {ogMeta?.description}
                      </span>
                    )}
                  </span>
                  <span className="text-green-500 underline">{`${props.children
                    ?.toString()
                    .replace("$og", "")} [${
                    props.href?.startsWith("/") ? currentUrl : ""
                  }${props.href}]`}</span>
                </Anchor>
              );
            }
            return <a {...props} className="text-green-500" />;
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
    </>
  );
}

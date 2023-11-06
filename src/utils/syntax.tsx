import {
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

export const codeIcons: {
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
  docker: <BiLogoDocker />,
  yaml: <SiYaml />,
  json: <BiCodeCurly />,
  sql: <BiData />,
  go: <BiLogoGoLang />,
};
export function getIcon(language?: string) {
  language = getCurrentLanguage(language);
  return language && codeIcons[language]
    ? codeIcons[language]
    : codeIcons.default;
}
export function replaceClassName(language?: string) {
const diff = language?.startsWith("language-diff-")
const currentName = diff ? language?.replace("language-diff-", "") : language?.replace("language-", "");
 return {
    language: currentName,
    diff
 }
}
export function getCurrentLanguage(language?: string) {
  let currentLanguage = language ?? "";
  if (/\.(ts|tsx)$/.test(currentLanguage)) return "typescript";
  if (/\.(js|jsx)$/.test(currentLanguage)) return "javascript";
  if (/\.(py)$/.test(currentLanguage)) return "python";
  if (/\.(cs)$/.test(currentLanguage)) return "csharp";
  if (/\.(go)$/.test(currentLanguage)) return "go";
  if (/\.(sh)$/.test(currentLanguage)) return "shell";
  if (/\.(ps1)$/.test(currentLanguage)) return "powershell";
  if (/\.(json)$/.test(currentLanguage)) return "json";
  if (/\.(yml|yaml)$/.test(currentLanguage)) return "yaml";
  if (/\.(sql)$/.test(currentLanguage)) return "sql";
  if (/\.(html)$/.test(currentLanguage)) return "html";
  if (/\.(css)$/.test(currentLanguage)) return "css";
  if (/\.(scss)$/.test(currentLanguage)) return "css";
  if (/\.(cpp|c)$/.test(currentLanguage)) return "cpp";
  if (/\.(java)$/.test(currentLanguage)) return "java";
  if (/dockerfile$/.test(currentLanguage)) return "docker";
  if (/\.(md)$/.test(currentLanguage)) return "markdown";
  if (/\.(rb)$/.test(currentLanguage)) return "ruby";
  if (/\.(rs)$/.test(currentLanguage)) return "rust";
  if (/\.(swift)$/.test(currentLanguage)) return "swift";
  if (/\.(kt)$/.test(currentLanguage)) return "kotlin";
  if (/\.(vue)$/.test(currentLanguage)) return "typescript";
  if (/\.(php)$/.test(currentLanguage)) return "php";
  if (/\.(dart)$/.test(currentLanguage)) return "dart";
  if (/\.(diff)$/.test(currentLanguage)) return "diff";
  if (currentLanguage.startsWith(".") && currentLanguage.endsWith("rc"))
    return "json";
  return currentLanguage;
}

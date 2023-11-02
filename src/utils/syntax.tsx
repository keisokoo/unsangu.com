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
  dockerfile: <BiLogoDocker />,
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
export function getCurrentLanguage(language?: string) {
  let currentLanguage = language ?? "";
  if (/\.(ts|tsx)$/.test(currentLanguage)) currentLanguage = "typescript";
  if (/\.(js|jsx)$/.test(currentLanguage)) currentLanguage = "javascript";
  if (/\.(py)$/.test(currentLanguage)) currentLanguage = "python";
  if (/\.(cs)$/.test(currentLanguage)) currentLanguage = "csharp";
  if (/\.(go)$/.test(currentLanguage)) currentLanguage = "go";
  if (/\.(sh)$/.test(currentLanguage)) currentLanguage = "shell";
  if (/\.(ps1)$/.test(currentLanguage)) currentLanguage = "powershell";
  if (/\.(json)$/.test(currentLanguage)) currentLanguage = "json";
  if (/\.(yml|yaml)$/.test(currentLanguage)) currentLanguage = "yaml";
  if (/\.(sql)$/.test(currentLanguage)) currentLanguage = "sql";
  if (/\.(html)$/.test(currentLanguage)) currentLanguage = "html";
  if (/\.(css)$/.test(currentLanguage)) currentLanguage = "css";
  if (/\.(scss)$/.test(currentLanguage)) currentLanguage = "css";
  if (/\.(cpp|c)$/.test(currentLanguage)) currentLanguage = "cpp";
  if (/\.(java)$/.test(currentLanguage)) currentLanguage = "java";
  if (/\.(dockerfile)$/.test(currentLanguage)) currentLanguage = "dockerfile";
  if (/\.(md)$/.test(currentLanguage)) currentLanguage = "markdown";
  if (/\.(rb)$/.test(currentLanguage)) currentLanguage = "ruby";
  if (/\.(rs)$/.test(currentLanguage)) currentLanguage = "rust";
  if (/\.(swift)$/.test(currentLanguage)) currentLanguage = "swift";
  if (currentLanguage.startsWith(".") && currentLanguage.endsWith("rc"))
    currentLanguage = "json";
  return currentLanguage;
}

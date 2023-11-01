export const baseWidth = 768;
export const pageDefault = `mx-auto my-0 w-full bg-slate-50 px-4 2xl:px-0`;
export const pageWidth = (appendClass?: string) => `${pageDefault} ${appendClass ?? ""} max-w-[${baseWidth}px]`
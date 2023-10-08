import Link from "next/link";

interface LinkButtonProps {
  data?: {
    href: string;
    title: string;
    icon?: string | JSX.Element;
  };
  noData: string;
}
export default function LinkButton({ data, noData }: LinkButtonProps) {
  if (data)
    return (
      <Link href={data.href} aria-description={data.title}>
        {data.icon ?? data.title}
      </Link>
    );
  return <div>{noData}</div>;
}

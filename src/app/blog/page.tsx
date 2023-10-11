import ListPage from "@/components/ListPage";

interface Props {
  params: {
    categorySlug: string;
  };
  searchParams: {
    page: string;
  };
}
export default async function BlogPage({ ...props }: Props) {
  return <ListPage pageUrl="/blog" {...props} />;
}

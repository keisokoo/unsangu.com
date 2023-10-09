import ListPage from "@/components/ListPage";

interface Props {
  params: {
    categoryId: string;
  };
  searchParams: {
    page: string;
  };
}
export default async function BlogPage({ ...props }: Props) {
  return <ListPage pageUrl="/blog" {...props} />;
}

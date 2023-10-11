import ListPage from "@/components/ListPage";

interface Props {
  params: {
    categorySlug: string;
  };
  searchParams: {
    page: string;
  };
}
export default async function CategoryListPage({ ...props }: Props) {
  return (
    <ListPage pageUrl={`/category/${props.params.categorySlug}`} {...props} />
  );
}

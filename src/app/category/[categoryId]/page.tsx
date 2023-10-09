import ListPage from "@/components/ListPage";

interface Props {
  params: {
    categoryId: string;
  };
  searchParams: {
    page: string;
  };
}
export default async function CategoryListPage({ ...props }: Props) {
  return (
    <ListPage pageUrl={`/category/${props.params.categoryId}`} {...props} />
  );
}

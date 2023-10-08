import { getCategoryList } from "@/services/posts";
import Link from "next/link";

export default async function CategoryListPage() {
  const categories = await getCategoryList();
  if (!categories) return <div>loading...</div>;
  return (
    <div className="mx-auto my-0 max-w-[1280px] px-4 2xl:px-0">
      {categories.map((category) => {
        return (
          <div key={category.id}>
            <Link href={`/category/${category.id}`}>
              {category.name} ({category.count})
            </Link>
          </div>
        );
      })}
    </div>
  );
}

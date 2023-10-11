interface Props {
  params: {
    categorySlug: string;
  };
  searchParams: {
    page: string;
  };
  pageUrl: string;
}
export default async function Home({ ...props }: Props) {
  return (
    <main className="mx-auto my-0 w-full max-w-[1280px] bg-slate-50 px-4 2xl:px-0">
      main
    </main>
  );
}

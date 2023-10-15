import PostList from "@/components/PostList";

interface SeriesByIdProps {
  params: {
    seriesSlug: string;
  };
  searchParams: {
    page: string;
  };
}

export default async function SeriesById(props: SeriesByIdProps) {
  return <PostList pageUrl={`/series/${props.params.seriesSlug}`} {...props} />;
}

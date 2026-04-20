import NewsClient from "./NewsClient";

export default function News({
  news = [],
  categories,
}: {
  news?: any[];
  categories?: string[];
}) {
  const resolvedCategories =
    categories && categories.length > 0
      ? categories
      : Array.from(new Set(news.map((item) => item.category).filter(Boolean)));

  return <NewsClient categories={resolvedCategories} newsItems={news} />;
}

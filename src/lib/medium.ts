import { MEDIUM_USERNAME } from "./portfolio-config";

export interface Article {
  title: string;
  link: string;
  pubDate: string;
  description: string;
  categories: string[];
}

export async function fetchMediumArticles(): Promise<Article[]> {
  if (!MEDIUM_USERNAME) return [];
  const url = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(
    `https://medium.com/feed/@${MEDIUM_USERNAME}`,
  )}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`rss2json ${res.status}`);
  const data: { items?: Article[] } = await res.json();
  return data.items ?? [];
}

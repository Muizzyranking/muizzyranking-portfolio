export type HashnodePost = {
  id: string;
  title: string;
  brief: string;
  slug: string;
  publishedAt: string;
  readTimeInMinutes: number;
  coverImage: { url: string } | null;
  tags: { name: string; slug: string }[];
};

const HASHNODE_ENDPOINT = "https://gql.hashnode.com";
const PUBLICATION_HOST = "muizzyranking.hashnode.dev";

const POSTS_QUERY = `
  query GetPosts($host: String!, $first: Int!) {
    publication(host: $host) {
      id
      posts(first: $first) {
        edges {
          node {
            id
            title
            brief
            slug
            publishedAt
            readTimeInMinutes
            coverImage {
              url
            }
            tags {
              name
              slug
            }
          }
        }
      }
    }
  }
`;

export async function getPosts(count = 3): Promise<HashnodePost[]> {
  try {
    const res = await fetch(HASHNODE_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: POSTS_QUERY,
        variables: { host: PUBLICATION_HOST, first: count },
      }),
      next: { revalidate: 3600 },
    });

    const json = await res.json();
    const edges = json?.data?.publication?.posts?.edges ?? [];
    return edges.map((e: { node: HashnodePost }) => e.node);
  } catch (err) {
    console.error("Hashnode fetch failed:", err);
    return [];
  }
}

export async function getPost(slug: string): Promise<HashnodePost | null> {
  const query = `
    query GetPost($host: String!, $slug: String!) {
      publication(host: $host) {
        id
        post(slug: $slug) {
          id
          title
          brief
          slug
          publishedAt
          readTimeInMinutes
          coverImage { url }
          tags { name slug }
        }
      }
    }
  `;

  try {
    const res = await fetch(HASHNODE_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query,
        variables: { host: PUBLICATION_HOST, slug },
      }),
      next: { revalidate: 3600 },
    });

    const json = await res.json();
    return json?.data?.publication?.post ?? null;
  } catch {
    return null;
  }
}

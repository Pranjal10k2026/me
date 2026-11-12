import { mkdir, writeFile } from "node:fs/promises";

const token = process.env.INSTAGRAM_ACCESS_TOKEN;

if (!token) {
  console.error("Instagram access token is missing.");
  process.exit(1);
}

const url = new URL("https://graph.instagram.com/me/media");
url.searchParams.set(
  "fields",
  "id,caption,media_type,media_url,thumbnail_url,permalink"
);
url.searchParams.set("limit", "12");

const response = await fetch(url, {
  headers: { Authorization: `Bearer ${token}` },
});

if (!response.ok) {
  console.error(`Instagram request failed with HTTP ${response.status}.`);
  process.exit(1);
}

const result = await response.json();

if (!Array.isArray(result.data)) {
  console.error("Instagram returned an unexpected response.");
  process.exit(1);
}

const posts = result.data.map((post) => {
  if (
    typeof post.id !== "string" ||
    typeof post.permalink !== "string" ||
    typeof post.media_type !== "string"
  ) {
    throw new Error("Instagram returned an invalid post.");
  }

  return {
    id: post.id,
    caption: typeof post.caption === "string" ? post.caption : "",
    permalink: post.permalink,
    imageUrl:
      post.media_type === "VIDEO"
        ? post.thumbnail_url ?? null
        : post.media_url ?? null,
  };
});

await mkdir("public", { recursive: true });
await writeFile(
  "public/instagram-feed.json",
  JSON.stringify(posts, null, 2)
);

console.log(`Prepared ${posts.length} Instagram posts.`);
import { useEffect, useState } from "react";
import { ExternalLink, Instagram } from "lucide-react";
import { MainLayout } from "@/components/layout/MainLayout";

interface InstagramPost {
  id: string;
  caption: string;
  permalink: string;
  imageUrl: string | null;
}

const Pranpaan = () => {
  const [posts, setPosts] = useState<InstagramPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    async function loadPosts() {
      try {
        const response = await fetch(
          `${import.meta.env.BASE_URL}instagram-feed.json`,
          { signal: controller.signal }
        );

        if (!response.ok) {
          throw new Error(`Feed request failed: ${response.status}`);
        }

        const data = await response.json();

        if (!Array.isArray(data)) {
          throw new Error("Invalid Instagram feed.");
        }

        setPosts(data);
      } catch (err) {
        if (!controller.signal.aborted) {
          console.error("Could not load Instagram posts:", err);
          setError(true);
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    void loadPosts();

    return () => controller.abort();
  }, []);

  return (
    <MainLayout>
      <div className="space-y-6">
        <header>
          <h1 className="text-2xl font-normal mb-2 flex items-center gap-3">
            <Instagram className="w-6 h-6" aria-hidden="true" />
            Pranpaan
          </h1>
          <p className="text-muted-foreground text-sm">
            Fiber art and creative projects from Instagram.
          </p>
        </header>

        <section>
          <h2 className="text-lg font-normal mb-3">Recent posts</h2>

          {loading && <p>Loading posts...</p>}

          {error && (
            <p className="text-sm text-muted-foreground" role="alert">
              The Instagram gallery is unavailable right now. You can visit
              the profile using the link below.
            </p>
          )}

          {!loading && !error && posts.length === 0 && (
            <p className="text-sm text-muted-foreground">
              No posts are available yet.
            </p>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {posts.map((post) => (
              <a
                key={post.id}
                href={post.permalink}
                target="_blank"
                rel="noopener noreferrer"
                className="block border border-border rounded overflow-hidden bg-card hover:opacity-90"
              >
                {post.imageUrl ? (
                  <img
                    src={post.imageUrl}
                    alt={post.caption || "Instagram post"}
                    className="w-full aspect-square object-cover"
                    loading="lazy"
                  />
                ) : (
                  <div className="aspect-square bg-muted flex items-center justify-center">
                    View post on Instagram
                  </div>
                )}
                {post.caption && (
                  <p className="p-3 text-sm line-clamp-3">
                    {post.caption}
                  </p>
                )}
              </a>
            ))}
          </div>
        </section>

        <a
          href="https://www.instagram.com/pranpaan/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-sm text-accent hover:underline"
        >
          View @pranpaan on Instagram
          <ExternalLink className="w-4 h-4" aria-hidden="true" />
        </a>
      </div>
    </MainLayout>
  );
};

export default Pranpaan;
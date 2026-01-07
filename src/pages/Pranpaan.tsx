import { MainLayout } from "@/components/layout/MainLayout";
import { Instagram, ExternalLink } from "lucide-react";

const Pranpaan = () => {
  return (
    <MainLayout>
      <div className="space-y-6">
        <header>
          <h1 className="text-2xl font-normal mb-2 flex items-center gap-3">
            Pranpaan
            <a
              href="https://www.instagram.com/pranpaan/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-sm font-normal text-accent hover:underline"
            >
              <Instagram className="w-4 h-4" />
              @pranpaan
              <ExternalLink className="w-3 h-3" />
            </a>
          </h1>
          <p className="text-muted-foreground text-sm">
            Fiber art and creative projects from Instagram.
          </p>
        </header>

        {/* Instagram Embed Info */}
        <section className="p-6 border border-border rounded bg-card">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400 rounded-lg">
              <Instagram className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="font-normal mb-2">Instagram Integration Required</h3>
              <p className="text-sm text-muted-foreground mb-4">
                To display your Instagram posts dynamically, we need to set up the
                Instagram Basic Display API. This requires:
              </p>
              <ol className="text-sm text-muted-foreground space-y-2 list-decimal list-inside">
                <li>Enable Lovable Cloud for backend functionality</li>
                <li>Create a Meta Developer App and get API credentials</li>
                <li>Add Instagram Basic Display API access tokens</li>
              </ol>
            </div>
          </div>
        </section>

        {/* Static Preview */}
        <section>
          <h2 className="text-sm font-normal text-muted-foreground mb-3">
            Preview Layout (Static)
          </h2>
          <div className="grid grid-cols-3 gap-3">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="aspect-square bg-muted rounded flex items-center justify-center"
              >
                <span className="text-xs text-muted-foreground">Post {i}</span>
              </div>
            ))}
          </div>
          <p className="text-xs text-muted-foreground mt-3 text-center">
            Instagram posts with captions will appear here once connected.
          </p>
        </section>

        {/* Direct Link */}
        <section className="text-center">
          <a
            href="https://www.instagram.com/pranpaan/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded text-sm font-normal hover:opacity-90 transition-opacity"
          >
            View on Instagram
            <ExternalLink className="w-4 h-4" />
          </a>
        </section>
      </div>
    </MainLayout>
  );
};

export default Pranpaan;

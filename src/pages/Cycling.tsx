import { useEffect, useRef, useState } from "react";
import { Bike, ExternalLink } from "lucide-react";
import { MainLayout } from "@/components/layout/MainLayout";

const rides = [
  {
    id: "20730949104",
    token: "DNtAmJa8wnIheOUvKGweTXvjLc89Va96ZLUzfeNc0zs",
    label: "100 mile ride #8",
  },

  {
    id: "15893183284",
    token: "8ytujRM72kdSunTGy6PrsrCMkMHFf-cHfQP6ZdXvV3s",
    label: "P-town ride",
  },
  // Add more rides here.
];

const Cycling = () => {
  const embedRef = useRef<HTMLDivElement>(null);
  const [embedError, setEmbedError] = useState(false);

  useEffect(() => {
    const container = embedRef.current;
    if (!container) return;

rides.forEach((ride) => {
  const placeholder = document.createElement("div");
  placeholder.className = "strava-embed-placeholder";
  placeholder.dataset.embedType = "activity";
  placeholder.dataset.embedId = ride.id;
  placeholder.dataset.style = "standard";
  placeholder.dataset.fromEmbed = "false";
  placeholder.dataset.token = ride.token;

  container.appendChild(placeholder);
});
    const script = document.createElement("script");
    script.src = "https://strava-embeds.com/embed.js";
    script.async = true;
    script.onerror = () => setEmbedError(true);

    container.appendChild(script);

    return () => {
      script.onerror = null;
      container.replaceChildren();
    };
  }, []);

  return (
    <MainLayout>
      <div className="space-y-6">
        <header>
          <h1 className="text-2xl font-normal mb-2 flex items-center gap-3">
            <Bike className="w-6 h-6" />
            Cycling
          </h1>
          <p className="text-muted-foreground text-sm">
            Road biking adventures and selected Strava activities.
          </p>
        </header>

        <section>
          <h2 className="text-lg font-normal mb-3">Memorable Rides</h2>

          <div
  ref={embedRef}
  className="grid grid-cols-1 lg:grid-cols-2 gap-12 retro-card p-4"
/>

          {embedError && (
            <p className="text-sm text-muted-foreground mt-3">
              The Strava embed could not load. You can open the ride directly below.
            </p>
          )}

          <div className="flex flex-col gap-2 mt-4">
  {rides.map((ride) => (
    <a
      key={ride.id}
      href={`https://www.strava.com/activities/${ride.id}`}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 text-sm text-accent hover:underline"
    >
      {ride.label} on Strava
      <ExternalLink className="w-4 h-4" />
    </a>
  ))}
</div>
        </section>
      </div>
    </MainLayout>
  );
};

export default Cycling;
import { MainLayout } from "@/components/layout/MainLayout";
import { Bike, MapPin, Clock, TrendingUp, Upload } from "lucide-react";

// Static placeholder data
const activities = [
  {
    id: 1,
    name: "Morning Ride - Blue Hills",
    date: "Jan 6, 2025",
    distance: "32.5 km",
    time: "1h 24m",
    elevation: "245 m",
  },
  {
    id: 2,
    name: "Weekend Long Ride",
    date: "Jan 4, 2025",
    distance: "58.2 km",
    time: "2h 35m",
    elevation: "412 m",
  },
  {
    id: 3,
    name: "Recovery Spin",
    date: "Jan 2, 2025",
    distance: "18.7 km",
    time: "48m",
    elevation: "85 m",
  },
];

const Cycling = () => {
  return (
    <MainLayout>
      <div className="space-y-6">
        <header>
          <h1 className="text-2xl font-normal mb-2 flex items-center gap-3">
            <Bike className="w-6 h-6" />
            Cycling
          </h1>
          <p className="text-muted-foreground text-sm">
            Road biking adventures and Strava activities.
          </p>
        </header>

        {/* Strava Integration Info */}
        <section className="p-6 border border-border rounded bg-card">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-[#FC4C02] rounded-lg">
              <svg
                className="w-6 h-6 text-white"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M15.387 17.944l-2.089-4.116h-3.065L15.387 24l5.15-10.172h-3.066m-7.008-5.599l2.836 5.598h4.172L10.463 0l-7 13.828h4.169" />
              </svg>
            </div>
            <div className="flex-1">
              <h3 className="font-normal mb-2">Strava Integration</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Connect your Strava account to automatically sync your cycling activities.
              </p>
              <ol className="text-sm text-muted-foreground space-y-2 list-decimal list-inside">
                <li>Enable Lovable Cloud for backend functionality</li>
                <li>Add your Strava API credentials as secrets</li>
                <li>Authorize access to your Strava activities</li>
              </ol>
            </div>
          </div>
        </section>

        {/* Photo Upload Section */}
        <section>
          <h2 className="text-sm font-normal text-muted-foreground mb-3 flex items-center gap-2">
            <Upload className="w-4 h-4" />
            Cycling Photos
          </h2>
          <div className="border-2 border-dashed border-border rounded-lg p-8 text-center bg-muted/30">
            <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-3" />
            <p className="text-sm text-muted-foreground mb-2">
              Photo upload will be available with Lovable Cloud
            </p>
            <p className="text-xs text-muted-foreground">
              Enable Cloud to upload and manage your cycling photos
            </p>
          </div>
        </section>

        {/* Activities List */}
        <section>
          <h2 className="text-sm font-normal text-muted-foreground mb-3 flex items-center gap-2">
            <TrendingUp className="w-4 h-4" />
            Recent Activities (Preview)
          </h2>
          <div className="space-y-3">
            {activities.map((activity) => (
              <div
                key={activity.id}
                className="p-4 border border-border rounded bg-card hover:bg-muted/30 transition-colors"
              >
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-normal text-foreground">{activity.name}</h3>
                  <span className="text-xs text-muted-foreground">{activity.date}</span>
                </div>
                <div className="flex items-center gap-6 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5" />
                    {activity.distance}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5" />
                    {activity.time}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <TrendingUp className="w-3.5 h-3.5" />
                    {activity.elevation}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Note about Strava */}
        <div className="p-4 bg-muted/50 rounded border border-border">
          <p className="text-xs text-muted-foreground">
            <strong>Note:</strong> Enable Lovable Cloud and add your Strava API key to
            sync real activities.
          </p>
        </div>
      </div>
    </MainLayout>
  );
};

export default Cycling;

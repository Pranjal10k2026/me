import { MainLayout } from "@/components/layout/MainLayout";
import { CalendarDays } from "lucide-react";

// Static data - will be replaced with database when Cloud is enabled
const ideas = [
  {
    id: 1,
    title: "US Census Bureau TIGER/Line + American Community Survey (ACS)",
    description:
      "Engineering a spatial analytics pipeline in Python using GeoPandas and PySAL/Mapclassify to merge US Census TIGER/Line tract geometries with American Community Survey (ACS) socioeconomic data.",
    status: "In Progress",
    timeline: "Sept 2026",
    tags: ["GeoPandas", "Healthcare", "Python"],
  },
  {
    id: 2,
    title: "Autonomous Research Copilot",
    description:
      "A system where a user inputs a complex research question, a Supervisor Agent breaks it down, a Retriever Agent queries a private document database via LlamaIndex, a Writer Agent synthesizes the findings, and the entire pipeline is exposed via a production REST API deployed to the cloud.",
    status: "Planning",
    timeline: "Oct 2026",
    tags: ["Computer Vision", "Edge Computing", "React"],
  },
  {
    id: 3,
    title: "Fuel-it Right Apple watch dashboard",
    description:
      "Deploying my project Fuel-it-Right(Check Resume) on apple watch interface to connect with real time sensors for performance. Link: https://kcal-pulse-watch.lovable.app",
    status: "Ideation",
    timeline: "Dec 2025",
    tags: ["XGB Model", "Strava API", "Visualization"],
  },
   {
    id: 4,
    title: "Floral Yosemite Hats",
    description:
      "Got a monochromatic hat from Yosemite trip last month, want to decorate it little floral patters using crochet and embroidery",
    status: "Ideation",
    timeline: "Nov 2026",
    tags: ["Crochet", "Embroidery", "Creativity"],
  },
];

const Ideas = () => {
  return (
    <MainLayout>
      <div className="space-y-6">
        <header>
          <h1 className="text-2xl font-normal mb-2">Current Ideas I am working on</h1>
          {/* <p className="text-muted-foreground text-sm">
            Project ideas and their timelines.
          </p> */}
        </header>

        {/* Timeline */}
        <div className="mt-8">
          {ideas.map((idea) => (
            <div key={idea.id} className="timeline-item">
              <div className="retro-card p-5">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="font-normal text-foreground">{idea.title}</h3>
                  <StatusBadge status={idea.status} />
                </div>

                <p className="text-sm text-muted-foreground mb-4">{idea.description}</p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <CalendarDays className="w-3.5 h-3.5" />
                    <span>{idea.timeline}</span>
                  </div>

                  <div className="flex gap-1.5">
                    {idea.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 text-xs bg-secondary text-secondary-foreground rounded"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </MainLayout>
  );
};

function StatusBadge({ status }: { status: string }) {
  const colors: Record<string, string> = {
    "In Progress": "bg-accent/10 text-accent border-accent/20",
    "Planning": "bg-yellow-500/10 text-yellow-600 border-yellow-500/20",
    "Ideation": "bg-muted text-muted-foreground border-border",
    Completed: "bg-green-500/10 text-green-600 border-green-500/20",
  };

  return (
    <span className={`px-2 py-0.5 text-xs rounded border ${colors[status] || colors["Ideation"]}`}>
      {status}
    </span>
  );
}

export default Ideas;

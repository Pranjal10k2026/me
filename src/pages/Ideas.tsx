import { MainLayout } from "@/components/layout/MainLayout";
import { CalendarDays, ExternalLink } from "lucide-react";

// Static data - will be replaced with database when Cloud is enabled
const ideas = [
  {
    id: 1,
    title: "Graph-Based Medical Imputation System",
    description: "Building a comprehensive graph neural network for medical data imputation with focus on protein interaction networks.",
    status: "In Progress",
    timeline: "Q1 2025",
    tags: ["GNN", "Healthcare", "Python"],
  },
  {
    id: 2,
    title: "Real-time Attention Tracking Dashboard",
    description: "Expanding the POC from internship to a full-fledged attention monitoring system with edge deployment capabilities.",
    status: "Planning",
    timeline: "Q2 2025",
    tags: ["Computer Vision", "Edge Computing", "React"],
  },
  {
    id: 3,
    title: "Cycling Performance Analytics",
    description: "Personal project to analyze and visualize cycling data from Strava with predictive modeling for performance optimization.",
    status: "Ideation",
    timeline: "Q3 2025",
    tags: ["Data Analytics", "Strava API", "Visualization"],
  },
];

const Ideas = () => {
  return (
    <MainLayout>
      <div className="space-y-6">
        <header>
          <h1 className="text-2xl font-semibold mb-2">Current Ideas</h1>
          <p className="text-muted-foreground text-sm">
            Project ideas and their timelines. View-only mode.
          </p>
        </header>

        {/* Timeline */}
        <div className="mt-8">
          {ideas.map((idea, index) => (
            <div key={idea.id} className="timeline-item">
              <div className="bg-card border border-border rounded p-5">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="font-medium text-foreground">{idea.title}</h3>
                  <StatusBadge status={idea.status} />
                </div>
                
                <p className="text-sm text-muted-foreground mb-4">
                  {idea.description}
                </p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <CalendarDays className="w-3.5 h-3.5" />
                    <span className="font-mono">{idea.timeline}</span>
                  </div>
                  
                  <div className="flex gap-1.5">
                    {idea.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 text-xs font-mono bg-secondary text-secondary-foreground rounded"
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

        {/* Note about editing */}
        <div className="mt-8 p-4 bg-muted/50 rounded border border-border">
          <p className="text-xs text-muted-foreground">
            <strong>Note:</strong> Enable Lovable Cloud to make this section editable with a database backend.
          </p>
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
    "Completed": "bg-green-500/10 text-green-600 border-green-500/20",
  };

  return (
    <span className={`px-2 py-0.5 text-xs font-mono rounded border ${colors[status] || colors["Ideation"]}`}>
      {status}
    </span>
  );
}

export default Ideas;

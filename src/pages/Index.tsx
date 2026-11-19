import { MainLayout } from "@/components/layout/MainLayout";
import profilePhoto from "@/assets/new-profile.jpeg";

const Index = () => {
  return (
    <MainLayout>
      <div className="space-y-8">
        {/* Header Section */}
        <section className="flex items-start gap-8">
          <img
            src={profilePhoto}
            alt="Pranjal Kalekar"
            className="w-32 h-32 rounded object-cover border border-border"
          />
          <div className="flex-1">
            <h1 className="text-3xl font-normal mb-2">Pranjal Kalekar</h1>
            <p className="text-muted-foreground text-sm mb-4">
              pranjalkalekar10@gmail.com
            </p>
            <p className="text-foreground/90 leading-relaxed max-w-2xl">
              Applied Data Scientist passionate about making impact on day-to-day life, climate and safe cities with a proven history of spearheading cross-functional data initiatives from initial prototype to
              global scale. 
            </p>
          </div>
        </section>

        {/* Resume Section */}
        <section>
          <h2 className="text-lg font-normal mb-4 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-accent" />
            Resume
          </h2>
          <div className="retro-card overflow-hidden">
            <div className="bg-secondary px-4 py-2 border-b border-border flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-destructive/60" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
              <div className="w-3 h-3 rounded-full bg-green-500/60" />
              <span className="ml-2 text-xs text-muted-foreground">
                Pranjal_Kalekar_Applied_AI_Engineer.pdf
              </span>
            </div>
            <iframe
                src={`${import.meta.env.BASE_URL}resume.pdf`}
                className="pdf-viewer"
                title="Resume PDF"
              />
          </div>
        </section>

        {/* Quick Links */}
        <section>
          <h2 className="text-lg font-normal mb-4 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-accent" />
            Technical Skills
          </h2>
          <div className="grid grid-cols-2 gap-4">
            <SkillCard
              title="Languages"
              items={["Python", "MySQL", "MS SQL", "R", "C++", "HTML/CSS"]}
            />
            <SkillCard
              title="Databases"
              items={["MongoDB", "Neo4j", "PostgreSQL", "Apache Spark"]}
            />
            <SkillCard
              title="Tools"
              items={["Git", "GCP", "Azure", "Tableau", "PowerBI"]}
            />
            <SkillCard
              title="ML Libraries"
              items={["PyTorch", "TensorFlow", "XGBoost", "Scikit-learn"]}
            />
          </div>
        </section>
      </div>
    </MainLayout>
  );
};

function SkillCard({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="retro-card p-4">
      <h3 className="text-sm font-normal mb-2">{title}</h3>
      <div className="flex flex-wrap gap-1.5">
        {items.map((item) => (
          <span
            key={item}
            className="px-2 py-0.5 text-xs bg-secondary text-secondary-foreground rounded"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

export default Index;

import { MainLayout } from "@/components/layout/MainLayout";
import { Archive, Quote as QuoteIcon } from "lucide-react";

// Static data - will be replaced with database when Cloud is enabled
const currentQuote = {
  text: "The best way to predict the future is to create it.",
  author: "Peter Drucker",
  date: "January 7, 2025",
};

const archivedQuotes = [
  {
    id: 1,
    text: "In the middle of difficulty lies opportunity.",
    author: "Albert Einstein",
    date: "January 6, 2025",
  },
  {
    id: 2,
    text: "The only way to do great work is to love what you do.",
    author: "Steve Jobs",
    date: "January 5, 2025",
  },
  {
    id: 3,
    text: "Data is the new oil. It's valuable, but if unrefined it cannot really be used.",
    author: "Clive Humby",
    date: "January 4, 2025",
  },
];

const Quotes = () => {
  return (
    <MainLayout>
      <div className="space-y-8">
        <header>
          <h1 className="text-2xl font-semibold mb-2">Daily Quotes</h1>
          <p className="text-muted-foreground text-sm">
            Daily inspiration. View-only mode.
          </p>
        </header>

        {/* Current Quote */}
        <section>
          <h2 className="text-sm font-medium text-muted-foreground mb-3 flex items-center gap-2">
            <QuoteIcon className="w-4 h-4" />
            Today's Quote
          </h2>
          <div className="quote-card">
            <blockquote className="text-xl font-medium text-foreground mb-3 italic">
              "{currentQuote.text}"
            </blockquote>
            <footer className="flex items-center justify-between">
              <cite className="text-sm text-muted-foreground not-italic font-mono">
                — {currentQuote.author}
              </cite>
              <span className="text-xs text-muted-foreground font-mono">
                {currentQuote.date}
              </span>
            </footer>
          </div>
        </section>

        {/* Archive */}
        <section>
          <h2 className="text-sm font-medium text-muted-foreground mb-3 flex items-center gap-2">
            <Archive className="w-4 h-4" />
            Archived Quotes
          </h2>
          <div className="space-y-3">
            {archivedQuotes.map((quote) => (
              <div
                key={quote.id}
                className="p-4 border border-border rounded bg-card hover:bg-muted/30 transition-colors"
              >
                <p className="text-foreground/90 mb-2 italic">
                  "{quote.text}"
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground font-mono">
                    — {quote.author}
                  </span>
                  <span className="text-xs text-muted-foreground font-mono">
                    {quote.date}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Note about editing */}
        <div className="p-4 bg-muted/50 rounded border border-border">
          <p className="text-xs text-muted-foreground">
            <strong>Note:</strong> Enable Lovable Cloud to add daily quotes and archive them to a database.
          </p>
        </div>
      </div>
    </MainLayout>
  );
};

export default Quotes;

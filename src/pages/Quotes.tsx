import { useEffect, useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Archive, Quote as QuoteIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

// Edit this to change the current quote
const initialQuote = {
  text: "The best way to predict the future is to create it.",
  author: "Peter Drucker",
  date: "January 7, 2025",
};

// Edit this array to pre-populate archived quotes
const initialArchivedQuotes = [
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

const ARCHIVE_STORAGE_KEY = "pk_archived_quotes_v1";

const Quotes = () => {
  const [currentQuote] = useState(initialQuote);

  const [archivedQuotes, setArchivedQuotes] = useState(() => {
    try {
      const raw = window.localStorage.getItem(ARCHIVE_STORAGE_KEY);
      if (!raw) return initialArchivedQuotes;
      const parsed = JSON.parse(raw);
      return Array.isArray(parsed) ? parsed : initialArchivedQuotes;
    } catch {
      return initialArchivedQuotes;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(
        ARCHIVE_STORAGE_KEY,
        JSON.stringify(archivedQuotes)
      );
    } catch {
      // ignore write errors (e.g. privacy mode)
    }
  }, [archivedQuotes]);

  const handleArchive = () => {
    const newArchivedQuote = {
      id: Date.now(),
      text: currentQuote.text,
      author: currentQuote.author,
      date: currentQuote.date,
    };
    setArchivedQuotes((prev) => [newArchivedQuote, ...prev]);
  };

  return (
    <MainLayout>
      <div className="space-y-8">
        <header>
          <h1 className="text-2xl font-normal mb-2">Daily Quotes</h1>
          <p className="text-muted-foreground text-sm">
            Daily inspiration. View-only mode.
          </p>
        </header>

        {/* Current Quote */}
        <section>
          <h2 className="text-sm font-normal text-muted-foreground mb-3 flex items-center gap-2">
            <QuoteIcon className="w-4 h-4" />
            Today's Quote
          </h2>
          <div className="quote-card">
            <blockquote className="text-xl font-normal text-foreground mb-3 italic">
              "{currentQuote.text}"
            </blockquote>
            <footer className="flex items-center justify-between">
              <cite className="text-sm text-muted-foreground not-italic">
                — {currentQuote.author}
              </cite>
              <div className="flex items-center gap-3">
                <span className="text-xs text-muted-foreground">
                  {currentQuote.date}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleArchive}
                  className="flex items-center gap-1"
                >
                  <Archive className="w-3 h-3" />
                  Archive
                </Button>
              </div>
            </footer>
          </div>
        </section>

        {/* Archive */}
        <section>
          <h2 className="text-sm font-normal text-muted-foreground mb-3 flex items-center gap-2">
            <Archive className="w-4 h-4" />
            Archived Quotes
          </h2>
          <div className="border border-border rounded bg-card">
            <ScrollArea className="h-[300px] p-4">
              <div className="space-y-3">
                {archivedQuotes.map((quote) => (
                  <div
                    key={quote.id}
                    className="p-4 border border-border rounded bg-background hover:bg-muted/30 transition-colors"
                  >
                    <p className="text-foreground/90 mb-2 italic">
                      "{quote.text}"
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">
                        — {quote.author}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {quote.date}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>
        </section>

        {/* Note about editing */}
        <div className="p-4 bg-muted/50 rounded border border-border">
          <p className="text-xs text-muted-foreground">
            <strong>Note:</strong> To change the daily quote, edit the{" "}
            <code className="bg-muted px-1 rounded">initialQuote</code> object in{" "}
            <code className="bg-muted px-1 rounded">src/pages/Quotes.tsx</code>
          </p>
        </div>
      </div>
    </MainLayout>
  );
};

export default Quotes;

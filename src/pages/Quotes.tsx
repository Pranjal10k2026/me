import { useEffect, useState } from "react";
import { Archive } from "lucide-react";
import { MainLayout } from "@/components/layout/MainLayout";
import { quotes } from "@/data/quotes";

const easternDateFormatter = new Intl.DateTimeFormat("en-US", {
  timeZone: "America/New_York",
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
});

const displayDateFormatter = new Intl.DateTimeFormat("en-US", {
  timeZone: "UTC",
  year: "numeric",
  month: "long",
  day: "numeric",
});

function getEasternDate(): string {
  const parts = easternDateFormatter.formatToParts(new Date());

  const year = parts.find((part) => part.type === "year")?.value;
  const month = parts.find((part) => part.type === "month")?.value;
  const day = parts.find((part) => part.type === "day")?.value;

  if (!year || !month || !day) {
    throw new Error("Unable to determine the current Eastern date.");
  }

  return `${year}-${month}-${day}`;
}

function formatDate(date: string): string {
  return displayDateFormatter.format(new Date(`${date}T12:00:00Z`));
}

const Quotes = () => {
  const [today, setToday] = useState(getEasternDate);

  useEffect(() => {
    const updateDate = () => setToday(getEasternDate());

    const interval = window.setInterval(updateDate, 30_000);
    window.addEventListener("focus", updateDate);
    document.addEventListener("visibilitychange", updateDate);

    return () => {
      window.clearInterval(interval);
      window.removeEventListener("focus", updateDate);
      document.removeEventListener("visibilitychange", updateDate);
    };
  }, []);

  const todayQuote = quotes.find((quote) => quote.date === today);

  const archivedQuotes = quotes
    .filter((quote) => quote.date < today)
    .sort((a, b) => b.date.localeCompare(a.date));

  return (
    <MainLayout mainClassName="bg-[#FEED9F]">
      <div
  className="space-y-8 text-[#34283C] [&_h1]:font-inherit [&_h2]:font-inherit"
  style={{ fontFamily: '"Courier New", Courier, monospace' }}
>
        <header>
          <p className="text-sm font-bold uppercase tracking-widest text-[#9A3D36]">
            A little daily inspiration
          </p>
          <h1 className="mt-2 text-3xl font-bold md:text-4xl">
            Daily Quotes
          </h1>
          <p className="mt-2 text-sm text-[#594752]">
            {formatDate(today)} · Eastern Time
          </p>
        </header>

        <section>
          <h2 className="mb-3 flex items-center gap-2 text-sm font-bold uppercase tracking-wide">
            Today&apos;s Quote
          </h2>

          <div className="rounded-lg border-2 border-[#34283C] bg-[#FFF9E6] p-5 shadow-[6px_6px_0_#D77A61] md:p-7">
            {todayQuote ? (
              <>
                <blockquote className="text-xl font-medium leading-relaxed md:text-2xl">
                  “{todayQuote.text}”
                </blockquote>
                <p className="mt-4 text-sm font-bold text-[#79423B]">
                  — {todayQuote.author}
                </p>
              </>
            ) : (
              <p className="text-xl font-medium">
                Pranjal&apos;s a bit busy today.
              </p>
            )}
          </div>
        </section>

        <section>
          <h2 className="mb-3 flex items-center gap-2 text-sm font-bold uppercase tracking-wide">
            <Archive className="h-4 w-4" aria-hidden="true" />
            Quote Archive
          </h2>

          {archivedQuotes.length === 0 ? (
            <div className="rounded-lg border-2 border-[#34283C] bg-[#CBE5D5] p-5 shadow-[6px_6px_0_#638A83]">
              <p className="text-sm">
                No past quotes yet. Check back another day!
              </p>
            </div>
          ) : (
            <div className="grid gap-5 md:grid-cols-2">
              {archivedQuotes.map((quote) => (
                <article
                  key={quote.date}
                  className="rounded-lg border-2 border-[#34283C] bg-[#CBE5D5] p-5 shadow-[5px_5px_0_#638A83]"
                >
                  <p className="text-xs font-bold uppercase tracking-wide text-[#514453]">
                    {formatDate(quote.date)}
                  </p>
                  <blockquote className="mt-3 text-base leading-relaxed">
                    “{quote.text}”
                  </blockquote>
                  <p className="mt-3 text-sm font-bold text-[#79423B]">
                    — {quote.author}
                  </p>
                </article>
              ))}
            </div>
          )}
        </section>
      </div>
    </MainLayout>
  );
};

export default Quotes;
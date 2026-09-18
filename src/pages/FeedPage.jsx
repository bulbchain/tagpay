import { useState } from "react";

import { TAG_FEED } from "../lib/mock-data";

const FILTERS = ["All", "ETH", "USDG", "Stocks"];

function FeedPage() {
  const [filter, setFilter] = useState("All");

  const rows = TAG_FEED.filter((t) =>
    filter === "All"
      ? true
      : filter === "Stocks"
        ? !["ETH", "USDG"].includes(t.asset)
        : t.asset === filter
  );

  return (
    <div className="mx-auto w-full max-w-3xl">
      <h1 className="text-4xl uppercase sm:text-5xl">
        Tagged so far
      </h1>

      <p className="mt-2 text-sm text-muted-foreground">
        Every line is a public, on-chain event.
      </p>

      <div className="mt-6 flex flex-wrap gap-2">
        {FILTERS.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={
              f === filter
                ? "rounded-full border-2 border-primary bg-primary px-4 py-1.5 font-mono text-[11px] font-bold text-primary-foreground"
                : "rounded-full border-2 border-border px-4 py-1.5 font-mono text-[11px] font-bold text-foreground/70 hover:border-primary"
            }
          >
            {f.toUpperCase()}
          </button>
        ))}
      </div>

      <div className="mt-6 space-y-3">
        {rows.map((t, i) => (
          <div
            key={i}
            className="flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-card p-4 hard"
          >
            <div className="font-mono text-sm">
              <span className="text-primary">
                @{t.from}
              </span>

              <span className="text-muted-foreground">
                {" "}tagged{" "}
              </span>

              <span className="text-primary">
                @{t.to}
              </span>
            </div>

            <div className="flex items-center gap-4">
              <span className="font-display text-lg font-extrabold">
                {t.amount} {t.asset}
              </span>

              <span className="font-mono text-[11px] text-muted-foreground">
                {t.age}
              </span>
            </div>

            {t.note && (
              <div className="w-full font-mono text-xs text-muted-foreground">
                “{t.note}”
              </div>
            )}
          </div>
        ))}

        {rows.length === 0 && (
          <p className="rounded-2xl border-2 border-dashed border-border p-8 text-center text-sm text-muted-foreground">
            Nothing here yet. Be the first to tag someone.
          </p>
        )}
      </div>
    </div>
  );
}

export default FeedPage;
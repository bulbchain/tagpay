
import { Link } from "react-router-dom";
import { TAG_COINS } from "../lib/mock-data";

function CoinsPage() {
  return (
    <div className="mx-auto w-full max-w-4xl">
      <h1 className="text-4xl uppercase sm:text-5xl">
        Coins
      </h1>

      <p className="mt-2 text-sm text-muted-foreground">
        Every coin launched on TagPay, and the @ earning 100%
        of its creator fees.
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {TAG_COINS.map((coin) => (
          <div
            key={coin.ticker}
            className="rounded-3xl bg-card p-5 hard"
          >
            <div className="flex items-center justify-between">
              <span className="font-display text-2xl font-extrabold text-primary">
                ${coin.ticker}
              </span>

              <span className="font-mono text-[11px] text-muted-foreground">
                {coin.age}
              </span>
            </div>

            <div className="mt-2 font-mono text-sm">
              100% creator fees →{" "}
              <span className="text-primary">
                @{coin.handle}
              </span>
            </div>

            <div className="mt-4 flex items-center justify-between font-mono text-xs text-muted-foreground">
              <span>{coin.pair} pair</span>

              <span>MCAP {coin.mcap}</span>
            </div>
          </div>
        ))}
      </div>

      <Link
        to="/app/tag"
        className="mt-8 inline-block rounded-full bg-primary px-6 py-3 font-display font-extrabold text-primary-foreground"
      >
        TAG A NEW COIN →
      </Link>
    </div>
  );
}

export default CoinsPage;


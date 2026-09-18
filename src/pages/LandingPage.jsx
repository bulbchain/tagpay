import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

import {
  TAGPAY_CA,
  TAG_COINS,
  TAG_FEED,
} from "../lib/mock-data";

const HANDLES = [
  "@elonmusk",
  "@cobie",
  "@ishowspeed",
  "@yourbarber",
  "@mom",
];

function LandingPage() {
  const [i, setI] = useState(0);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const t = setInterval(() => {
      setI((v) => (v + 1) % HANDLES.length);
    }, 2200);

    return () => clearInterval(t);
  }, []);

  const handleCopy = () => {
    navigator.clipboard?.writeText(TAGPAY_CA);
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-30 border-b-2 border-border bg-background/85 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center gap-6 px-4 py-4">
          <Link
            to="/"
            className="font-display text-2xl font-extrabold tracking-tighter text-primary"
          >
            TAG<span className="text-foreground">PAY</span>
          </Link>

          <nav className="hidden gap-5 font-mono text-xs font-bold tracking-wider text-foreground/70 md:flex">
            <Link
              to="/app/tag"
              className="hover:text-primary"
            >
              TAG FOR @
            </Link>

            <Link
              to="/app/coins"
              className="hover:text-primary"
            >
              COINS
            </Link>

            <Link
              to="/app/send"
              className="hover:text-primary"
            >
              SEND
            </Link>

            <Link
              to="/app/claim"
              className="hover:text-primary"
            >
              CLAIM
            </Link>

            <Link
              to="/app/feed"
              className="hover:text-primary"
            >
              FEED
            </Link>
          </nav>

          <Link
            to="/app/tag"
            className="ml-auto rounded-full bg-primary px-5 py-2 font-mono text-xs font-bold text-primary-foreground transition-transform hover:-translate-y-0.5"
          >
            OPEN APP
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="grid-canvas border-b-2 border-border">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-20 md:grid-cols-2 md:items-center">
          <div>
            <h1 className="text-5xl uppercase leading-[0.92] sm:text-7xl">
              Pay a coin
              <br />
              for
              <br />

              <span className="mt-3 inline-block rounded-2xl bg-primary px-4 py-1 text-primary-foreground">
                {HANDLES[i]}
              </span>
            </h1>

            <p className="mt-6 max-w-md text-base text-foreground/80">
              Name any @ on X, GitHub, Twitch or YouTube. TagPay
              launches the coin and 100% of its creator fees land
              in their wallet from the first trade. No wallet
              needed. No TagPay account. Want to skip the coin?
              Just send them ETH, USDG or a stock.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/app/tag"
                className="rounded-2xl bg-primary px-7 py-4 font-display text-lg font-extrabold text-primary-foreground transition-transform hover:-translate-y-0.5"
              >
                TAG FOR @ →
              </Link>

              <Link
                to="/app/send"
                className="rounded-2xl border-2 border-primary px-7 py-4 font-display text-lg font-extrabold text-primary hover:bg-primary hover:text-primary-foreground"
              >
                JUST SEND SOMEONE
              </Link>

              <Link
                to="/app/claim"
                className="rounded-2xl border-2 border-border px-7 py-4 font-display text-lg font-extrabold text-foreground/80 hover:border-primary hover:text-primary"
              >
                GOT A TAG? CLAIM IT
              </Link>
            </div>
          </div>

          {/* CA Card */}
          <div className="rounded-4xl bg-card p-6 hard-lg">
            <div className="flex items-center justify-between">
              <span className="font-display text-2xl font-extrabold text-primary">
                $TAG
              </span>

              <span className="label-xs">
                CA
              </span>
            </div>

            <p className="mt-3 break-all font-mono text-xs text-foreground/80">
              {TAGPAY_CA}
            </p>

            <p className="mt-4 font-mono text-xs text-primary">
              8.42M $TAG BOUGHT BACK · 0.0019 ETH FROM LAUNCH FEES
            </p>

            <p className="mt-3 text-xs text-muted-foreground">
              Launch fee: 0.0005 ETH to the launchpad + 0.00025
              ETH to TagPay. Paid by the launcher, never from
              creator fees. It buys $TAG.
            </p>

            <button
              onClick={handleCopy}
              className="mt-5 w-full rounded-2xl bg-primary px-4 py-3 font-mono text-xs font-bold text-primary-foreground"
            >
              {copied
                ? "COPIED TO CLIPBOARD"
                : "TAP TO COPY"}
            </button>
          </div>
        </div>
      </section>

      {/* Marquee */}
      <div className="overflow-hidden border-b-2 border-border bg-primary py-3">
        <div className="marquee-track">
          {[0, 1].map((k) => (
            <div key={k} className="flex shrink-0">
              {[
                "100% CREATOR FEES TO ANY @",
                "NO WALLET NEEDED",
                "NO TAGPAY ACCOUNT",
                "CLAIM WHENEVER",
                "TAG OR SEND",
                "ETH · USDG · 50+ STOCKS",
              ].map((t) => (
                <span
                  key={t}
                  className="px-8 font-mono text-xs font-bold tracking-widest text-primary-foreground"
                >
                  ✦ {t}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* How it works */}
      <section className="mx-auto max-w-6xl px-4 py-20">
        <h2 className="text-4xl uppercase sm:text-6xl">
          Three moves.
          <br />
          That's the whole app.
        </h2>

        <p className="mt-6 max-w-2xl rounded-2xl bg-card p-5 text-sm text-foreground/85 hard">
          No addresses to copy. No asking them for a wallet. No
          waiting for them to set anything up. The fees start
          flowing before they even know.
        </p>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {[
            {
              n: "1",
              t: "Name the @",
              d: "Any account on X, GitHub, Twitch or YouTube. A celebrity, your friend, your barber. We find their wallet, or make one exist on the spot.",
            },
            {
              n: "2",
              t: "Tag the coin",
              d: "Any approved pair, any name and ticker. 100% of the creator fees are written to their wallet at launch. Not yours, not ours.",
            },
            {
              n: "3",
              t: "They sign in and claim",
              d: "Tomorrow, next year, whenever. The fees have been piling up since block one. Nothing ever passed through TagPay.",
            },
          ].map((s) => (
            <div
              key={s.n}
              className="rounded-3xl bg-card p-6 hard"
            >
              <div className="font-display text-5xl font-extrabold text-primary">
                {s.n}
              </div>

              <h3 className="mt-3 text-xl">
                {s.t}
              </h3>

              <p className="mt-2 text-sm text-muted-foreground">
                {s.d}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Security / custody */}
      <section className="border-y-2 border-border bg-surface">
        <div className="mx-auto max-w-6xl px-4 py-20">
          <h2 className="text-4xl uppercase sm:text-5xl">
            Can TagPay take the money?
          </h2>

          <p className="mt-4 max-w-2xl text-sm text-muted-foreground">
            No. Not us, not a hacked TagPay, not a rogue employee.
            Here is exactly why, without the lawyer voice.
          </p>

          <div className="mt-10 space-y-4">
            {[
              [
                "01",
                "Coin fees never pass through us.",
                "The fee recipient is written into the coin at launch: their wallet, from block one. We set it once and nobody can change it.",
              ],
              [
                "02",
                "We have no access to any wallet. Ever.",
                "Every @ gets a wallet whose key shares live in secure hardware. Only the person who signs in with that account can use it.",
              ],
              [
                "03",
                "Sends hold nothing either.",
                "TagPay forwards value in the same transaction, sender → recipient. No owner, no admin, no pause button.",
              ],
              [
                "04",
                "Everything is public.",
                "Every tag is an on-chain event with sender, recipient and amount. No hidden balances, no server-side ledger to trust.",
              ],
              [
                "05",
                "The only thing TagPay charges is a fixed launch fee.",
                "0.00025 ETH per launch, paid by the launcher, never out of anyone's creator fees.",
              ],
            ].map(([n, t, d]) => (
              <div
                key={n}
                className="flex gap-5 rounded-3xl bg-card p-5 hard"
              >
                <span className="font-mono text-sm font-bold text-primary">
                  {n}
                </span>

                <div>
                  <h3 className="text-lg">
                    {t}
                  </h3>

                  <p className="mt-1 text-sm text-muted-foreground">
                    {d}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Freshly tagged */}
      <section className="mx-auto max-w-6xl px-4 py-20">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h2 className="text-4xl uppercase sm:text-5xl">
            Freshly tagged
          </h2>

          <Link
            to="/app/feed"
            className="font-mono text-xs font-bold text-primary"
          >
            OPEN THE FEED →
          </Link>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {TAG_COINS.slice(0, 4).map((c) => (
            <div
              key={c.ticker}
              className="rounded-3xl bg-card p-5 hard"
            >
              <div className="font-display text-xl font-extrabold text-primary">
                ${c.ticker}
              </div>

              <div className="mt-1 font-mono text-xs text-muted-foreground">
                100% creator fees → @{c.handle} · {c.age}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          {TAG_FEED.slice(0, 4).map((t, k) => (
            <div
              key={k}
              className="rounded-2xl border-2 border-border p-4 font-mono text-xs"
            >
              <span className="text-primary">
                @{t.from}
              </span>{" "}
              tagged{" "}
              <span className="text-primary">
                @{t.to}
              </span>{" "}
              {t.amount} {t.asset}
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t-2 border-border py-10">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-4 font-mono text-xs text-muted-foreground">
          <span className="font-display text-lg font-extrabold text-primary">
            TAGPAY
          </span>

          <span>
            Non-custodial by design. Demo experience.
          </span>

          <Link
            to="/app/send"
            className="text-primary"
          >
            SEND SOMEONE →
          </Link>
        </div>
      </footer>
    </div>
  );
}

export default LandingPage;
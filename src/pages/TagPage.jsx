
import { useState } from "react";

import {
  BigButton,
  Chips,
  Field,
  Notice,
  Panel,
} from "../components/AppChrome";

import { PROVIDERS } from "../lib/mock-data";
import { useAuth } from "../lib/AuthProvider";

const inputClass =
  "w-full rounded-2xl border-2 border-border bg-surface px-4 py-3 font-mono text-sm text-foreground outline-none placeholder:text-muted-foreground focus:border-primary";

function TagPage() {
  const { user } = useAuth();

  const [provider, setProvider] = useState("X");
  const [pair, setPair] = useState("ETH");
  const [handle, setHandle] = useState("");
  const [name, setName] = useState("");
  const [ticker, setTicker] = useState("");
  const [done, setDone] = useState(null);

  return (
    <Panel>
      <h1 className="text-4xl uppercase sm:text-5xl">
        Tag for @
      </h1>

      <p className="mt-2 text-sm text-muted-foreground">
        A coin for any handle. 100% of creator fees go to the @ you
        name, from the first trade. One signature.
      </p>

      <div className="mt-8 space-y-6">
        {/* Coin Name */}
        <Field label="Coin name">
          <input
            className={inputClass}
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Elon Cash"
          />
        </Field>

        {/* Ticker */}
        <Field label="Ticker">
          <input
            className={inputClass}
            value={ticker}
            onChange={(e) =>
              setTicker(e.target.value.toUpperCase())
            }
            placeholder="ECASH"
          />
        </Field>

        {/* Fees Go To */}
        <Field label="Fees go to">
          <Chips
            options={PROVIDERS}
            value={provider}
            onChange={setProvider}
          />

          <div className="mt-3 flex items-center gap-2 rounded-2xl border-2 border-primary bg-surface px-4 py-3">
            <span className="font-display text-2xl text-primary">
              @
            </span>

            <input
              className="w-full bg-transparent font-mono text-lg outline-none placeholder:text-muted-foreground"
              value={handle}
              onChange={(e) =>
                setHandle(
                  e.target.value.replace(/^@/, "")
                )
              }
              placeholder="elonmusk"
            />
          </div>
        </Field>

        {/* Paired Asset */}
        <Field label="Paired asset">
          <Chips
            options={["ETH", "USDG"]}
            value={pair}
            onChange={setPair}
          />
        </Field>

        {/* Launch Information */}
        <div className="rounded-2xl bg-surface-2 p-4 font-mono text-xs text-foreground/80">
          <Row
            k="TagPay launch fee"
            v="0.00025 ETH"
          />

          <Row
            k="Paired with"
            v={pair}
          />

          <Row
            k="Trade fee"
            v="1.00%"
          />

          <Row
            k="Creator fees"
            v={`100% → @${handle || "…"}`}
          />

          <Row
            k="Liquidity"
            v="Locked"
          />
        </div>

        {/* Notice */}
        <Notice>
          The creator fee recipient is written into the coin at
          launch. TagPay never holds it and cannot change it.
        </Notice>

        {/* Success Message */}
        {done && (
          <div className="rounded-2xl border-2 border-primary bg-forest/40 p-4 font-mono text-sm text-primary">
            {done}
          </div>
        )}

        {/* Launch Button */}
        <BigButton
          disabled={!user || !handle || !ticker}
          onClick={() =>
            setDone(
              `$${ticker} tagged for @${handle}. Creator fees routed. (demo)`
            )
          }
        >
          {user
            ? "LAUNCH THE TAG"
            : "CONNECT WALLET TO LAUNCH"}
        </BigButton>
      </div>
    </Panel>
  );
}

function Row({ k, v }) {
  return (
    <div className="flex items-center justify-between border-b border-border/60 py-2 last:border-0">
      <span className="text-muted-foreground">
        {k}
      </span>

      <span className="font-bold">
        {v}
      </span>
    </div>
  );
}

export default TagPage;

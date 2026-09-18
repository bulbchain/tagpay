import { useState } from "react";

import {
  BigButton,
  Chips,
  Field,
  Notice,
  Panel,
} from "../components/AppChrome";

import { ASSETS, PROVIDERS } from "../lib/mock-data";
import { useAuth } from "../lib/AuthProvider";

function SendPage() {
  const { user } = useAuth();

  const [provider, setProvider] = useState("X");
  const [asset, setAsset] = useState("ETH");
  const [handle, setHandle] = useState("");
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");
  const [sent, setSent] = useState(null);

  return (
    <Panel>
      <h1 className="text-4xl uppercase sm:text-5xl">
        Tag someone
      </h1>

      <p className="mt-2 text-sm text-muted-foreground">
        One @, one amount, one tap.
      </p>

      <div className="mt-8 space-y-6">
        <Field label="Who">
          <Chips
            options={PROVIDERS}
            value={provider}
            onChange={setProvider}
          />

          <div className="mt-3 flex items-center gap-2 rounded-2xl border-2 border-primary bg-surface px-4 py-4">
            <span className="font-display text-3xl text-primary">
              @
            </span>

            <input
              className="w-full bg-transparent font-mono text-2xl outline-none placeholder:text-muted-foreground"
              value={handle}
              onChange={(e) =>
                setHandle(e.target.value.replace(/^@/, ""))
              }
              placeholder="elonmusk"
            />
          </div>

          <p className="mt-2 text-xs text-muted-foreground">
            Type a handle. We find their wallet, or make one exist.
          </p>
        </Field>

        <Field label="What">
          <div className="flex flex-wrap gap-2">
            {ASSETS.map((a) => (
              <button
                key={a.symbol}
                onClick={() => setAsset(a.symbol)}
                className={
                  a.symbol === asset
                    ? "rounded-full border-2 border-primary bg-primary px-4 py-2 text-primary-foreground"
                    : "rounded-full border-2 border-border px-4 py-2 text-foreground/75 transition-colors hover:border-primary"
                }
              >
                <span className="font-display text-sm font-extrabold">
                  {a.symbol}
                </span>{" "}

                <span className="font-mono text-[10px] opacity-70">
                  {a.name}
                </span>
              </button>
            ))}
          </div>
        </Field>

        <Field label="How much">
          <div className="flex items-center gap-4">
            <input
              className="w-full rounded-2xl border-2 border-primary bg-surface px-4 py-4 font-mono text-3xl outline-none placeholder:text-muted-foreground"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.5"
              inputMode="decimal"
            />

            <span className="font-display text-2xl font-extrabold text-primary">
              {asset}
            </span>
          </div>
        </Field>

        <Field label="Note (public, optional)">
          <input
            className="w-full rounded-2xl border-2 border-border bg-surface px-4 py-3 text-sm outline-none placeholder:text-muted-foreground focus:border-primary"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="gm. buy yourself something nice."
          />
        </Field>

        <Notice>
          Final when it lands. It goes straight into their wallet —
          nothing sits with TagPay, and TagPay has no access to that
          wallet.
        </Notice>

        {sent && (
          <div className="rounded-2xl border-2 border-primary bg-forest/40 p-4 font-mono text-sm text-primary">
            {sent}
          </div>
        )}

        <BigButton
          disabled={!user || !handle || !amount}
          onClick={() =>
            setSent(
              `Tagged @${handle} ${amount} ${asset}. (demo transaction)`
            )
          }
        >
          {user ? "SEND IT" : "CONNECT WALLET TO SEND"}
        </BigButton>
      </div>
    </Panel>
  );
}

export default SendPage;
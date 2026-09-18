import { useState } from "react";

import { Notice, Panel } from "../components/AppChrome";
import { PROVIDERS } from "../lib/mock-data";
import { shortWallet, useAuth } from "../lib/AuthProvider";

function ClaimPage() {
  const { user, signIn, signOut } = useAuth();

  const [handle, setHandle] = useState("");
  const [claimed, setClaimed] = useState(false);

  if (user) {
    return (
      <Panel>
        <h1 className="text-4xl uppercase sm:text-5xl">
          Welcome back
        </h1>

        <p className="mt-2 text-sm text-muted-foreground">
          Signed in as @{user.handle} via {user.provider}.
        </p>

        <div className="mt-8 space-y-4">
          <div className="rounded-2xl bg-surface-2 p-4 font-mono text-sm">
            <div className="label-xs">Your wallet</div>

            <div className="mt-1 text-primary">
              {shortWallet(user.wallet)}
            </div>
          </div>

          <div className="rounded-2xl bg-surface-2 p-4 font-mono text-sm">
            <div className="label-xs">Waiting for you</div>

            <div className="mt-1 font-display text-3xl font-extrabold text-primary">
              {claimed ? "0.00 ETH" : "1.24 ETH"}
            </div>

            <div className="text-xs text-muted-foreground">
              + 320 USDG · 2 AAPL
            </div>
          </div>

          <button
            onClick={() => setClaimed(true)}
            disabled={claimed}
            className="w-full rounded-2xl bg-primary px-6 py-4 font-display text-lg font-extrabold text-primary-foreground disabled:bg-muted disabled:text-muted-foreground"
          >
            {claimed ? "ALL CLAIMED" : "CLAIM EVERYTHING"}
          </button>

          <button
            onClick={signOut}
            className="w-full rounded-2xl border-2 border-border px-6 py-3 font-mono text-xs font-bold text-muted-foreground hover:border-primary hover:text-primary"
          >
            SIGN OUT
          </button>
        </div>
      </Panel>
    );
  }

  return (
    <Panel>
      <h1 className="text-4xl uppercase sm:text-5xl">
        Got a tag?
      </h1>

      <p className="mt-2 text-sm text-muted-foreground">
        Someone may have tagged money for your @. Sign in with the
        account and it's yours. Nothing to set up.
      </p>

      <div className="mt-8 space-y-4">
        <div className="flex items-center gap-2 rounded-2xl border-2 border-primary bg-surface px-4 py-3">
          <span className="font-display text-2xl text-primary">
            @
          </span>

          <input
            className="w-full bg-transparent font-mono text-lg outline-none placeholder:text-muted-foreground"
            value={handle}
            onChange={(e) =>
              setHandle(e.target.value.replace(/^@/, ""))
            }
            placeholder="your handle"
          />
        </div>

        {PROVIDERS.map((provider) => (
          <button
            key={provider}
            onClick={() => signIn(provider, handle)}
            className="w-full rounded-2xl border-2 border-primary bg-surface px-6 py-4 font-display text-lg font-extrabold text-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
          >
            SIGN IN WITH {provider.toUpperCase()}
          </button>
        ))}

        <Notice>
          Signing in proves the @ is yours — that's the whole key.
          TagPay never holds keys and can't do this step for you.
        </Notice>
      </div>
    </Panel>
  );
}

export default ClaimPage;
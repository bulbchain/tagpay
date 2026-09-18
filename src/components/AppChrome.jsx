
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";

//import { useAuth, shortWallet } from "@/lib/auth";
import { TAGPAY_CA } from "../lib/mock-data"
import { useAuth, shortWallet } from "../lib/AuthProvider";

export function Logo({ className = "" }) {
  return (
    <Link
      to="/"
      className={`font-display text-2xl font-extrabold tracking-tighter text-primary ${className}`}
    >
      TAG<span className="text-foreground">PAY</span>
    </Link>
  );
}

export function CaBar() {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard?.writeText(TAGPAY_CA);
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 1500);
  };

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-wrap items-center justify-center gap-3 rounded-full bg-surface px-4 py-2 hard">
      <span className="font-mono text-xs font-bold text-primary">
        $TAG
      </span>

      <span className="label-xs">CA</span>

      <span className="truncate font-mono text-[11px] text-foreground/80">
        {TAGPAY_CA}
      </span>

      <button
        onClick={handleCopy}
        className="rounded-full border-2 border-primary px-3 py-1 font-mono text-[11px] font-bold text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
      >
        {copied ? "COPIED" : "COPY"}
      </button>
    </div>
  );
}

const NAV = [
  { to: "/app/tag", label: "TAG FOR @" },
  { to: "/app/coins", label: "COINS" },
  { to: "/app/send", label: "SEND" },
  { to: "/app/claim", label: "CLAIM" },
  { to: "/app/feed", label: "FEED" },
];

export function AppNav() {
  const { user, signIn, signOut } = useAuth();
  const location = useLocation();

  return (
    <header className="sticky top-0 z-30 border-b-2 border-border bg-background/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-3 px-4 py-3">
        <Logo />

        <nav className="flex flex-wrap items-center gap-2">
          {NAV.map((n) => {
            const isActive = location.pathname === n.to;

            return (
              <Link
                key={n.to}
                to={n.to}
                className={
                  isActive
                    ? "rounded-full border-2 border-primary bg-primary px-3 py-1.5 font-mono text-[11px] font-bold tracking-wider text-primary-foreground"
                    : "rounded-full border-2 border-border px-3 py-1.5 font-mono text-[11px] font-bold tracking-wider text-foreground/80 transition-colors hover:border-primary hover:text-primary"
                }
              >
                {n.label}
              </Link>
            );
          })}
        </nav>

        <div className="ml-auto">
          {user ? (
            <button
              onClick={signOut}
              className="rounded-full border-2 border-primary bg-surface px-4 py-1.5 font-mono text-[11px] font-bold text-primary"
              title={user.wallet}
            >
              @{user.handle} · {shortWallet(user.wallet)}
            </button>
          ) : (
            <button
              onClick={() => signIn("X", "you")}
              className="rounded-full bg-primary px-4 py-1.5 font-mono text-[11px] font-bold text-primary-foreground transition-transform hover:-translate-y-0.5"
            >
              CONNECT
            </button>
          )}
        </div>
      </div>
    </header>
  );
}

export function Panel({ children }) {
  return (
    <div className="mx-auto w-full max-w-2xl rounded-4xl bg-card p-6 hard-lg sm:p-9">
      {children}
    </div>
  );
}

export function Field({ label, children }) {
  return (
    <div className="space-y-2">
      <div className="label-xs">{label}</div>
      {children}
    </div>
  );
}

export function Notice({ children }) {
  return (
    <div className="rounded-2xl border-2 border-dashed border-primary/70 bg-forest/30 p-4 text-sm text-foreground/85">
      {children}
    </div>
  );
}

export function BigButton({
  children,
  onClick,
  disabled = false,
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="w-full rounded-2xl bg-primary px-6 py-4 font-display text-lg font-extrabold tracking-tight text-primary-foreground transition-transform hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:bg-muted disabled:text-muted-foreground"
    >
      {children}
    </button>
  );
}

export function Chips({
  options,
  value,
  onChange,
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((option) => (
        <button
          key={option}
          onClick={() => onChange(option)}
          className={
            option === value
              ? "rounded-full border-2 border-primary bg-primary px-4 py-2 font-mono text-xs font-bold text-primary-foreground"
              : "rounded-full border-2 border-border px-4 py-2 font-mono text-xs font-bold text-foreground/75 transition-colors hover:border-primary"
          }
        >
          {option}
        </button>
      ))}
    </div>
  );
}

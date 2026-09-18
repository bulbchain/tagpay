import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

const STORAGE_KEY = "tagpay.session";

const AuthContext = createContext(null);

function fakeWallet(seed) {
  let h = 0;

  for (let i = 0; i < seed.length; i++) {
    h = (h * 31 + seed.charCodeAt(i)) >>> 0;
  }

  const hex = h
    .toString(16)
    .padStart(8, "0")
    .repeat(5)
    .slice(0, 40);

  return `0x${hex}`;
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);

      if (raw) {
        setUser(JSON.parse(raw));
      }
    } catch {
      // Ignore invalid localStorage data
    }

    setReady(true);
  }, []);

  const value = useMemo(
    () => ({
      user,
      ready,

      signIn: (provider, handle) => {
        const name =
          (handle || "tagpayer")
            .replace(/^@/, "")
            .trim() || "tagpayer";

        const next = {
          handle: name,
          provider,
          wallet: fakeWallet(name + provider),
        };

        setUser(next);

        try {
          localStorage.setItem(
            STORAGE_KEY,
            JSON.stringify(next)
          );
        } catch {
          // Ignore localStorage errors
        }

        return next;
      },

      signOut: () => {
        setUser(null);

        try {
          localStorage.removeItem(STORAGE_KEY);
        } catch {
          // Ignore localStorage errors
        }
      },
    }),
    [user, ready]
  );

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);

  if (!ctx) {
    throw new Error(
      "useAuth must be used inside AuthProvider"
    );
  }

  return ctx;
}

export const shortWallet = (w) =>
  `${w.slice(0, 6)}…${w.slice(-4)}`;

import { Outlet } from "react-router-dom";
import { AppNav, CaBar } from "./components/AppChrome";
import { AuthProvider } from "./lib/AuthProvider";

function AppLayout() {
  return (
    <AuthProvider>
      <div className="min-h-screen grid-canvas">
        <AppNav />

        <div className="px-4 pt-6">
          <CaBar />
        </div>

        <main className="px-4 py-10">
          <Outlet />
        </main>
      </div>
    </AuthProvider>
  );
}

export default AppLayout;
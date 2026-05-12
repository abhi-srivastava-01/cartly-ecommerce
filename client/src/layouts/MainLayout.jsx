import { Outlet } from "react-router-dom";
import Navbar from "../components/public/Navbar";

export function MainLayout() {
  return (
    <div>
      <Navbar />
      <main className="max-w-6xl mx-auto">
        <Outlet />
      </main>
    </div>
  );
}

export default MainLayout;

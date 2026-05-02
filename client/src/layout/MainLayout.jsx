import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

export function MainLayout() {
  return (
    <div>
      <Navbar />
      <main className="max-w-6xl mx-auto p-4">
        <Outlet />
      </main>
    </div>
  );
}


export default MainLayout;
import { Outlet } from "react-router-dom";
import Header from "../components/public/Header";

export function MainLayout() {
  return (
    <div>
      <Header/>
      <main className="max-w-6xl mx-auto">
        <Outlet />
      </main>
    </div>
  );
}

export default MainLayout;

import { Outlet } from "react-router-dom";

function AdminLayout() {
  return (
    <section className="w-full min-h-screen">
      <Outlet />
    </section>
  );
}

export default AdminLayout;

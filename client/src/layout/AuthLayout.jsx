import { Outlet } from "react-router-dom";

function AuthLayout() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <Outlet />
    </div>
  );
}

export default AuthLayout;

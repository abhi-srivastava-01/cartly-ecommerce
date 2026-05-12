import { Routes, Route } from "react-router-dom";

// User
import MainLayout from "../../layouts/MainLayout";
import HomePage from "../../pages/public/HomePage";

// Auth
import Login from "../../auth/Login";
import SignUp from "../../auth/SignUp";

// Admin
import AdminLayout from "../../layouts/AdminLayout";
import AdminDashboard from "../../pages/admin/AdminDashboard";

function AppRoutes() {
  return (
    <>
      <Routes>
        {/* Public */}
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />
        </Route>

        {/* Auth */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />

        {/* Admin */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="dashboard" element={<AdminDashboard />} />
        </Route>
      </Routes>
    </>
  );
}

export default AppRoutes;

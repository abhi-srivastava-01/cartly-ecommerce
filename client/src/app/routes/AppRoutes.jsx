import { Routes, Route } from "react-router-dom";

// User
import MainLayout from "../layouts/MainLayout";
import HomePage from "../../features/product/pages/HomePage";
import CartPage from "../../features/user/pages/CartPage";
import UserProfile from "../../features/user/pages/UserProfile";
// Auth
import Login from "../../features/auth/pages/Login";
import SignUp from "../../features/auth/pages/SignUp";

// Admin
import AdminLayout from "../layouts/AdminLayout";
import AdminDashboard from "../../features/admin/pages/AdminDashboard";

// Protect
import { AdminProtectedRoute } from "./AdminProtectedRoute";
import { UserProtectedRoute } from "./UserProtectedRoute";

//
function AppRoutes() {
  return (
    <>
      <Routes>
        {/* Public */}
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />
          {/* Protected user routes */}
          <Route element={<UserProtectedRoute />}>
          <Route path="profile" element={<UserProfile />} />
            <Route path="cart" element={<CartPage />} />
          </Route>
        </Route>

        {/* Auth */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />

        {/* Admin */}
        <Route
          path="/admin"
          element={
            <AdminProtectedRoute allowedRoles={["admin"]}>
              <AdminLayout />
            </AdminProtectedRoute>
          }
        >
          <Route path="dashboard" element={<AdminDashboard />} />
        </Route>
      </Routes>
    </>
  );
}

export default AppRoutes;

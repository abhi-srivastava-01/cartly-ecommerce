import { Routes, Route } from "react-router-dom";

// User
import MainLayout from "../../layouts/MainLayout";
import HomePage from "../../pages/public/HomePage";
import CartPage from "../../pages/user/CartPage";
import UserProfile from "../../pages/user/UserProfile";
// Auth
import Login from "../../auth/Login";
import SignUp from "../../auth/SignUp";

// Admin
import AdminLayout from "../../layouts/AdminLayout";
import AdminDashboard from "../../pages/admin/AdminDashboard";

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
          // Protect
          <Route element={<UserProtectedRoute />}>
          <Route path="profile" element={<UserProfile/>}/>
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

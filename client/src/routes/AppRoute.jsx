import { Routes, Route } from "react-router-dom";
// Layout
import MainLayout from "../layout/MainLayout";
import AuthLayout from "../layout/AuthLayout";

// Pages
import HomePage from "../pages/HomePage";
import SignUp from "../auth/SignUp";
import Login from "../auth/Login";

function AppRoute() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />} />
      </Route>

      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      </Route>
    </Routes>
  );
}

export default AppRoute;

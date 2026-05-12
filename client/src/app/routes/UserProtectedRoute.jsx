import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const UserProtectedRoute = () => {
  const { isAuthenticated, isCheckingAuth } = useSelector(
    (state) => state.user,
  );

  if (isCheckingAuth) {
    return <h1>Loading...</h1>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return <Outlet />;
};

export { UserProtectedRoute };

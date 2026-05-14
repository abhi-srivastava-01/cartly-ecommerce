import { refreshToken } from "./features/user/userThunk";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import AppRoutes from "./app/routes/AppRoutes";
import { ToastContainer } from "react-toastify";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(refreshToken());
  }, [dispatch]);

  return (
    <>
      <AppRoutes />
      <ToastContainer />
    </>
  );
}

export default App;

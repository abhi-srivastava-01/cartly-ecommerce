import { refreshToken } from "./features/user/userThunk";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import AppRoutes from "./app/routes/AppRoutes";
import { ToastContainer } from "react-toastify";

function App() {
  const { isCheckingAuth } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(refreshToken());
  }, [dispatch]);

  if (isCheckingAuth) {
    return <h1>Loading...</h1>;
  }
  return (
    <>
      <AppRoutes />
      <ToastContainer />
    </>
  );
}

export default App;

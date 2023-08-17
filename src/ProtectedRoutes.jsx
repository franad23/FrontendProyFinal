import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./context/AuthContext"
import SpinnerLoading from "./components/SpinnerLoading/SpinnerLoading";


function ProtectedRoutes() {
  const {user, isAuth, loading} = useAuth();
  // console.log(user, isAuth, loading);

  if (loading) return <SpinnerLoading/>
  if (!isAuth && !loading) return <Navigate to='/login' replace />;

  return (
    <Outlet/>
  )
}

export default ProtectedRoutes
import { Navigate, Outlet, useLocation } from "react-router-dom";
import NavigationHeader from "../components/navigation-header";
import { useAuth } from "../contexts/AuthContext";

const UserRoutes = () => {
  const { user, isUserLoading } = useAuth();
  const location = useLocation();

  if (isUserLoading) {
    return <div>Loading...</div>
  }

  if (!isUserLoading && !user) {
    return <Navigate to="/auth/login" state={{ from: location }} replace />
  }

  return (
    <>
      <NavigationHeader />
      <Outlet />
    </>
  )
}

export default UserRoutes
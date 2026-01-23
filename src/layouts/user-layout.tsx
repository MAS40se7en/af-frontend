import { Navigate, Outlet, useNavigate } from "react-router-dom";
import NavigationHeader from "../components/navigation-header";
import { useAuth } from "../contexts/AuthContext";
import { Suspense, useEffect } from "react";

const UserLayout = () => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/auth/login" replace />
  }

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <NavigationHeader />
      <Outlet />
    </Suspense>
  )
}

export default UserLayout
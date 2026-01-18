import { Outlet } from "react-router-dom";
import NavigationHeader from "../components/navigation-header";

const UserLayout = () => {
  return (
    <>
      <NavigationHeader />
      <Outlet />
    </>
  )
}

export default UserLayout
import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom"
import { ModeToggle } from "@/components/mode-toggle"
import { useAuth } from "@/contexts/AuthContext";
import { useEffect } from "react";

function PublicOnlyRoute() {
    const { user, isUserLoading } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const redirectPath = location.state?.from || '/';

    useEffect(() => {
        if (!isUserLoading && user) {
            navigate(redirectPath, { replace: true });
        }
    }, [user, isUserLoading, navigate, redirectPath]);

    if (isUserLoading || user) {
        return <div>Loading...</div>;
    }

    return (
        <div className="flex flex-col gap-2 justify-center pt-3">
            <div className="px-3">
                <div className="w-120 md:w-172 lg:w-200 mx-auto space-x-7 flex items-center justify-between px-3">
                    <NavLink
                        to="/"
                        className={({ isActive, isPending }) =>
                            isPending ? "animate-pulse" : isActive ? "text-primary-foreground" : "text-primary"}>
                        Home
                    </NavLink>
                    <div className="flex gap-4 items-center">
                        <ModeToggle />
                        <NavLink
                            to="/auth/login"
                            className={({ isActive, isPending }) =>
                                isPending ? "animate-pulse" : isActive ? "text-primary-foreground" : "text-primary"}>
                            Login
                        </NavLink>
                        <NavLink
                            to="/auth/register"
                            className={({ isActive, isPending }) =>
                                isPending ? "animate-pulse" : isActive ? "text-primary-foreground" : "text-primary"}>
                            Register
                        </NavLink>
                    </div>
                </div>
            </div>
            <div className="flex justify-center items-start h-200">
                <div className="h-200 md:h-180 border-2 w-120 md:w-172 lg:w-220 rounded-xl p-0 flex flex-col md:flex-row overflow-hidden dark:bg-stone-950 bg-stone-200 relative">
                    <div className="max-h-50 md:max-h-180 border-b-2 md:border-b-0 md:border-r-2 md:w-1/2 overflow-hidden flex items-center justify-center">
                        <img src="/AFbigHeader.png" alt="logo" className=" md:min-h-180 md:min-w-200" />
                    </div>
                    <Outlet />
                </div>
            </div>
        </div>
    )
}

export default PublicOnlyRoute
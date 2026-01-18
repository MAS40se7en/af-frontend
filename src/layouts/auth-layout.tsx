import { NavLink, Outlet } from "react-router-dom"
import { ModeToggle } from "../components/mode-toggle"

function AuthLayout() {
    return (
        <div className="flex flex-col gap-2 justify-center pt-3">
            <div className="px-3">
                <div className="w-[30rem] md:w-[43rem] lg:w-[50rem] mx-auto space-x-7 flex items-center justify-between px-3">
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
            <div className="flex justify-center items-center">
                <div className="h-[50rem] md:max-h-[35rem] border-2 w-[30rem] md:w-[43rem] lg:w-[50rem] rounded-xl p-0 flex flex-col md:flex-row overflow-hidden dark:bg-stone-950 bg-stone-200 relative">
                    <div className="border-b-2 md:border-b-0 md:border-r-2 md:w-1/2 overflow-hidden flex items-center justify-center">
                        <img src="/AFbigHeader.png" alt="logo" className="w-full md:h-[35rem] md:min-w-[40rem]" />
                    </div>
                    <Outlet />
                </div>
            </div>
        </div>
    )
}

export default AuthLayout
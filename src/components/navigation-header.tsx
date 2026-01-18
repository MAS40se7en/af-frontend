import { NavLink } from "react-router-dom"
import { ModeToggle } from "./mode-toggle"
import AccountMenu from "./account-menu"

const NavigationHeader = () => {
    return (
        <div className="w-full sticky top-0 right-0 left-0 bg-background dark:bg-black px-4 border-b-2">
            <div className="h-12 flex items-center justify-between lg:w-3/5 mx-auto">
                <div className="flex items-center gap-7">
                    <div className="flex items-center gap-2">
                        <img src="/AF.png" alt="logo" className="w-[2rem] rounded-md" />
                        <span className="font-semibold">ArtFocused</span>
                    </div>

                    <div className="flex items-center justify-between gap-3">
                        <NavLink
                            className={({ isActive, isPending }) => 
                                isPending ? "animate-pulse" : isActive ? "text-primary-foreground" : "text-primary"}
                            to="/">
                            Home
                        </NavLink>
                        <NavLink
                            className={({ isActive, isPending }) => 
                                isPending ? "animate-pulse" : isActive ? "text-primary-foreground" : "text-primary"}
                            to="/categories">
                            Categories
                        </NavLink>
                        <NavLink
                            className={({ isActive, isPending }) => 
                                isPending ? "animate-pulse" : isActive ? "text-primary-foreground" : "text-primary"}
                            to="/artists">
                            Artists
                        </NavLink>
                        <NavLink
                            className={({ isActive, isPending }) => 
                                isPending ? "animate-pulse" : isActive ? "text-primary-foreground" : "text-primary"}
                            to="/artworks">
                            Descover Artworks
                        </NavLink>
                    </div>
                </div>
                <div className="flex gap-3 items-center">
                    <AccountMenu />
                    <ModeToggle />
                </div>
            </div>
        </div>
    )
}

export default NavigationHeader
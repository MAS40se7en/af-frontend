import { NavLink } from "react-router-dom"
import { DrawerHeader } from "./ui/drawer"
import { Separator } from "./ui/separator"
import Icon from "./icon"

function NavLinks() {
    return (
        <div className="md:items-center items-start justify-between gap-3 flex flex-col md:flex-row text-2xl md:text-lg  transition-all duration-300 ease-in-out">
            <DrawerHeader className="p-0 w-full flex items-start flex-col gap-2 md:hidden">
                <Icon />
                <Separator />
            </DrawerHeader>
            <NavLink
                className={({ isActive, isPending }) =>
                    isPending ? "animate-pulse" : isActive ? "text-primary-foreground" : "text-primary hover:text-muted-foreground"}
                to="/">
                Home
            </NavLink>
            <NavLink
                className={({ isActive, isPending }) =>
                    isPending ? "animate-pulse" : isActive ? "text-primary-foreground" : "text-primary hover:text-muted-foreground"}
                to="/categories">
                Categories
            </NavLink>
            <NavLink
                className={({ isActive, isPending }) =>
                    isPending ? "animate-pulse" : isActive ? "text-primary-foreground" : "text-primary hover:text-muted-foreground"}
                to="/artists">
                Artists
            </NavLink>
            <NavLink
                className={({ isActive, isPending }) =>
                    isPending ? "animate-pulse" : isActive ? "text-primary-foreground" : "text-primary hover:text-muted-foreground"}
                to="/artworks">
                Descover Artworks
            </NavLink>
        </div>
    )
}

export default NavLinks
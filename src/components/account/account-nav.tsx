import { Link } from "react-router-dom"
import { NavigationMenu, NavigationMenuLink, NavigationMenuList } from "@/components/ui/navigation-menu"

function AccountNav() {
  return (
    <NavigationMenu className="mt-5">
        <NavigationMenuList>
            <NavigationMenuLink asChild>
                <Link to='/account'>About Me</Link>
            </NavigationMenuLink>
            <NavigationMenuLink asChild>
                <Link to="/account/my-posts">My Posts</Link>
            </NavigationMenuLink>
            <NavigationMenuLink asChild>
                <Link to="/account/my-artworks">My Artworks</Link>
            </NavigationMenuLink>
            <NavigationMenuLink asChild>
                <Link to="/account/manage-info">Manage Account Info</Link>
            </NavigationMenuLink>
        </NavigationMenuList>
    </NavigationMenu>
  )
}

export default AccountNav
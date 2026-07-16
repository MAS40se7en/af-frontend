import { User } from "lucide-react"
import { Button } from "./ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu"
import { useAuth } from "@/contexts/AuthContext"
import { GeneratedAvatar } from "./generated-avatar";
import { Avatar, AvatarImage } from "./ui/avatar";
import { NavLink, useLocation } from "react-router-dom";
import { Separator } from "./ui/separator";

function AccountMenu() {
    const { user, signOut } = useAuth();
    const location = useLocation();

    return (
        <DropdownMenu key={location.pathname}>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="rounded-full flex items-center justify-center size-10">
                    {user ? (
                        user.fullName ?
                            <Avatar className='size-9'>
                                <AvatarImage
                                    src={'/AF.png'}
                                />
                            </Avatar>
                            : <GeneratedAvatar
                                seed={user.fullName || "avatar"}
                                variant="initials"
                                className="size-9"
                            />
                    ) : (
                        <Avatar className="flex items-center justify-center border">
                            <User />
                        </Avatar>
                    )}
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuItem className="py-0">
                    <NavLink
                        className="w-full h-full py-2"
                        to={user ? "/account" : "/auth/login"}>
                        {user ? "Profile" : "Login"}
                    </NavLink>
                </DropdownMenuItem>
                <DropdownMenuItem className="py-0">
                    <NavLink
                        className="w-full h-full py-2"
                        to={user ? "/settings" : "/auth/register"}>
                        {user ? "Settings" : "Create an Account"}
                    </NavLink>
                </DropdownMenuItem>
                {user && (
                    <>
                        <DropdownMenuItem className="py-0">
                            <NavLink
                                className="w-full h-full py-2"
                                to="/account/my-artworks">
                                My Artworks
                            </NavLink>
                        </DropdownMenuItem>
                        <Separator className="my-1" />
                        <DropdownMenuItem className="py-0 mx-0 px-0">
                            <Button
                                variant="outline"
                                className="w-full h-full"
                                onClick={signOut}>
                                Logout
                            </Button>
                        </DropdownMenuItem>
                    </>
                )}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default AccountMenu
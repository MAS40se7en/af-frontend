import { User } from "lucide-react"
import { Button } from "./ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu"
import { useAuth } from "../contexts/AuthContext"
import { GeneratedAvatar } from "./generated-avatar";
import { Avatar, AvatarImage } from "./ui/avatar";
import { NavLink } from "react-router-dom";

function AccountMenu() {
    const { user } = useAuth();

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="rounded-full flex items-center justify-center size-10">
                    {user ? (
                        user.full_name ?
                            <Avatar className='size-9'>
                                <AvatarImage
                                    src={'/AF.png'}
                                />
                            </Avatar>
                            : <GeneratedAvatar
                                seed={'avatar'}
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
                        to={user ? "/profile" : "/auth/login"}>
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
                    <DropdownMenuItem className="py-0">
                        <NavLink
                            className="w-full h-full py-2"
                            to="/logout">
                            Logout
                        </NavLink>
                    </DropdownMenuItem>
                )}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default AccountMenu
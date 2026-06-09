import { Navigate, Outlet, useLocation } from "react-router-dom"
import { useAuth } from "@/contexts/AuthContext"
import AccountImage from "@/components/account/account-image";
import { cn } from "@/lib/utils";
import AccountNav from "@/components/account/account-nav";

function AccountLayout() {
    const { user } = useAuth();
    const location = useLocation();
    const pathNameEndsWith = location.pathname.split("account/").pop();

    if (!user) {
        return <Navigate to="/auth/login" replace />
    }

    return (
        <div className="flex flex-col items-center justify-center mt-16">
            <div className={
                cn("flex items-center justify-start gap-10",
                    location.pathname.endsWith("my-artworks") && "h-28"
                )}>
                <AccountImage className={
                    cn("size-56", (pathNameEndsWith === "my-artworks" || pathNameEndsWith === "my-posts" || pathNameEndsWith === "manage-info") && "size-28")
                } image={user.imageUrl} name={user.fullName} />
                <div className="border-t border-b py-2 min-w-[20rem] flex flex-col gap-3">
                    <div className="flex gap-3 items-center">
                        <h2 className="text-3xl font-semibold">
                            {user?.fullName}
                        </h2>
                        <span className="border-2 border-muted-foreground px-2 rounded-full w-fit">
                            {user?.username}
                        </span>
                    </div>
                    <div>
                        <p className="text-muted-foreground text-lg">
                            {user?.email}
                        </p>
                        <p className="text-muted-foreground text-lg">

                        </p>
                    </div>
                </div>
            </div>
            <AccountNav />
            <Outlet />
        </div>
    )
}

export default AccountLayout
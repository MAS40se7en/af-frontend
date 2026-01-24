import { Navigate, Outlet } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"
import AccountImage from "../components/account/account-image";

function AccountLayout() {
    const { user } = useAuth();

    if (!user) {
        return <Navigate to="/auth/login" replace />
    }

    return (
        <div className="flex flex-col items-center justify-center mt-20">
            <div className="flex items-center justify-start gap-10">
                <AccountImage image="test" name={user.fullName} />
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
            <Outlet />
        </div>
    )
}

export default AccountLayout
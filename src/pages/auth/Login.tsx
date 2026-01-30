import LoginForm from "@/components/auth/login/login-form"

function Login() {
    return (
        <div className="flex flex-col py-5 px-7 md:w-100 lg:mt-4 gap-7">
            <h2 className="text-lg font-semibold">Sign in to your Account!</h2>
            <LoginForm />
        </div>
    )
}

export default Login
import RegisterForm from "@/components/auth/register/register-form"

function Register() {
    return (
        <div className="absolaute bottom-0 h-140 flex flex-col p-5 lg:pl-1 lg:mt-4 gap-7">
            <h2 className="text-lg font-semibold px-3">Create a new Account!</h2>
            <RegisterForm />
        </div>
    )
}

export default Register
import { useForm } from "react-hook-form"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../../components/ui/form"
import { loginFormSchema } from "../../lib/zod-schemas"
import { zodResolver } from "@hookform/resolvers/zod"
import type z from "zod"
import { Input } from "../../components/ui/input"
import { Button } from "../../components/ui/button"
import { NavLink } from "react-router-dom"

function Login() {
    const form = useForm<z.infer<typeof loginFormSchema>>({
        resolver: zodResolver(loginFormSchema),
        defaultValues: {
            email: "",
            password: ""
        }
    });

    function onSubmit(values: z.infer<typeof loginFormSchema>) {
        console.log(values);
    }

    return (
        <div className="flex flex-col py-5 px-7 md:w-[25rem] lg:mt-4 gap-7">
            <h2 className="text-lg font-semibold">Sign in to your Account!</h2>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 w-full">
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input placeholder="jane@doe.com" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <Input type="password" placeholder="********" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormDescription className="text-right -mt-2">
                        <NavLink 
                        to="/auth/forgot-password" 
                        className="hover:text-primary-foreground">
                            Forgot Password?
                        </NavLink>
                    </FormDescription>
                    <Button variant={"default"} className="w-full mt-1">Sign In</Button>
                </form>
            </Form>
        </div>
    )
}

export default Login
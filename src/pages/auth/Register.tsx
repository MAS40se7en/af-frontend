import { useForm } from "react-hook-form";
import { registerFormSchema, type loginFormSchema } from "../../lib/zod-schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import type z from "zod";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../../components/ui/form";
import { Input } from "../../components/ui/input";
import { NavLink } from "react-router-dom";
import { Button } from "../../components/ui/button";

function Register() {
    const form = useForm<z.infer<typeof registerFormSchema>>({
        resolver: zodResolver(registerFormSchema),
        defaultValues: {
            first_name: "",
            last_name: "",
            username: "",
            email: "",
            password: "",
            passConfirm: ""
        }
    });

    function onSubmit(values: z.infer<typeof loginFormSchema>) {
        console.log(values);
    }
    return (
        <div className="absolaute bottom-0 h-[35rem] flex flex-col p-5 lg:pl-1 lg:mt-4 gap-7">
            <h2 className="text-lg font-semibold px-3">Create a new Account!</h2>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 px-3">
                    <div className="flex gap-2">
                        <FormField
                        control={form.control}
                        name="first_name"
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormLabel>First Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="Jane" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="last_name"
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormLabel>Last Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="Doe" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    </div>
                    <FormField
                        control={form.control}
                        name="username"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Username</FormLabel>
                                <FormControl>
                                    <Input placeholder="jane_doe" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
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
                    <FormField
                        control={form.control}
                        name="passConfirm"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Confirm Password</FormLabel>
                                <FormControl>
                                    <Input type="password" placeholder="********" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormDescription className="text-right -mt-2">
                        Already have an account?
                        <span> </span>
                        <NavLink
                            to="/auth/login"
                            className="hover:text-primary-foreground">
                            Sign in!
                        </NavLink>
                    </FormDescription>
                    <Button variant={"default"} className="w-full mt-1">Sign In</Button>
                </form>
            </Form>
        </div>
    )
}

export default Register
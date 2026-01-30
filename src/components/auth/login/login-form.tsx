import { NavLink } from "react-router-dom";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { loginFormSchema } from "@/lib/zod-schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import type z from "zod";
import { useAuth } from "@/contexts/AuthContext";

function LoginForm() {
    const { signIn } = useAuth();

    const form = useForm<z.infer<typeof loginFormSchema>>({
        resolver: zodResolver(loginFormSchema),
        defaultValues: {
            email: "",
            password: ""
        }
    });

    function onSubmit(values: z.infer<typeof loginFormSchema>) {
        console.log(values);

        signIn(values);
    }

  return (
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
  )
}

export default LoginForm
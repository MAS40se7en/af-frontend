import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useForm } from "react-hook-form";
import { registerFormSchema } from "@/lib/zod-schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import type z from "zod";
import { useAuth } from "@/contexts/AuthContext";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import useScreenSize from "@/hooks/use-screen-size";

function RegisterForm() {
    const { signUp } = useAuth();
    const navigate = useNavigate();
    const screenSize = useScreenSize();

    const form = useForm<z.infer<typeof registerFormSchema>>({
        resolver: zodResolver(registerFormSchema),
        defaultValues: {
            firstName: "",
            lastName: "",
            username: "",
            isArtist: false,
            email: "",
            password: "",
            passwordConfirm: ""
        }
    });

    function onSubmit(values: z.infer<typeof registerFormSchema>) {
        if (values.isArtist) {
            navigate('/auth/register/artist', { state: values });
        } else {
            signUp(values);
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className={cn(
                "space-y-4 px-3 flex flex-col justify-center min-h-full",
                Object.keys(form.formState.errors).length > 0 && (screenSize === "sm" || screenSize === "xs") && "overflow-y-auto"
            )}>
                <div className="flex gap-2">
                    <FormField
                        control={form.control}
                        name="firstName"
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
                        name="lastName"
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
                    name="isArtist"
                    render={({ field }) => (
                        <FormItem className="flex outline-2 bg-[#640707] dark:bg-[#330A0A] px-2 items-center py-3 rounded-lg w-full text-muted dark:text-muted-foreground">
                            <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                            <div className="flex flex-col items-start gap-1 w-90">
                                <Label htmlFor="isArtist" className="text-white">I am an artist</Label>
                                <p className="text-xs">By checking this box, you will be redirected to the artist registration page to continue with your registration.</p>
                            </div>
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
                    name="passwordConfirm"
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
                <Button variant={"default"} className="w-full mt-1">
                    Register
                </Button>
            </form>
        </Form>
    )
}

export default RegisterForm
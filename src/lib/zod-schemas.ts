import { z } from "zod"

const emailSchema = z
    .email("Please enter a valid email address.");

const passwordSchema = z
    .string()
    .min(8, {
        message: "Password must be at least 8 characters long."
    })
    .max(128, {
        message: "Password must be at most 128 characters long."
    })
    .regex(/[a-z]/, {
        message: "Password must contain a lowercase letter."
    })
    .regex(/[A-Z]/, {
        message: "Password must contain an uppercase letter."
    })
    .regex(/[0-9]/, {
        message: "Password must contain a number."
    })
    .regex(/[!@#.\-+=_*&]/, {
        message: "Password must contain a special character."
    });

const nameSchema = z
    .string()
    .trim()
    .min(2, {
        message: "Must be at least 2 characters long."
    })
    .max(50, {
        message: "Must be at most 50 characters long."
    });

export const loginFormSchema = z.object({
    email: emailSchema,
    password: z.string().min(2, {
        message: "Password must be at least 8 characters long.",
    }),
});

export const registerFormSchema = z.object({
    firstName: nameSchema,
    lastName: nameSchema,
    username: z
        .string()
        .trim()
        .min(3, {
            message: "Username must be at least 3 characters long."
        })
        .max(30, {
            message: "Username must be at most 30 characters long."
        })
        .regex(/^[a-zA-Z][a-zA-Z0-9][a-zA-Z0-9_]*$/, {
            message: "Username must only start with letters and may contain numbers and underscores."
        }),
    email: emailSchema,
    password: passwordSchema,
    passwordConfirm: z.string(),
}).refine((data) => data.password === data.passwordConfirm, {
    path: ["passConfirm"],
    message: "Passwords do not match.",
});
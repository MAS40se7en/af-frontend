import { z } from "zod"

export const MAX_FILE_SIZE = 10 * 1024 * 1024;
export const ACCEPTED_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

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

const fileMetadataSchema = z.object({
    name: z.string(),
    size: z.number().positive(),
    type: z.string(),
    url: z.url(),
    id: z.string(),
    order: z.number().nonnegative()
});

const nativeFileSchema = z.instanceof(File);

const fileWithPreviewSchema = z.object({
    id: z.string(),
    order: z.number().optional(),
    preview: z.string().optional(),
    file: z.union([nativeFileSchema, fileMetadataSchema])
});

export const filesArraySchema = (options?: {
    maxFiles?: number;
    maxSize?: number;
    accept?: string[];
}) => z
        .array(fileWithPreviewSchema)
        .superRefine((files, ctx) => {
            if (options?.maxFiles && files.length > options.maxFiles) {
                ctx.addIssue({
                    code: 'custom',
                    message: `Maximum ${options.maxFiles} files allowed.`
                });
            }

            for (const f of files) {
                if (f.file instanceof File && options?.maxSize && f.file.size > options.maxSize) {
                    ctx.addIssue({
                        code: 'custom',
                        message: `File ${f.file.name} is too large.`
                    });
                }
            }
        });

export const createArtworkSchema = z.object({
    title: z.string().min(2, {
        message: "Title must be at least 2 characters long."
    }).max(50, {
        message: "Title must be at most 50 characters long."
    }),
    description: z.string().min(2, {
        message: "Description must be at least 2 characters long."
    }).max(1500, {
        message: "Description must be at most 1500 characters long."
    }),
    categoryId: z.number()
});

export const createArtworkFormSchema = z.object({
    artwork: createArtworkSchema,
    files: filesArraySchema({
        maxFiles: 10,
        maxSize: MAX_FILE_SIZE,
        accept: ACCEPTED_TYPES
    })
})

export const commentSchema = z.object({
    comment: z.string().min(2, {
        message: "Comment must be at least 2 characters long."
    }).max(1500, {
        message: "Comment must be at most 1500 characters long."
    }),
})

export const replySchema = z.object({
    reply: z.string().min(2, {
        message: "Reply must be at least 2 characters long."
    }).max(1500, {
        message: "Reply must be at most 1500 characters long."
    }),
})
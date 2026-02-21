import { Button } from "@/components/ui/button"
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Field, FieldError, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { InputGroup, InputGroupAddon, InputGroupText, InputGroupTextarea } from "@/components/ui/input-group"
import { useFileUpload, type FileWithPreview } from "@/hooks/use-file-upload"
import { createCategoryFormSchema, createCategorySchema, MAX_FILE_SIZE } from "@/lib/zod-schemas"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import z from "zod"
import UploadCategoryImage from "./upload-category-image"
import { useEffect, useState } from "react"
import type { Category } from "@/hooks/use-categories"
import { SquarePen } from "lucide-react"

interface BaseCategoryDialogProps {
    open?: boolean;
    setOpen?: (open: boolean) => void;
    isEditing?: boolean;
}

type CreateCategoryDialogProps =
    BaseCategoryDialogProps & {
        variant: "create";
        addCategory: ({
            file,
            category
        }: {
            category: z.infer<typeof createCategorySchema>,
            file: FileWithPreview
        }) => void;
        isAddingCategory: boolean;
        addCategoryError: any;
        isAddingCategorySuccess: boolean;
    }

type EditCategoryDialogProps =
    BaseCategoryDialogProps & {
        variant: "edit";
        updateCategory: ({
            id,
            file,
            category,
            removeImage
        }: {
            id: number,
            category: z.infer<typeof createCategorySchema>,
            file: FileWithPreview,
            removeImage?: boolean
        }) => void;
        isUpdatingCategory: boolean;
        updateCategoryError: any;
        isUpdatingCategorySuccess: boolean;
        category: Category;
    }

type CategoryDialogProps =
    | CreateCategoryDialogProps
    | EditCategoryDialogProps;

const maxSize = MAX_FILE_SIZE;

const CreateCategoryDialog = (props: CategoryDialogProps) => {
    const {
        open,
        setOpen,
        isEditing
    } = props;

    const [
        fileState,
        fileActions
    ] = useFileUpload({
        maxFiles: 1,
        maxSize,
        multiple: false,
        accept: "image/*"
    });

    const [removeExistingImage, setRemoveExistingImage] = useState(false);

    const previewUrl =
        fileState.files[0]?.preview ??
        (removeExistingImage
            ? null
            : props.variant === "edit" ?
                props.category?.imageUrl ?? null
                : null);

    const form = useForm<z.infer<typeof createCategorySchema>>({
        resolver: zodResolver(createCategorySchema),
        defaultValues: {
            name: props.variant === "edit" ? props.category?.name ?? "" : "",
            code: props.variant === "edit" ? props.category?.code ?? "" : "",
            description: props.variant === "edit" ? props.category?.description ?? "" : "",
        }
    });

    useEffect(() => {
        if (props.variant === "create" && props.isAddingCategorySuccess) {
            form.reset();
        }

        if (props.variant === "edit" && props.isUpdatingCategorySuccess) {
            form.reset();
            setRemoveExistingImage(false);
        }

    }, [
        props.variant,
        props.variant === "create"
            ? (props.addCategory, props.isAddingCategorySuccess)
            : (props.updateCategory, props.isUpdatingCategorySuccess),
    ])

    const onSubmit = () => {
        const file = fileState.files[0];

        const result = createCategoryFormSchema.safeParse({
            category: form.getValues(),
            file: file ? file : null
        })

        if (!result.success) {
            console.log("error: ", result.error);

            const fileErrors = result.error.flatten().fieldErrors.file;

            if (fileErrors?.length) {
                form.setError("root.file", {
                    type: "manual",
                    message: fileErrors[0]
                })
            }
            return;
        };

        if (props.variant === "create" && props.addCategory) {
            props.addCategory({
                file: result.data.file,
                category: result.data.category
            })
        } else if (props.variant === "edit" && props.updateCategory && props.category && isEditing) {
            props.updateCategory({
                id: props.category.id,
                file: result.data.file,
                category: result.data.category,
                removeImage: removeExistingImage
            })
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant={"secondary"}>
                    <SquarePen className="size-4 mr-2" />
                    {isEditing ? "Edit Category" : "Create Category"}
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{isEditing ? "Edit Category" : "Create Category"}</DialogTitle>
                </DialogHeader>
                <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-3">
                    <Controller
                        name="name"
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel htmlFor="form-rhf-demo-title">
                                    Category Name
                                </FieldLabel>
                                <Input
                                    {...field}
                                    id="form-rhf-demo-title"
                                    aria-invalid={fieldState.invalid}
                                    placeholder="Paintings"
                                    autoComplete="off"
                                />
                                {fieldState.invalid && (
                                    <FieldError errors={[fieldState.error]} />
                                )}
                            </Field>
                        )}
                    />
                    <Controller
                        name="code"
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel htmlFor="form-rhf-demo-title">
                                    Category Code
                                </FieldLabel>
                                <Input
                                    {...field}
                                    id="form-rhf-demo-title"
                                    aria-invalid={fieldState.invalid}
                                    placeholder="PNTG"
                                    autoComplete="off"
                                />
                                {fieldState.invalid && (
                                    <FieldError errors={[fieldState.error]} />
                                )}
                            </Field>
                        )}
                    />
                    <Controller
                        name="description"
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel htmlFor="form-rhf-demo-description">
                                    Description
                                </FieldLabel>
                                <InputGroup>
                                    <InputGroupTextarea
                                        {...field}
                                        id="form-rhf-demo-description"
                                        placeholder="Describe the category in short."
                                        rows={4}
                                        className="min-h-16 resize-none"
                                        aria-invalid={fieldState.invalid}
                                    />
                                    <InputGroupAddon align="block-end">
                                        <InputGroupText className="tabular-nums">
                                            {field.value.length}/500 characters
                                        </InputGroupText>
                                    </InputGroupAddon>
                                </InputGroup>
                                {fieldState.invalid && (
                                    <FieldError errors={[fieldState.error]} />
                                )}
                            </Field>
                        )}
                    />
                    <UploadCategoryImage
                        file={fileState.files[0] ?? null}
                        previewUrl={previewUrl}
                        errors={fileState.errors}
                        onRemoveFile={() => fileActions.removeFile(fileState.files[0]?.id)}
                        onRemoveExistingImage={() => setRemoveExistingImage(true)}
                        getInputProps={fileActions.getInputProps}
                        handleDragEnter={fileActions.handleDragEnter}
                        handleDragLeave={fileActions.handleDragLeave}
                        handleDragOver={fileActions.handleDragOver}
                        handleDrop={fileActions.handleDrop}
                        openFileDialog={fileActions.openFileDialog}
                        isDragging={fileState.isDragging}
                        className="mt-4 mb-2"
                        rhfFileError={form.formState.errors.root?.file?.message}
                    />
                    <DialogFooter>
                        <DialogClose>Close</DialogClose>
                        <Button
                            type="submit"
                            disabled={
                                props.variant === "create"
                                    ? props.isAddingCategory
                                    : props.isUpdatingCategory
                            }>
                            {props.variant === "edit" ? "Update Category" : "Add Category"}
                        </Button>
                        {props.variant === "create"
                            && props.addCategoryError
                            && <p className="text-destructive">
                                {props.addCategoryError.message}
                            </p>
                        }
                        {props.variant === "edit"
                            && props.updateCategoryError
                            && <p className="text-destructive">
                                {props.updateCategoryError.message}
                            </p>
                        }
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}

export default CreateCategoryDialog
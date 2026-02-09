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
import { useEffect } from "react"

interface CreateCategoryDialogProps {
    addCategory: ({ file, category }: { category: z.infer<typeof createCategorySchema>, file: FileWithPreview }) => void;
    isAddingCategory: boolean;
    addCategoryError: any;
    open?: boolean;
    setOpen?: (open: boolean) => void;
    isAddingCategorySuccess: boolean;
}

const maxSize = MAX_FILE_SIZE;

const CreateCategoryDialog = ({
    addCategory,
    isAddingCategory,
    addCategoryError,
    open,
    setOpen,
    isAddingCategorySuccess
}: CreateCategoryDialogProps) => {

    const [
        fileState,
        fileActions
    ] = useFileUpload({
        maxFiles: 1,
        maxSize,
        multiple: false,
        accept: "image/*"
    });

    const form = useForm<z.infer<typeof createCategorySchema>>({
        resolver: zodResolver(createCategorySchema),
        defaultValues: {
            name: "",
            code: "",
            description: "",
        }
    });

    useEffect(() => {
        if (isAddingCategorySuccess) {
            form.reset();
        }
    }, [addCategory, isAddingCategorySuccess])

    const onSubmit = () => {
        const file = fileState.files[0];

        const result = createCategoryFormSchema.safeParse({
            category: form.getValues(),
            file: file
        })

        if (!result.success) {
            console.log("error: ", result.error);

            const fileErrors = result.error.flatten().fieldErrors.file;

            if (fileErrors?.length) {
                form.setError("root.files", {
                    type: "manual",
                    message: fileErrors[0]
                })
            }
            return;
        };
        if (!addCategory) return;

        addCategory({
            file: result.data.file,
            category: result.data.category
        })
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant={"secondary"}>Add Category</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Create Category</DialogTitle>
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
                </form>
                <UploadCategoryImage
                    file={fileState.files[0] ?? null}
                    errors={fileState.errors}
                    onRemoveFile={() => fileActions.removeFile(fileState.files[0]?.id)}
                    getInputProps={fileActions.getInputProps}
                    handleDragEnter={fileActions.handleDragEnter}
                    handleDragLeave={fileActions.handleDragLeave}
                    handleDragOver={fileActions.handleDragOver}
                    handleDrop={fileActions.handleDrop}
                    openFileDialog={fileActions.openFileDialog}
                    isDragging={fileState.isDragging}
                    className="mt-4 mb-2" />
                <DialogFooter>
                    <DialogClose>Close</DialogClose>
                    <Button disabled={isAddingCategory} onClick={onSubmit}>
                        Add Category
                    </Button>
                    {addCategoryError && <p className="text-destructive">{addCategoryError.message}</p>}
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default CreateCategoryDialog
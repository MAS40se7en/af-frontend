import { Controller, useForm } from "react-hook-form"
import UploadArtworkImages from "./upload-artwork-images"
import z from "zod"
import { createArtworkFormSchema, createArtworkSchema, MAX_FILE_SIZE } from "@/lib/zod-schemas"
import { zodResolver } from "@hookform/resolvers/zod"
import { useArtworks } from "@/hooks/use-artworks"
import { useFileUpload } from "@/hooks/use-file-upload"
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { InputGroup, InputGroupAddon, InputGroupText, InputGroupTextarea } from "@/components/ui/input-group"
import { Button } from "@/components/ui/button"
import UseCategories from "@/hooks/use-categories"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useLocation } from "react-router-dom"

const maxSize = MAX_FILE_SIZE;

const maxFiles = 5

function CreateArtworkForm() {
  const { addArtwork } = useArtworks();
  const { categories, isPending } = UseCategories();
  const location = useLocation();
  const { from } = location.state || {};

  const [
    fileState,
    fileActions
  ] = useFileUpload({
    maxFiles,
    maxSize,
    multiple: true,
    initialFiles: [],
  });

  const form = useForm<z.infer<typeof createArtworkSchema>>({
    resolver: zodResolver(createArtworkSchema),
    defaultValues: {
      title: "",
      description: "",
      categoryId: from || undefined
    }
  });

  const onSubmit = () => {

    const validatedFiles = fileActions.getFilesForValidation();

    const filesWithOrder = validatedFiles.map((f, i) => ({
      ...f,
      order: i
    }));

    const result = createArtworkFormSchema.safeParse({
      artwork: form.getValues(),
      files: filesWithOrder
    })

    console.log(fileState.files)
    if (!result.success) {
      console.log(result.error);

      const fileErrors = result.error.flatten().fieldErrors.files;

      if (fileErrors?.length) {
        form.setError("root.files", {
          type: "manual",
          message: fileErrors[0]
        })
      }
      return;
    };
    if (!addArtwork) return;

    addArtwork({
      artwork: result.data.artwork,
      files: result.data.files
    });
  };

  return (
    <div className="flex flex-col gap-4">
      <UploadArtworkImages
        fileState={fileState}
        fileActions={fileActions}
        maxFiles={maxFiles}
        maxSize={maxSize}
      />
      <div>
        <form id="form-rhf-demo" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup className="mb-5">
            <Controller
              name="title"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-rhf-demo-title">
                    Artwork Title
                  </FieldLabel>
                  <Input
                    {...field}
                    id="form-rhf-demo-title"
                    aria-invalid={fieldState.invalid}
                    placeholder="Give your artwork a title."
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
                      placeholder="Describe your artwork how you see like."
                      rows={6}
                      className="min-h-24 resize-none"
                      aria-invalid={fieldState.invalid}
                    />
                    <InputGroupAddon align="block-end">
                      <InputGroupText className="tabular-nums">
                        {field.value.length}/1500 characters
                      </InputGroupText>
                    </InputGroupAddon>
                  </InputGroup>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="categoryId"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-rhf-demo-category">
                    Category
                  </FieldLabel>
                  <InputGroup>
                    <Select
                      value={field.value ? String(field.value) : undefined}
                      onValueChange={(value) => field.onChange(Number(value))}
                    >
                      <SelectTrigger className="w-full" aria-invalid={fieldState.invalid} disabled={isPending}>
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Categories</SelectLabel>
                          {categories?.map((category) => (
                            <SelectItem
                              key={category.id}
                              value={String(category.id)}
                            >
                              {category.name}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </InputGroup>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>
          <Button type="submit" className="w-full">
            Create New Artwork
          </Button>
        </form>
      </div>
    </div>
  )
}

export default CreateArtworkForm
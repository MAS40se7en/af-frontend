import { useArtwork, useArtworks } from "@/hooks/use-artworks";
import { useFileUpload } from "@/hooks/use-file-upload";
import { createArtworkFormSchema, createArtworkSchema, MAX_FILE_SIZE } from "@/lib/zod-schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import type z from "zod";
import UploadArtworkImages from "./upload-artwork-images";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { InputGroup, InputGroupAddon, InputGroupText, InputGroupTextarea } from "@/components/ui/input-group";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import UseCategories from "@/hooks/use-categories";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";

const maxSize = MAX_FILE_SIZE;

const EditArtworkForm = () => {
  const { artworkId } = useParams();
  const { artwork, artworkError, artworkImagesToFileMetadeta } = useArtwork(Number(artworkId));
  const { categories, isPending } = UseCategories();

  const { updateArtwork, updateArtworkError, isUpdatingArtwork, isUpdatingArtworkError } = useArtworks();

  const maxFiles = 10 - artwork.images.length;

  const form = useForm<z.infer<typeof createArtworkSchema>>({
    resolver: zodResolver(createArtworkSchema),
    defaultValues: {
      title: "",
      description: "",
      categoryId: undefined
    }
  });

  useEffect(() => {
    if (artwork) {
      form.reset({
        title: artwork.title,
        description: artwork.description,
        categoryId: artwork.category ? artwork.category.id : undefined
    })
  }

    return
  }, [artwork, form]);

  const [
    fileState,
    fileActions,
    //_avatarActions,
  ] = useFileUpload({
    maxFiles: artwork.images.length > 0 ? 10 - artwork.images.length : 10,
    multiple: true,
    accept: 'image/*',
    initialFiles: artwork?.images ? artworkImagesToFileMetadeta(artwork.images) : [],
  });

  if (!artwork || artworkError) {
    return <div>{artworkError?.message}</div>;
  }

  if (!categories || categories.length === 0) {
    return <div>Loading...</div>;
  }


  const handleSubmit = () => {
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
          type: "manuel",
          message: fileErrors[0]
        })
      }
      return;
    };
    if (!updateArtwork) return;

    updateArtwork({
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
        <form id="form-rhf-demo" onSubmit={form.handleSubmit(handleSubmit)}>
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
          {form.formState.errors.root?.files && (
            <FieldError errors={[form.formState.errors.root?.files]} />
          )}
          {isUpdatingArtworkError && updateArtworkError && (
            <FieldError errors={[updateArtworkError]} />
          )}
          <Button type="submit" className="w-full" disabled={isUpdatingArtwork}>
            Save Changes
          </Button>
        </form>
      </div>
    </div>
  )
}

export default EditArtworkForm
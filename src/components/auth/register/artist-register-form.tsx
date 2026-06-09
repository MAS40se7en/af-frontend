import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form"
import { Textarea } from "@/components/ui/textarea"
import { formatBytes, useFileUpload } from "@/hooks/use-file-upload"
import { cn } from "@/lib/utils"
import { artistRegisterFormSchema, MAX_FILE_SIZE, registerFormSchema } from "@/lib/zod-schemas"
import { zodResolver } from "@hookform/resolvers/zod"
import { ArrowLeft, CircleAlertIcon, UserIcon, XIcon } from "lucide-react"
import { useEffect } from "react"
import { ErrorBoundary } from "react-error-boundary"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import z from "zod"

interface Props {
  values: z.infer<typeof registerFormSchema>;
  className?: string
}

const ArtistRegisterForm = ({ values, className }: Props) => {
  if (!values) return <ErrorBoundary fallback={<div>error</div>} />;

  const navigate = useNavigate();

  const form = useForm<z.infer<typeof artistRegisterFormSchema>>({
    resolver: zodResolver(artistRegisterFormSchema),
    defaultValues: {
      firstName: values.firstName,
      lastName: values.lastName,
      username: values.username,
      email: values.email,
      password: values.password,
      passwordConfirm: values.passwordConfirm,
      biography: "",
      image: undefined
    }
  });

  const [
    { files, isDragging, errors },
    {
      removeFile,
      handleDragEnter,
      handleDragLeave,
      handleDragOver,
      handleDrop,
      openFileDialog,
      getInputProps
    },
  ] = useFileUpload({
    maxFiles: 1,
    multiple: false
  });

  const currentFile = files[0];
  const previewUrl = currentFile?.preview || undefined;

  useEffect(() => {
    const file = currentFile?.file;

    if (file instanceof File && form.getValues("image") === undefined) {
      form.setValue("image", file, {
        shouldValidate: true,
        shouldDirty: true
      });
    }
  }, [currentFile, form])

  const handleRemove = () => {
    if (currentFile) {
      removeFile(currentFile.id);
      form.resetField("image");
    }
  }

  return (
    <div className="flex flex-col justify-between items-start gap-5">
      <div className="flex flex-col gap-3">
        <div className="text-muted-foreground text-sm">
          You are now registering as an Artist which will allow you to create and manage your own Artworks.
        </div>
        <Form {...form}>
          <form className="flex flex-col gap-4">
            <FormField
              control={form.control}
              name="image"
              render={({ field, fieldState }) => (
                <FormItem className="flex flex-col gap-3">
                  <FormLabel>Profile Image</FormLabel>
                  <FormControl>
                    <div className={cn("flex flex-col items-center gap-4", className)}>
                      {/* Avatar Preview */}
                      <div className="relative">
                        <div
                          className={cn(
                            "group/avatar relative h-24 w-24 cursor-pointer overflow-hidden rounded-full border border-dashed transition-colors",
                            isDragging
                              ? "border-primary bg-primary/5"
                              : fieldState.error
                                ? "border-destructive"
                                : "border-muted-foreground/25 hover:border-muted-foreground/20",
                            previewUrl && "border-solid"
                          )}
                          onDragEnter={handleDragEnter}
                          onDragLeave={handleDragLeave}
                          onDragOver={handleDragOver}
                          onDrop={handleDrop}
                          onClick={openFileDialog}
                        >
                          <input
                            {...getInputProps({
                              onChange: (e) => {
                                const file = e.target.files?.[0];

                                if (file) {
                                  field.onChange(file);
                                }
                              }
                            })}
                            className="sr-only" />
                          {previewUrl ? (
                            <img
                              src={previewUrl}
                              alt="Avatar"
                              className="h-full w-full object-cover"
                            />
                          ) : (
                            <div className="flex h-full w-full items-center justify-center">
                              <UserIcon className="text-muted-foreground size-6" />
                            </div>
                          )}
                        </div>
                        {/* Remove Button - only show when file is uploaded */}
                        {currentFile && (
                          <Button
                            size="icon"
                            variant="outline"
                            onClick={handleRemove}
                            className="absolute end-0.5 top-0.5 z-10 size-6 rounded-full dark:bg-zinc-800 hover:dark:bg-zinc-700"
                            aria-label="Remove avatar"
                          >
                            <XIcon className="size-3.5 mx-auto" />
                          </Button>
                        )}
                      </div>
                      {/* Upload Instructions */}
                      <div className="space-y-0.5 text-center">
                        <p className="text-sm font-medium">
                          {currentFile ? "Avatar uploaded" : "Upload avatar"}
                        </p>
                        <p className="text-muted-foreground text-xs">
                          PNG, JPG up to {formatBytes(MAX_FILE_SIZE)}
                        </p>
                      </div>
                      {fieldState.error && (
                        <p className="text-sm text-destructive">
                          {fieldState.error.message}
                        </p>
                      )}
                      {/* Error Messages */}
                      {errors.length > 0 && (
                        <Alert variant="destructive" className="mt-5">
                          <CircleAlertIcon />
                          <AlertTitle>File upload error(s)</AlertTitle>
                          <AlertDescription>
                            {errors.map((error, index) => (
                              <p key={index} className="last:mb-0">
                                {error}
                              </p>
                            ))}
                          </AlertDescription>
                        </Alert>
                      )}
                    </div>
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="biography"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="mb-2">Biography</FormLabel>
                  <FormControl>
                    <Textarea className="min-h-30" rows={10} placeholder="Your biography" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </div>

      <Button variant="ghost" onClick={() => navigate(-1)}>
        <ArrowLeft /> Go back
      </Button>
    </div>
  )
}

export default ArtistRegisterForm
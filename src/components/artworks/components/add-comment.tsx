import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldGroup } from "@/components/ui/field";
import { InputGroup, InputGroupAddon, InputGroupText, InputGroupTextarea } from "@/components/ui/input-group";
import { commentSchema } from "@/lib/zod-schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form"
import type z from "zod";

interface AddCommentProps {
  artworkId: number;
  postComment?: ({artworkId, comment}: {artworkId: number, comment: z.infer<typeof commentSchema>}) => void;
  postCommentSuccess?: boolean;
  postCommentError?: any;
  isPostingComment?: boolean;
  isPostingCommentError?: boolean;
}

const AddComment = ({
  artworkId,
  postComment,
  postCommentSuccess,
  postCommentError,
  isPostingComment,
}: AddCommentProps) => {
  const form = useForm<z.infer<typeof commentSchema>>({
    resolver: zodResolver(commentSchema),
    defaultValues: {
      comment: ""
    }
  });

  useEffect(() => {
    if (postCommentSuccess) {
      form.reset();
    }
  }, [postCommentSuccess]);

  function onSubmit(values: z.infer<typeof commentSchema>) {
    if (!values || !postComment) return;

    postComment({artworkId, comment: values});
  }
  return (
    <form id="form-rhf-demo" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup className="mb-5">
            <Controller
              name="comment"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <InputGroup>
                    <InputGroupTextarea
                      {...field}
                      id="form-rhf-demo-description"
                      placeholder="Write in your comment here..."
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
                    <FieldError errors={[fieldState.error || postCommentError]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>
          <Button disabled={isPostingComment} type="submit" className="w-full">
            Post Comment
          </Button>
        </form>
  )
}

export default AddComment
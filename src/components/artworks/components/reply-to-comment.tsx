import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldGroup } from "@/components/ui/field";
import { InputGroup, InputGroupAddon, InputGroupInput, InputGroupText } from "@/components/ui/input-group";
import { replySchema } from "@/lib/zod-schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { MessageCircleReply } from "lucide-react";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import type z from "zod";

interface ReplyToCommentProps {
    artworkId: number;
    commentId: number;
    postReply?: ({ commentId, reply, artworkId }: { commentId: number, reply: z.infer<typeof replySchema>, artworkId: number }) => void;
    isPostingReply: boolean,
    isPostingReplyError: boolean,
    postReplyError: any
    postReplySuccess: boolean
}

const ReplyToComment = ({ 
    artworkId, 
    commentId, 
    postReply, 
    isPostingReply, 
    postReplyError, 
    postReplySuccess 
}: ReplyToCommentProps) => {
    const form = useForm<z.infer<typeof replySchema>>({
        resolver: zodResolver(replySchema),
        defaultValues: {
            reply: ""
        }
    });

    useEffect(() => {
        if (postReplySuccess) {
            form.reset();
        }
    }, [postReply, postReplySuccess]);

    const onSubmit = (values: z.infer<typeof replySchema>) => {
        if (!values || !postReply) return;
        postReply({commentId, reply: values, artworkId});
    }

    return (
        <form id="form-rhf-demo" onSubmit={form.handleSubmit(onSubmit)} className="flex gap-2 h-fit px-5 w-4/5">
          <FieldGroup className="mb-3">
            <Controller
              name="reply"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <InputGroup className="flex items-center ">
                    <InputGroupInput
                      {...field}
                      id="form-rhf-demo-description"
                      placeholder="Write in your reply here..."
                      className="resize-none"
                      aria-invalid={fieldState.invalid}
                    />
                    <InputGroupAddon align={"inline-end"}>
                      <InputGroupText className="tabular-nums text-xs">
                        {field.value.length}/1000
                      </InputGroupText>
                    </InputGroupAddon>
                  </InputGroup>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error || postReplyError]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>
          <Button disabled={isPostingReply} variant={"secondary"} type="submit" className="rounded-full px-0">
            <MessageCircleReply className="size-5" />
          </Button>
        </form>
    )
}

export default ReplyToComment
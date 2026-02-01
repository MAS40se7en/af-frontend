import { getComments, removeComment } from "@/services/commentService"
import { useMutation, useSuspenseQuery } from "@tanstack/react-query"
import { addComment } from "@/services/artworkService"
import { toast } from "sonner"
import { queryClient } from "@/lib/tanstack"
import { Ban } from "lucide-react"
import type { commentSchema } from "@/lib/zod-schemas"
import type z from "zod"
import type { User } from "./use-artworks"

export type Comment = {
    id: number;
    text: string;
    user: User;
    createdAt: Date;
    updatedAt: Date;
}

export type CommentActions = {
    deleteComment: (commentId: number) => void,
    isDeletingComment: boolean,
    isDeletingCommentSuccess: boolean,
    deleteCommentError: any,

    postComment?: ({artworkId, comment}: {artworkId: number, comment: z.infer<typeof commentSchema>}) => void;
    isPostingComment: boolean,
    isPostingCommentError: boolean,
    postCommentError: any,
    postCommentSuccess: boolean,
}

const useCommentsActions = (): CommentActions => {
    const {
        mutate: deleteComment,
        isPending: isDeletingComment,
        isSuccess: isDeletingCommentSuccess,
        error: deleteCommentError
    } = useMutation({
        mutationKey: ['delete-comment'],
        mutationFn: removeComment
    })

    const {
        mutate: postComment,
        isPending: isPostingComment,
        isError: isPostingCommentError,
        error: postCommentError,
        isSuccess: postCommentSuccess
    } = useMutation({
        mutationKey: ['add-comment'],
        mutationFn: addComment,
        onSuccess: (artworkId) => {
            toast.success('Comment added successfully.');
            queryClient.invalidateQueries({ queryKey: ['artwork', artworkId] });
            queryClient.invalidateQueries({ queryKey: ['my-artworks'] });
            queryClient.invalidateQueries({ queryKey: ['fetch-user'] });
        },
        onError: (error: any) => {
            console.error('Error adding comment', error);
            toast('Error adding comment.', {
                description: error.response?.data || error.message,
                icon: <Ban className="text-destructive mr-4" />,
            });
        }
    })

  return {
    deleteComment,
    isDeletingComment,
    isDeletingCommentSuccess,
    deleteCommentError,

    postComment,
    isPostingComment,
    isPostingCommentError,
    postCommentError,
    postCommentSuccess
  }
}

export const useGetComments = (artworkId: number): {
    comments: Comment[],
    commentsError: any,
    refetchComments: () => void
} => {
    const {
        data: comments,
        error: commentsError,
        refetch: refetchComments
    } = useSuspenseQuery({
        queryKey: ['comments', artworkId],
        queryFn: getComments
    });

    return { comments, commentsError, refetchComments }
}

export default useCommentsActions
import { addReply, getComments, removeComment, removeReply } from "@/services/commentService"
import { useMutation, useSuspenseQuery } from "@tanstack/react-query"
import { addComment } from "@/services/artworkService"
import { toast } from "sonner"
import { queryClient } from "@/lib/tanstack"
import { Ban } from "lucide-react"
import type { commentSchema, replySchema } from "@/lib/zod-schemas"
import type z from "zod"
import type { User } from "./use-artworks"
import { useState } from "react"

export type Reply = {
    id: number;
    text: string;
    user: User;
    createdAt: Date;
    updatedAt: Date;
}

export type Comment = {
    id: number;
    text: string;
    user: User;
    replies: Reply[];
    createdAt: Date;
    updatedAt: Date;
}

export type ReplyActions = {
    postReply?: ({ commentId, reply, artworkId }: { commentId: number, reply: z.infer<typeof replySchema>, artworkId: number }) => void;
    isPostingReply: boolean,
    isPostingReplyError: boolean,
    postReplyError: any
    postReplySuccess: boolean
    lastRepliedCommentId: number | null;
    deleteReply: ({ commentId, replyId, artworkId }: { commentId: number, replyId: number, artworkId: number }) => void,
    isDeletingReply: boolean,
    isDeletingReplySuccess: boolean,
    deleteReplyError: any
}

export type CommentActions = {
    deleteComment: (commentId: number) => void,
    isDeletingComment: boolean,
    isDeletingCommentSuccess: boolean,
    deleteCommentError: any,

    postComment?: ({ artworkId, comment }: { artworkId: number, comment: z.infer<typeof commentSchema> }) => void;
    isPostingComment: boolean,
    isPostingCommentError: boolean,
    postCommentError: any,
    postCommentSuccess: boolean,
}

const useCommentsActions = (): [CommentActions, ReplyActions] => {
    const [lastRepliedCommentId, setLastRepliedCommentId] = useState<number | null>(null);
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

    const {
        mutate: postReply,
        isPending: isPostingReply,
        isError: isPostingReplyError,
        error: postReplyError,
        isSuccess: postReplySuccess
    } = useMutation({
        mutationKey: ['add-reply'],
        mutationFn: addReply,
        onSuccess: ({ artworkId, commentId }) => {
            toast.success('Reply added successfully.');
            setLastRepliedCommentId(commentId);
            queryClient.invalidateQueries({ queryKey: ['artwork', artworkId] });
            queryClient.invalidateQueries({ queryKey: ['my-artworks'] });
            queryClient.invalidateQueries({ queryKey: ['fetch-user'] });
        },
        onError: (error: any) => {
            console.error('Error adding reply', error);
            toast('Error adding reply.', {
                description: error.response?.data || error.message,
                icon: <Ban className="text-destructive mr-4" />,
            });
        }
    });

    const {
        mutate: deleteReply,
        isPending: isDeletingReply,
        isSuccess: isDeletingReplySuccess,
        error: deleteReplyError
    } = useMutation({
        mutationKey: ['delete-reply'],
        mutationFn: removeReply,
        onSuccess: ({ artworkId, commentId }) => {
            toast.success('Reply deleted successfully.');
            setLastRepliedCommentId(commentId);
            queryClient.invalidateQueries({ queryKey: ['artwork', artworkId] });
            queryClient.invalidateQueries({ queryKey: ['my-artworks'] });
            queryClient.invalidateQueries({ queryKey: ['fetch-user'] });
        },
        onError: (error: any) => {
            console.error('Error deleting reply', error);
            toast('Error deleting reply.', {
                description: error.response?.data || error.message,
                icon: <Ban className="text-destructive mr-4" />,
            });
        }
    })

    return [
        {
            deleteComment,
            isDeletingComment,
            isDeletingCommentSuccess,
            deleteCommentError,

            postComment,
            isPostingComment,
            isPostingCommentError,
            postCommentError,
            postCommentSuccess,
        }, {
            postReply,
            isPostingReply,
            isPostingReplyError,
            postReplyError,
            postReplySuccess,
            lastRepliedCommentId,

            deleteReply,
            isDeletingReply,
            isDeletingReplySuccess,
            deleteReplyError
        }
    ]
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
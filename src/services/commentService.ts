import { api } from "@/lib/axios";
import type { replySchema } from "@/lib/zod-schemas";
import type { QueryFunctionContext } from "@tanstack/react-query";
import type z from "zod";

export const removeComment = async (commentId: number) => {
    const response = await api.delete('/comments/delete/' + commentId);

    return response.data;
}

export const getComments = async (
    { queryKey }: QueryFunctionContext<[string, number]>
) => {
    const [, artworkId] = queryKey;

    const response = await api.get('/comments/' + artworkId);

    return response.data;
}

export const addReply = async ({ commentId, reply, artworkId }: { commentId: number, reply: z.infer<typeof replySchema>, artworkId: number }) => {
    const response = await api.post('/comment-replies/create/' + artworkId + '/' + commentId, reply);

    return response.data;
}

export const removeReply = async ({ commentId, replyId, artworkId }: { commentId: number, replyId: number, artworkId: number }) => {
    const response = await api.delete('/comment-replies/' + replyId + '/' + commentId + '/' + artworkId);

    return response.data;
}
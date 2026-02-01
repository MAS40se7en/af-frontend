import { api } from "@/lib/axios";
import type { QueryFunctionContext } from "@tanstack/react-query";

export const removeComment = async (commentId: number) => {
    const response = await api.delete('/comments/' + commentId);

    return response.data;
}

export const getComments = async (
    { queryKey }: QueryFunctionContext<[string, number]>
) => {
    const [, artworkId] = queryKey;

    const response = await api.get('/comments/' + artworkId);

    return response.data;
}
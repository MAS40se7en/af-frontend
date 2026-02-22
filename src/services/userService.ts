import { api } from "@/lib/axios"

export const getHighlightedArtists = async () => {
    const response = await api.get("/users/highlighted");
    return response.data;
}
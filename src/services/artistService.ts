import { api } from "@/lib/axios";

export const fetchHighlightedArtists = async () => {
    const response = await api.get('/artists/get-highlighted')

    return response.data;
}
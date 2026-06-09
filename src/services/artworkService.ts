import type z from "zod";
import { isNativeFile, type FileWithPreview } from "@/hooks/use-file-upload";
import { api } from "@/lib/axios";
import type { commentSchema, createArtworkSchema } from "@/lib/zod-schemas";
import type { QueryFunctionContext } from "@tanstack/react-query";
import type { ArtworkList } from "@/hooks/use-artworks";

export const createArtwork = async ({ files, artwork }: { files: FileWithPreview[], artwork: z.infer<typeof createArtworkSchema> }) => {
    console.log('Artwork added successfully', files, artwork);
    const formData = new FormData();

    formData.append('artwork',
        new Blob([JSON.stringify(artwork)], { type: 'application/json' })
    );

    formData.append(
        'orderMetadata',
        new Blob(
            [JSON.stringify(
                files.map(f => ({
                    id: f.id,
                    order: f.order
                }))
            )],
            { type: 'application/json' }
        )
    )

    files.forEach(f => {
        if (isNativeFile(f.file)) {
            formData.append('newImages', f.file);
            formData.append('newImageIds', f.id);
        }
    })

    console.log("full form data: ", [...formData.entries()]);

    const response = await api.post('/artworks/create-artwork', formData);

    return response.data;
}

export const updateArtworkDetails = async ({ files, artwork }: { files: FileWithPreview[], artwork: z.infer<typeof createArtworkSchema> }) => {
    const formData = new FormData();

    formData.append('artwork', JSON.stringify(artwork));

    formData.append(
        'orderMetadata',
        JSON.stringify(
            files.map(f => ({
                id: f.id,
                order: f.order
            }))
        )
    )

    files.forEach(f => {
        if (isNativeFile(f.file)) {
            formData.append('newImages', f.file);
            formData.append('newImageIds', f.id);
        }
    })

    const response = await api.put('/artworks', formData);

    return response.data;
}

export const removeArtwork = async (artworkId: number) => {

    const response = await api.delete(
        '/artworks/' + artworkId
    );

    return response.data;
}

export const fetchMyArtworks = async () => {
    const response = await api.get('/artworks/my-artworks')

    return response.data;
}

export const fetchArtworks = async (
    { queryKey }: QueryFunctionContext<[string | undefined, string | undefined]>
): Promise<ArtworkList[]> => {
    const [, search] = queryKey;

    const response = await api.get('/artworks', {
        params: {
            search
        }
    })

    return response.data;
}

export const fetchHighlightedArtworks = async () => {
    const response = await api.get('/artworks/highlighted')

    return response.data;
}

export const fetchArtwork = async (
    { queryKey }: QueryFunctionContext<[string, number]>
) => {
    const [, artworkId] = queryKey;
    
    const response = await api.get('/artworks/' + artworkId)

    return response.data;
}

export const addComment = async ({artworkId, comment}: {artworkId: number, comment: z.infer<typeof commentSchema>}) => {
    const response = await api.post('/comments/create/' + artworkId, comment);

    return response.data;
}

export const addLike = async (artworkId: number) => {
    const response = await api.post('/likes/like/' + artworkId);

    return response.data;
}

export const removeLike = async (artworkId: number) => {
    const response = await api.delete('/likes/unlike/' + artworkId);

    return response.data;
}
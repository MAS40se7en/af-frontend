import type z from "zod";
import { isNativeFile, type FileWithPreview } from "@/hooks/use-file-upload";
import { api } from "@/lib/axios";
import type { createArtworkSchema } from "@/lib/zod-schemas";

export const createArtwork = async ({ files, artwork }: { files: FileWithPreview[], artwork: z.infer<typeof createArtworkSchema> }) => {
    console.log('Artwork added successfully', files, artwork);
    return;
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

    const response = await api.post('/artworks', formData);

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

    const response = await api.delete('/artworks/' + artworkId);

    return response.data;
}

export const fetchMyArtworks = async () => {
    const response = await api.get('/artworks/my-artworks')

    return response.data;
}
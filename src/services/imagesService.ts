import { isNativeFile, type FileWithPreview } from "@/hooks/use-file-upload";
import { api } from "@/lib/axios";

export const updateProfilePhoto = async (file: File) => {
    console.log("image data: ", file);

    const formData = new FormData();
    formData.append('imageFile', file);

    const response = await api.post('/users/update-profile-photo', formData);

    return response.data;
}

export const saveArtworkImages = async (files: FileWithPreview[]) => {
    const formData = new FormData();

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

    const response = await api.post('/users/update-profile-photo', formData);

    return response.data;
}
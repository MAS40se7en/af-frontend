import { api } from "../lib/axios";

export const updateProfilePhoto = async (file: File) => {
    console.log("image data: ", file);

    const formData = new FormData();
    formData.append('imageFile', file);

    const response = await api.post('/users/update-profile-photo', formData);

    return response.data;
}
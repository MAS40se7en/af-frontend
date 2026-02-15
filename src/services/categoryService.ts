import { isNativeFile, type FileWithPreview } from "@/hooks/use-file-upload";
import { api } from "@/lib/axios"
import type { createCategorySchema } from "@/lib/zod-schemas";
import type { QueryFunctionContext } from "@tanstack/react-query";
import z from "zod";

export const getCategories = async () => {
    const response = await api.get('/categories')
    return await response.data;
}

export const createCategory = async ({ file, category }: { file: FileWithPreview, category: z.infer<typeof createCategorySchema> }) => {
    const formData = new FormData();

    formData.append(
        "category",
        new Blob([JSON.stringify(category)], { type: "application/json" })
    );

    if (isNativeFile(file.file)) {
        formData.append('image', file.file);
    }

    const response = await api.post('/categories/create-category', formData);

    return response.data;
}

export const editCategory = async ({ id, file, category, removeImage }: { id: number, file?: FileWithPreview, category: z.infer<typeof createCategorySchema>, removeImage?: boolean }) => {
    const formData = new FormData();
    console.log("editCategory called with: ", { id, file, category, removeImage });
    formData.append(
        "category",
        new Blob([JSON.stringify(category)], { type: "application/json" })
    );

    formData.append(
            'removeImage', 
            new Blob([JSON.stringify(removeImage ? 'true' : 'false')], { type: "application/json" })
        );

    if (file && isNativeFile(file.file)) {
        formData.append('image', file.file);
    }

    const response = await api.put('/categories/edit-category/' + id, formData);

    return response.data;
}

export const getCategory = async (
    { queryKey }: QueryFunctionContext<[string, number]>
) => {
    const [, categoryId] = queryKey;

    const response = await api.get('/categories/' + categoryId);

    return response.data;
}

export const deleteCategory = async (categoryId: number) => {
    const response = await api.delete('/categories/' + categoryId);

    return response.data;
}
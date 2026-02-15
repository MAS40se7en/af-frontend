import type { createCategorySchema } from "@/lib/zod-schemas";
import { createCategory, deleteCategory, editCategory, getCategories, getCategory } from "@/services/categoryService";
import { useMutation, useSuspenseQuery } from "@tanstack/react-query";
import type { FileWithPreview } from "./use-file-upload";
import type z from "zod";
import type { ArtworkList } from "./use-artworks";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { queryClient } from "@/lib/tanstack";

export type Category = {
    id: number;
    name: string;
    code: string;
    description: string;
    imageUrl: string;
    artWorksCount: number;
    artWorks: ArtworkList[]
    createdAt: Date
    updatedAt: Date
}

export type CategoryList = {
    id: number;
    name: string;
    code: string;
    imageUrl: string;
    artWorkCount: number;
    createdAt: Date
}

export type categoryActions = {
    categories: CategoryList[],
    isPending: boolean,
    error: any,
    addCategory: ({ file, category }: { category: z.infer<typeof createCategorySchema>, file: FileWithPreview }) => void;
    refetchCategories: () => void
    isAddingCategory: boolean,
    isAddingCategoryError: boolean,
    addCategoryError: any,
    isAddingCategorySuccess: boolean,
    updateCategory: ({ id, file, category, removeImage }: { id: number, category: z.infer<typeof createCategorySchema>, file: FileWithPreview, removeImage?: boolean }) => void,
    isUpdatingCategory: boolean,
    isUpdatingCategoryError: boolean,
    updateCategoryError: any,
    isUpdatingCategorySuccess: boolean,
    destroyCategory: (id: number) => void,
    isDeletingCategory: boolean,
    isDeletingCategoryError: boolean,
    deleteCategoryError: any,
    isDeletingCategorySuccess: boolean
}

function useCategories(): categoryActions {
    const navigate = useNavigate();

    const {
        data: categories,
        isPending,
        error,
        refetch: refetchCategories
    } = useSuspenseQuery({
        queryKey: ['fetch-categories'],
        queryFn: getCategories,
    });

    const {
        mutate: addCategory,
        isPending: isAddingCategory,
        isError: isAddingCategoryError,
        error: addCategoryError,
        isSuccess: isAddingCategorySuccess
    } = useMutation({
        mutationKey: ['add-category'],
        mutationFn: createCategory
    });

    const {
        mutate: updateCategory,
        isPending: isUpdatingCategory,
        isError: isUpdatingCategoryError,
        error: updateCategoryError,
        isSuccess: isUpdatingCategorySuccess
    } = useMutation({
        mutationKey: ['update-category'],
        mutationFn: editCategory,
        onSuccess: ({ id: updatedCategoryId }) => {
            toast.success('Category updated successfully.');
            queryClient.invalidateQueries({ queryKey: ['fetch-category', updatedCategoryId] });
        },
        onError: (e) => {
            console.error('Error updating category:', e);
            toast.error('Error updating category.');
        }
    })

    const {
        mutate: destroyCategory,
        isPending: isDeletingCategory,
        isError: isDeletingCategoryError,
        error: deleteCategoryError,
        isSuccess: isDeletingCategorySuccess
    } = useMutation({
        mutationKey: ['delete-category'],
        mutationFn: deleteCategory,
        onSuccess: () => {
            console.log('Category deleted successfully');
            toast.success('Category deleted successfully.');
            queryClient.invalidateQueries({ queryKey: ['fetch-categories'] });

            navigate('/categories');
        }
    })


    return {
        categories,
        isPending,
        error,
        addCategory,
        refetchCategories,
        isAddingCategory,
        isAddingCategoryError,
        addCategoryError,
        isAddingCategorySuccess,
        updateCategory,
        isUpdatingCategory,
        isUpdatingCategoryError,
        updateCategoryError,
        isUpdatingCategorySuccess,
        destroyCategory,
        isDeletingCategory,
        isDeletingCategoryError,
        deleteCategoryError,
        isDeletingCategorySuccess
    }
}

export const useCategory = (categoryId: number): {
    category: Category,
    categoryError: any,
    refetchCategory: () => void
} => {
    const {
        data: category,
        error: categoryError,
        refetch: refetchCategory
    } = useSuspenseQuery({
        queryKey: ['fetch-category', categoryId],
        queryFn: getCategory
    });

    return { category, categoryError, refetchCategory }
};

export default useCategories
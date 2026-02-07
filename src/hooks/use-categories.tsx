import type { createCategorySchema } from "@/lib/zod-schemas";
import { createCategory, getCategories } from "@/services/categoryService";
import { useMutation, useSuspenseQuery } from "@tanstack/react-query";
import type { FileWithPreview } from "./use-file-upload";
import type z from "zod";

export type Category = {
    id: number;
    name: string;
    code: string;
    artWorks: number;
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
    isAddingCategorySuccess: boolean
}

function useCategories(): categoryActions {

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
      isAddingCategorySuccess
  }
}

export default useCategories
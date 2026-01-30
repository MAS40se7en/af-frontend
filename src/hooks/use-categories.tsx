import { getCategories } from "@/services/categoryService";
import { useQuery } from "@tanstack/react-query";

export type Category = {
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
    artWorkCount: number;
    createdAt: Date
}

export type categoryActions = {
    categories: CategoryList[],
    isPending: boolean,
    error: any
}

function UseCategories(): categoryActions {

    const {
        data: categories,
        isPending,
        error
    } = useQuery({
        queryKey: ['fetch-categories'],
        queryFn: getCategories,
    });


  return {
      categories,
      isPending,
      error
  }
}

export default UseCategories
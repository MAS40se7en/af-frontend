import useCategories from "@/hooks/use-categories"
import CategoryCard from "./category-card";
import { useAuth } from "@/contexts/AuthContext";
import { useEffect, useState } from "react";
import CreateCategoryDialog from "./components/create-category";

const CategoriesListWrapper = () => {
  const { isAdmin } = useAuth();
  const [open, setOpen] = useState<boolean>(false);

  const {
    categories,
    addCategory,
    refetchCategories,
    isAddingCategory,
    addCategoryError,
    isAddingCategorySuccess
  } = useCategories();


  useEffect(() => {
    if (isAddingCategorySuccess) {
      setOpen(false);
      refetchCategories();
    }
  }, [isAddingCategorySuccess])

  return (
    <div className="mt-10 flex flex-col items-center justify-center w-full md:w-4/5 lg:w-3/5 px-6 md:px-0 mx-auto">
      <div className="w-full flex justify-between items-center mb-4">
        <div>
          <h2 className="text-2xl font-semibold">Categories</h2>
          <p className="text-sm text-muted-foreground">Artworks are grouped in the categories they are assigned to.</p>
        </div>
        {isAdmin && (
          <CreateCategoryDialog
            variant="create"
            open={open}
            setOpen={setOpen}
            addCategory={addCategory}
            addCategoryError={addCategoryError}
            isAddingCategory={isAddingCategory}
            isAddingCategorySuccess={isAddingCategorySuccess}
          />
        )}
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
        {categories?.map((category) => (
          <CategoryCard key={category.id} category={category} />
        ))}
      </div>
    </div>
  )
}

export default CategoriesListWrapper
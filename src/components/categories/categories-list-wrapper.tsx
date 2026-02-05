import UseCategories from "@/hooks/use-categories"

const CategoriesListWrapper = () => {
    const { categories, isPending, error } = UseCategories();
    
  return (
    <div>CategoriesListWrapper</div>
  )
}

export default CategoriesListWrapper
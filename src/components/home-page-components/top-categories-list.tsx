import useCategories from "@/hooks/use-categories";
import CategoryCard from "../categories/category-card";
import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

const TopCategoriesList = () => {
  const { topCategories } = useCategories();

  return (
    <div className="flex flex-col items-start justify-center gap-4 w-5/6 px-6 md:px-0 mx-auto">
      <div className="flex flex-col items-start justify-start gap-2">
        <h2 className="flex gap-2 items-center w-full text-3xl font-bold group">
          Top Categories 
          <Link to="/categories" className="flex gap-2 border outline-2 p-1 rounded-full opacity-30 transition-all duration-300 group-hover:opacity-100 group-hover:px-2">
            <span className="font-light text-sm opacity-0 group-hover:opacity-100 transition-all duration-300">check out more</span>
            <ChevronRight className="size-5 -ml-26 group-hover:ml-0 transition-all duration-300" />
          </Link>
        </h2>
        <p className="text-sm text-muted-foreground">Artworks are grouped in the categories they are assigned to. Categories are ordered by the number of likes each artwork has.</p>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
        {topCategories?.map((category) => (
          <CategoryCard key={category.id} category={category} />
        ))}
      </div>
    </div>
  )
}

export default TopCategoriesList
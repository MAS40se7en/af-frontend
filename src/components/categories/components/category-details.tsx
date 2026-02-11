import type { Category } from "@/hooks/use-categories";
import AdminActions from "./admin-actions";

interface CategoryDetailsProps {
    category: Category | null;
    isAdmin: boolean;
}

const CategoryDetails = ({ category, isAdmin }: CategoryDetailsProps) => {
  return (
    <div className="flex flex-col items-start gap-3 w-5/6 md:w-full">
                <div className="min-h-55 rounded-xl overflow-hidden aspect-16/4 mx-auto w-full">
                    <img src={category?.imageUrl || "/AFbigHeader.png"} alt={category?.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex justify-between w-full">
                    <h1 className="text-2xl font-semibold">{category?.name}</h1>
                    {isAdmin && (
                        <AdminActions categoryId={category?.id || 0} categoryName={category?.name || ""} />
                    )}
                </div>
                <div className="py-3 w-full min-h-20 outline-3 outline-muted rounded-md px-3">
                    <p className="text-sm text-muted-foreground">Description</p>
                    <p className="text-muted-foreground">{category?.description}</p>
                </div>
            </div>
  )
}

export default CategoryDetails
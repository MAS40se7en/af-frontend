import { useCategory } from "@/hooks/use-categories";
import { useParams } from "react-router-dom";
import CategoryArtworks from "./components/category-artworks";
import { Button } from "../ui/button";

interface categoryProps {
    isAdmin: boolean;
}

const CategoryShowWrapper = ({
    isAdmin
}: categoryProps) => {
    const { categoryId } = useParams();
    const { category, categoryError } = useCategory(Number(categoryId));

    console.log(category);

    if (categoryError) {
        return <div>{categoryError.message}</div>;
    }


    return (
        <div className="w-full mx-auto md:w-4/5 lg:min-w-5/6 flex flex-col items-center justify-center py-10 gap-5">
            <div className="flex flex-col items-start gap-3 w-5/6 md:w-full">
                <div className="min-h-55 rounded-xl overflow-hidden aspect-16/4 mx-auto w-full">
                    <img src={category?.imageUrl || "/AFbigHeader.png"} alt={category?.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex justify-between w-full">
                    <h1 className="text-2xl font-semibold">{category?.name}</h1>
                    {isAdmin && (
                        <div className="flex items-center gap-3">
                            <p className="text-sm text-muted-foreground">ID: {category?.id}</p>
                            <Button variant="secondary">
                                Edit category
                            </Button>
                            <Button variant="destructive">
                                Delete category
                            </Button>
                        </div>
                    )}
                </div>
                <div className="py-3 w-full min-h-20 border">
                    <p className="text-sm text-muted-foreground">Description</p>
                    <p className="text-muted-foreground">{category?.description}</p>
                </div>
            </div>
            <div className="w-5/6 md:w-full">
                <CategoryArtworks artworks={category?.artWorks} />
            </div>
        </div>
    )
}

export default CategoryShowWrapper
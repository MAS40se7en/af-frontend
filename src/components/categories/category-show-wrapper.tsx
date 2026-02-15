import { useCategory } from "@/hooks/use-categories";
import { useParams } from "react-router-dom";
import CategoryArtworks from "./components/category-artworks";
import CategoryDetails from "./components/category-details";

interface categoryProps {
    isAdmin: boolean;
}

const CategoryShowWrapper = ({
    isAdmin
}: categoryProps) => {
    const { categoryId } = useParams();
    const { category, categoryError, refetchCategory } = useCategory(Number(categoryId));

    if (categoryError) {
        return <div>{categoryError.message}</div>;
    }


    return (
        <div className="w-full mx-auto md:w-4/5 lg:min-w-5/6 flex flex-col items-center justify-center py-10 gap-5">
            <CategoryDetails category={category} isAdmin={isAdmin} refetchCategory={refetchCategory} />
            <div className="w-5/6 md:w-full">
                <CategoryArtworks artworks={category?.artWorks} categoryId={category?.id} />
            </div>
        </div>
    )
}

export default CategoryShowWrapper
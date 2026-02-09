import type { CategoryList } from "@/hooks/use-categories";
import { Card, CardContent } from "../ui/card";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronRight } from "lucide-react";

interface CategoryCardProps {
  category: CategoryList;
}

const CategoryCard = ({ category }: CategoryCardProps) => {
  const [isHoveredId, setIsHoveredId] = useState<number | null>(null);
  const navigate = useNavigate();

  const onClick = () => {
    navigate(`/categories/${category.id}`);
  }

  return (
    <Card onMouseEnter={() => setIsHoveredId(() => category.id)} onMouseLeave={() => setIsHoveredId(() => null)} className="min-w-55 md:min-w-70 lg:min-w-60 p-0 overflow-hidden group">
      <CardContent onClick={onClick} className="p-0 relative max-h-70 flex items-center justify-center hover:cursor-pointer">
        <img src={category.imageUrl || "AFbigHeader.png"} alt="category-image" className="
              w-auto min-h-70 object-cover transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-110 group-hover:blur-[2px]
              group-hover:brightness-70
            " />
        <div className="absolute bottom-3 left-3 right-5 group-hover:right-3 transition-all duration-300 flex justify-between items-center">
          <div>
            <p className="text-xl font-semibold">
              {category.name}
            </p>
            {isHoveredId === category.id && (
              <p className="opacity-30 transition-all duration-300 group-hover:opacity-100">
                {category.artWorkCount} artworks
              </p>
            )}
          </div>
          {isHoveredId === category.id && <ChevronRight className=
            "size-5 opacity-30 transition-all duration-300 group-hover:opacity-100" />}
        </div>
      </CardContent>
    </Card>
  )
}

export default CategoryCard
import ArtworkCard from "@/components/artworks/artwork-card";
import NoElements from "@/components/no-elements";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { ArtworkList } from "@/hooks/use-artworks";
import { sortItemsByDate, type sortOptions } from "@/lib/utils";
import { useState } from "react";

interface CategoryArtworksProps {
    artworks: ArtworkList[];
    categoryId?: number;
}

const CategoryArtworks = ({ artworks, categoryId }: CategoryArtworksProps) => {
    const [sort, setSort] = useState<sortOptions>({
        value: "latest",
        label: "Latest"
    });

    const sortedArtworks = sortItemsByDate({ items: artworks, sortOptions: sort });

    return (
        <div className="w-full flex flex-col items-start">
            <div className="flex justify-between items-center w-full">
                <h2 className="text-lg font-semibold">
                    Artworks associated to this category
                </h2>
                <Select
                    value={sort.value ?? undefined}
                    onValueChange={(value: "latest" | "oldest") => setSort({ value, label: value === "latest" ? "Latest" : "Oldest" })}>
                    <SelectTrigger disabled={sortedArtworks?.length === 0}>
                        <SelectValue placeholder="sort" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectLabel>sort by</SelectLabel>
                            <SelectItem value="latest">Latest</SelectItem>
                            <SelectItem value="oldest">Oldest</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>

            <div className="flex flex-wrap gap-4 mt-4 w-full">
                {sortedArtworks && sortedArtworks?.length > 0 ? (
                    sortedArtworks.map(artwork => (
                        <ArtworkCard key={artwork.id} artwork={artwork} />
                    ))
                ) :
                    <NoElements
                        url="/create-artwork"
                        state={ categoryId }
                        text="There are no artworks associated to this category yet! You can add a new one down here!"
                        className=""
                        objectName="Art works"
                    />
                }
            </div>
        </div>
    )
}

export default CategoryArtworks
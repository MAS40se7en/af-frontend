import { useArtworks } from "@/hooks/use-artworks"
import NoElements from "@/components/no-elements";
import ArtworkCard from "@/components/artworks/artwork-card";
import UseCategories from "@/hooks/use-categories";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Link } from "react-router-dom";
import { useState } from "react";
import { sortItemsByDate, type sortOptions } from "@/lib/utils";

function MyArtworksWrapper() {
    const { myArtworks, myArtworksError } = useArtworks();
    const { categories } = UseCategories();

    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [sort, setSort] = useState<sortOptions>({
        value: "latest",
        label: "Latest"
    });

    if (!myArtworks || myArtworksError) {
        return (
            <div>
                <p>Something went wrong while fetching your art works</p>
                {myArtworksError ? <p>{myArtworksError}</p> : ""}
            </div>
        )
    }

    const filteredArtworks =
        !selectedCategory || selectedCategory === "All"
            ? myArtworks
            : myArtworks.filter(
                artwork => artwork.category?.code === selectedCategory
            );

    const sortedArtworks = sortItemsByDate({ items: filteredArtworks, sortOptions: sort });


    return (
        <div className="my-8 flex flex-col gap-5 w-full items-start">
            <div className="flex justify-between items-center w-full">
                <div className="flex gap-3">
                    <Select
                        value={selectedCategory ?? undefined}
                        onValueChange={setSelectedCategory}>
                        <SelectTrigger>
                            <SelectValue placeholder="Filter by category" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>categories</SelectLabel>
                                <SelectItem value="All">Show all</SelectItem>
                                {categories?.map((category) =>
                                    <SelectItem key={category.code} value={category.code}>
                                        {category.name}
                                    </SelectItem>)}
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                    <Select
                        value={sort.value ?? undefined}
                        onValueChange={(value: "latest" | "oldest") => setSort({ value, label: value === "latest" ? "Latest" : "Oldest" })}>
                        <SelectTrigger>
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

                <Link
                    className="bg-primary-foreground text-primary hover:bg-primary hover:text-primary-foreground px-4 py-2 rounded-md"
                    to="/create-artwork">
                    Create
                </Link>
            </div>
            <div className="flex flex-wrap gap-5 items-center justify-center lg:justify-start">
                {sortedArtworks && sortedArtworks.length > 0 ? sortedArtworks.map((artwork) => (
                    <ArtworkCard key={artwork.id} artwork={artwork} />
                )
                ) : (
                    <NoElements
                        url="/create-artwork"
                        text="You have no art works created! You can add a new one down here!"
                        className=""
                        objectName="Art works"
                    />
                )}
            </div>
        </div>
    )
}

export default MyArtworksWrapper
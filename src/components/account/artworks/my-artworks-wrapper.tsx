import { useArtworks } from "@/hooks/use-artworks"
import NoElements from "@/components/no-elements";
import ArtworkCard from "@/components/artworks/artwork-card";
import UseCategories from "@/hooks/use-categories";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";

function MyArtworksWrapper() {
    const { myArtworks, myArtworksError } = useArtworks();
    const { categories } = UseCategories();

    if (!myArtworks || myArtworksError) {
        return (
            <div>
                <p>Something went wrong while fetching your art works</p>
                {myArtworksError ? <p>{myArtworksError}</p> : ""}
            </div>
        )
    }


    return (
        <div className="my-8 flex flex-col gap-5 w-full items-start">
            <div>
                <Select>
                    <SelectTrigger>
                        <SelectValue placeholder="Filter by category" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectLabel>categories</SelectLabel>
                            {categories?.map((category) =>
                                <SelectItem key={category.code} value={category.code}>
                                    {category.name}
                                </SelectItem>)}
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 items-start">
            {myArtworks?.length > 0 ? myArtworks.map((artwork) => (
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
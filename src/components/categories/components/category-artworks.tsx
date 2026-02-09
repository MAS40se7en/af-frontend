import ArtworkCard from "@/components/artworks/artwork-card";
import type { ArtworkList } from "@/hooks/use-artworks";

interface CategoryArtworksProps {
    artworks: ArtworkList[];
}

const CategoryArtworks = ({ artworks }: CategoryArtworksProps) => {
    console.log(artworks);
    return (
        <div className="w-full flex flex-col items-start">
            <h2 className="text-lg">
                Artworks associated to this category
            </h2>
            <div className="flex flex-wrap gap-4 mt-4">
                {artworks?.length > 0 ? (
                    artworks.map(artwork => (
                        <ArtworkCard key={artwork.id} artwork={artwork} />
                    ))
                ): <></>}
            </div>
        </div>
    )
}

export default CategoryArtworks
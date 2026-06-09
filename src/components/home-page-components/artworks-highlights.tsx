import { useArtworks } from "@/hooks/use-artworks";
import ArtworkCard from "../artworks/artwork-card";

const ArtworkHighlights = () => {
    const { highlightedArtworks, highlightedArtworksError } = useArtworks();

    if (highlightedArtworksError) return <div>Error</div>;


  return (
    <div>
        {highlightedArtworks && highlightedArtworks.length > 0 && (
            <div className="flex justify-start gap-3 overflow-y-auto p-3">
                {highlightedArtworks.map((artwork) => (
                    <ArtworkCard key={artwork.id} artwork={artwork} />
                ))}
            </div>
        )}
    </div>
  )
}

export default ArtworkHighlights
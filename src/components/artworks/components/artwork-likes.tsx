import { Button } from "@/components/ui/button";
import { useArtwork, type Artwork } from "@/hooks/use-artworks";
import useLikes from "@/hooks/use-likes";
import { cn } from "@/lib/utils";
import { Heart } from "lucide-react";
import { useEffect, useState } from "react";

interface props {
    artwork: Artwork;
    userId: number;
}

const ArtworkLikes = ({ artwork, userId }: props) => {
    const userLikedArtwork = artwork.likedBy.some((u) => u.id == userId);
    const [likeState, setLikeState] = useState<boolean>(userLikedArtwork);

    const {
        likeArtwork,
        isAddingLikeSuccess,
        unlikeArtwork,
        isRemovingLikeSuccess
    } = useLikes();

    const {
        refetchArtwork
    } = useArtwork(artwork.id);

    useEffect(() => {
        if (isAddingLikeSuccess) {
            setLikeState(true);
            refetchArtwork();
        }
    }, [likeArtwork, isAddingLikeSuccess]);
    
    useEffect(() => {
        if (isRemovingLikeSuccess) {
            setLikeState(false);
            refetchArtwork();
        }
    }, [unlikeArtwork, isRemovingLikeSuccess]);

    const handleLikeArtwork = () => {
        setLikeState((prev) => !prev);

        if (!likeArtwork || !unlikeArtwork) return;

        likeState ? unlikeArtwork(artwork.id) : likeArtwork(artwork.id);
    }

    return (
        <div className="flex gap-1 items-center">
            <Button onClick={handleLikeArtwork} variant={"ghost"} className="bg-none hover:bg-transparent dark:hover:bg-transparent p-0 relative">
                <Heart className={cn(
                    "size-6",
                    userLikedArtwork && "fill-primary"
                )} />
            </Button>
        </div>
    )
}

export default ArtworkLikes
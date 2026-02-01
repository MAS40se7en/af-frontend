import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button";
import type { Artwork } from "@/hooks/use-artworks";
import { Link } from "react-router-dom";

interface props {
    artwork: Artwork;
    isUserArtist: boolean;
}

const ArtworkDetails = ({ artwork, isUserArtist }: props) => {
    return (
        <div className="flex flex-col gap-3">
            <div className="flex flex-col items-start justify-start">
                <Badge className="font-semibold">{artwork?.category.name}</Badge>
                <h1 className="font-semibold">{artwork?.title}</h1>
            </div>
            <div className="flex flex-col gap-2">
                <div>
                    <span className="text-muted-foreground text-sm">Artist: </span>
                    <p>{artwork?.user.username}</p>
                </div>
                <div>
                    <span className="text-muted-foreground text-sm">Artwork description: </span>
                    <p>{artwork?.description}</p>
                </div>
            </div>
            {isUserArtist && (
                <>
                    <Link
                        className="w-full text-center bg-muted hover:bg-muted-foreground py-2 rounded-lg transition-colors"
                        to={`/artworks/${artwork?.id}/edit`}>
                        Edit Artwork
                    </Link>
                    <Button
                        variant="destructive"
                        className="flex justify-center"
                    >
                        Delete Artwork
                    </Button>
                </>
            )}
        </div>
    )
}

export default ArtworkDetails
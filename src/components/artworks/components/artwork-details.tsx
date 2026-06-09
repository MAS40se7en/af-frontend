import { AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button";
import { useArtworks, type Artwork } from "@/hooks/use-artworks";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";

interface props {
    artwork: Artwork;
    isUserArtist: boolean;
}

const ArtworkDetails = ({ artwork, isUserArtist }: props) => {

    const { deleteArtwork, deleteArtworkError, isDeletingArtwork } = useArtworks();

    useEffect(() => {
        if (deleteArtworkError) {
            toast.error(deleteArtworkError);
        }
    }, [deleteArtworkError, deleteArtwork, toast]);


    const handleDelete = () => {
        if (deleteArtwork) {
            deleteArtwork(artwork.id);
        }

        return;
    }
    return (
        <div className="flex flex-col gap-3">
            <div className="flex flex-col items-start justify-start">
                <Badge
                    className="font-semibold"
                >
                    {artwork?.category?.name || null}
                </Badge>
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
                    <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <Button
                                variant="destructive"
                                className="flex justify-center"
                            >
                                Delete Artwork
                            </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>Deleting Artwork!</AlertDialogTitle>
                            </AlertDialogHeader>
                            <AlertDialogDescription>
                                Are you sure you want to delete this artwork "<span className="font-bold text-destructive">{artwork?.title}</span>"?
                            </AlertDialogDescription>
                            <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <Button
                                    disabled={isDeletingArtwork}
                                    onClick={handleDelete}
                                    variant={"destructive"}>Delete Artwork</Button>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </>
            )}
        </div>
    )
}

export default ArtworkDetails
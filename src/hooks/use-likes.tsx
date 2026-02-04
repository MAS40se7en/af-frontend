import { useMutation } from "@tanstack/react-query";
import type { Artwork, User } from "./use-artworks";
import { addLike, removeLike } from "@/services/artworkService";
import { toast } from "sonner";
import { queryClient } from "@/lib/tanstack";
import { Ban } from "lucide-react";

export type like = {
    id: number;
    user: User;
    artwork: Artwork;
}

export type likes = like[]

export type likesActions = {
    likeArtwork: (artworkId: number) => void;
    addLikeError: any;
    isAddingLike: boolean;
    isAddingLikeError: boolean;
    isAddingLikeSuccess: boolean;

    unlikeArtwork: (artworkId: number) => void;
    removeLikeError: any;
    isRemovingLike: boolean;
    isRemovingLikeError: boolean;
    isRemovingLikeSuccess: boolean;
}

const useLikes = (): likesActions => {

    const {
        mutate: likeArtwork,
        isPending: isAddingLike,
        isError: isAddingLikeError,
        error: addLikeError,
        isSuccess: isAddingLikeSuccess
    } = useMutation({
        mutationKey: ['add-like'],
        mutationFn: addLike,
        onSuccess: ({ artworkId }) => {
            console.log('Artwork updated successfully');
            queryClient.invalidateQueries({ queryKey: ['my-artworks'] });
            queryClient.invalidateQueries({ queryKey: ['fetch-user'] });
            queryClient.invalidateQueries({ queryKey: ['artwork', artworkId] });
        },
        onError: (error: any) => {
            console.error('Error adding like', error);
            toast('Error adding like.', {
                description: error.response?.data || error.message,
                icon: <Ban className="text-destructive mr-4" />,
            });
        }
    });

    const {
        mutate: unlikeArtwork,
        isPending: isRemovingLike,
        isError: isRemovingLikeError,
        error: removeLikeError,
        isSuccess: isRemovingLikeSuccess
    } = useMutation({
        mutationKey: ['remove-like'],
        mutationFn: removeLike,
        onSuccess: ({ artworkId }) => {
            console.log('Artwork updated successfully');
            queryClient.invalidateQueries({ queryKey: ['my-artworks'] });
            queryClient.invalidateQueries({ queryKey: ['fetch-user'] });
            queryClient.invalidateQueries({ queryKey: ['artwork', artworkId] });
        },
        onError: (error: any) => {
            console.error('Error removing like', error);
            toast('Error removing like.', {
                description: error.response?.data || error.message,
                icon: <Ban className="text-destructive mr-4" />,
            });
        }
    })


  return {
      likeArtwork,
      addLikeError,
      isAddingLike,
      isAddingLikeError,
      isAddingLikeSuccess,

      unlikeArtwork,
      removeLikeError,
      isRemovingLike,
      isRemovingLikeError,
      isRemovingLikeSuccess
  }
}

export default useLikes
import type { FileMetadata, FileWithPreview } from "./use-file-upload";
import { createArtworkSchema } from "@/lib/zod-schemas";
import type z from "zod";
import { useMutation, useSuspenseQuery } from "@tanstack/react-query";
import { createArtwork, fetchArtwork, fetchArtworks, fetchHighlightedArtworks, fetchMyArtworks, removeArtwork, updateArtworkDetails } from "@/services/artworkService";
import { toast } from "sonner";
import { queryClient } from "@/lib/tanstack";
import { Ban } from "lucide-react";
import { useNavigate } from "react-router-dom";
import type { Category } from "./use-categories";

export type User = {
    id: number;
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    imageUrl: string;
    roleName: string;
    fullName: string;
}

export type UserLike = {
    id: number;
    username: string;
    imageUrl: string;
}

export type Artwork = {
    id: number;
    title: string;
    description: string;
    category: Category;
    user: User;
    images: listImageInfo[];
    likeCount: number;
    likedBy: UserLike[];
    commentCount: number;
    comments: Comment[];
    createdAt: Date;
    updatedAt: Date;
}

export type ArtworkList = {
    id: number;
    images: listImageInfo[];
    title: string;
    description: string;
    category: Category;
    user: User;
    createdAt: Date;
    likeCount: number;
    commentCount: number;
}

export type listImageInfo = {
    id: number;
    imageUrl: string;
    order: number
}

export type ArtworksActions = {
    addArtwork?: ({ files, artwork }: { artwork: z.infer<typeof createArtworkSchema>, files: FileWithPreview[] }) => void;
    addArtworkError?: Error | null;
    isAddingArtwork?: boolean;
    isAddingArtworkError?: boolean;

    updateArtwork?: ({ files, artwork }: { artwork: z.infer<typeof createArtworkSchema>, files: FileWithPreview[] }) => void;
    updateArtworkError?: Error | null;
    isUpdatingArtwork?: boolean;
    isUpdatingArtworkError?: boolean;

    deleteArtwork?: (id: number) => void;
    deleteArtworkError?: Error | null;
    isDeletingArtwork?: boolean;
    isDeletingArtworkError?: boolean;
    isDeletingArtworkSuccess?: boolean;

    myArtworks?: ArtworkList[];
    myArtworksError?: Error | null;

    artworks?: ArtworkList[];
    artworksError?: Error | null;
    isLoadingArtworks?: boolean;
    refetchArtworks?: () => void;

    highlightedArtworks?: ArtworkList[];
    highlightedArtworksError?: Error | null;
}

export const useArtworks = (
    search?: string,
): ArtworksActions => {
    const navigate = useNavigate();

    const {
        data: myArtworks,
        error: myArtworksError
    } = useSuspenseQuery({
        queryKey: ['my-artworks'],
        queryFn: fetchMyArtworks,
    });

    const {
        data: artworks,
        error: artworksError,
        isLoading: isLoadingArtworks
    } = useSuspenseQuery({
        queryKey: ['get-artworks', search],
        queryFn: fetchArtworks,
    });

    const {
        data: highlightedArtworks,
        error: highlightedArtworksError,
    } = useSuspenseQuery({
      queryKey: ['highlighted-artworks'],
      queryFn: fetchHighlightedArtworks,  
    })

    const {
        mutate: addArtwork,
        isPending: isAddingArtwork,
        isError: isAddingArtworkError,
        error: addArtworkError
    } = useMutation({
        mutationKey: ['add-artwork'],
        mutationFn: createArtwork,
        onSuccess: () => {
            console.log('Artwork added successfully');
            toast.success('Artwork created successfully.');
            queryClient.invalidateQueries({ queryKey: ['my-artworks'] });
            queryClient.invalidateQueries({ queryKey: ['fetch-user'] });

            navigate('/account/my-artworks');
        },
        onError: (error: Error) => {
            console.error('Error adding artwork', error);
            toast('Error adding artwork.', {
                description: error.message,
                icon: <Ban className="text-destructive mr-4" />,
            });
        }
    })

    const {
        mutate: updateArtwork,
        isPending: isUpdatingArtwork,
        isError: isUpdatingArtworkError,
        error: updateArtworkError
    } = useMutation({
        mutationKey: ['update-artwork'],
        mutationFn: updateArtworkDetails,
        onSuccess: ({ artworkId }) => {
            console.log('Artwork updated successfully');
            toast.success('Artwork updated successfully.');
            queryClient.invalidateQueries({ queryKey: ['my-artworks'] });
            queryClient.invalidateQueries({ queryKey: ['fetch-user'] });
            navigate(`/artworks/${artworkId}`);
        },
        onError: (error: Error) => {
            console.error('Error updating artwork', error);
            toast('Error updating artwork.', {
                description: error.message,
                icon: <Ban className="text-destructive mr-4" />,
            });
        }
    });

    const {
        mutate: deleteArtwork,
        isPending: isDeletingArtwork,
        isError: isDeletingArtworkError,
        error: deleteArtworkError,
        isSuccess: isDeletingArtworkSuccess
    } = useMutation({
        mutationKey: ['add-artwork'],
        mutationFn: removeArtwork,
        onSuccess: () => {
            console.log('Artwork deleted successfully');
            toast.success('Artwork deleted successfully.');
            queryClient.invalidateQueries({ queryKey: ['my-artworks'] });
            queryClient.invalidateQueries({ queryKey: ['fetch-user'] });
            navigate('/account/my-artworks');
        },
        onError: (error: Error) => {
            console.error('Error deleting artwork', error);
            toast('Error deleting artwork.', {
                description: error.message,
                icon: <Ban className="text-destructive mr-4" />,
            });
        }
    });





    return {
        addArtwork,
        addArtworkError,
        isAddingArtwork,
        isAddingArtworkError,

        updateArtwork,
        updateArtworkError,
        isUpdatingArtwork,
        isUpdatingArtworkError,

        deleteArtwork,
        deleteArtworkError,
        isDeletingArtwork,
        isDeletingArtworkError,
        isDeletingArtworkSuccess,

        myArtworks,
        myArtworksError,

        artworks,
        artworksError,
        isLoadingArtworks,

        highlightedArtworks,
        highlightedArtworksError
    }
}


export const useArtwork = (artWorkId: number): {
    artwork: Artwork,
    artworkError: Error | null,
    refetchArtwork: () => void,
    artworkImagesToFileMetadeta: (images: listImageInfo[]) => FileMetadata[]
} => {
    const {
        data: artwork,
        error: artworkError,
        refetch: refetchArtwork
    } = useSuspenseQuery({
        queryKey: ['artwork', artWorkId],
        queryFn: fetchArtwork,
    });

    const artworkImagesToFileMetadeta = (images: listImageInfo[]): FileMetadata[] => images.map(img => ({
        id: img.id.toString(),
        name: `image-${img.id}`,
        size: 0,
        type: 'image/*',
        url: img.imageUrl,
        order: img.order
    }))

    return {
        artwork,
        artworkError,
        refetchArtwork,
        artworkImagesToFileMetadeta
    }
}
import { useAuth } from "@/contexts/AuthContext";
import type { FileWithPreview } from "./use-file-upload";
import { createArtworkSchema } from "@/lib/zod-schemas";
import type z from "zod";
import { useMutation, useSuspenseQuery } from "@tanstack/react-query";
import { createArtwork, fetchArtwork, fetchMyArtworks, removeArtwork, updateArtworkDetails } from "@/services/artworkService";
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
    addArtworkError?: any;
    isAddingArtwork?: boolean;
    isAddingArtworkError?: boolean;
    updateArtwork?: ({ files, artwork }: { artwork: z.infer<typeof createArtworkSchema>, files: FileWithPreview[] }) => void;
    updateArtworkError?: any;
    isUpdatingArtwork?: boolean;
    isUpdatingArtworkError?: boolean;
    deleteArtwork?: (id: number) => void;
    deleteArtworkError?: any;
    isDeletingArtwork?: boolean;
    isDeletingArtworkError?: boolean;
    myArtworks?: ArtworkList[];
    myArtworksError?: any;
}

export const useArtworks = (): ArtworksActions => {
    const { user, isUserLoading } = useAuth();
    const navigate = useNavigate();

    if (!user || isUserLoading) {
        return {}
    }

    const {
        data: myArtworks,
        error: myArtworksError
    } = useSuspenseQuery({
        queryKey: ['my-artworks'],
        queryFn: fetchMyArtworks,
    });

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
        onError: (error: any) => {
            console.error('Error adding artwork', error);
            toast('Error adding artwork.', {
                description: error.response?.data || error.message,
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
        onSuccess: () => {
            console.log('Artwork updated successfully');
            toast.success('Artwork updated successfully.');
            queryClient.invalidateQueries({ queryKey: ['my-artworks'] });
            queryClient.invalidateQueries({ queryKey: ['fetch-user'] });
        },
        onError: (error: any) => {
            console.error('Error updating artwork', error);
            toast('Error updating artwork.', {
                description: error.response?.data || error.message,
                icon: <Ban className="text-destructive mr-4" />,
            });
        }
    });

    const {
        mutate: deleteArtwork,
        isPending: isDeletingArtwork,
        isError: isDeletingArtworkError,
        error: deleteArtworkError
    } = useMutation({
        mutationKey: ['add-artwork'],
        mutationFn: removeArtwork,
        onSuccess: () => {
            console.log('Artwork deleted successfully');
            toast.success('Artwork deleted successfully.');
            queryClient.invalidateQueries({ queryKey: ['my-artworks'] });
            queryClient.invalidateQueries({ queryKey: ['fetch-user'] });
        },
        onError: (error: any) => {
            console.error('Error deleting artwork', error);
            toast('Error deleting artwork.', {
                description: error.response?.data || error.message,
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
        myArtworks,
        myArtworksError,
    }
}


export const useArtwork = (artWorkId: number): {
    artwork: Artwork,
    artworkError: any,
    refetchArtwork: () => void
} => {
    const {
        data: artwork,
        error: artworkError,
        refetch: refetchArtwork
    } = useSuspenseQuery({
        queryKey: ['artwork', artWorkId],
        queryFn: fetchArtwork,
    });

    return {
        artwork,
        artworkError,
        refetchArtwork
    }
}
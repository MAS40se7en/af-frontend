import { useSuspenseQuery } from "@tanstack/react-query";
import type { ArtworkList, User } from "./use-artworks"
import { fetchHighlightedArtists } from "@/services/artistService";

export type artist = {
    user: User;
    artworks: ArtworkList[];
    totalArtworks: number;
    biography: string;
    isHighlighted: boolean;
}

export type ArtistActions = {
  highlightedArtists: artist[];
  highlightedArtistsError: Error | null;
  refetchHighlightedArtists: () => void;
}

const useArtists = (): ArtistActions => {
  const {
    data: highlightedArtists,
    error: highlightedArtistsError,
    refetch: refetchHighlightedArtists
  } = useSuspenseQuery({
    queryKey: ['highlighted-artists'],
    queryFn: fetchHighlightedArtists
  })


  return {
    highlightedArtists,
    highlightedArtistsError,
    refetchHighlightedArtists
  }
}

export default useArtists
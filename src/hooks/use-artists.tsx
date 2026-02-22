import type { ArtworkList, User } from "./use-artworks"

type artist = {
    user: User;
    artworks: ArtworkList[];
    totalArtworks: number;
    biography: string;
    isHighlighted: boolean;
}

const useArtists = () => {
  return (
    <div>useArtists</div>
  )
}

export default useArtists
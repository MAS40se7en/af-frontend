import useArtists from "@/hooks/use-artists";
import { ChevronRight } from "lucide-react"
import { Link } from "react-router-dom"

const ArtistsHighlights = () => {
  const { highlightedArtists, refetchHighlightedArtists } = useArtists();

  return (
    <div className="flex flex-col items-start justify-center gap-4 w-5/6 px-6 md:px-0 mx-auto">
      <div className="flex flex-col items-start justify-start gap-2">
        <h2 className="flex gap-2 items-center w-full text-3xl font-bold group">
          Highlighted Artists
          <Link to="/artists" className="flex gap-2 border outline-2 p-1 rounded-full opacity-30 transition-all duration-300 group-hover:opacity-100 group-hover:px-2">
            <span className="font-light text-sm opacity-0 group-hover:opacity-100 transition-all duration-300">check out more</span>
            <ChevronRight className="size-5 -ml-24 group-hover:ml-0 transition-all duration-300" />
          </Link>
        </h2>
        <p className="text-sm text-muted-foreground">
          Handpicked or top artists on the platform for you to explore and get inspired.
        </p>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
        {highlightedArtists.map((artist) => (
          <div className="flex flex-col items-center justify-center gap-2">
            <img src={artist.user.imageUrl} alt={artist.user.fullName} className="w-28 h-28 rounded-full object-cover" />
            <h3 className="text-lg font-semibold">{artist.user.fullName}</h3>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ArtistsHighlights
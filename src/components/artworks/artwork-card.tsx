import type { ArtworkList } from "@/hooks/use-artworks"
import { Card, CardFooter, CardHeader } from "../ui/card"
import { Badge } from "../ui/badge"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "../ui/carousel"
import { useNavigate } from "react-router-dom"
import { useState } from "react"
import { cn } from "@/lib/utils"
import { ChevronRight, Heart, MessageSquare } from "lucide-react"

function ArtworkCard({ artwork }: { artwork: ArtworkList }) {
  const [linkHover, setLinkHover] = useState(false);
  const navigate = useNavigate();


  if (!artwork) return null;

  return (
    <Card className="p-0 pb-3 overflow-hidden items-center justify-center min-w-65 hover:cursor-pointer gap-3 hover:scale-101 transition-all hover:outline-primary-foreground hover:outline-3 rounded-xl"
      onClick={() => navigate(`/artworks/${artwork.id}/details`, { state: artwork })}
      onMouseEnter={() => setLinkHover(true)}
      onMouseLeave={() => setLinkHover(false)}
    >
      <CardHeader className="p-0 w-full flex flex-col justify-center items-center">
        <div className="w-80 h-60 shrink-0 aspect-4/3 basis-full">
          <img
            src={artwork.images[0].imageUrl}
            alt="image"
            className="w-full h-full object-cover aspect-4/3" />
        </div>
      </CardHeader>
      <CardFooter className="flex flex-col items-start px-3 gap-2 w-full">
        <div className="flex gap-3">
          <p
            className={cn(
              "text-lg font-semibold flex items-center gap-2 transition-all duration-300",
              linkHover && "px-2"
            )}
          >
            {artwork.title}
            {linkHover && <ChevronRight className={cn(
              "size-5 -ml-3 opacity-30 transition-all duration-300",
              linkHover && "ml-0 opacity-100"
            )} />}
          </p>
          {artwork.category && (
            <Badge variant={"secondary"}>{artwork.category?.name}</Badge>
          )}
        </div>
        <div className="flex justify-between items-center w-full">
          <div className="flex gap-2 items-center">
            <div className="flex gap-1 items-center">
              <Heart className="size-4 text-primary-foreground fill-primary-foreground" />
              <span className="text-xs">{artwork.likeCount}</span>
            </div>
            <div className="flex gap-1 items-center">
              <MessageSquare className="size-4 text-primary-foreground fill-primary-foreground" />
              <span className="text-xs">{artwork.commentCount}</span>
            </div>
          </div>
          <Badge>{new Date(artwork.createdAt).toDateString()}</Badge>
        </div>
      </CardFooter>
    </Card>
  )
}

export default ArtworkCard
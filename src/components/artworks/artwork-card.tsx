import type { ArtworkList } from "@/hooks/use-artworks"
import { Card, CardFooter, CardHeader } from "../ui/card"
import { Badge } from "../ui/badge"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "../ui/carousel"
import { Link } from "react-router-dom"
import { useState } from "react"
import { cn } from "@/lib/utils"
import { ChevronRight, Heart, MessageSquare } from "lucide-react"

function ArtworkCard({ artwork }: { artwork: ArtworkList }) {
  if (!artwork) return null

  const [linkHover, setLinkHover] = useState(false);

  return (
    <Card className="p-0 pb-3 overflow-hidden items-center justify-center w-65 hover:cursor-pointer gap-3 hover:scale-105 transition-all hover:outline-primary-foreground hover:outline-3">
      <CardHeader className="p-0 w-full flex flex-col justify-center items-center">
        <Carousel className="relative h-60 w-80 overflow-hidden px-2">
          <CarouselContent className="flex h-full">
            {artwork.images.map((image) => (
              <CarouselItem key={image.id} className="w-full h-full shrink-0 aspect-4/3 basis-full">
                <img
                  src={image.imageUrl}
                  alt="image"
                  className="w-full h-full object-cover aspect-4/3" />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious variant={"secondary"} className="ml-22 size-10 justify-center" />
          <CarouselNext variant={"secondary"} className="mr-22 size-10 justify-center" />
        </Carousel>
      </CardHeader>
      <CardFooter className="flex flex-col items-start px-3 gap-2 w-full">
        <div className="flex gap-3">
          <Link
            to={"/artworks/" + artwork.id + "/details"}
            state={artwork}
            onMouseEnter={() => setLinkHover(true)}
            onMouseLeave={() => setLinkHover(false)}
            className={cn(
              "text-lg font-semibold flex items-center gap-2 transition-all duration-300",
              linkHover && "text-primary-foreground bg-primary px-2 rounded-full"
            )}
          >
            {artwork.title}
            {linkHover && <ChevronRight className={cn(
              "size-5 -ml-3 opacity-30 transition-all duration-300",
              linkHover && "ml-0 opacity-100"
            )} />}
          </Link>
          <Badge variant={"secondary"}>{artwork.category?.name || ""}</Badge>
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
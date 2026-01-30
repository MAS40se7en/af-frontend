import type { ArtworkList } from "@/hooks/use-artworks"
import { Card, CardContent, CardDescription, CardFooter, CardHeader } from "../ui/card"
import { truncateString } from "@/lib/utils"
import { Badge } from "../ui/badge"

function ArtworkCard({ artwork }: { artwork: ArtworkList }) {
  console.log(artwork)
  return (
    <Card className="p-0 pb-3 overflow-hidden items-center justify-center w-70 hover:cursor-pointer gap-3">
      <CardHeader className="p-0 w-full flex flex-col justify-center items-center">
        <div>
          {artwork.images.map((image) =>
            <img
              key={image.id}
              src={image.imageUrl}
              className="min-w-50"
              alt="Artwork image" />
          )}
        </div>
        <h2 className="w-full text-left text-xl font-semibold px-3">
          {artwork.title}
        </h2>
      </CardHeader>
      <CardContent className="w-full px-3">
        <CardDescription>
          {truncateString(artwork.description, 50)}
        </CardDescription>
      </CardContent>
      <CardFooter className="flex justify-between items-end w-full px-3 mt-3">
        <Badge>{new Date(artwork.createdAt).toDateString()}</Badge>
        <Badge>{artwork.category?.name || ""}</Badge>
      </CardFooter>
    </Card>
  )
}

export default ArtworkCard
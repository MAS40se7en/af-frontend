import ImageModal from "@/components/image-modal"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import type { Artwork } from "@/hooks/use-artworks"
import { formatDate } from "@/lib/utils";
import { MessageSquare } from "lucide-react";
import ArtworkLikes from "./artwork-likes";

interface props {
    artwork: Artwork;
    screenSize: string;
    userId: number;
}

const ImagesWrapper = ({ artwork, userId }: props) => {
    return (
        <div className="space-y-3">
            <Carousel className="w-full md:w-130 p-0">
                <CarouselContent className="min-w-full">
                    {artwork?.images?.map((image) => (
                        <CarouselItem key={image.id} className="basis-full p-0">
                            <Dialog>
                                <DialogTrigger className="block w-full">
                                    <img
                                        src={image.imageUrl}
                                        alt="image"
                                        className="block w-full h-120 object-cover"
                                    />
                                </DialogTrigger>

                                <DialogContent className="p-0 overflow-auto w-5/6 md:min-w-3xl  max-h-230">
                                    <ImageModal imageUrl={image.imageUrl} />
                                </DialogContent>
                            </Dialog>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious variant={"secondary"} className="ml-16 size-10 justify-center" />
                <CarouselNext variant={"secondary"} className="mr-16 size-10 justify-center" />
            </Carousel>
            <div className="flex justify-between">
                <div className="flex flex-col items-start">
                    <div className="flex items-center gap-2">
                        <span className="text-muted-foreground text-sm">
                            Created at:
                        </span>
                        <p>{formatDate(new Date(artwork?.createdAt))}</p>
                    </div>
                    <div>
                        <span className="text-sm">
                            {artwork?.likeCount} likes
                        </span>
                    </div>
                </div>
                <div>
                    <div className="flex gap-2 items-center">
                        <ArtworkLikes userId={userId} artwork={artwork} />
                        <div className="flex gap-1 items-center">
                            <MessageSquare className="size-6 fill-white" />
                            <span className="text-xs">{artwork.commentCount}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ImagesWrapper
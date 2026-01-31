import { useArtwork } from "@/hooks/use-artworks";
import { useParams } from "react-router-dom";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "../ui/carousel";

const ArtworkDetailsWrapper = () => {
    const { artworkId } = useParams();
    const { artwork, artworkError } = useArtwork(Number(artworkId));

    if (artworkError) {
        return <div>{artworkError.message}</div>;
    }



    return (
        <div className="flex flex-col md:flex-row md:items-start items-center justify-center mt-8 gap-10">
            <Carousel className="w-4/5 sm:w-3/5 md:w-130">
                <CarouselContent className="flex items-center">
                    {artwork?.images?.map((image) => (
                        <CarouselItem key={image.id}>
                            <img
                                src={image.imageUrl}
                                alt="image"
                                className="w-full h-120 object-cover" />
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious variant={"secondary"} className="ml-16 size-10" />
                <CarouselNext variant={"secondary"} className="mr-16 size-10" />
            </Carousel>
            <div>
                <h1>{artwork?.title}</h1>
                <p>{artwork?.description}</p>
            </div>
        </div>
    )
}

export default ArtworkDetailsWrapper
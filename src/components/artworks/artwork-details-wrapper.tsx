import { useArtwork } from "@/hooks/use-artworks";
import { useParams } from "react-router-dom";
import ImagesWrapper from "./components/images-wrapper";
import ArtworkDetails from "./components/artwork-details";
import ArtworkComments from "./components/artwork-comments";
import useScreenSize from "@/hooks/use-screen-size";
import { Separator } from "../ui/separator";
import { cn } from "@/lib/utils";
import { ErrorBoundary } from "react-error-boundary";
import { Suspense } from "react";

interface ArtworkDetailsWrapperProps {
    userId: number;
}

const ArtworkDetailsWrapper = ({
    userId
}: ArtworkDetailsWrapperProps) => {
    const { artworkId } = useParams();
    const { artwork, artworkError, refetchArtwork } = useArtwork(Number(artworkId));
    const isUserArtist = userId === Number(artwork?.user.id);
    const screenSize = useScreenSize();

    if (!artwork || artworkError) {
        return <div>{artworkError.message}</div>;
    }

    return (
        <div className="flex flex-col md:flex-row md:items-start items-center justify-center mt-8 gap-5 w-4/5 mx-auto">
            <div className="flex flex-col gap-10">
                <ImagesWrapper screenSize={screenSize} artwork={artwork} />
                {screenSize === "md" || screenSize === "lg" || screenSize === "xl" || screenSize === "2xl" ? (
                    <>
                        <Separator className="my-2" />
                        <ErrorBoundary fallback={<div>error</div>}>
                            <Suspense fallback={<div>loading...</div>}>
                                <ArtworkComments 
                                isUserArtist={isUserArtist} 
                                userId={userId} 
                                refetchArtwork={refetchArtwork} 
                                artworkId={artwork.id} />
                            </Suspense>
                        </ErrorBoundary>
                    </>
                ) : null}
            </div>
            <div className={cn(screenSize === "sm" || screenSize === "xs" ? "w-full space-y-5" : "")}>
                {screenSize === "sm" || screenSize === "xs" ? <Separator className="mb-5" /> : null}
                <ArtworkDetails artwork={artwork} isUserArtist={isUserArtist} />
                {screenSize === "sm" || screenSize === "xs" ? (
                    <>
                        <Separator className="my-5" />
                        <ErrorBoundary fallback={<div>error</div>}>
                            <Suspense fallback={<div>loading...</div>}>
                                <ArtworkComments 
                                isUserArtist={isUserArtist}
                                userId={userId} 
                                refetchArtwork={refetchArtwork} 
                                artworkId={artwork.id} />
                            </Suspense>
                        </ErrorBoundary>
                    </>
                ) : null}
            </div>
        </div>
    )
}

export default ArtworkDetailsWrapper
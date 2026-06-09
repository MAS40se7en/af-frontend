import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import ArtworksListWrapper from "@/components/artworks/artworks-list-wrapper";

function Artworks() {

    return (
        <ErrorBoundary fallback={<div>error</div>}>
            <Suspense fallback={<div>loading...</div>}>
                <ArtworksListWrapper />
            </Suspense>
        </ErrorBoundary>
    )
}

export default Artworks;
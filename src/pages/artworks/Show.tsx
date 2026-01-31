import ArtworkDetailsWrapper from "@/components/artworks/artwork-details-wrapper"
import ErrorComponent from "@/components/error-component"
import { Suspense } from "react"
import { ErrorBoundary } from "react-error-boundary"

const ShowArtwork = () => {   
  return (
    <ErrorBoundary fallback={<ErrorComponent />}>
      <Suspense fallback={<div>loading...</div>}>
        <ArtworkDetailsWrapper />
      </Suspense>
    </ErrorBoundary>
  )
}

export default ShowArtwork
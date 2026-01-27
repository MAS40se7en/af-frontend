import { ErrorBoundary } from "react-error-boundary"
import MyArtworksWrapper from "@/components/account/artworks/my-artworks-wrapper"
import { Suspense } from "react"

function MyArtworks() {
  return (
    <div className="mt-10 flex flex-col items-center justify-center">
        <h1 className="font-semibold">My Artworks</h1>
        <div>
          <ErrorBoundary fallback={<div>Something went wrong</div>}>
            <Suspense fallback={<div>loading...</div>}>
              <MyArtworksWrapper />
            </Suspense>
          </ErrorBoundary>
        </div>
    </div>
  )
}

export default MyArtworks
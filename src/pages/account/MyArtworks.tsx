import { ErrorBoundary } from "react-error-boundary"
import MyArtworksWrapper from "@/components/account/artworks/my-artworks-wrapper"
import { Suspense } from "react"

function MyArtworks() {
  return (
    <div className="mt-10 flex flex-col items-center justify-center w-full md:w-4/5 lg:w-3/5 px-6 md:px-0">
        <h1 className="font-semibold">My Artworks</h1>
        <div className="w-full">
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
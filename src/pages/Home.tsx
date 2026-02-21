import ArtistsHighlights from "@/components/home-page-components/artists-highlights"
import ArtworkHighlights from "@/components/home-page-components/artworks-highlights"
import TopCategoriesList from "@/components/home-page-components/top-categories-list"
import { Suspense } from "react"
import { ErrorBoundary } from "react-error-boundary"

const Home = () => {

  return (
    <>
      <div className="h-screen bg-[#330A0A] relative">
        <div className="bg-hero-overlay min-h-full min-w-full absolute" />
        <div className="w-full lg:w-4/5 mx-auto mb-10">
          <img src="AFbigHeader.png" className="hero md:min-w-150" alt="" />
          <div className="absolute top-1/3 left-1/2 md:left-2/3 transform -translate-x-1/2 -translate-y-1/2 text-left">
            <h2 className="text-4xl font-bold text-white mb-4">Discover and Share Art</h2>
            <p className="text-lg text-white mb-8">Share your work and progress and discover other works, artists and new techniques.</p>
          </div>
          <div className="absolute top-2/3 left-1/2 lg:left-2/3 transform -translate-x-1/2 -translate-y-1/2 text-left -mt-4 max-w-131.25 md:max-w-full">
            <ErrorBoundary fallback={<div>error</div>} >
              <Suspense fallback={<div>Loading...</div>} >
                <ArtworkHighlights />
              </Suspense>
            </ErrorBoundary>
          </div>
        </div>


      </div>
      <div className="min-h-120 dark:bg-black py-5">
        <ErrorBoundary fallback={<div>error</div>} >
          <Suspense fallback={<div>Loading...</div>} >
            <TopCategoriesList />
          </Suspense>
        </ErrorBoundary>


        <ArtistsHighlights />
      </div>
    </>
  )
}

export default Home
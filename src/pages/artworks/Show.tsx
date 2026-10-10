import { userAtom } from "@/atoms/auth-atoms"
import ArtworkDetailsWrapper from "@/components/artworks/artwork-details-wrapper"
import ErrorComponent from "@/components/error-component"
import { useAuth } from "@/contexts/AuthContext"
import { useAtomValue } from "jotai"
import { Suspense } from "react"
import { ErrorBoundary } from "react-error-boundary"

const ShowArtwork = () => {
  // const { user } = useAuth();
  const user = useAtomValue(userAtom)

  if (!user) {
    return <div>loading...</div>
  }

  return (
    <ErrorBoundary fallback={<ErrorComponent />}>
      <Suspense fallback={<div>loading...</div>}>
        <ArtworkDetailsWrapper userId={user.id} />
      </Suspense>
    </ErrorBoundary>
  )
}

export default ShowArtwork
import CategoryShowWrapper from "@/components/categories/category-show-wrapper"
import { useAuth } from "@/contexts/AuthContext"
import { Suspense } from "react"
import { ErrorBoundary } from "react-error-boundary"

const ShowCategory = () => {
  const { isAdmin } = useAuth();

  if (!isAdmin) {
    return <div>loading...</div>
  }

  return (
    <ErrorBoundary fallback={<div>error</div>}>
      <Suspense fallback={<div>loading...</div>}>
        <CategoryShowWrapper isAdmin />
      </Suspense>
    </ErrorBoundary>
  )
}

export default ShowCategory
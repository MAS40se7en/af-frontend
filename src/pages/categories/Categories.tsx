import CategoriesListWrapper from "@/components/categories/categories-list-wrapper"
import { Suspense } from "react"
import { ErrorBoundary } from "react-error-boundary"

function Categories() {
  
  return (
    <ErrorBoundary fallback={<div>error</div>}>
      <Suspense fallback={<div>loading...</div>}>
        <CategoriesListWrapper />
      </Suspense>
    </ErrorBoundary>
  )
}

export default Categories
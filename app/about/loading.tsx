import { Skeleton } from "@/components/ui/skeleton"
import Header from "@/components/header"

export default function AboutLoading() {
  return (
    <>
      <Header />
      <main className="flex-1">
        {/* Hero Section Skeleton */}
        <section className="relative bg-gradient-to-b from-primary/20 to-background pt-16 pb-12 md:pt-24 md:pb-20">
          <div className="container">
            <div className="mx-auto max-w-3xl text-center">
              <Skeleton className="h-12 w-3/4 mx-auto" />
              <Skeleton className="h-24 w-full mx-auto mt-6" />
              <div className="mt-8 flex justify-center gap-4">
                <Skeleton className="h-10 w-32" />
                <Skeleton className="h-10 w-32" />
              </div>
            </div>
          </div>
        </section>

        {/* Mission Vision Skeleton */}
        <section className="py-12 md:py-16">
          <div className="container">
            <div className="mx-auto max-w-4xl">
              <div className="flex justify-center mb-8">
                <Skeleton className="h-10 w-64" />
              </div>
              <Skeleton className="h-64 w-full" />
            </div>
          </div>
        </section>

        {/* Impact Skeleton */}
        <section className="bg-muted py-12 md:py-16">
          <div className="container">
            <div className="mx-auto max-w-2xl text-center">
              <Skeleton className="h-10 w-48 mx-auto" />
              <Skeleton className="h-16 w-full mx-auto mt-4" />
            </div>
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {[1, 2, 3, 4].map((i) => (
                <Skeleton key={i} className="h-40 w-full" />
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  )
}

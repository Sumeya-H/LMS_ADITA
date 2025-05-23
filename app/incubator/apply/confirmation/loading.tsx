import { Skeleton } from "@/components/ui/skeleton"
import { Card } from "@/components/ui/card"

export default function Loading() {
  return (
    <div className="container py-12">
      <div className="mx-auto max-w-3xl">
        <Card className="border-primary/20">
          <div className="p-6 text-center">
            <Skeleton className="mx-auto h-16 w-16 rounded-full" />
            <Skeleton className="mx-auto mt-4 h-8 w-2/3" />
            <Skeleton className="mx-auto mt-2 h-4 w-1/2" />
          </div>
          <div className="px-6 pb-6 space-y-6">
            <Skeleton className="h-64 w-full rounded-lg" />
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <Skeleton className="h-32 w-full rounded-lg" />
              <Skeleton className="h-32 w-full rounded-lg" />
              <Skeleton className="h-32 w-full rounded-lg" />
            </div>
          </div>
          <div className="p-6 flex flex-col space-y-4">
            <Skeleton className="mx-auto h-4 w-3/4" />
            <div className="flex justify-center space-x-4">
              <Skeleton className="h-10 w-32" />
              <Skeleton className="h-10 w-32" />
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}

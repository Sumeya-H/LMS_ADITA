import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default function ProgramDetailSkeleton() {
    return (
        <div className="container py-12">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">

                {/* LEFT SIDE */}
                <div className="md:col-span-2 space-y-6">

                    {/* badges */}
                    <div className="flex gap-2">
                        <Skeleton className="h-6 w-24 rounded shimmer" />
                        <Skeleton className="h-6 w-20 rounded shimmer" />
                        <Skeleton className="h-6 w-16 rounded shimmer" />
                    </div>

                    {/* title */}
                    <Skeleton className="h-10 w-3/4 shimmer" />

                    {/* description */}
                    <Skeleton className="h-6 w-full shimmer" />
                    <Skeleton className="h-6 w-5/6 shimmer" />

                    {/* image */}
                    <Skeleton className="aspect-video w-full rounded-lg shimmer" />

                    {/* tabs */}
                    <div className="space-y-4 mt-6">
                        <Skeleton className="h-8 w-full shimmer" />
                        <Skeleton className="h-32 w-full shimmer" />
                        <Skeleton className="h-32 w-full shimmer" />
                    </div>
                </div>

                {/* RIGHT SIDEBAR */}
                <div className="space-y-6">
                    <Card>
                        <CardHeader>
                            <Skeleton className="h-6 w-1/2 shimmer" />
                        </CardHeader>

                        <CardContent className="space-y-4">
                            {[...Array(5)].map((_, i) => (
                                <div key={i} className="flex gap-3">
                                    <Skeleton className="h-5 w-5 rounded-full shimmer" />
                                    <div className="space-y-2 w-full">
                                        <Skeleton className="h-4 w-1/3 shimmer" />
                                        <Skeleton className="h-4 w-1/2 shimmer" />
                                    </div>
                                </div>
                            ))}

                            <Skeleton className="h-10 w-full mt-4 shimmer" />
                        </CardContent>
                    </Card>

                    <div className="space-y-3">
                        <Skeleton className="h-5 w-1/3 shimmer" />
                        <Skeleton className="h-4 w-full shimmer" />
                        <Skeleton className="h-10 w-full shimmer" />
                    </div>
                </div>
            </div>
        </div>
    );
}

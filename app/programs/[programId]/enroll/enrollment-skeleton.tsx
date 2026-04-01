import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";

export default function EnrollmentSkeleton() {
    return (
        <div className="container py-12">
            {/* HEADER */}
            <div className="mb-8 space-y-2">
                <Skeleton className="h-6 w-36 shimmer rounded" /> {/* Back button */}
                <Skeleton className="h-10 w-3/4 shimmer rounded" /> {/* Title */}
                <Skeleton className="h-5 w-5/6 shimmer rounded" /> {/* Subtitle */}
            </div>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                {/* LEFT SIDE: Enrollment Steps */}
                <div className="md:col-span-2 space-y-6">
                    <Card>
                        <CardHeader className="space-y-2">
                            <Skeleton className="h-6 w-1/3 shimmer rounded" /> {/* CardTitle */}
                            <div className="flex gap-2">
                                <Skeleton className="h-6 w-16 shimmer rounded" />
                                <Skeleton className="h-6 w-16 shimmer rounded" />
                                <Skeleton className="h-6 w-16 shimmer rounded" />
                            </div>
                            <Skeleton className="h-4 w-full shimmer rounded" /> {/* CardDescription */}
                        </CardHeader>

                        <CardContent className="space-y-4">
                            {[...Array(6)].map((_, i) => (
                                <Skeleton key={i} className="h-10 w-full shimmer rounded" />
                            ))}
                        </CardContent>
                    </Card>
                </div>

                {/* RIGHT SIDE: Program Summary */}
                <div className="space-y-6">
                    <Card>
                        <CardHeader className="space-y-2">
                            <Skeleton className="h-6 w-1/3 shimmer rounded" /> {/* CardTitle */}
                        </CardHeader>

                        <CardContent className="space-y-4">
                            <Skeleton className="aspect-video w-full rounded-lg shimmer" /> {/* Image */}
                            <Skeleton className="h-6 w-2/3 shimmer rounded" /> {/* Program Title */}
                            <Skeleton className="h-4 w-5/6 shimmer rounded" /> {/* Program description */}

                            {/* Details */}
                            {[...Array(4)].map((_, i) => (
                                <div key={i} className="flex items-center gap-3">
                                    <Skeleton className="h-5 w-5 rounded-full shimmer" />
                                    <div className="space-y-1 w-full">
                                        <Skeleton className="h-4 w-1/3 shimmer rounded" />
                                        <Skeleton className="h-4 w-1/2 shimmer rounded" />
                                    </div>
                                </div>
                            ))}
                        </CardContent>

                        <CardFooter>
                            <Skeleton className="h-6 w-full shimmer rounded" /> {/* Support link */}
                        </CardFooter>
                    </Card>
                </div>
            </div>
        </div>
    );
}

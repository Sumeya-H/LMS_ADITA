import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function Loading() {
    return (
        <div className="container py-8">
            {/* Header */}
            <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
                <div>
                    <Skeleton className="h-10 w-64 mb-2" />
                    <Skeleton className="h-4 w-80" />
                </div>
                <Skeleton className="h-10 w-40 md:w-48" />
            </div>

            {/* Stats Cards */}
            <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
                {[...Array(4)].map((_, i) => (
                    <Card key={i}>
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <Skeleton className="h-4 w-24" />
                            <Skeleton className="h-4 w-4" />
                        </CardHeader>
                        <CardContent>
                            <Skeleton className="h-8 w-16 mb-1" />
                            <Skeleton className="h-3 w-32" />
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Tabs */}
            <div className="mt-8 space-y-6">
                {[...Array(3)].map((_, i) => (
                    <Card key={i}>
                        <CardHeader>
                            <Skeleton className="h-5 w-32 mb-2" />
                            <Skeleton className="h-3 w-48" />
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {[...Array(3)].map((_, j) => (
                                <div key={j} className="flex flex-col gap-2">
                                    <Skeleton className="h-4 w-1/3" />
                                    <Skeleton className="h-6 w-full" />
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Program Recommendations */}
            <div className="mt-12">
                <Card>
                    <CardHeader>
                        <Skeleton className="h-5 w-48 mb-2" />
                        <Skeleton className="h-3 w-64" />
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {[...Array(2)].map((_, i) => (
                            <Skeleton key={i} className="h-10 w-full" />
                        ))}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

"use client"

import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
    return (
        <div className="flex flex-1 overflow-y-auto">
            {/* Left Sidebar Skeleton */}
            <div className="w-84 space-y-6 border-r p-4">
                <Skeleton className="h-8 w-full mb-4" /> {/* Course title */}

                {[...Array(5)].map((_, i) => (
                    <div key={i} className="space-y-2">
                        <Skeleton className="h-6 w-3/4" /> {/* Section title */}
                        {[...Array(3)].map((_, j) => (
                            <div key={j} className="flex items-center gap-3 mt-2">
                                <Skeleton className="h-4 w-4 rounded-full" /> {/* Checkbox */}
                                <div className="flex-1 space-y-1">
                                    <Skeleton className="h-4 w-3/4" />
                                    <Skeleton className="h-3 w-1/2" />
                                </div>
                            </div>
                        ))}
                    </div>
                ))}
            </div>

            {/* Right Side Content Skeleton */}
            <div className="flex-1 overflow-y-auto hide-scrollbar p-8">
                <Skeleton className="h-8 w-1/3 mb-4" /> {/* Module title */}
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-5/6 mb-2" />
                <Skeleton className="h-64 w-full mt-4 rounded-lg" /> {/* Media / iframe placeholder */}
            </div>
        </div>
    );
}

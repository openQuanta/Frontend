import { Skeleton } from "@/components/ui/skeleton"

export function PreviewSkeleton() {
    return (
        <div className="w-full max-w-4xl bg-[#110F0F]/50 p-6 md:p-12 rounded-2xl border border-white/10">
            {/* Title Skeleton */}
            <Skeleton className="h-8 w-3/4 mb-8" />

            {/* Cover Image Skeleton */}
            <div className="mb-10">
                <Skeleton className="w-full h-[200px] sm:h-[300px] rounded-lg" />
            </div>

            {/* Paper Title and Type Skeleton */}
            <div className="mb-10">
                <Skeleton className="h-7 w-28 mb-4 rounded-full" />
                <Skeleton className="h-8 w-full" />
            </div>

            {/* Tabs Skeleton */}
            <div className="mb-[64px]">
                <div className="flex flex-wrap items-center border-b border-white/10 pb-2 max-w-full sm:max-w-lg">
                    <Skeleton className="h-8 w-20" />
                    <Skeleton className="h-8 w-24 ml-4" />
                    <Skeleton className="h-8 w-32 ml-4" />
                </div>
            </div>

            {/* Overview Tab Content Skeleton */}
            <div className="grid gap-8 md:gap-10">
                {/* Abstract */}
                <div className="grid gap-4">
                    <Skeleton className="h-6 w-24" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-5/6" />
                </div>

                {/* Keywords */}
                <div className="w-full max-w-lg gap-4 flex flex-col">
                    <Skeleton className="h-6 w-24 mb-2" />
                    <div className="flex flex-wrap gap-2">
                        <Skeleton className="h-7 w-20 rounded-full" />
                        <Skeleton className="h-7 w-24 rounded-full" />
                        <Skeleton className="h-7 w-16 rounded-full" />
                    </div>
                </div>

                {/* Co-Authors */}
                <div className="w-full grid gap-4">
                    <Skeleton className="h-6 w-28 mb-2" />
                    <div className="grid gap-4">
                        <Skeleton className="h-12 w-full rounded-lg" />
                        <Skeleton className="h-12 w-full rounded-lg" />
                    </div>
                </div>
            </div>

            {/* You can continue to add skeletons for the Summary, Expected Outcomes, and Buttons if needed */}
        </div>
    )
}
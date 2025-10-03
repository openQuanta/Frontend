"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";

interface ResearchPreviewCardProps {
  loading?: boolean;
}

export default function ResearchPreviewCard({
  loading = true,
}: ResearchPreviewCardProps) {
  const [showReviews, setShowReviews] = useState(false);

  if (loading) {
    return (
      <div className="max-w-2xl rounded-xl bg-[#111] text-white p-4 space-y-3 shadow-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Skeleton className="w-7 h-7 rounded-full" />
            <Skeleton className="w-20 h-4" />
          </div>
          <Skeleton className="w-20 h-4" />
        </div>

        <div className="flex space-x-2">
          <Skeleton className="w-16 h-6 rounded-full" />
          <Skeleton className="w-16 h-6 rounded-full" />
        </div>

        <div className="space-y-2">
          <Skeleton className="w-full h-6" />
          <Skeleton className="w-4/5 h-6" />
        </div>

        <div className="space-y-2">
          <Skeleton className="w-full h-4" />
          <Skeleton className="w-5/6 h-4" />
          <Skeleton className="w-3/4 h-4" />
        </div>

        <div className="flex items-center space-x-2">
          <Skeleton className="w-7 h-7 rounded-full" />
          <Skeleton className="w-24 h-6 rounded-full" />
        </div>

        <div className="flex justify-end space-x-4">
          <Skeleton className="w-6 h-6" />
          <Skeleton className="w-6 h-6" />
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl rounded-xl bg-[#111] text-white p-4 space-y-3 shadow-lg">
      {/* Top section */}
      <div className="flex items-center justify-between text-sm text-gray-400">
        <div className="flex items-center space-x-2">
          <Image
            src="https://i.pravatar.cc/40?img=1"
            alt="avatar1"
            className="w-7 h-7 rounded-full border border-gray-700"
          />
          <Image
            src="https://i.pravatar.cc/40?img=2"
            alt="avatar2"
            className="w-7 h-7 rounded-full border border-gray-700 -ml-2"
          />
          <span className="text-white">Shirle Mamours, Jerry Sorln</span>
        </div>
        <span className="text-gray-500">2 months ago</span>
      </div>

      {/* Tags */}
      <div className="flex space-x-2">
        <span className="px-3 py-1 text-sm rounded-full bg-[#222]">Health</span>
        <span className="px-3 py-1 text-sm rounded-full bg-[#222]">Tumor</span>
      </div>

      {/* Title */}
      <h2 className="font-semibold leading-snug">
        SMARCA4 is essential for early-stage tumor development but its loss
        promotes late-stage cancer progression in small-cell lung cancer
      </h2>

      {/* Description */}
      <p className="text-gray-400 text-sm">
        <span className="text-white font-medium">SMARCA4</span> and other
        components of the SWI/SNF chromatin remodeling complex have been
        implicated in various cancers. Yet, its role in small cell lung cancer
        (SCLC) tumorigenesis remains poorly understood...
      </p>

      {/* Peer reviews */}
      <div className="flex items-center space-x-2">
        <Image
          src="https://i.pravatar.cc/40?img=3"
          alt="avatar3"
          className="w-7 h-7 rounded-full border border-gray-700"
        />
        <Image
          src="https://i.pravatar.cc/40?img=4"
          alt="avatar4"
          className="w-7 h-7 rounded-full border border-gray-700 -ml-2"
        />
        <button
          onClick={() => setShowReviews(!showReviews)}
          className="flex items-center px-3 py-1 rounded-full bg-[#222] text-sm"
        >
          32 Peer reviews
          <ChevronDown className="ml-1 w-4 h-4" />
        </button>
      </div>

      {/* Footer */}
      <div className="flex justify-end space-x-4 text-gray-400">
        <span className="flex items-center space-x-1">
          <span>7</span>
        </span>
        <span className="flex items-center space-x-1">
          <span>18</span>
        </span>
      </div>
    </div>
  );
}

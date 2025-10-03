"use client";

import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";

const testimonials = [
  {
    name: "Alon",
    handle: "@alon",
    text: "I never realized how slow and closed-off traditional science was until I discovered DeSci. The old system was built to slow us down",
    avatar: "https://i.pravatar.cc/100?img=12",
  },
  {
    name: "Alon",
    handle: "@alon",
    text: "I never realized how slow and closed-off traditional science was until I discovered DeSci. The old system was built to slow us down",
    avatar: "https://i.pravatar.cc/100?img=13",
  },
  {
    name: "Alon",
    handle: "@alon",
    text: "I never realized how slow and closed-off traditional science was until I discovered DeSci. The old system was built to slow us down",
    avatar: "https://i.pravatar.cc/100?img=14",
  },
  {
    name: "Alon",
    handle: "@alon",
    text: "I never realized how slow and closed-off traditional science was until I discovered DeSci. The old system was built to slow us down",
    avatar: "https://i.pravatar.cc/100?img=15",
  },
  {
    name: "Alon",
    handle: "@alon",
    text: "I never realized how slow and closed-off traditional science was until I discovered DeSci. The old system was built to slow us down",
    avatar: "https://i.pravatar.cc/100?img=13",
  },
  {
    name: "Alon",
    handle: "@alon",
    text: "I never realized how slow and closed-off traditional science was until I discovered DeSci. The old system was built to slow us down",
    avatar: "https://i.pravatar.cc/100?img=14",
  },
  {
    name: "Alon",
    handle: "@alon",
    text: "I never realized how slow and closed-off traditional science was until I discovered DeSci. The old system was built to slow us down",
    avatar: "https://i.pravatar.cc/100?img=15",
  },
];

export default function TestimonialCarousel() {
  return (
    <Carousel opts={{ align: "start" }}>
      <CarouselContent>
        {testimonials.map((t, i) => (
          <CarouselItem key={i} className="md:basis-1/3 lg:basis-1/4">
            <Card
              className="bg-[#1e1e1e] border border-white/10
               text-gray-200 rounded-xl h-full"
            >
              <CardContent className="p-3 flex flex-col">
                {/* Header */}
                <div className="flex items-center gap-3 mb-4">
                  <Image
                    src={t.avatar}
                    alt={t.name}
                    className="w-10 h-10 rounded-full"
                  />
                  <div className="flex flex-col">
                    <span className="text-sm font-semibold">{t.name}</span>
                    <span className="text-xs text-gray-400">{t.handle}</span>
                  </div>
                </div>

                {/* Body */}
                <p className="text-sm leading-relaxed text-gray-300">
                  {t.text}
                </p>
              </CardContent>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
      <div className="flex justify-center gap-4 mt-8">
        <CarouselPrevious className="rounded-full bg-[#2a2a2a] border-none text-gray-300 hover:bg-[#333]" />
        <CarouselNext className="rounded-full bg-[#2a2a2a] border-none text-gray-300 hover:bg-[#333]" />
      </div>
    </Carousel>
  );
}

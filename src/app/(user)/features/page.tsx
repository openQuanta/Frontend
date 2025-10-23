"use client";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Caret, DashboardModel, CerficateIcon, FilelockIcon, TargetIcon, GridImg, PlanetBg, ConnectorArrow, Glasses, Microscope, circleTick } from "@/assets/images";
import { ScrollIndicator } from "../features/scroll-indicator";
import DynamicScrollCards from "./dynamic-cards";
import Footer from "@/components/shared/footer";
import { Button } from "@/components/ui/button";
import CountUp from "@/components/ui/CountUp";
import GlowingButton from "@/components/shared/glowing-button";
import Link from "next/link";

const sections = [
  { id: "upload-research", label: "Upload research", number: "01" },
  { id: "peer-review-nft", label: "Peer review NFT", number: "02" },
  { id: "reputation-layer", label: "Reputation layer", number: "03" },
  { id: "authorship-nft", label: "Authorship NFT", number: "04" },
  { id: "open-access-tool", label: "Open access tool", number: "05" },
  { id: "auction-bids", label: "Auction & bids", number: "06" },
];

export default function Page() {
    const [activeCard, setActiveCard] = useState(0);
    // This ref is for the *inner* scrollable content (the text/sections)
    const scrollContainerRef = useRef<HTMLDivElement | null>(null);
    // New ref for the *entire* container wrapping the sticky nav and content
    const stickyWrapperRef = useRef<HTMLDivElement | null>(null);
    const [isNavScrollOut, setIsNavScrollOut] = useState(false);

    // Card interval logic (keeping it as is)
    useEffect(() => {
        const interval = setInterval(() => {
            setActiveCard((prev) => (prev + 1) % 3);
        }, 6000);
        return () => clearInterval(interval);
    }, []);

    // New Scroll-Out Logic for the indicator (ScrollIndicator)
    useEffect(() => {
        const wrapper = stickyWrapperRef.current;
        const navElement = document.getElementById('scroll-indicator-nav'); // Get nav by ID

        if (!wrapper || !navElement) return;

        const handleScroll = () => {
            const viewportHeight = window.innerHeight;
            const scrollY = window.scrollY;

            // The point where the wrapper element's *bottom* aligns with the *top* of the viewport
            const wrapperBottom = wrapper.offsetTop + wrapper.offsetHeight;

            // Calculate the total height of the scrollable content inside the wrapper
            // If the scrollable content is in an inner div with H-screen, this is its full height
            const contentTotalHeight = sections.length * viewportHeight;

            // The scroll out should happen when the user scrolls past the text content,
            // which is defined by the wrapper's top offset + the content's total height.
            // We use the wrapper's bottom as the trigger.
            // The nav starts scrolling out when the scrollY exceeds the wrapper's bottom 
            // minus the viewport height (so the nav leaves the screen as the wrapper leaves)
            const scrollOutTrigger = wrapperBottom - viewportHeight;

            if (scrollY > scrollOutTrigger) {
                setIsNavScrollOut(true);
            } else {
                setIsNavScrollOut(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);


    return (
        <div className="flex flex-col gap-[40px]">
            {/* --- Hero Section (Top Content) --- */}
            <div className="flex flex-col gap-[64px] px-[87px] pt-[200px] pb-[42px]">
                {/* ... existing hero content ... */}
                <div className="flex flex-col">
                    <div className="grid gap-10 mb-[64px]">
                        <div className="flex items-center gap-2 px-[24px] py-[12px] border border-white/30 rounded-full w-[223px] h-[38px] text-[14px]">
                            <div className="w-3 h-3 rounded-full bg-[#FF4C0C]"></div>
                            <h4>On Chain & Transparent</h4>
                        </div>
                        <h2 className="text-[74px] w-[984px] h-[168px] leading-[84px]">
                            Powering the future of research publishing
                        </h2>
                    </div>
                    <p className="text-[16px] opacity-64 w-[984px] h-[77px] ">
                        Submit <span className="bg-[#6D78D5] border-[#6D78D5]">Papers </span>
                        <sup className="bg-[#6D78D5] w-[28.64px] h-[16.78px] mb-[30px]">Joe</sup>and build your reputation in a new era of publishers collaboration. We make research verifiable, and market-driven through blockchain technology.
                    </p>
                </div>

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveCard((prev) => (prev + 1) % 3);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col gap-[40px]">
      <div className="flex flex-col gap-[64px] px-[87px] pt-[200px] pb-[42px]">
        <div className="flex flex-col">
          <div className="grid gap-10 mb-[64px]">
            <div className="flex items-center gap-2 px-[24px] py-[12px] border border-white/30 rounded-full w-[223px] h-[38px] text-[14px]">
              <div className="w-3 h-3 rounded-full bg-[#FF4C0C]"></div>
              <h4>On Chain & Transparent</h4>
            </div>
            <h2 className="text-[74px] w-[984px] h-[168px] leading-[84px]">
              Powering the future of research publishing
            </h2>
          </div>
          <p className="text-[16px] opacity-64 w-[984px] h-[77px] ">
            Submit{" "}
            <span className="bg-[#6D78D5] border-[#6D78D5]">Papers </span>
            <sup className="bg-[#6D78D5] w-[28.64px] h-[16.78px] mb-[30px]">
              Joe
            </sup>
            and build your reputation in a new era of publishers collaboration.
            We make research verifiable, and market-driven through blockchain
            technology.
          </p>
        </div>

            {/*
                --- NEW STICKY SCROLL SECTION WRAPPER ---
                1. Height is now dictated by the sections *and* the top content.
                2. Removed the `w-[1252px] h-[512px] gap-[120px] flex sticky mt-[80px]...` div
                and replaced it with a non-sticky wrapper for the *whole* sticky content area.
                3. The total height of the scroll content is 6 sections * 100vh = 600vh (line 197).
                The wrapper needs to be tall enough to allow the body to scroll through all sections.
                
                The total height should be the content height + viewport height for the 'scroll-out' space.
            */}
            <div className="relative w-full mx-auto" ref={stickyWrapperRef} style={{ height: `${sections.length * 100}vh` }}>
                <div className="sticky top-0 h-screen w-full flex justify-center mx-auto max-w-7xl">

                    {/* 1. SCROLL NAV/INDICATOR CONTAINER */}
                    {/* The parent of the sticky nav must be tall enough to allow the nav to scroll out */}
                    {/* This div dictates where the nav element will be placed horizontally */}
                    <div className="w-[30%] h-full relative">
                        {/* The ScrollIndicator itself.
                            It is sticky to the viewport.
                            The translate-y class is added for the smooth scroll-out effect
                            The top-1/4 is the offset from the top where it 'sticks'
                        */}
                        <div
                            id="scroll-indicator-nav"
                            className={`
                                min-h-[50vh] w-fit relative 
                                sticky top-1/4 -translate-y-1/4
                                transition-all duration-500 ease-in-out
                                ${isNavScrollOut ? 'opacity-0 translate-y-[-100%]' : 'opacity-100 translate-y-0'}
                            `}
                        >
                            <ScrollIndicator
                                sections={sections}
                                scrollContainerRef={scrollContainerRef}
                                className="absolute left-8 top-1/2 -translate-y-1/2"
                            />
                        </div>
                    </div>

                    {/* 2. RIGHT-SIDE STICKY CONTENT AREA */}
                    {/* This content will remain fixed in the viewport while the sections scroll underneath it */}
                    <div className="w-[70%] h-full flex flex-col justify-start items-center">
                        <div className="w-[861px] h-[520px] mt-[24px]">
                            <div className="flex">
                                <div className="flex items-center justify-between w-full mb-10 py-4">
                                    <span>Upload research</span>
                                    <div className="flex items-center gap-6">
                                        <div className="flex items-center gap-2">
                                            {[0, 1, 2].map((index) => (
                                                <div
                                                    key={index}
                                                    className={`w-1 h-1 transition-all duration-300 ${index === activeCard ? "bg-white scale-125" : "bg-gray-600"}`}
                                                />
                                            ))}
                                        </div>
                                        <div className="flex items-center gap-[24px] [&>div]:cursor-pointer [&>div]:rounded-[4px]">
                                            <div className="border w-[40px] h-[40px] flex justify-center items-center">
                                                <Image src={Caret} alt="caret-down" width={20} height={20} />
                                            </div>
                                            <div className="border w-[40px] h-[40px] flex justify-center items-center rotate-180">
                                                <Image src={Caret} alt="caret-down" width={20} height={20} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* This is the card area that will change as you scroll. It needs to be inside the sticky parent. */}
                            <div className="w-[861px] h-[520px]">
                                <DynamicScrollCards sections={sections} />
                            </div>
                        </div>
                    </div>
                </div>

                {/* --- MAIN SCROLL TEXT CONTENT --- */}
                {/* This is the content that moves/scrolls to change the active section */}
                {/* It's positioned absolutely over the sticky nav/card area, filling the full height of the wrapper */}
                <div
                    ref={scrollContainerRef}
                    className="absolute inset-0 snap-y snap-mandatory scroll-smooth w-full h-full overflow-y-scroll"
                    style={{ zIndex: 10, pointerEvents: 'none' }} // Ensure the scroll indicator can still interact
                >
                    <div className="w-full flex">
                        {/* Empty space on the left to align with the sticky nav's width */}
                        <div className="w-[30%]"></div>

                        {/* The content columns - needs to be the same width as the sticky card content */}
                        <div className="w-[70%]">
                            {sections.map((section) => (
                                <section
                                    key={section.id}
                                    id={section.id}
                                    className="h-screen flex justify-start items-center snap-start"
                                >
                                    <div className="w-[861px] h-full overflow-y-auto p-10">
                                        <h2 className="text-4xl font-light text-white mb-6">{section.label}</h2>
                                        <p className="text-[20px] text-zinc-400 leading-relaxed w-full">
                                            This is the content section for {section.label}. Add your actual content here.
                                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident aut obcaecati harum veritatis velit, iste ipsam eos, repellendus a adipisci beatae saepe repellat deleniti. Voluptatem placeat suscipit odio aperiam voluptates, exercitationem, optio modi earum repellendus praesentium nesciunt voluptatum ea consectetur, ex corporis quasi nemo. Ex incidunt sequi autem quas voluptatem! Ut, deleniti. Exercitationem facere corrupti sed quas magnam nulla possimus dolor commodi.
                                        </p>
                                    </div>
                                </section>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-[24px] [&>div]:cursor-pointer [&>div]:rounded-[4px]">
                  <div className="border w-[40px] h-[40px] flex justify-center items-center">
                    <Image
                      src={Caret}
                      alt="caret-down"
                      width={20}
                      height={20}
                    />
                  </div>
                  <div className="border w-[40px] h-[40px] flex justify-center items-center rotate-180">
                    <Image
                      src={Caret}
                      alt="caret-down"
                      width={20}
                      height={20}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="w-[861px] h-[520px] sticky">
            <DynamicScrollCards sections={sections} />
          </div>
        </div>
      </div>

      <div className="overflow-hidden h-[200px]">
        <div
          ref={scrollContainerRef}
          className="h-screen overflow-y-scroll snap-y snap-mandatory scroll-smooth ml-80 overflow-hidden"
        >
          {sections.map((section) => (
            <section
              key={section.id}
              id={section.id}
              className="h-screen flex justify-center items-center snap-start"
            >
              <div className="w-[840px] h-full overflow-y-auto p-10">
                <h2 className="text-4xl font-light text-white mb-6">
                  {section.label}
                </h2>
                <p className="text-[20px] text-zinc-400 leading-relaxed">
                  This is the content section for {section.label}. Add your
                  actual content here. Lorem ipsum dolor sit amet consectetur
                  adipisicing elit. Ut, deleniti. Exercitationem facere corrupti
                  sed quas magnam nulla possimus dolor commodi.
                </p>
              </div>
            </section>
          ))}
        </div>
      </div>

      <section>
        <div className="w-[1000px] h-[727px] flex justify-center items-center mx-auto my-[100px]">
          <Image
            src={DashboardModel}
            alt="Dashboard Model"
            width={914}
            height={644}
            className="w-[1000px] h-[727px] object-cover opacity-90"
          />
        </div>

        <div className="flex justify-center  gap-[64px] mb-20 p-[160px] [&>div>h2]:text-[20px] [&>div>p]:text-[16px] [&>div>p]:opacity-64 [&>div]:gap-3">
          <div>
            <Image
              src={CerficateIcon}
              alt="Certificate Icon"
              width={24}
              height={24}
            />
            <h2>Lorem ipsum dolor sit amet.</h2>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis
              eius sequi autem similique.
            </p>
          </div>
          <div>
            <Image
              src={TargetIcon}
              alt="Certificate Icon"
              width={24}
              height={24}
            />
            <h2>Lorem ipsum dolor sit amet.</h2>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis
              eius sequi autem similique.
            </p>
          </div>
          <div>
            <Image
              src={FilelockIcon}
              alt="Certificate Icon"
              width={24}
              height={24}
            />
            <h2>Lorem ipsum dolor sit amet.</h2>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis
              eius sequi autem similique.
            </p>
          </div>
        </div>
      </section>

      <div className="flex justify-center items-center">
        <Image src={GridImg} alt="Background Lines" width={1254} height={300} />
      </div>

      <div className="w-[1252px] h-[512px] gap-[120px] flex mt-[100px] text-[20px] justify-center items-center mx-auto"></div>

      <div className="flex flex-col justify-center items-center text-center gap-[80px] mb-20 px-4">
        <div>
          <h2 className="text-[48px]">Start Publishing</h2>
          <p className="text-[16px] opacity-64">
            All you need is research. We&apos;ll handle the rest from on-chain
            proof to peer discovery
          </p>
        </div>
        <Button className="text-white">Get Started</Button>
      </div>

      <Footer />
    </div>
  );
}

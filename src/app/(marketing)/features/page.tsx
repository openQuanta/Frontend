"use client";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import {
  Caret,
  DashboardModel,
  CerficateIcon,
  FilelockIcon,
  TargetIcon,
  GridImg,
  PlanetBg,
  ConnectorArrow,
  Glasses,
  Microscope,
  circleTick,
} from "@/assets/images";
import { ScrollIndicator } from "../features/scroll-indicator";
import DynamicScrollCards from "./dynamic-cards";
import Footer from "@/components/shared/footer";
import { Button } from "@/components/ui/button";
import CountUp from "@/components/ui/CountUp";

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
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const stickyWrapperRef = useRef<HTMLDivElement | null>(null);
  const [isNavScrollOut, setIsNavScrollOut] = useState(false);

  // Card interval logic
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveCard((prev) => (prev + 1) % 3);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  // Scroll-out logic for the indicator
  useEffect(() => {
    const wrapper = stickyWrapperRef.current;
    const navElement = document.getElementById("scroll-indicator-nav");

    if (!wrapper || !navElement) return;

    const handleScroll = () => {
      const viewportHeight = window.innerHeight;
      const scrollY = window.scrollY;
      const wrapperBottom = wrapper.offsetTop + wrapper.offsetHeight;
      const scrollOutTrigger = wrapperBottom - viewportHeight;

      if (scrollY > scrollOutTrigger) {
        setIsNavScrollOut(true);
      } else {
        setIsNavScrollOut(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="flex flex-col gap-[40px]">
      {/* Hero Section */}
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
          <p className="text-[16px] opacity-64 w-[984px] h-[77px]">
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

        {/* Sticky Scroll Section */}
        <div
          className="relative w-full mx-auto"
          ref={stickyWrapperRef}
          style={{ height: `${sections.length * 100}vh` }}
        >
          <div className="sticky top-0 h-screen w-full flex justify-center mx-auto max-w-7xl">
            {/* Scroll Nav/Indicator Container */}
            <div className="w-[30%] h-full relative">
              <div
                id="scroll-indicator-nav"
                className={`
                  min-h-[50vh] w-fit relative 
                  sticky top-1/4 -translate-y-1/4
                  transition-all duration-500 ease-in-out
                  ${
                    isNavScrollOut
                      ? "opacity-0 translate-y-[-100%]"
                      : "opacity-100 translate-y-0"
                  }
                `}
              >
                <ScrollIndicator
                  sections={sections}
                  scrollContainerRef={scrollContainerRef}
                  className="absolute left-8 top-1/2 -translate-y-1/2"
                />
              </div>
            </div>

            {/* Right-Side Sticky Content Area */}
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
                            className={`w-1 h-1 transition-all duration-300 ${
                              index === activeCard
                                ? "bg-white scale-125"
                                : "bg-gray-600"
                            }`}
                          />
                        ))}
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

                <div className="w-[861px] h-[520px]">
                  <DynamicScrollCards sections={sections} />
                </div>
              </div>
            </div>
          </div>

          {/* Main Scroll Text Content */}
          <div
            ref={scrollContainerRef}
            className="absolute inset-0 snap-y snap-mandatory scroll-smooth w-full h-full overflow-y-scroll"
            style={{ zIndex: 10, pointerEvents: "none" }}
          >
            <div className="w-full flex">
              <div className="w-[30%]"></div>
              <div className="w-[70%]">
                {sections.map((section) => (
                  <section
                    key={section.id}
                    id={section.id}
                    className="h-screen flex justify-start items-center snap-start"
                  >
                    <div className="w-[861px] h-full overflow-y-auto p-10">
                      <h2 className="text-4xl font-light text-white mb-6">
                        {section.label}
                      </h2>
                      <p className="text-[20px] text-zinc-400 leading-relaxed w-full">
                        This is the content section for {section.label}. Add
                        your actual content here. Lorem ipsum dolor sit amet
                        consectetur adipisicing elit. Provident aut obcaecati
                        harum veritatis velit, iste ipsam eos, repellendus a
                        adipisci beatae saepe repellat deleniti. Voluptatem
                        placeat suscipit odio aperiam voluptates,
                        exercitationem, optio modi earum repellendus praesentium
                        nesciunt voluptatum ea consectetur, ex corporis quasi
                        nemo.
                      </p>
                    </div>
                  </section>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Dashboard Model Section */}
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

        <div className="flex justify-center gap-[64px] mb-20 p-[160px] [&>div>h2]:text-[20px] [&>div>p]:text-[16px] [&>div>p]:opacity-64 [&>div]:gap-3 [&>div]:flex [&>div]:flex-col">
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
            <Image src={TargetIcon} alt="Target Icon" width={24} height={24} />
            <h2>Lorem ipsum dolor sit amet.</h2>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis
              eius sequi autem similique.
            </p>
          </div>
          <div>
            <Image
              src={FilelockIcon}
              alt="Filelock Icon"
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

      {/* Peer Review Section */}
      <section className="flex justify-center items-center mb-20 w-[1252px] mx-auto h-[400px] [&>div]:w-[640px] [&>div]:bg-[#0E0F11] [&>div]:h-[400px] [&>div]:rounded-[8px] [&>div]:border-[#6462B8]/40 [&>div]:border [&>div]:px-[30px] [&>div]:py-[20px]">
        <div>
          <Image src={Microscope} alt="Microscope" width={40} height={40} />
          <h2 className="text-[40px] mb-6 mt-[40px]">
            Decentralized Peer Review
          </h2>
          <ul className="flex flex-col gap-4 mb-[42px]">
            <li>
              <Image
                src={circleTick}
                alt="tick"
                width={15}
                height={15}
                className="inline-block mr-2"
              />
              <span>Publish instantly without traditional gatekeepers</span>
            </li>
            <li>
              <Image
                src={circleTick}
                alt="tick"
                width={15}
                height={15}
                className="inline-block mr-2"
              />
              <span>Effective direct support from the community</span>
            </li>
            <li>
              <Image
                src={circleTick}
                alt="tick"
                width={15}
                height={15}
                className="inline-block mr-2"
              />
              <span>Build transparent reputation on-chain</span>
            </li>
            <li>
              <Image
                src={circleTick}
                alt="tick"
                width={15}
                height={15}
                className="inline-block mr-2"
              />
              <span>Permanent immutable record for your work</span>
            </li>
          </ul>
          <span className="text-[#FF4C0C]">Start Publishing</span>
        </div>
        <Image
          src={ConnectorArrow}
          alt="Connector Arrow"
          width={40}
          height={40}
        />
        <div>
          <Image src={Glasses} alt="Glasses" width={40} height={40} />
          <h2 className="mb-6 mt-[40px] text-[40px]">For Reviewers</h2>
          <ul className="flex flex-col gap-4 mb-[42px]">
            <li>
              <Image
                src={circleTick}
                alt="tick"
                width={15}
                height={15}
                className="inline-block mr-2"
              />
              <span>Publish instantly without traditional gatekeepers</span>
            </li>
            <li>
              <Image
                src={circleTick}
                alt="tick"
                width={15}
                height={15}
                className="inline-block mr-2"
              />
              <span>Effective direct support from the community</span>
            </li>
            <li>
              <Image
                src={circleTick}
                alt="tick"
                width={15}
                height={15}
                className="inline-block mr-2"
              />
              <span>Build transparent reputation on-chain</span>
            </li>
            <li>
              <Image
                src={circleTick}
                alt="tick"
                width={15}
                height={15}
                className="inline-block mr-2"
              />
              <span>Permanent immutable record for your work</span>
            </li>
          </ul>
          <span className="text-[#FF4C0C]">Become a reviewer</span>
        </div>
      </section>

      {/* Grid Image */}
      <div className="flex justify-center items-center">
        <Image src={GridImg} alt="Background Lines" width={1254} height={300} />
      </div>

      {/* Stats Section */}
      <div
        className="w-[1252px] h-[512px] gap-[86px] mt-[100px] flex flex-col justify-center mx-auto px-[39px] pt-[69px] pb-[40px] mb-[180px]"
        style={{
          backgroundImage: `url(${PlanetBg.src})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div>
          <h2 className="w-[450px] h-[80px] text-[30px] leading-10">
            Companies can invest in{" "}
            <span className="text-[#FF5a1f]">
              security measures to ensure continuity
            </span>
          </h2>
          <p className="w-[601px] h-[96px] text-[16px] opacity-40 mt-[17px] leading-6">
            These investments offer limited assurance of effectiveness, as
            assessing IT security is particularly challenging. Security requires
            specialized knowledge and expertise that these investments offer
            limited assurance of effectiveness, as assessing IT security is
            partic
          </p>
        </div>
        <div className="text-white w-[354px] h-[64px] px-[40px] border-white/24 drop-shadow-2xl border flex justify-center items-center rounded-[4px]">
          Support new layer of publication
        </div>
        <div className="flex w-[1099px] h-[160px] [&>div]:flex [&>div]:flex-col [&>div]:justify-center [&>div]:items-center [&>div]:pt-[32px] [&>div]:mx-auto [&>div]:w-[260px] [&>div]:h-[128px]">
          <div className="border-r border-white/20 pr-[80px]">
            <div className="text-[64px] flex justify-start">
              <CountUp
                from={0}
                to={72}
                separator=","
                direction="up"
                duration={1}
                className="count-up-text"
              />
              <span>%</span>
            </div>
            <span className="w-[260px] h-[45px] text-[16px] leading-6 opacity-40">
              All you need is your research. We handle the rest from on-chain
            </span>
          </div>
          <div className="border-r border-white/20 pr-[80px]">
            <CountUp
              from={0}
              to={5}
              separator=","
              direction="up"
              duration={1}
              className="count-up-text text-[64px]"
            />
            <span className="w-[260px] h-[45px] text-[16px] leading-6 opacity-40">
              All you need is your research. We handle the rest from on-chain
            </span>
          </div>
          <div>
            <div className="text-[64px] flex">
              <CountUp
                from={0}
                to={30}
                separator=","
                direction="up"
                duration={1}
                className="count-up-text"
              />
              <span>B+</span>
            </div>
            <span className="w-[260px] h-[45px] text-[16px] leading-6 opacity-40">
              All you need is your research. We handle the rest from on-chain
            </span>
          </div>
        </div>
      </div>

      {/* CTA Section */}
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

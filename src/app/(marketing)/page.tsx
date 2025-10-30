"use client";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  ChevronRight,
  CircleX,
  Search,
  SendHorizontal,
} from "lucide-react";
import Image from "next/image";
import { useRef, useEffect, useState } from "react";
import { motion, useInView, Variants } from "framer-motion";

// image assets
import client from "@/assets/images/client.svg";
import iconOrange from "@/assets/brand/iconOrange.svg";
import server from "@/assets/images/server.svg";
import solana from "@/assets/images/solana.png";
import solanaVerification from "@/assets/images/solana_verification.svg";
import superteam from "@/assets/images/superteam.png";
import triangleBlur from "@/assets/images/triangle_blur.png";
import connectorLine from "@/assets/images/connector-line.svg";
import Link from "next/link";
import ResearchPreviewCard from "@/components/research/research-preview";
import TestimonialCarousel from "@/components/feedback/testimonial-carousel";
import GlowingButton from "@/components/shared/glowing-button";

// Animation variants
const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.8 },
  },
};

const fadeInScale: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

const slideInRight: Variants = {
  hidden: { opacity: 0, x: 60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

const cardVariant: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

// AnimatedSection component with improved performance
interface AnimatedSectionProps {
  children: React.ReactNode;
  variants?: Variants;
  className?: string;
  delay?: number;
}

function AnimatedSection({
  children,
  variants = fadeInUp,
  className = "",
  delay = 0,
}: AnimatedSectionProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={variants}
      transition={{ delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function Page() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      // Attempt autoplay with fallback handling
      video.play().catch((error) => {
        console.log("Video autoplay prevented:", error);
        // Fallback: Show static background if video fails
      });
    }
  }, []);

  const handleTimeUpdate = () => {
    const video = videoRef.current;
    if (video) {
      const loopStart = 2;
      const loopEnd = 8;
      if (video.currentTime >= loopEnd) {
        video.currentTime = loopStart;
      }
    }
  };

  return (
    <main className="font-sans flex flex-col gap-20">
      {/* Hero Section with Video Background */}
      <section className="w-full mx-auto">
        {/* ---------------- HERO SECTION ---------------- */}
        <section className="relative w-full overflow-clip">
          <video
            ref={videoRef}
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            onTimeUpdate={handleTimeUpdate}
            className="absolute object-contain bottom-0 h-full -right-84"
          >
            <source src="/videos/LaserVideo.webm" type="video/webm" />
          </video>

          <div className="relative text-center md:text-left px-6 pt-40 pb-24 w-full max-w-[840px] flex flex-col items-center gap-12 md:items-start backdrop-blur-md rounded-br-[360px]">
            <AnimatedSection variants={fadeIn} delay={0.2}>
              <div className="flex items-center gap-3 p-3 px-6 border-[0.5px] border-white/24 rounded-full">
                <div className="w-3 h-3 rounded-full bg-[#645cfb] animate-pulse"></div>
                <h4 className="text-sm">On Chain & Transparent</h4>
              </div>
            </AnimatedSection>

            <AnimatedSection variants={fadeInUp} delay={0.4}>
              <div className="flex flex-col gap-6">
                <h1 className="text-[74px] leading-[74px]">
                  Advance your research through independent publishing
                </h1>
                <p className="text-white/64">
                  Here researchers publish without intermediaries, control their
                  work, secure authorship with NFTs and monetize in an open
                  market.
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection variants={fadeInUp} delay={0.6}>
              <div className="grid md:flex items-center gap-5">
                <Link href="/login" className="relative group/button">
                  <GlowingButton>Get Started</GlowingButton>
                </Link>
                <Link href="/founding-contributor">
                  <Button variant="ghost" className="group">
                    Become a founding contributor{" "}
                    <div className="relative w-4 h-4 mt-0.5">
                      <ChevronRight className="absolute transition-all duration-1000 group-hover:opacity-0 right-0" />
                      <ArrowRight className="absolute opacity-0 transition-all duration-1000 group-hover:opacity-100 right-0.5" />
                    </div>
                  </Button>
                </Link>
              </div>
            </AnimatedSection>
          </div>
        </section>

        {/* Dashboard Illustration */}
        <section>
          <AnimatedSection variants={fadeInScale}>
            <div className="relative w-full aspect-video">
              <Image
                src="/images/hero_dashboard.png"
                alt="Hero Dashboard"
                fill
                className="object-contain object-top"
                priority
              />
            </div>
          </AnimatedSection>

          <AnimatedSection variants={fadeIn}>
            <div className="text-center grid gap-5 py-10">
              <p className="text-sm md:text-xl">
                We&apos;re backed by the strength of the Solana ecosystem
              </p>
              <div className="flex justify-center items-center gap-8 px-10">
                <div className="relative">
                  <Image
                    src={solana}
                    alt="Solana logo"
                    className="h-4 w-auto"
                  />
                </div>
                <div className="relative">
                  <Image
                    src={superteam}
                    alt="Superteam logo"
                    className="h-4 w-auto"
                  />
                </div>
              </div>
            </div>
          </AnimatedSection>
        </section>
      </section>

      {/* Smart Flow Section */}
      <section className="p-5 space-y-8 w-full max-w-[1200px] mx-auto">
        <AnimatedSection variants={fadeInUp}>
          <div
            style={{ backgroundImage: `url(${triangleBlur.src})` }}
            className="text-center flex flex-col items-center gap-5 bg-center bg-contain bg-no-repeat"
          >
            <Image
              width={14}
              height={76}
              src="/images/circle_down.svg"
              alt="Circle Down"
            />
            <h2 className="text-4xl md:text-5xl">
              Smart <span className="text-primary">Flow</span>
            </h2>
            <p className="text-white/65 max-w-2xl">
              A seamless, step-by-step flow to guide you from first click to
              final result.
            </p>
          </div>
        </AnimatedSection>

        <AnimatedSection variants={fadeInUp}>
          <div className="bg-[#181615] rounded-2xl grid lg:grid-cols-4">
            <div className="md:col-span-1 flex flex-col gap-3 justify-center items-center lg:items-start text-center lg:text-left md:p-12 lg:-mr-36">
              <Button
                variant="link"
                className="w-max text-sm text-primary hover:text-primary/80"
              >
                Explore <ChevronRight />
              </Button>
              <div className="flex flex-col gap-3 px-3">
                <h3 className="text-2xl">What You Can Do</h3>
                <p className="text-sm max-w-sm text-white/65">
                  Every layer of openQuanta is designed for scientific
                  collaboration and transparent publishing. Each piece plays a
                  vital role in advancing open research.
                </p>
              </div>
            </div>

            {/* Animated Card Flow */}
            <motion.div
              className="lg:col-span-3 hidden md:flex md:flex-col gap-5"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
            >
              {/* First Layer */}
              <motion.div
                variants={cardVariant}
                className="flex justify-between gap-5"
              >
                <div className="w-full h-28 border-b border-white/10 rounded-[8px]"></div>
                <div className="grid gap-5 w-max">
                  <div className="w-full h-5 border-b border-x border-white/10 rounded-b-[8px]"></div>
                  <div className="flex gap-5">
                    <div className="p-5 bg-white/5 border border-white/10 rounded-[8px] w-[200px] hover:bg-white/10 transition-colors">
                      <h4 className="mb-1">Research Paper</h4>
                      <p className="text-xs text-[#92939D] line-clamp-3">
                        Submit and tokenize your paper to prove authorship and
                        control distribution.
                      </p>
                    </div>
                    <div className="p-5 bg-white/5 border border-white/10 rounded-[8px] w-[200px] hover:bg-white/10 transition-colors">
                      <h4 className="mb-1">Peer Review NFT</h4>
                      <p className="text-xs text-[#92939D] line-clamp-3">
                        Provide expert feedback and mint it on-chain as a
                        verifiable review asset.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="w-full max-w-36 h-full border-b border-l border-white/10 rounded-bl-[8px]"></div>
              </motion.div>

              {/* Second Layer */}
              <motion.div
                variants={cardVariant}
                className="flex justify-end md:mr-10 lg:mr-20 gap-5"
              >
                <div className="p-5 bg-white/5 border border-white/10 rounded-[8px] w-[200px] hover:bg-white/10 transition-colors">
                  <h4 className="mb-1">Reputation Layer</h4>
                  <p className="text-xs text-[#92939D] line-clamp-3">
                    Earn public reputation points by contributing quality
                    reviews.
                  </p>
                </div>
                <div className="p-5 bg-white/5 border border-white/10 rounded-[8px] w-[200px] hover:bg-white/10 transition-colors">
                  <h4 className="font- mb-1">Authorship NFT</h4>
                  <p className="text-xs text-[#92939D] line-clamp-3">
                    Mint your scientific work as an NFT to earn, trade, and
                    track provenance.
                  </p>
                </div>
                <div className="p-5 bg-white/5 border border-white/10 rounded-[8px] w-[200px] hover:bg-white/10 transition-colors">
                  <h4 className="font- mb-1">Open Access Tools</h4>
                  <p className="text-xs text-[#92939D] line-clamp-3">
                    Enable others to cite and fund research; researchers can
                    submit proposals with tokens
                  </p>
                </div>
              </motion.div>

              {/* Third Layer */}
              <motion.div
                variants={cardVariant}
                className="flex justify-between gap-5"
              >
                <div className="w-full h-28 mt-auto border-t border-x border-white/10 rounded-t-[8px]"></div>
                <div className="grid gap-5 w-max">
                  <div className="flex gap-5">
                    <div className="p-5 bg-white/5 border border-white/10 rounded-[8px] w-[200px] hover:bg-white/10 transition-colors">
                      <h4 className="font- mb-1">Auction & Bids</h4>
                      <p className="text-xs text-[#92939D] line-clamp-3">
                        Enable researchers to auction their work and receive
                        bids from interested parties.
                      </p>
                    </div>
                    <div className="p-5 bg-white/5 border border-white/10 rounded-[8px] w-[200px] hover:bg-white/10 transition-colors">
                      <h4 className="font- mb-1">Market Analytics</h4>
                      <p className="text-xs text-[#92939D] line-clamp-3">
                        Track performance, citations, and market value of your
                        published research.
                      </p>
                    </div>
                  </div>
                  <div className="w-full h-5 border-t border-x border-white/10 rounded-t-[8px]"></div>
                </div>
                <div className="w-full max-w-36 h-full border-t border-l border-white/10 rounded-tl-[8px]"></div>
              </motion.div>
            </motion.div>
          </div>
        </AnimatedSection>
      </section>

      {/* What Publishing Looks Like */}
      <section className="p-6 space-y-12 md:space-y-0 w-full max-w-[1000px] mx-auto">
        <AnimatedSection variants={fadeInUp}>
          <div className="grid place-items-center md:flex md:items-center w-full gap-6">
            <motion.div
              variants={slideInLeft}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="shrink-0 md:pt-24"
            >
              <Image src={client} alt="Client" className="w-full" />
              <div className="hidden md:block mt-4 space-y-2">
                <div className="flex gap-3 justify-between items-baseline text-xs">
                  <h4 className="opacity-40">Researcher</h4>
                  <p>Alex Marshall</p>
                </div>
                <div className="flex gap-3 justify-between items-baseline text-xs">
                  <h4 className="opacity-40">Role</h4>
                  <p>Neuroscience DAO</p>
                </div>
                <div className="flex gap-3 justify-between items-baseline text-xs">
                  <h4 className="opacity-40">Title</h4>
                  <p>Episodic Activation</p>
                </div>
                <div className="flex gap-3 justify-between items-baseline text-xs">
                  <h4 className="opacity-40">Action</h4>
                  <p>Published</p>
                </div>
                <div className="flex gap-3 justify-between items-baseline text-xs">
                  <h4 className="opacity-40">Status</h4>
                  <p>Peer-reviewed & Minted</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              variants={fadeIn}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="w-1 h-24 md:w-full md:h-1 bg-gradient-to-r from-primary/50 via-primary to-primary/50"
            />

            <motion.div
              variants={fadeInScale}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="w-28 h-28 shrink-0 rounded-full border-x border-primary/80 flex items-center justify-center"
            >
              <Image
                src={iconOrange}
                alt="Icon Orange"
                className="w-3/4 h-3/4"
                style={{
                  filter: "drop-shadow(5px 4px 112px rgba(123, 52, 30, 0.6))",
                }}
              />
            </motion.div>

            <motion.div
              variants={fadeIn}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="w-1 h-24 md:w-full md:h-1 bg-gradient-to-r from-primary/50 via-primary to-primary/50"
            />

            <motion.div
              variants={slideInRight}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="shrink-0 md:pt-24"
            >
              <Image src={server} alt="Server" className="w-full" />
              <div className="hidden md:block mt-4 space-y-2">
                <div className="flex gap-3 justify-between items-baseline text-xs">
                  <h4 className="opacity-40">Network</h4>
                  <p>Solana Mainnet</p>
                </div>
                <div className="flex gap-3 justify-between items-baseline text-xs">
                  <h4 className="opacity-40">NFT ID</h4>
                  <p>#EPsDA2024</p>
                </div>
                <div className="flex gap-3 justify-between items-baseline text-xs">
                  <h4 className="opacity-40">Timestamp</h4>
                  <p>Block 245678</p>
                </div>
                <div className="flex gap-3 justify-between items-baseline text-xs">
                  <h4 className="opacity-40">Reviews</h4>
                  <p>3 Verified</p>
                </div>
                <div className="flex gap-3 justify-between items-baseline text-xs">
                  <h4 className="opacity-40">Market</h4>
                  <p>Listed - 2.5 SOL</p>
                </div>
              </div>
            </motion.div>
          </div>
        </AnimatedSection>

        <AnimatedSection variants={fadeInUp}>
          <div className="text-center w-full max-w-[600px] mx-auto flex flex-col gap-5 mt-12">
            <h2 className="text-primary">
              What publishing looks like on-chain
            </h2>
            <p className="text-3xl md:text-4xl lg:text-5xl">
              Once published, your work is reviewed, minted, and listed on the
              marketplace.
            </p>
            <p className="text-white/65">
              On-chain publishing turns your work into an authorship NFT — proof
              of ownership, permanent record, and a tradable asset. It preserves
              credibility while opening direct paths to funding and wider
              recognition
            </p>
            <Link href="/founding-contributor">
              <Button variant="ghost" className="group mx-auto">
                Become a founding contributor{" "}
                <div className="relative w-4 h-4 mt-0.5">
                  <ChevronRight className="absolute transition-all duration-300 group-hover:opacity-0 group-hover:translate-x-1" />
                  <ArrowRight className="absolute opacity-0 transition-all duration-300 group-hover:opacity-100" />
                </div>
              </Button>
            </Link>
          </div>
        </AnimatedSection>
      </section>

      {/* How Verification Works */}
      <AnimatedSection variants={fadeInUp}>
        <section className="w-full max-w-[1200px] mx-auto p-5">
          <div
            className="bg-[#181615] p-8 rounded-2xl grid lg:grid-cols-12 gap-6"
            style={{ boxShadow: "5px 4px 112px 10px rgba(123, 52, 30, 0.3)" }}
          >
            <motion.div
              variants={slideInLeft}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="flex flex-col gap-10 w-full self-center lg:col-span-5"
            >
              <div className="flex flex-col gap-3">
                <h2 className="font- text-3xl">How Verification Works</h2>
                <h3 className="text-primary text-xl">
                  Immutable Proof on Solana Blockchain
                </h3>
              </div>
              <div className="flex flex-col gap-3 text-white/65 text-sm">
                <p>
                  Every journal entry on openQuanta is cryptographically
                  timestamped and permanently anchored on the Solana blockchain.
                  This guarantees your authorship, timestamp, and data remain
                  tamper-proof and secure. It feels like publishing on any
                  modern digital platform — simple, fast, and accessible.
                </p>
                <p>
                  Behind the scenes, advanced infrastructure ensures your work
                  is permanently protected.
                </p>
              </div>
            </motion.div>

            <motion.div
              variants={slideInRight}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="-ml-12 md:-ml-16 lg:-ml-18 lg:col-span-7"
            >
              <Image src={solanaVerification} alt="Solana Verification" />
            </motion.div>
          </div>
        </section>
      </AnimatedSection>

      {/* Feedback from Users */}
      <section className="w-full max-w-[1200px] mx-auto p-5 space-y-12">
        <AnimatedSection variants={fadeInUp}>
          <div
            style={{ backgroundImage: `url(${triangleBlur.src})` }}
            className="text-center flex flex-col items-center gap-5 bg-center bg-contain bg-no-repeat"
          >
            <Image
              width={14}
              height={76}
              src="/images/circle_down.svg"
              alt="Circle Down"
            />
            <h2 className="text-3xl md:text-4xl lg:text-5xl">
              Feedback from{" "}
              <span className="text-primary">traditional users</span>
            </h2>
          </div>
        </AnimatedSection>

        <AnimatedSection variants={fadeInUp}>
          <div className="p-8 bg-white/5 rounded-2xl space-y-8">
            <h3 className="text-2xl lg:text-3xl font-semibold">
              <span className="text-white/50">Report from </span>Researchers
            </h3>

            <p className="text-white/65">
              Each card below carries a unique voice from our vibrant community
              — researchers, developers, dreamers, and doers — all united by a
              deep love for open science. From labs to ledgers, this is love
              from DeSci builders, to the world.
            </p>
            <TestimonialCarousel />
          </div>
        </AnimatedSection>
      </section>

      {/* Featured Research */}
      <AnimatedSection variants={fadeInUp}>
        <section className="w-full max-w-[1200px] mx-auto p-5 grid md:flex place-items-center md:justify-center gap-6">
          <motion.div
            variants={slideInLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="w-full md:max-w-2/5 border border-[#6462B866] rounded-[8px] p-10 h-[480px] flex flex-col justify-center gap-12 hover:border-[#6462B8] transition-colors"
          >
            <h3 className="text-2xl text-[#6A63F6]">Featured Research</h3>
            <div className="space-y-6">
              <h4 className="text-3xl md:text-4xl lg:text-5xl">
                Groundbreaking discoveries await
              </h4>
              <p className="text-muted-foreground">
                Explore groundbreaking work from scientists and DAOs. All
                research is peer-reviewed, minted on-chain, and ready for
                discovery.
              </p>
            </div>
            <Link
              href="/explore"
              className="text-sm flex gap-3 items-center group hover:text-primary transition-colors"
            >
              Explore Research{" "}
              <ArrowRight className="transition-transform group-hover:translate-x-1" />
            </Link>
          </motion.div>

          <Image
            src={connectorLine}
            alt="Connector Line"
            className="rotate-90 md:rotate-0 -my-4"
          />

          <motion.div
            variants={slideInRight}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="w-full md:max-w-2/5 border border-[#6462B866] rounded-[8px] p-5 h-[480px] flex flex-col gap-5 overflow-y-scroll hover:border-[#6462B8] transition-colors"
          >
            <ResearchPreviewCard />
            <ResearchPreviewCard />
            <ResearchPreviewCard />
          </motion.div>
        </section>
      </AnimatedSection>

      {/* Why OpenQuanta */}
      <AnimatedSection variants={fadeInUp}>
        <section className="w-full max-w-[640px] mx-auto p-5 flex flex-col gap-10 text-center items-center">
          <div className="flex flex-col gap-5">
            <h2 className="text-3xl md:text-4xl lg:text-5xl">
              Why OpenQuanta?
            </h2>
            <p className="text-white/65">
              We&apos;ve seen quality research die in desk drawers. Brilliant
              minds give away credit just to get published. Geographic bias
              beats good science, and curators are plagued by perverse
              incentives. As distributors, they are often paywalled.
            </p>
          </div>

          <div className="flex items-center gap-2 w-full">
            <div className="flex gap-2 items-center p-2 border border-white/10 rounded-full w-full hover:border-white/20 transition-colors">
              <div className="flex gap-2 items-center p-2 w-full">
                <Search size={16} className="text-white/40" />
                <input
                  type="text"
                  placeholder="Ask any question about openQuanta"
                  className="w-full text-xs outline-0 bg-transparent placeholder:text-white/40"
                />
              </div>
              <button className="bg-white/80 p-2 rounded-full text-black w-max hover:bg-white transition-colors">
                <SendHorizontal size={20} />
              </button>
            </div>
            <button className="text-white shrink-0 hover:text-white/60 transition-colors">
              <CircleX />
            </button>
          </div>
        </section>
      </AnimatedSection>

      {/* CTA */}
      <AnimatedSection variants={fadeInScale}>
        <section className="w-full max-w-[1200px] mx-auto p-5 flex flex-col gap-10 text-center items-center mb-20">
          <div className="flex flex-col gap-5">
            <h2 className="text-3xl md:text-4xl lg:text-5xl">
              Start Publishing
            </h2>
            <p className="text-white/65 max-w-2xl mx-auto">
              All you need is your research. We handle the rest — from on-chain
              proof to peer discovery.
            </p>
          </div>
          <Link href="/login">
            <Button className="w-max text-white hover:scale-105 transition-transform">
              Get Started
            </Button>
          </Link>
        </section>
      </AnimatedSection>
    </main>
  );
}
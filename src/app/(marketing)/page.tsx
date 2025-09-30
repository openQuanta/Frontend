import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  ChevronRight,
  CircleX,
  Search,
  SendHorizontal,
} from "lucide-react";
import Image from "next/image";

// image assets
import circleDown from "@/assets/images/circle_down.svg";
import client from "@/assets/images/client.svg";
import heroArt from "@/assets/images/cool_light_thingy.svg";
import heroDash from "@/assets/images/hero_dashboard.png";
import iconOrange from "@/assets/brand/iconOrange.svg";
import server from "@/assets/images/server.svg";
import solana from "@/assets/images/solana.png";
import solanaVerification from "@/assets/images/solana_verification.svg";
import superteam from "@/assets/images/superteam.png";
import triangleBlur from "@/assets/images/triangle_blur.png";
import connectorLine from "@/assets/images/connector-line.svg";
import Link from "next/link";
import ResearchPreviewCard from "@/components/research/research-preview";
import { Icon } from "@/components/ui/icon";
import TestimonialCarousel from "@/components/feedback/testimonial-carousel";

export default function Page() {
  return (
    <main className="font-sans flex flex-col gap-20">
      {/* Hero */}
      <section className="w-full max-w-[1200px] mx-auto">
        {/* top section */}
        <section
          style={{ backgroundImage: `url(${heroArt.src})` }}
          className="w-full bg-contain bg-center md:bg-position-[90%] bg-no-repeat"
        >
          <div className="text-center md:text-left px-5 py-40 w-full max-w-[600px] flex flex-col items-center gap-10 md:items-start bg-black/30 backdrop-blur-sm">
            <div className="flex items-center gap-2 p-2 px-4 border border-white/30 rounded-full">
              <div className="w-3 h-3 rounded-full bg-violet-600"></div>
              <h4>On Chain & Transparent</h4>
            </div>

            <div className="flex flex-col gap-10">
              <h1 className="text-5xl">
                Advancing human progress with publishing
              </h1>
              <p>
                Transforming research through open publishing, authorship NFTs,
                and reputation-weighted peer review — all on a decentralized
                platform built on Solana.
              </p>
            </div>

            <div className="grid md:flex items-center gap-5">
              <Button variant="outline">Get Started</Button>
              <Link href="/founding-contributor">
                <Button variant="link">
                  Become a founding contributor <ChevronRight />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* bottom section with illustration */}
        <section className="-mt-20 px-5">
          <div className="relative w-full max-w-[1000px] mx-auto">
            <Image src={heroDash} alt="Hero Dashboard" />
          </div>

          <div className="text-center grid gap-5 py-10">
            <p className="text-sm md:text-xl">
              We're backed by the strength of the Solana ecosystem
            </p>
            <div className="flex justify-center items-center gap-5 px-10">
              <div className="relative">
                <Image src={solana} alt="Solana logo" className="h-4 w-max" />
              </div>
              <div className="relative">
                <Image
                  src={superteam}
                  alt="Superteam logo"
                  className="h-4 w-max"
                />
              </div>
            </div>
          </div>
        </section>
      </section>

      {/* Smart Flow */}
      <section className="p-5 space-y-8 w-full max-w-[1200px] mx-auto">
        <div
          style={{ backgroundImage: `url(${triangleBlur.src})` }}
          className="text-center flex flex-col items-center gap-5 bg-center bg-contain bg-no-repeat"
        >
          <Image src={circleDown} alt="Circle Down" className="h-20 w-full" />
          <h2 className="text-5xl">
            Smart <span className="text-primary">Flow</span>
          </h2>
          <p>
            A seamless, step-by-step flow to guide you from first click to final
            result.
          </p>
        </div>
        <div className="bg-[#181615] rounded-2xl grid lg:grid-cols-4">
          <div className="md:col-span-1 flex flex-col gap-3 justify-center items-center lg:items-start text-center lg:text-left md:p-12 lg:-mr-36">
            <Button variant="link" className="w-max text-sm text-primary">
              Explore <ChevronRight />
            </Button>
            <div className="flex flex-col gap-3 px-3">
              <h3 className="text-2xl font-bold">What You Can Do</h3>
              <p className="text-sm max-w-sm">
                Every layer of openQuanta is designed for scientific
                collaboration and transparent publishing. Each piece plays a
                vital role in advancing open research.
              </p>
            </div>
          </div>
          <div className="lg:col-span-3 hidden md:flex md:flex-col gap-5">
            {/* first layer */}
            <div className="flex justify-between gap-5">
              <div className="w-full h-28 border-b border-white/10 rounded-xl"></div>
              <div className="grid gap-5 w-max">
                <div className="w-full h-5 border-b border-x border-white/10 rounded-b-xl"></div>
                <div className="flex gap-5">
                  <div className="p-5 bg-white/5 border border-white/10 rounded-xl w-[200px]">
                    <h4 className="font-bold mb-1">Research Paper</h4>
                    <p className="text-xs text-[#92939D] line-clamp-3">
                      Submit and tokenize your paper to prove authorship and
                      control distribution.
                    </p>
                  </div>
                  <div className="p-5 bg-white/5 border border-white/10 rounded-xl w-[200px]">
                    <h4 className="font-bold mb-1">Peer Review NFT</h4>
                    <p className="text-xs text-[#92939D] line-clamp-3">
                      Provide expert feedback and mint it on-chain as a
                      verifiable review asset.
                    </p>
                  </div>
                </div>
              </div>
              <div className="w-full max-w-36 h-full border-b border-l border-white/10 rounded-bl-xl"></div>
            </div>

            {/* second layer */}
            <div className="flex justify-end md:mr-10 lg:mr-20 gap-5">
              <div className="p-5 bg-white/5 border border-white/10 rounded-xl w-[200px]">
                <h4 className="font-bold mb-1">Reputation Layer</h4>
                <p className="text-xs text-[#92939D] line-clamp-3">
                  Earn public reputation points by contributing quality reviews.
                </p>
              </div>
              <div className="p-5 bg-white/5 border border-white/10 rounded-xl w-[200px]">
                <h4 className="font-bold mb-1">Authorship NFT</h4>
                <p className="text-xs text-[#92939D] line-clamp-3">
                  Mint your scientific work as an NFT to earn, trade, and track
                  provenance.
                </p>
              </div>
              <div className="p-5 bg-white/5 border border-white/10 rounded-xl w-[200px]">
                <h4 className="font-bold mb-1">Open Access Tools</h4>
                <p className="text-xs text-[#92939D] line-clamp-3">
                  Enable others to cite and fund a research also a researcher
                  can submit proposals with tokens
                </p>
              </div>
            </div>

            {/* third layer */}
            <div className="flex justify-between gap-5">
              <div className="w-full h-28 mt-auto border-t border-x border-white/10 rounded-t-xl"></div>
              <div className="grid gap-5 w-max">
                <div className="flex gap-5">
                  <div className="p-5 bg-white/5 border border-white/10 rounded-xl w-[200px]">
                    <h4 className="font-bold mb-1">Research Paper</h4>
                    <p className="text-xs text-[#92939D] line-clamp-3">
                      Submit and tokenize your paper to prove authorship and
                      control distribution.
                    </p>
                  </div>
                  <div className="p-5 bg-white/5 border border-white/10 rounded-xl w-[200px]">
                    <h4 className="font-bold mb-1">Peer Review NFT</h4>
                    <p className="text-xs text-[#92939D] line-clamp-3">
                      Provide expert feedback and mint it on-chain as a
                      verifiable review asset.
                    </p>
                  </div>
                </div>
                <div className="w-full h-5 border-t border-x border-white/10 rounded-t-xl"></div>
              </div>
              <div className="w-full max-w-36 h-full border-t border-l border-white/10 rounded-tl-xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Ideal Audience */}
      <section className="w-full max-w-[1000px] mx-auto">
        {/* illustration */}
        <div className="flex items-center w-full">
          {/* client */}
          <div className="shrink-0 pt-24">
            {/* will contain client illustration image and text */}
            <Image src={client} alt="Client" className="w-full" />
            <div className="">
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
          </div>
          {/* left orange bar */}
          <div className="w-full h-1 bg-primary"></div>
          {/* middle circle with logo */}
          <div className="w-28 h-28 shrink-0 rounded-full border-x border-primary/80 flex items-center justify-center">
            <Image src={iconOrange} alt="Icon Orange" className="w-3/4 h-3/4" />
          </div>
          {/* right orange bar */}
          <div className="w-full h-1 bg-primary"></div>
          {/* server */}
          <div className="shrink-0 pt-24">
            {/* will contain server illustration image and text */}
            <Image src={server} alt="Server" className="w-full" />
            <div>
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
          </div>
        </div>

        {/* content */}
        <div className="text-center w-full max-w-[600px] mx-auto flex flex-col gap-5">
          <h2 className="text-primary">What publishing looks like on-chain</h2>
          <p className="text-5xl">
            Once published, your work is reviewed, minted, and listed on the
            marketplace.
          </p>
          <p className="text-white/65">
            On-chain publishing turns your work into an authorship NFT — proof
            of ownership, permanent record, and a tradable asset. It preserves
            credibility while opening direct paths to funding and wider
            recognition
          </p>
          <Button variant="link">
            Becoming a founding contributor <ChevronRight />
          </Button>
        </div>
      </section>

      {/* How Verification Works */}
      <section className="w-full max-w-[1200px] mx-auto p-5">
        <div className="bg-[#181615] p-8 rounded-2xl grid lg:grid-cols-12 gap-6">
          {/* content */}
          <div className="flex flex-col gap-10 w-full self-center lg:col-span-5">
            <div className="flex flex-col gap-3">
              <h2 className="font-bold text-3xl">How Verification Works</h2>
              <h3 className="text-primary text-xl">
                Immutable Proof on Solana Blockchain
              </h3>
            </div>
            <div className="flex flex-col gap-3 text-white/65 text-sm">
              <p>
                Every journal entry on openQuanta is cryptographically
                timestamped and permanently anchored on the Solana blockchain.
                This guarantees your authorship, timestamp, and data remain
                tamper-proof and secure. It feels like publishing on any modern
                digital platform simple, fast, and accessible.
              </p>
              <p>
                Behind the scenes, advanced infrastructure ensures your work is
                permanently protected.
              </p>
            </div>
          </div>

          {/* illustration */}
          <div className="-ml-12 md:-ml-16 lg:-ml-18 lg:col-span-7">
            <Image src={solanaVerification} alt="Solana Verification" />
          </div>
        </div>
      </section>

      {/* Feedback from users */}
      <section className="w-full max-w-[1200px] mx-auto p-5 space-y-12">
        <div
          style={{ backgroundImage: `url(${triangleBlur.src})` }}
          className="text-center flex flex-col items-center gap-5 bg-center bg-contain bg-no-repeat"
        >
          <Image src={circleDown} alt="Circle Down" className="h-20 w-full" />
          <h2 className="text-3xl md:text-4xl lg:text-5xl">
            Feedback from <span className="text-primary">tradition users</span>
          </h2>
        </div>

        <div className="p-8 bg-white/5 rounded-2xl space-y-18">
          <h3 className="text-xl md:text-2xl lg:text-3xl font-bold">
            <span className="text-white/50">Report from </span>Researchers
          </h3>

          <p>
            Each card below carries a unique voice from different vibrant
            community — researchers, developers, dreamers, and doers — all
            united by a deep love for open science. From labs to ledgers, this
            is love from DeSci builders, to the world.
          </p>
          <TestimonialCarousel />
        </div>
      </section>

      {/* Featured research */}
      <section className="w-full max-w-[1200px] mx-auto p-5 grid md:flex place-items-center md:justify-center">
        <div className="w-full md:max-w-2/5 border border-[#6462B866] rounded p-10 h-[480px] flex flex-col justify-center gap-12">
          <h3 className="text-2xl text-[#6A63F6]">Featured Research</h3>
          <div className="space-y-6">
            <h4 className="text-3xl  md:text-4xl lg:text-5xl">
              Punchy research focus/title
            </h4>
            <p className="text-muted-foreground">
              Explore groundbreaking work from scientists, DAOs. All research is
              peer-reviewed, minted on-chain.
            </p>
          </div>
          <Link href="/explore" className="text-sm flex gap-3 items-center">
            Explore Research <ArrowRight />
          </Link>
        </div>
        <Image
          src={connectorLine}
          alt="Connector Line"
          className="rotate-90 md:rotate-0 -my-4"
        />
        <div className="w-full md:max-w-2/5 border border-[#6462B866] rounded p-5 h-[480px] flex flex-col gap-5 overflow-y-scroll">
          <ResearchPreviewCard />
          <ResearchPreviewCard />
          <ResearchPreviewCard />
        </div>
      </section>

      {/* Why OpenQuanta */}
      <section className="w-full max-w-[640px] mx-auto p-5 flex flex-col gap-10 text-center items-center">
        <div className="flex flex-col gap-5">
          <h2 className="text-5xl">Why OpenQuanta?</h2>
          <p>
            We've seen quality research die in desk drawers. Brilliant minds
            give away credit just to get published. Geographic bias beats good
            science and curators are plagued by perverse incentives and as
            distributors they are often paywalled.
          </p>
        </div>

        <div className="flex items-center gap-2 w-full">
          {/* input box */}
          <div className="flex gap-2 items-center p-2 border border-white/10 rounded-full w-full">
            <div className="flex gap-2 items-center p-2 w-full">
              <Search size={16} />
              <input
                type="text"
                placeholder="Ask any question about openQuanta"
                className="w-full text-xs outline-0"
              />
            </div>
            <div className="bg-white/80 p-2 rounded-full text-black w-max">
              <SendHorizontal />
            </div>
          </div>
          {/* clear icon */}
          <CircleX className="text-white shrink-0" />
        </div>
      </section>

      {/* CTA */}
      <section className="w-full max-w-[1200px] mx-auto p-5 flex flex-col gap-10 text-center items-center">
        <div className="flex flex-col gap-5">
          <h2 className="text-5xl">Start Publishing</h2>
          <p className="text-white/65">
            All you need is your research. We handle the rest from on-chain
            proof to peer discovery.
          </p>
        </div>
        <Button className="w-max text-white">Get Started</Button>
      </section>
    </main>
  );
}

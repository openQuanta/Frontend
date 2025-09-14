import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import {
  circleDown,
  heroArt,
  heroDash,
  solana,
  superteam,
  triangleBlur,
} from "@/assets/images";

export default function Home() {
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
              <Button variant="link">
                Become a founding contributor <ChevronRight />
              </Button>
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
      <section className="p-5">
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
        <div className="bg-[#181615] rounded-2xl grid grid-cols-4">
          <div className="col-span-1">
            <Button variant="link">
              Explore <ChevronRight />
            </Button>
            <h3>What You Can Do</h3>
            <p>
              Every layer of openQuanta is designed for scientific collaboration
              and transparent publishing. Each piece plays a vital role in
              advancing open research.
            </p>
          </div>
          <div className="col-span-3 flex flex-col gap-5">
            {/* first layer */}
            <div className="flex justify-between gap-5">
              <div className="w-full h-16 border-b border-white/10 rounded-xl"></div>
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
            <div className="flex justify-center gap-5">
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
          </div>
        </div>
      </section>
    </main>
  );
}

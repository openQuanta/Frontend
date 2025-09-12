import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import { heroArt, heroDash, solana, superteam } from "@/assets/images";

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
      <section></section>
    </main>
  );
}

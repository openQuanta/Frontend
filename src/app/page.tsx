import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import { heroArt, heroDash } from "@/assets/images";

export default function Home() {
  return (
    <main className="font-sans flex flex-col gap-20">
      {/* Hero */}
      <section
        style={{ backgroundImage: `url(${heroArt.src})` }}
        className="w-full max-w-[1200px] h-screen mx-auto bg-contain bg-position-[90%] bg-no-repeat"
      >
        <div className="px-5 pt-40 pb-20 w-full max-w-[600px] flex flex-col gap-10 items-start">
          <div className="flex items-center gap-2 p-2 px-4 border border-white/30 rounded-full">
            <div className="w-3 h-3 rounded-full bg-violet-600"></div>
            <h4>On Chain & Transparent</h4>
          </div>

          <div className="flex flex-col gap-10">
            <h1 className="text-5xl">
              Advancing human progress with publishing
            </h1>
            <p>
              A decentralized platform where researchers can publish openly,
              mint authorship NFTs, receive bids from readers and institutions,
              and get reviewed in public by reputation-weighted peers.
            </p>
          </div>

          <div className="flex items-center gap-5">
            <Button variant="outline">Get Started</Button>
            <Button variant="link">
              Become a founding contributor <ChevronRight />
            </Button>
          </div>
        </div>
      </section>

      <section className="-mt-20">
        {/* Hero Bottom */}
        <div className="relative w-full max-w-[1000px] mx-auto px-5">
          <Image src={heroDash} alt="Hero Dashboard" />
        </div>
      </section>
    </main>
  );
}

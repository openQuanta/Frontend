import { BubbleBackground } from "@/components/ui/shadcn-io/bubble-background/index";
import { circleTick } from "@/assets/images";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function Page() {
  return (
    <main>
      <BubbleBackground interactive={true}>
        <section className="backdrop-blur-sm bg-black/30">
          <div className="text-center md:text-left px-5 py-40 w-full max-w-[1200px] mx-auto flex flex-col items-center gap-10 md:items-start">
            <div className="flex items-center gap-2 p-2 px-4 border border-white/30 rounded-full">
              <div className="w-3 h-3 rounded-full bg-[#FF4C0C]"></div>
              <h4>On Chain & Transparent</h4>
            </div>

            <div className="flex flex-col gap-5">
              <h1 className="text-5xl md:text-6xl lg:text-7xl leading-tight">
                Support the future of open publishing
              </h1>
              <p className="text-white/65">
                Join openQuanta early and gain special recognition, governance
                voice, and proof of contribution.
              </p>
            </div>
          </div>
        </section>
      </BubbleBackground>

      <section className="w-full max-w-[1200px] mx-auto py-20 px-5 flex flex-col gap-20">
        <div className="flex flex-col gap-10">
          <h2 className="text-3xl md:text-4xl font-semibold">
            Why founding contributor?
          </h2>

          <ul className="flex items-center justify-between gap-5">
            <li className="flex items-center gap-2">
              <Image
                src={circleTick}
                alt="Circle Tick"
                width={16}
                height={16}
              />
              <p className="text-white/65">
                Shape the future of open science with your early support
              </p>
            </li>
            <li className="flex items-center gap-2">
              <Image
                src={circleTick}
                alt="Circle Tick"
                width={16}
                height={16}
              />
              <p className="text-white/65">
                Earn permanent on-chain recognition
              </p>
            </li>
            <li className="flex items-center gap-2">
              <Image
                src={circleTick}
                alt="Circle Tick"
                width={16}
                height={16}
              />
              <p className="text-white/65">
                Back a community-owned publishing layer
              </p>
            </li>
          </ul>
        </div>
        <form className="w-full max-w-[1000px] mx-auto border border-[6462B8]/64 bg-[#181615]/48 rounded-2xl flex flex-col gap-5 p-10">
          <div className="flex flex-col gap-5">
            <h3 className="text-3xl">Becoming our founding contributor</h3>
            <p className="text-white/65">
              Choose your contribution amount, With one click your support is
              funded and permanently recorded on-chain as our Founding
              Contributor.
            </p>
          </div>
          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-3">
              <label htmlFor="name" className="">
                Your name or alias
              </label>
              <input
                id="name"
                type="text"
                className="rounded-xl border border-gray-300 px-3 py-10 text-white"
                placeholder="Enter display name for recognition"
              />
            </div>

            <div className="flex flex-col gap-3">
              <label htmlFor="amount" className="">
                Amount (USDC)
              </label>
              <input
                id="amount"
                type="number"
                step={"50"}
                min={"0"}
                className="rounded-xl border border-gray-300 px-3 py-10 text-white"
                placeholder="Enter amount in USDC"
              />
            </div>
            <p className="text-sm text-[#3D3942]">
              Your contribution will be accepted in USDC, with equivalent value
              processed on Solana. Swaps are handled via Jupiter aggregator
            </p>
            <Button
              type="submit"
              className="w-full text-white text-lg transition-colors py-10"
              size="lg"
            >
              Confirm Contribution
            </Button>
          </div>
        </form>
      </section>
    </main>
  );
}

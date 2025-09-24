import { BubbleBackground } from "@/components/ui/shadcn-io/bubble-background/index";
import { circleTick, DiscordIcon, LinkedinIcon, TwitterIcon, YoutubeIcon, } from "@/assets/images";
import Image from "next/image";
import SimpleFooter from "@/components/shared/SimpleFooter";

export default function Page() {
  return (
    <div>
      <BubbleBackground interactive={true}>
        <div className="relative z-0 header container mx-auto pl-15 pt-40 gap-[40px]">
          <div className="flex items-center justify-center gap-[12px] border-[0.5px] rounded-[38px] py-3 w-[223px] h-[38px] mb-10 text-[14px] font-[400] ">
            <span className="w-3 h-3 bg-[#FF4C0C] rounded-full"></span>
            <span>Onchain & Transparent</span>
          </div>

          <div className="flex flex-col gap-4">
            <h2 className="width-[1082px] text-[80px] font-[500]">
              Supporting the future of open <br /> publishing
            </h2>
            <p className="text-[16px] font-[400] w-[700px] opacity-64"> 
              Join openQuanta early and gain special recognition, goverance voice,
              and proof of contribution.
            </p>
          </div>

          <div className="flex flex-col gap-4 mt-16">
            <h3 className="text-[40px] font-[400]">Why founding contributor?</h3>
            <ul className="flex text-[16px] font-[400] gap-6 [&>li>span]:opacity-64">
              <li className="flex items-center gap-2">
                <Image src={circleTick} alt="Circle Tick" width={24} height={24} />
                <span>Shape the future of open science with your early support</span>
              </li>
              <li className="flex items-center gap-2">
                <Image src={circleTick} alt="Circle Tick" width={24} height={24} />
                <span>Earn permanent on-chain recognition</span>
              </li>
              <li className="flex items-center gap-2">
                <Image src={circleTick} alt="Circle Tick" width={24} height={24} />
                <span>Back a community-owned publishing layer</span>
              </li>
            </ul>
          </div>
        </div>
      </BubbleBackground>

      {/* <BubbleBackground interactive={false}> */}
        <div className="relative z-0 header container mx-auto pl-15 pt-40 pb-40 gap-[40px] flex justify-center items-center ">
            <form className="flex flex-col gap-6 rounded-[16px] pt-10 h-[965px] w-[1028px] border-[0.5px] border-[rgba(100,98,184,0.64)] bg-[#181615] bg-opacity-48">
              <div className="pl-10 pt-2">
                <h2 className="w-[500px] font-[500] text-[40px] leading-[48px] mb-2">Becoming our founding contributor</h2>
                <p className="w-[900px] opacity-64 mb-6">Choose your contribution amount, With one click your support is funded and permanently recorded on-chain as our Founding Contributor</p>
              </div>
              <div className="flex flex-col mt-15">
                <div className="flex flex-col gap-[40px] [&>div>input]:bg-black pl-10">
                  <div className="flex flex-col">
                    <label htmlFor="name" className="mb-8 text-[24px] font-[400]">Your name or alias</label>
                    <input
                      id="name"
                      type="text"
                      className="rounded-[8px] border border-gray-300 p-3 w-[800px] bg-[#181615] text-white h-[96px]"
                      placeholder="Enter display name for recognition"
                    />
                  </div>
                <div className="flex flex-col">
                  <label htmlFor="amount" className="mb-8 text-[24px] font-[400]">Amount (USDC)</label>
                  <input
                    id="amount"
                    type="number"
                    step={"50"}
                    min={"0"}
                    className="rounded-[8px] border border-gray-300 p-3 bg-[#181615] w-[800px] text-white h-[96px]"
                    placeholder="Enter amount in USDC"
                  />
                </div>
                </div>
                <div className="flex flex-col justify-between pt-2 w-[986px] h-[265px] bg-[#646288]/2 rounded-[16px] mx-auto backdrop-blur-md mb-10">
                  <div className="w-full h-2/5 border px-1 flex  backdrop-blur-sm rounded-t-[16px]">
                  <p className="text-[14px] text-[#3D3942] w-[603px] pl-5">
                    Your contribution will be accepted in USDC, with equivalent value processed on Solana. Swaps are handled via Jupiter aggregator
                  </p>
                  </div>
                  <div className="w-full h-3/5 flex flex-col justify-center items-center border rounded-b-[16px] bg-[#181615]/40 backdrop-blur-sm">
                  <button
                    type="submit"
                    className="bg-[#FF4C0C] text-white font-[500] text-[18px] py-3 px-6 hover:bg-[#e04309] transition-colors w-[933.3px] h-[86.7px] border border-[#FF4C0C] rounded-[15.4px]">
                    Confirm Contribution
                  </button>
                  </div>
                </div>
              </div>
            </form>
        </div>
      {/* </BubbleBackground> */}
      <SimpleFooter />
    </div>
  );
}
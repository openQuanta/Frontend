import { Bell, User, Clock, Copy, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { CopyButton } from "@/components/ui/shadcn-io/copy-button"
import Image from "next/image"
import { ExternalLinkIcon, Caution } from "@/assets/images"


export default function Page() {
    const transactionData = {
        nftTokenId: "",
        transactionHash: "",
        ipfsHash: "",
        nftContractAddress: ""
    };

    return (
        <div className="min-h-screen ">
            {/* Header */}
            <header className="border-b border-white/5 backdrop-blur-sm">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-amber-600 rounded-lg flex items-center justify-center">
                            <span className="text-white font-bold text-sm">PS</span>
                        </div>
                        <span className="text-white font-semibold">PaperSubmit</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <button className="p-2 hover:bg-white/5 rounded-lg transition-colors">
                            <Bell className="w-5 h-5 text-white/70" />
                        </button>
                        <button className="p-2 hover:bg-white/5 rounded-lg transition-colors">
                            <User className="w-5 h-5 text-white/70" />
                        </button>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 flex flex-col items-center justify-center ">
                {/* Title Section */}
                <div className="text-center mb-12">
                    <h1 className="text-3xl md:text-[40px] font-bold text-white mb-3">Paper Submitted for Review</h1>
                    <p className="text-lg md:text-[24px] text-white/60">Your research is being reviewed by our moderation team.</p>
                </div>

                {/* Status Card */}
                <Card className="w-full max-w-[1000px] pl-[50px] bg-[#110F0F]/50 border-white/10 backdrop-blur-sm shadow-2xl pt-[37px] pb-[31px] h-[458px] gap-0 mb-[64px]">
                    <div className="flex items-start gap-2 mb-[56px]">
                        <div className="">
                            <Image src={Caution} alt="Under Review" width={40} height={40} />
                        </div>
                        <div className="flex-1 leading-tight">
                            <h2 className="text-[25px] font-bold text-white mb-2">Under Review</h2>
                            <p className="text-white/60 text-[16px]">Your paper is currently being checked by our validation team.</p>
                        </div>
                    </div>

                    {/* What this means section */}
                    <div className="mb-11 max-w-[900px] h-[178px] bg-[#0F0E0C]  border border-white/5 rounded-lg p-6">
                        <h3 className="text-sm font-semibold text-white/80 mb-3 uppercase tracking-wide">What this means</h3>
                        <ul className="space-y-2">
                            <li className="flex items-start gap-2 text-white/70">
                                <ArrowRight className="w-3 h-3 mt-1 text-[#F97316] flex-shrink-0" />
                                <span>Our moderators will verify your submission.</span>
                            </li>
                            <li className="flex items-start gap-2 text-white/70">
                                <ArrowRight className="w-3 h-3 mt-1 text-[#F97316] flex-shrink-0" />
                                <span>You'll receive feedback within 48 hours.</span>
                            </li>
                            <li className="flex items-start gap-2 text-white/70">
                                <ArrowRight className="w-3 h-3 mt-1 text-[#F97316] flex-shrink-0" />
                                <span>You'll be notified once it's approved.</span>
                            </li>
                        </ul>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-wrap gap-3 text-[12px] [&>div]:border-white/10">
                        <div className="bg-[#1A1616]/40 rounded-[8px] w-[192px] h-[66px]  text-white border-white/10 flex flex-col justify-center items-center">
                            <span className="">{transactionData.nftTokenId}</span>
                            <h3 className="text-white/40">NFT Token ID</h3>
                        </div>

                        <div className="bg-[#1A1616]/40 rounded-[8px] w-[192px] h-[66px]  text-white border-white/10 flex flex-col justify-center items-center">
                            <span className="">Pending</span>
                            <h3 className="text-white/40">Review Status</h3>
                        </div>

                        <div className="bg-[#1A1616]/40 rounded-[8px] w-[192px] h-[66px]  text-white border-white/10 flex flex-col justify-center items-center">
                            <span className="">1-4 days</span>
                            <h3 className="text-white/40">Estimated Review Time</h3>
                        </div>

                    </div>
                </Card>

                {/* Transaction Details Card */}
                <Card className="w-full max-w-[1000px] bg-[#110f0f]/50 border-white/10 backdrop-blur-sm shadow-2xl mb-8 p-6 md:p-8">
                    <h2 className="text-[24px] font-bold text-white">Transaction Details</h2>

                    <div className="grid gap-4 mt-6">
                        {/* Transaction Hash */}
                        <div className="bg-[#1A1616]/40 w-full p-4 rounded-lg gap-1 grid text-white/40">
                            <h4>Transaction Hash</h4>
                            <div className="flex justify-between ">
                                <span className="text-[12px] text-[#F97316]/64 truncate">{transactionData.transactionHash}</span>
                                <div className="flex">
                                    <CopyButton variant="ghost" size="sm" content={transactionData.transactionHash} />

                                </div>
                            </div>
                        </div>
                        {/* Timestamp */}
                        <div className="bg-[#1A1616]/40 w-full p-4 rounded-lg gap-1 grid text-white/40">
                            <h4>IPFS Hash</h4>
                            <div className="flex justify-between items  gap-2 ">
                                <span className="text-[12px] text-[#F97316]/64 truncate">{transactionData.ipfsHash}</span>
                                <div className="flex">
                                    <CopyButton variant="ghost" size="sm" content={transactionData.ipfsHash}/>

                                </div>
                            </div>
                        </div>

                        <div className="bg-[#1A1616]/40 w-full p-4 rounded-lg gap-1 grid text-white/40">
                            <h4>NFT Contract Address</h4>
                            <div className="flex justify-between items  gap-2 ">
                                <span className="text-[12px] text-[#F97316]/64 truncate">{transactionData.nftContractAddress}</span>
                                <div className="flex">
                                    <CopyButton variant="ghost" size="sm" content={transactionData.nftContractAddress}/>

                                </div>
                            </div>
                        </div>
                    </div>
                </Card>

                {/* Footer Buttons */}

                <div className="flex flex-wrap gap-[100px] mb-12 text-[22px]">
                    <Button className="bg-[#FF4C0C] hover:bg-[#ce6922] text-white border-white/10 w-[400px] h-[57px]">
                        Go to Dashboard
                    </Button>
                    <Button className="bg-[#1A1616]/40 hover:bg-[#2a221f] text-white border-white/10 w-[400px] h-[57px]">
                        View Transaction
                    </Button>

                </div>

                {/* Footer Text */}
                <p className="text-center text-white/40 text-sm">Secured by blockchain. All rights reserved.</p>
            </main>
        </div>
    )
}

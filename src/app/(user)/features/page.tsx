'use client'
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { AnimatedButton } from "@/components/ui/animated-button";
import { Caret, DashboardModel, CerficateIcon, FilelockIcon, TargetIcon, GridImg, PlanetBg, ConnectorArrow, Glasses, Microscope, circleTick} from "@/assets/images";
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
                        Submit <span className="bg-[#6D78D5] border-[#6D78D5]">Papers </span>
                        <sup className="bg-[#6D78D5] w-[28.64px] h-[16.78px] mb-[30px]">Joe</sup>and build your reputation in a new era of publishers collaboration. We make research verifiable, and market-driven through blockchain technology.
                    </p>
                </div>

                <div className="flex gap-[24px] text-[14px] items-center">
                    <AnimatedButton />
                    <div className="flex gap-6">
                        <span>Become a founding contributor </span>
                        <div className="flex">
                            <span className="w-5 h-[1px] bg-white justify-center items-center my-[9px] mr-[-7px] hidden"></span>
                            <Image src={Caret} alt="caret-down" width={15} height={15} className="rotate-270" />
                        </div>
                    </div>
                </div>

                <div className="flex justify-center gap-5 delay-100">
                    <Image src={Caret} alt="caret-down" width={30} height={30} className="animate-bounce delay-100" />
                    <Image src={Caret} alt="caret-down" width={30} height={30} className="animate-bounce" />
                </div>
            </div>

            <div className="w-[1252px] h-[512px] gap-[120px] flex sticky mt-[80px] text-[20px] justify-center items-center mx-auto">
                <div className="w-[271px] h-[416px] flex gap-[20px]">
                    <div className="min-h-screen w-11 relative">
                        <ScrollIndicator
                            sections={sections}
                            scrollContainerRef={scrollContainerRef}
                            className="absolute left-8 top-1/4 -translate-y-1/2"
                        />
                    </div>
                </div>

                <div className="w-[861px] h-[520px] mt-[24px]">
                    <div className="flex">
                        <div className="flex items-center justify-between w-full mb-10 py-4">
                            <span>Upload research</span>

                            <div className="flex items-center gap-6">
                                <div className="flex items-center gap-2">
                                    {[0, 1, 2].map((index) => (
                                        <div
                                            key={index}
                                            className={`w-1 h-1 transition-all duration-300 ${index === activeCard ? "bg-white scale-125" : "bg-gray-600"
                                                }`}
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

                    <div className="w-[861px] h-[520px] sticky">
                        <DynamicScrollCards sections={sections} />
                    </div>
                </div>
            </div>

            <div className="overflow-hidden h-[500px]">
                <div
                    ref={scrollContainerRef}
                    className="h-screen overflow-y-scroll snap-y snap-mandatory scroll-smooth ml-80 overflow-hidden">
                    {sections.map((section) => (
                        <section
                            key={section.id}
                            id={section.id}
                            className="h-screen flex justify-center items-center snap-start">
                            <div className="w-[840px] h-full overflow-y-auto p-10">
                                <h2 className="text-4xl font-light text-white mb-6">{section.label}</h2>
                                <p className="text-[20px] text-zinc-400 leading-relaxed w-full">
                                    This is the content section for {section.label}. Add your actual content here.
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident aut obcaecati harum veritatis velit, iste ipsam eos, repellendus a adipisci beatae saepe repellat deleniti. Voluptatem placeat suscipit odio aperiam voluptates, exercitationem, optio modi earum repellendus praesentium nesciunt voluptatum ea consectetur, ex corporis quasi nemo. Ex incidunt sequi autem quas voluptatem! Ut, deleniti. Exercitationem facere corrupti sed quas magnam nulla possimus dolor commodi.
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

                <div className="flex justify-center  gap-[64px] mb-20 p-[160px] [&>div>h2]:text-[20px] [&>div>p]:text-[16px] [&>div>p]:opacity-64 [&>div]:gap-3 [&>div]:flex [&>div]:flex-col">
                    <div>
                        <Image src={CerficateIcon} alt="Certificate Icon" width={24} height={24}/>
                        <h2>Lorem ipsum dolor sit amet.</h2>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis eius sequi autem similique.</p>
                    </div>
                    <div>
                        <Image src={TargetIcon} alt="Certificate Icon" width={24} height={24}/>
                        <h2>Lorem ipsum dolor sit amet.</h2>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis eius sequi autem similique.</p>
                    </div>
                    <div>
                        <Image src={FilelockIcon} alt="Certificate Icon" width={24} height={24}/>
                        <h2>Lorem ipsum dolor sit amet.</h2>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis eius sequi autem similique.</p>
                    </div>
                </div>
            </section>

            <section className="flex justify-center items-center mb-20 w-[1252px] mx-auto h-[400px] [&>div]:w-[640px] [&>div]:bg-[#0E0F11] [&>div]:h-[400px] [&>div]:rounded-[8px] [&>div]:border-[#6462B8]/40 [&>div]:border [&>div]:px-[30px] [&>div]:py-[20px]">
                <div className="">
                    <Image src={Microscope} alt="Background Lines" width={40} height={40} />
                    <h2 className="text-[40px]  mb-6 mt-[40px]">Decentralized Peer Review</h2>
                    <ul className="flex flex-col gap-4 mb-[42px]">
                        <li>
                            <Image src={circleTick} alt="caret-down" width={15} height={15} className=" inline-block mr-2"/>
                            <span>Publish instantly without traditional gatekeepers</span>
                        </li>
                        <li>
                            <Image src={circleTick} alt="caret-down" width={15} height={15} className=" inline-block mr-2"/>
                            <span>Effective direct support from the community</span>
                        </li>
                        <li>
                            <Image src={circleTick} alt="caret-down" width={15} height={15} className=" inline-block mr-2"/>
                            <span>Build transparnt reputation on-chain</span>
                        </li>
                        <li>
                            <Image src={circleTick} alt="caret-down" width={15} height={15} className=" inline-block mr-2"/>
                            <span>Permanent immutable record for your work</span>
                        </li>
                        
                    </ul>
                    <span className="text-[#FF4C0C]">Start Publishing </span>
                </div>
                <Image src={ConnectorArrow} alt="Background Lines" width={40} height={40} />
                <div className="">
                    <Image src={Glasses} alt="Background Lines" width={40} height={40} />
                    <h2 className="mb-6 mt-[40px] text-[40px]">For Reviewers</h2>
                    <ul className="flex flex-col gap-4 mb-[42px]">
                        <li>
                            <Image src={circleTick} alt="caret-down" width={15} height={15} className=" inline-block mr-2" />
                            <span>Publish instantly without traditional gatekeepers</span>
                        </li>
                        <li>
                            <Image src={circleTick} alt="caret-down" width={15} height={15} className=" inline-block mr-2" />
                            <span>Effective direct support from the community</span>
                        </li>
                        <li>
                            <Image src={circleTick} alt="caret-down" width={15} height={15} className=" inline-block mr-2" />
                            <span>Build transparnt reputation on-chain</span>
                        </li>
                        <li>
                            <Image src={circleTick} alt="caret-down" width={15} height={15} className=" inline-block mr-2" />
                            <span>Permanent immutable record for your work</span>
                        </li>

                    </ul>
                    <span className="text-[#FF4C0C]">Become a reviewer</span>
                </div>
            </section>

            <div className="flex justify-center items-center">
                <Image src={GridImg} alt="Background Lines" width={1254} height={300} />
            </div>


            <div className="w-[1252px] h-[512px gap-[86px] mt-[100px] flex flex-col justify-center  mx-auto px-[39px] pt-[69px] pb-[40px] mb-[180px]" style={{ backgroundImage: `url(${PlanetBg.src})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
                <div>
                    <h2 className="w-[450px] h-[80px] text-[30px] leading-10 ">Companies can invest in <span className="text-[#FF5a1f]">security measures to ensurentinuity</span></h2>
                    <p className="w-[601px] h-[96px] text-[16px] opacity-40 mt-[17px] leading-6">These investments offer limited assurance of effectiveness, as assessing IT security is particularly challenging.urity requires specialized knowledge and expertise that hese investments offer limited assurance of effectiveness, as assessing IT security is partic</p>
                </div>
                <div className="text-white w-[354px] h-[64px] px-[40px] border-white/24 drop-shadow-2xl border flex justify-center items-center rounded-[4px]">Support new layer of publication</div>
                <div className="flex w-[1099px} h-[160px] [&>div]:flex [&>div]:flex-col [&>div]:justify-center [&>div]:items-center [&>div]:pt-[32px] [&>div]:mx-auto  [&>div]:w-[260px] [&>div]:h-[128px]">
                    <div className="border-r border-white/20 pr-[80px]">
                        <div className="text-[64px] flex justify-start">
                            <CountUp
                                from={0}
                                to={72}
                                separator=","
                                direction="up"
                                duration={1}
                                className="count-up-text  "
                            />
                            <span>%</span>
                        </div>
                        <span className="w-[260px] h-[45px] text-[16px] leading-6 opacity-40 ">All you need is your research. We handle the rest  from on-chain </span>
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
                        <span className="w-[260px] h-[45px] text-[16px] leading-6 opacity-40">All you need is your research. We handle the rest  from on-chain </span>
                    </div>
                    <div>
                        <div className="text-[64px] flex">
                            <CountUp
                                from={0}
                                to={30}
                                separator=","
                                direction="up"
                                duration={1}
                                className="count-up-text  "
                            />
                            <span>B+</span>
                        </div>
                        <span className="w-[260px] h-[45px] text-[16px] leading-6 opacity-40">All you need is your research. We handle the rest  from on-chain </span>
                    </div>
                </div>

            </div>

            

            <div
                className="flex flex-col justify-center items-center text-center gap-[80px] mb-20 px-4">
                <div>
                    <h2 className="text-[48px]">Start Publishing</h2>
                    <p className="text-[16px] opacity-64">
                        All you need is research. We'll handle the rest from on-chain proof to peer discovery
                    </p>
                </div>
                <Button className="text-white">Get Started</Button>
            </div>


            <Footer/>
        </div>
    );
}

'use client'
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Caret, DashboardModel, CerficateIcon, FilelockIcon, TargetIcon, GridImg, PlanetBg, ConnectorArrow, Glasses, Microscope, circleTick } from "@/assets/images";
import { ScrollIndicator } from "../features/scroll-indicator";
import DynamicScrollCards from "./dynamic-cards";
import Footer from "@/components/shared/footer";
import { Button } from "@/components/ui/button";
import CountUp from "@/components/ui/CountUp";
import { motion, useScroll, useTransform, useInView } from 'framer-motion'
// import { text } from "stream/consumers"; // Removed unused import

const sections = [
  { id: "upload-research", label: "Upload research", number: "01" },
  { id: "peer-review-nft", label: "Peer review NFT", number: "02" },
  { id: "reputation-layer", label: "Reputation layer", number: "03" },
  { id: "authorship-nft", label: "Authorship NFT", number: "04" },
  { id: "open-access-tool", label: "Open access tool", number: "05" },
  { id: "auction-bids", label: "Auction & bids", number: "06" },
];

const sectionText = [
  {
    uploadResearchTextA: "Companies invest in security measures to ensure continuity, comply with legal requirements, and preserve customer trustHowever, these investments offer limited assurance of effectiveness, as assessing IT security is particularly challenging.ecurity requires specialized knowledge and expertise that go beyond operational readiness.With cyber insurance, organizations can transfer some of the risks associated with potential security breaches, but this is not a panacea.",

    uploadResearchTextB: "These investments offer limited assurance of effectiveness, as assessing IT security is particularly challenging. Security requires specialized knowledge and expertise that go beyond operational readiness. These investments offer limited assurance of effectiveness, as assessing IT security is particularly challenging. Security requires specialized knowledge and expertise that go beyond operational readiness."
  },

  {
    peerReviewNftTextA: "Assessing IT security is particularly challenging. Security requires specialized knowledge and expertise that go beyond operational readiness. With cyber insurance, organizations can transfer some of the risks associated with potential security breaches, but this is not a panacea.",

    peerReviewNftTextB: "To effectively evaluate and enhance their security posture, companies often turn to third-party assessments and certifications. These evaluations provide an external perspective on the organization's security measures, identifying vulnerabilities and recommending improvements. However, even with these assessments, the dynamic nature of cyber threats means that no security measure can be entirely foolproof."
  },

  {
    reputationLayerTextA: "Cyber insurance can provide financial protection in the event of a security breach, covering costs such as legal fees, notification expenses, and remediation efforts. However, it is essential to recognize that insurance is not a substitute for robust security practices. Organizations must continue to invest in preventive measures, employee training, and incident response planning to mitigate risks effectively.",

    reputationLayerTextB: "In addition to technological solutions, fostering a culture of security awareness among employees is crucial. Human error remains one of the leading causes of security breaches, making it imperative for organizations to provide ongoing training and education on best practices. By empowering employees to recognize and respond to potential threats, companies can significantly enhance their overall security posture."
  },

  {
    authorshipNftTextA: "The purpose of IT security investments is to safeguard an organization's information assets, ensure business continuity, and comply with regulatory requirements. These investments aim to protect against a wide range of threats, including cyberattacks, data breaches, and insider threats. By implementing effective security measures, companies can reduce the likelihood of security incidents and minimize their impact when they do occur.",

    authorshipNftTextB: "Ultimately, IT security is a multifaceted discipline that requires a holistic approach. Organizations must balance technological solutions with human factors, regulatory compliance, and risk management strategies to create a resilient security framework. By doing so, they can better protect their assets, maintain customer trust, and navigate the complex landscape of modern cybersecurity threats."
  },


  {
    openAccessToolTextA: "These investments offer limited assurance of effectiveness, as assessing IT security is particularly challenging. Security requires specialized knowledge and expertise that go beyond operational readiness. With cyber insurance, organizations can transfer some of the risks associated with potential security breaches, but this is not a panacea.",

    openAccessToolTextB: "To effectively evaluate and enhance their security posture, companies often turn to third-party assessments and certifications. These evaluations provide an external perspective on the organization's security measures, identifying vulnerabilities and recommending improvements. However, even with these assessments, the dynamic nature of cyber threats means that no security measure can be entirely foolproof."
  },

  {
    auctionBidsTextA: "Assessing IT security is particularly challenging. Security requires specialized knowledge and expertise that go beyond operational readiness. With cyber insurance, organizations can transfer some of the risks associated with potential security breaches, but this is not a panacea.",

    auctionBidsTextB: "In addition to technological solutions, fostering a culture of security awareness among employees is crucial. Human error remains one of the leading causes of security breaches, making it imperative for organizations to provide ongoing training and education on best practices. By empowering employees to recognize and respond to potential threats, companies can significantly enhance their overall security posture."
  },
]

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.8 }
  }
};

const fadeInScale = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

const slideInLeft = {
  hidden: { opacity: 0, x: -60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

const slideInRight = {
  hidden: { opacity: 0, x: 60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1
    }
  }
};

const cardVariant = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 }
  }
};

// AnimatedSection component
function AnimatedSection({ children, variants = fadeInUp, className = "" }: any) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={variants}
      className={className}
    >
      {children}
    </motion.div>
  );
}


export default function Page() {
  const [activeCard, setActiveCard] = useState(0);
  // NOTE: scrollContainerRef is still needed for the ScrollIndicator component to track scroll position
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
          <AnimatedSection variants={fadeInUp}>
          <div className="grid gap-10 mb-[64px]">
            <div className="flex items-center gap-2 px-[24px] py-[12px] border border-white/30 rounded-full w-[223px] h-[38px] text-[14px]">
              <div className="w-3 h-3 rounded-full bg-[#FF4C0C]"></div>
              <h4>On Chain & Transparent</h4>
            </div>
            <h2 className="text-[74px] w-[984px] h-[168px] leading-[84px]">
              Powering the future of research publishing
            </h2>
          </div>
          </AnimatedSection>

          <AnimatedSection variants={fadeIn}>
            <p className="text-[16px] opacity-64 w-[984px]">
              Submit <span className="bg-[#6D78D5] border-[#6D78D5] px-2">Papers</span>
              <sup className="bg-[#6D78D5] px-2">Joe</sup> and build your reputation in a new era of publishers collaboration. We make research verifiable, and market-driven through blockchain technology.
            </p>
          </AnimatedSection>
        </div>

        <AnimatedSection>
          <div className="flex gap-[24px] text-[14px] items-center">
            <div className="flex gap-6">
              <span>Become a founding contributor </span>
              <div className="flex">
                <span className="w-5 h-[1px] bg-white justify-center items-center my-[9px] mr-[-7px] hidden"></span>
                <Image src={Caret} alt="caret-down" width={15} height={15} className="rotate-270" />
              </div>
            </div>
          </div>
        </AnimatedSection>

        <div className="flex justify-center gap-5 delay-100">
          <Image src={Caret} alt="caret-down" width={30} height={30} className="animate-bounce delay-100" />
          <Image src={Caret} alt="caret-down" width={30} height={30} className="animate-bounce" />
        </div>
      </div>

      <div className="w-[1252px] gap-[120px] flex mt-[80px] text-[20px] justify-center items-center mx-auto border">
        {/* Adjusted the height to avoid creating a fixed-height scroll area for the indicator sidebar */}
        
        
        <AnimatedSection variants={fadeInUp}>
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
        </AnimatedSection>
      </div>

      {/* MODIFICATIONS START HERE */}
      <div className="overflow-hidden border">
        <div
          ref={scrollContainerRef}
          // Removed: h-screen, overflow-y-scroll, scroll-smooth, ml-80
          // The ref is kept so the ScrollIndicator component can still be used to track the main page's scroll
          className="w-full grid justify-end"
        >
          <AnimatedSection variants={fadeIn}>
          {sections.map((section) => (
            <section
              key={section.id}
              id={section.id}
              // Removed: h-screen, snap-start
              // Added padding for separation/visual effect
              className="flex justify-center items-center py-20 border"
            >
              {/* Removed overflow-y-auto to allow content to stretch */}
              <div className="w-[840px] p-10">
                <h2 className="text-4xl font-light text-white mb-6">{section.label}</h2>
                <p className="text-[20px] text-zinc-400 leading-relaxed w-full">
                  {sectionText[sections.indexOf(section)][`${section.id.replace(/-([a-z])/g, (g) => g[1].toUpperCase()).replace(/-([a-z])/g, (g) => g[1].toUpperCase())}TextA`]}
                </p>
                <p className="text-[20px] text-zinc-400 leading-relaxed mt-5">
                  {sectionText[sections.indexOf(section)][`${section.id.replace(/-([a-z])/g, (g) => g[1].toUpperCase()).replace(/-([a-z])/g, (g) => g[1].toUpperCase())}TextB`]}
                </p>
              </div>
            </section>
          ))}
          </AnimatedSection>
        </div>
      </div>
      {/* MODIFICATIONS END HERE */}
        
      <section>
        <AnimatedSection variables={fadeInScale}>
        <div className="w-[1000px] h-[727px] flex justify-center items-center mx-auto my-[100px]">
          <Image
            src={DashboardModel}
            alt="Dashboard Model"
            width={1000}
            height={727}
            className="object-cover opacity-90"
          />
        </div>
        </AnimatedSection>
        <AnimatedSection variants={fadeInScale}>
        <div className="flex justify-center  gap-[64px] mb-20 p-[160px] [&>div>h2]:text-[20px] [&>div>p]:text-[16px] [&>div>p]:opacity-64 [&>div]:gap-3 [&>div]:flex [&>div]:flex-col">
          <div>
            <Image src={CerficateIcon} alt="Certificate Icon" width={24} height={24} />
            <h2>Lorem ipsum dolor sit amet.</h2>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis eius sequi autem similique.</p>
          </div>
          <div>
            <Image src={TargetIcon} alt="Certificate Icon" width={24} height={24} />
            <h2>Lorem ipsum dolor sit amet.</h2>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis eius sequi autem similique.</p>
          </div>
          <div>
            <Image src={FilelockIcon} alt="Certificate Icon" width={24} height={24} />
            <h2>Lorem ipsum dolor sit amet.</h2>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis eius sequi autem similique.</p>
          </div>
        </div>
        </AnimatedSection>
      </section>

      <section className="flex justify-center items-center mb-20 w-[1252px] mx-auto h-[400px] [&>div]:w-[640px] [&>div]:bg-[#0E0F11] [&>div]:h-[400px] [&>div]:rounded-[8px] [&>div]:border-[#6462B8]/40 [&>div]:border [&>div]:px-[30px] [&>div]:py-[20px]">
        <AnimatedSection variants={slideInLeft}>
        <div className="">
          <Image src={Microscope} alt="Background Lines" width={40} height={40} />
          <h2 className="text-[40px]  mb-6 mt-[40px]">Decentralized Peer Review</h2>
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
          <span className="text-[#FF4C0C]">Start Publishing </span>
        </div>
        </AnimatedSection>
        <Image src={ConnectorArrow} alt="Background Lines" width={40} height={40} />
        <AnimatedSection variants = {slideInRight}>
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
        </AnimatedSection>
      </section>
      
      <div className="flex justify-center items-center">
        <AnimatedSection variants={fadeInUp}>
        <Image src={GridImg} alt="Background Lines" width={1254} height={300} />
        </AnimatedSection>
      </div>
      
      <AnimatedSection variants={fadeInScale}>
      <div className="w-[1252px] h-[512px gap-[86px] mt-[100px] flex flex-col justify-center  mx-auto px-[39px] pt-[69px] pb-[40px] mb-[180px]" style={{ backgroundImage: `url(${PlanetBg.src})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <div>
          <h2 className="w-[450px] h-[80px] text-[30px] leading-10 ">Companies can invest in <span className="text-[#FF5a1f]">security measures to ensurentinuity</span></h2>
          <p className="w-[601px] h-[96px] text-[16px] opacity-40 mt-[17px] leading-6">These investments offer limited assurance of effectiveness, as assessing IT security is particularly challenging.urity requires specialized knowledge and expertise that hese investments offer limited assurance of effectiveness, as assessing IT security is partic</p>
        </div>
        <div className="text-white w-[354px] h-[64px] px-[40px] border-white/24 drop-shadow-2xl border flex justify-center items-center rounded-[4px]">Support new layer of publication</div>
        <div className="flex w-[1099px} h-[160px] [&>div]:flex [&>div]:flex-col [&>div]:justify-center [&>div]:items-start [&>div]:pt-[32px] [&>div]:mx-auto  [&>div]:w-[260px] [&>div]:h-[128px]">
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
      </AnimatedSection>



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


      <Footer />
    </div>
  );
}
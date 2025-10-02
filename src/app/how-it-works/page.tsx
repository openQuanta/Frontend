"use client";
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { BgLines } from '@/assets/images';
import Image from "next/image";
import DraggableBubble from '@/components/ui/draggale-bubble';
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp, MoreHorizontal } from "lucide-react";

const summaryData = {
  "Problem Space": "Companies are increasingly vulnerable to cyber threats. New exploits and vulnerabilities appear daily, creating an urgent need for advanced research and solutions.",
  "Research Methods": "OpenQuanta connects researchers worldwide, enabling them to collaborate, share methodologies, and publish findings transparently.",
  "Publishing": "Our platform streamlines the publishing process, ensuring high-quality research reaches the right audience effectively.",
  "Impact": "Published research contributes to global cybersecurity improvements and drives innovation in IT defense strategies.",
  "Action Steps": "Submit your research, collaborate with peers, and help companies secure their systems by providing actionable insights."
};

const sidebarItems = [
  "Submit research",
  "Peer review NFT",
  "Reputation layer",
  "Authorship NFT",
  "Open access tool",
  "Auction & bids"
];

const contentData = [
  {
    title: "CONNECT WALLET",
    body: "Presents numerous challenges, from increasing cyber threats like malware, phishing attacks, and the risks of remote work and IoT devices. These factors expand the attack surface.",
    footer: "JUPITER"
  },
  {
    title: "REPUTATION LAYER",
    body: "Ensures accountability and trust in peer reviews by attaching credibility to researcher contributions.",
    footer: "MERCURY"
  },
  {
    title: "AUTHORSHIP NFT",
    body: "Secures intellectual property through blockchain-based authorship verification.",
    footer: "VENUS"
  }
];

export default function Page() {
  const [selected, setSelected] = useState("Problem Space");
  const [selectedIndex, setSelectedIndex] = useState(0);

  return (
    <div className='p-[140px] px-[120px] flex flex-col gap-[40px]'>
      <div className='flex flex-col gap-[64px]'>
        <Image src={BgLines} alt="Background Lines" width={1440} height={300} className='absolute top-0 left-0 -z-1 bg-black opacity-1' />
        <div className='flex flex-col gap-[40px]'>
          <h2 className='text-[64px]'>How OpenQuanta Works</h2>
          <p className='text-[16px] opacity-64 w-[853px]'>OpenQuanta is designed with a layered security model where no single component can independently authorize access to research content, contributor tools, or publishing workflows. Instead, access requests require coordination between multiple verification layers such as identity credentials, role-based permissions, and content-level smart contracts. SDKs and blah blah blah</p>
        </div>
        <div className='flex gap-[24px] text-[14px]'>
          <Button className="bg-white hover:bg-white/95">Join waitlist</Button>
          <span>Become a founding contributor </span>
        </div>
        <div className='flex justify-center'>
          <span>0</span>
          <span>0 </span>
        </div>
      </div>

      {/* Summary Section */}
      <section className="flex max-w-6xl mx-auto py-16 px-6 gap-10">
        {/* Sidebar */}
        <div className="w-1/4 border-r border-gray-700 pr-6">
          <h2 className="text-lg font-semibold mb-4">Summary</h2>
          <ul className="space-y-3">
            {Object.keys(summaryData).map((key) => (
              <li
                key={key}
                className={`cursor-pointer p-2 rounded-md transition ${
                  selected === key ? "bg-purple-600" : "hover:bg-gray-800"
                }`}
                onClick={() => setSelected(key)}
              >
                {key}
              </li>
            ))}
          </ul>
        </div>

        {/* Content */}
        <div className="flex-1">
          <h3 className="text-xl font-bold mb-4">{selected}</h3>
          <p className="text-gray-300 leading-relaxed">
            {summaryData[selected]}
          </p>

          {/* Dropdown and stacked card */}
          <div className="mt-10 space-y-6">
            <div className="flex items-center justify-between bg-[#1a001f] border border-gray-800 rounded-xl px-4 py-3">
              <span className="text-white font-medium text-sm">{sidebarItems[selectedIndex]}</span>
              <div className="flex items-center gap-2">
                <button className="p-1 rounded-md hover:bg-gray-800"><MoreHorizontal className="w-4 h-4 text-gray-400" /></button>
                <button
                  className="p-1 rounded-md hover:bg-gray-800"
                  onClick={() => setSelectedIndex((prev) => Math.max(prev - 1, 0))}
                >
                  <ChevronUp className="w-4 h-4 text-gray-400" />
                </button>
                <button
                  className="p-1 rounded-md hover:bg-gray-800"
                  onClick={() => setSelectedIndex((prev) => Math.min(prev + 1, sidebarItems.length - 1))}
                >
                  <ChevronDown className="w-4 h-4 text-gray-400" />
                </button>
              </div>
            </div>

            <div className="relative h-64">
              <AnimatePresence mode="wait">
                {contentData.map((item, index) => (
                  index === selectedIndex && (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 30, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -30, scale: 0.95 }}
                      transition={{ duration: 0.4 }}
                      className="absolute top-0 left-0 w-full bg-[#1a001f] border border-gray-800 rounded-xl p-6 shadow-xl"
                    >
                      <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3">
                        {item.title}
                      </h3>
                      <p className="text-sm text-gray-300 leading-relaxed mb-4">
                        {item.body}
                      </p>
                      <span className="text-xs font-semibold uppercase text-white">
                        {item.footer}
                      </span>
                    </motion.div>
                  )
                ))}
              </AnimatePresence>

              {/* Background stacked layers */}
              <div className="absolute top-2 left-0 w-full h-full rounded-xl bg-[#1a001f] border border-gray-900 opacity-40 scale-[0.97]" />
              <div className="absolute top-4 left-0 w-full h-full rounded-xl bg-[#1a001f] border border-gray-900 opacity-20 scale-[0.94]" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
 
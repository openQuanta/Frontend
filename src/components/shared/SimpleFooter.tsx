import React from 'react'
import { DiscordIcon, LinkedinIcon, TwitterIcon, YoutubeIcon, } from "@/assets/images";
import Image from "next/image";

export default function SimpleFooter() {
  return (
    <footer className="flex justify-start items-start w-full">
      <ul className="flex gap-[16px] items-center">
        <li>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
            <Image src={TwitterIcon} alt="Twitter icon" width={14.25} height={12.5} />
          </a>
        </li>
        <li>
          <a href="https://discord.com" target="_blank" rel="noopener noreferrer">
            <Image src={DiscordIcon} alt="Discord icon" width={14.25} height={12.5} />
          </a>
        </li>
        <li>
          <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
            <Image src={YoutubeIcon} alt="Youtube icon" width={14.25} height={12.5} />
          </a>
        </li>
        <li>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
            <Image src={LinkedinIcon} alt="Linkedin icon" width={14.25} height={12.5} />
          </a>
        </li>
      </ul>
    </footer>
  )
}

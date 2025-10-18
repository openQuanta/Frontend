import Image from "next/image";
import Link from "next/link";
import { ChevronUp } from "lucide-react";

export default function Footer() {
  return (
    <footer className="p-6 flex flex-col gap-5">
      <section className="bg-[#181615]/40 w-full max-w-[1200px] mx-auto rounded-2xl p-12 grid gap-12 md:grid-cols-2">
        <div className="grid gap-8">
          <Link href="/" className="flex items-center gap-3">
            <Image
              width={40}
              height={40}
              src="/images/logo_colored.svg"
              alt="Open Quanta"
            />
            <h2 className="text-xl font-bold">openQuanta</h2>
          </Link>
          <p className="w-full max-w-[490px] text-white/64">
            Publish your research on-chain with authorship Nft, earn recognition
            without gatekeepers, and join a global community redefining
            scientific collaboration.
          </p>

          <div className="flex flex-col gap-3">
            {/* Social Icons */}
            <div className="flex gap-5">
              <a href="https://x.com/openquanta" target="_blank">
                <i className="ri-twitter-fill text-xl"></i>
              </a>
              <a href="https://discord.com/invite/openquanta" target="_blank">
                <i className="ri-discord-fill text-xl"></i>
              </a>
              <a href="https://www.youtube.com/@openquanta" target="_blank">
                <i className="ri-youtube-fill text-xl"></i>
              </a>
              <a
                href="https://www.linkedin.com/company/openquanta/"
                target="_blank"
              >
                <i className="ri-linkedin-fill text-xl"></i>
              </a>
            </div>
            <p className="text-xs">© 2025 Open Quanta. All rights reserved.</p>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-5 text-xs text-white/64">
          <div className="flex flex-col gap-4">
            <h4 className="text-[#4B4848] font-semibold">Policy & Legal</h4>
            <Link href="#">Privacy Policy</Link>
            <Link href="#">Terms & Conditions</Link>
            <Link href="#">Cookie Policy</Link>
          </div>
          <div className="flex flex-col gap-4">
            <h4 className="text-[#4B4848] font-semibold">About & Info</h4>
            <Link href="#">About Us</Link>
            <Link href="#">Contact Us</Link>
            <Link href="#">Whitepaper</Link>
          </div>
          <div className="flex flex-col gap-4">
            <h4 className="text-[#4B4848] font-semibold">
              Community & Ecosystem
            </h4>
            <Link href="#">DAOs</Link>
            <Link href="#">Research Highlights</Link>
            <Link href="#">Blog / Insights</Link>
          </div>
        </div>
      </section>

      <section className="w-full max-w-[1440px] mx-auto py-12 flex gap-5 justify-between">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-full border-[0.5px] border-[#FBC53A]/20">
            <div className="w-2 h-2 rounded-full bg-[#FBC53A]"></div>
          </div>
          <h4 className="text-xs">All browser support</h4>
        </div>
        <div className="p-2 bg-gray-500/20 rounded-full">
          <ChevronUp />
        </div>
      </section>
    </footer>
  );
}

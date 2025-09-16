import React from 'react'
import Image from "next/image";
import { Logo } from '@/assets/images';

export default function page() {
  return (
    <div className='pb-100 pt-20 pl-15'>
        <div className='p-2 flex flex-col gap-[80px]'>
            <Image src={Logo} alt="Open Quanta Logo" width={600} height={600} className=' mt-10'/>
            <div className='gap-6 flex flex-col'>
                <h1 className='w-[900px] text-[60px] h-[192px]'>Join us to step into the next era of Scientific Publishing</h1>
                <p className='w-[970px] text-[16px] font-[400] opacity-64'>In openQuanta Science thrive through open collaboration, transparent incentives, and community-powered knowledge creation. Be the first to access OpenQuanta</p>
            </div>
        </div>

        <form action="" className='bg-[rgba(255,255,255,0.16)] shadow-md rounded-[24px] w-[1140px] h-[1080px]'>
            <h3 className='text-[32px] font-[400] opacity-100 text-white'>Join the Waitlist</h3>
            <div className="flex flex-col gap-[40px] [&>div>input]:bg-black pl-10">
                  <div className="flex flex-col">
                    <label htmlFor="name" className="mb-8 text-[24px] font-[400]"> NAME </label>
                    <input
                      id="name"
                      type="text"
                      className="rounded-[8px] border border-gray-300 p-3 w-[800px] bg-[#181615] text-white h-[96px]"
                      placeholder="Joe Austine"
                    />
                    <label htmlFor="name" className="mb-8 text-[24px] font-[400]">YOUR AREA OF EXPERTISE</label>
                    <input
                      id="name"
                      type="text"
                      className="rounded-[8px] border border-gray-300 p-3 w-[800px] bg-[#181615] text-white h-[96px]"
                      placeholder="Social & economic sciences, Biology & life sciences, etc"
                    />
                    <label htmlFor="name" className="mb-8 text-[24px] font-[400]">EMAIL ADDRESS</label>
                    <input
                      id="name"
                      type="text"
                      className="rounded-[8px] border border-gray-300 p-3 w-[800px] bg-[#181615] text-white h-[96px]"
                      placeholder="What's your email address?"
                    />
                    <label htmlFor="name" className="mb-8 text-[24px] font-[400]">CURRENT LOCATION</label>
                    <input
                      id="name"
                      type="text"
                      className="rounded-[8px] border border-gray-300 p-3 w-[800px] bg-[#181615] text-white h-[96px]"
                      placeholder="e.g. united state of America"
                    />
                  </div>
            </div>
            <button>Join Waitlist</button>
        </form>
    </div>
  )
}

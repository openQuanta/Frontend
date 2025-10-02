import React from 'react'
import Image from "next/image";
import { Logo, WaitlistBg } from '@/assets/images';
import SimpleFooter from '@/components/shared/SimpleFooter';


export default function page() {
  return (
    <div className='py-[140px] px-[120px] flex flex-col items-center gap-[140px]'>
        <div className='flex flex-col gap-[80px]'>
            <Image src={Logo} alt="Open Quanta Logo" width={800} height={800} className=''/>
            <div className='gap-6 flex flex-col'>
                <h1 className='w-[900px] text-[60px] h-[192px]'>Join us to step into the next era of Scientific Publishing</h1> 

                <p className='w-[970px] text-[16px] font-[400] opacity-64'>In openQuanta Science thrive through open collaboration, transparent incentives, and community-powered knowledge creation. Be the first to access OpenQuanta</p>
            </div>
        </div>

        <Image src={WaitlistBg} alt="Waitlist Background" width={1440} height={800} className='absolute top-0 left-0 -z-1 bg-[rgba(0, 0, 0, 0.2)]' />

        <form action="" className='bg-[rgba(255,255,255,0.16)] shadow-md rounded-[24px] w-[1140px] h-[1080px] p-[75px] gap-[60px] flex flex-col'>
            <h3 className='text-[32px] font-[400] text-white'>Join the Waitlist!</h3>

            <div className="flex flex-col gap-[40px] [&>div>input]:bg-white text-[24px] font-[600] justify-center items-center">

                  <div className="flex flex-col w-[990px] h-[135px] gap-[15px] text-[24px] font-[600]">
                    <label htmlFor="name" className="text-[24px] font-[400]"> NAME </label>
                    <input
                      id="name"
                      type="text"
                      className="py-[22.5px] px-[30px] border bg-white w-[990px] text-[rgba(0,0,0,0.4)] h-[90px] rounded-[12px]"
                      placeholder="Joe Austine"
                    />
                  </div>

                  <div className="flex flex-col w-[990px] h-[135px] gap-[15px] text-[24px] font-[600]">
                    <label htmlFor="name" className="text-[24px] font-[400]">YOUR AREA OF EXPERTISE</label>
                    <input
                      id="name"
                      type="text"
                      className="py-[22.5px] px-[30px] border bg-white w-[990px] text-[rgba(0,0,0,0.4)] h-[90px] rounded-[12px]"
                      placeholder="Social & economic sciences, Biology & life sciences, etc"
                    />
                  </div>

                  <div className="flex flex-col w-[990px] h-[135px] gap-[15px] text-[24px] font-[600]">
                    <label htmlFor="name" className="text-[24px] font-[400]">EMAIL ADDRESS</label>
                    <input
                      id="name"
                      type="text"
                      className="py-[22.5px] px-[30px] border bg-white w-[990px] text-[rgba(0,0,0,0.4)] h-[90px] rounded-[12px]"
                      placeholder="What's your email address?"
                    />
                  </div>

                  <div className="flex flex-col w-[990px] h-[135px] gap-[15px] text-[24px] font-[600]">
                    <label htmlFor="name" className="text-[24px] font-[400]">CURRENT LOCATION</label>
                    <input
                      id="name"
                      type="text"
                      className="py-[22.5px] px-[30px] border bg-white w-[990px] text-[rgba(0,0,0,0.4)] h-[90px] rounded-[12px]"
                      placeholder="e.g. united state of America"
                    />
                  </div>
            </div>
            <div className='bg-[#181615] text-white text-[24px] font-[600] h-[90px] w-[990px] flex items-center justify-center rounded-[12px]'>Join Waitlist</div>
        </form>

        <SimpleFooter />
    </div>
  )
}

import React from 'react'
import { Button } from '@/components/ui/button'
import { BgLines } from '@/assets/images'
import Image from "next/image";



export default function page() {
  return (
    <div className='p-[140px] px-[120px] flex flex-col gap-[40px]'>
        <div className='flex flex-col gap-[64px]'>
            <Image src={BgLines} alt="Background Lines" width={1440} height={300} className='absolute top-0 left-0 -z-1 bg-[rgba(0, 0, 0, 0.2)]' />
            <div className='flex flex-col gap-[40px]'>
                <h2 className='text-[64px]'>How OpenQuanta Works</h2>
                <p className='text-[16px] opacity-64 w-[853px]'>OpenQuanta is designed with a layered security model where no single component can independently authorize access to research content, contributor tools, or publishing workflows. Instead, access requests require coordination between multiple verification layers such as identity credentials, role-based permissions, and content-level smart contracts. SDKs and blah blah blah</p>
            </div>
            <div className='flex gap-[24px] text-[14px]'>
                <Button className="bg-white hover:bg-white/95">Join waitlist</Button>
                <span>Become a founding contributor </span>
            </div>
            <div className=' flex justify-center'>
                <span>0</span>
                <span>0 </span>
            </div>
        </div>

        <div>
            <div>
                <h3 className='text-[32px] mb-6'>Summary</h3>
            </div>
        </div>

    </div>
  )
}

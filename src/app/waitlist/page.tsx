import React from 'react'
import Image from "next/image";
import { Logo } from '@/assets/images';

export default function page() {
  return (
    <div>
        <div>
            <Image src={Logo} alt="Open Quanta Logo" width={200} height={200} className='mx-auto mt-10'/>
        </div>
    </div>
  )
}

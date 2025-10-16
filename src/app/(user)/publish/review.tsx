import React from 'react'



export default function ReviewDetails() {
  return (
    <div>
          <div
              onSubmit={handleSubmit}
              className='h-[3073px] max-w-[1000px] bg-[#110F0F]/50 p-[30px] rounded-2xl space-y-6 border border-white/10 mt-8'
          >
              <h2 className='text-4xl font-semibold mb-[48px]'>Upload Your Research Paper</h2>

              <form className='w-[900px] h-2864px flex flex-col gap-16 [&>input]:mb-[8px] [&>input]:text-[12px] border-[#fff]/8'>
              </form>
            </div>
    </div>
  )
}

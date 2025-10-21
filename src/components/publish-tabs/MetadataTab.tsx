import Image from "next/image"
import { CalendarIcon, CopyIcon } from "@/assets/images"
import { CopyButton } from '@/components/ui/shadcn-io/copy-button'


export default function MetadataTab({ formData }: { formData: any }) {
  return (

    <div className="grid gap-4 mt-[40px] mb-[64px] w-[900px]">

      {/* 1. Publication Date Row */}
      <div className="flex justify-between items-center py-4 px-6 bg-[#1A1616]/40 rounded-[4px] min-h-[56px]">
        <h4 className="text-[14px] text-white/64">Publication Date</h4>

        {/* Date Value Container */}
        <div className="flex items-center gap-2 text-[14px] text-white/64">
          {/* Calendar Icon */}
          {/* Note: Adjust width/height as needed. Ensure the icon is orange/white. */}
          <Image src={CalendarIcon} alt="Calendar icon" width={16} height={16} className="text-[#F97316]" />
          <span>{formData.date}</span>
        </div>
      </div>

      {/* 2. License Row */}
      <div className="flex justify-between items-center py-4 px-6 bg-[#1A1616]/40 rounded-[4px] min-h-[56px]">
        <h4 className="text-[14px] text-white/64">License</h4>

        {/* License Value (Orange Text) */}
        <span className="text-[14px] font-semibold text-[#F97316]">{formData.license}</span>
      </div>

      {/* 3. DOI Card (Vertically Stacked) */}
      <div className="flex flex-col pt-4 pb-4 px-6 bg-[#1A1616]/40 rounded-[4px] min-h-[70px]">

        {/* DOI Label */}
        <h4 className="text-[12px] text-white/40 mb-1">DOI</h4>

        {/* DOI Value and Copy Icon */}
        <div className="flex items-center text-[14px] text-white/64">
          {formData.doi}

          {/* Copy Icon - The flex container eliminates the unwanted space */}
          <div className="inline-flex ml-2 cursor-pointer">
            <CopyButton content={formData.doi} variant="ghost" size="md" />
          </div>
        </div>
      </div>
    </div>
  )
}
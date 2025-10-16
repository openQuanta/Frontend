'use client'

import { useEffect, useState } from 'react'; // Import useEffect and useState
import Image from 'next/image'
import { Headshot, Message, Notification, FileIcon, NftIcon, SolIcon, AwardIcon, ArrowRight, CalenderIcon } from '@/assets/images'

// Define the shape of the data for clarity
interface FormData {
    title: string;
    author: string;
    paperType: string;
    abstract: string;
    coverImage: File | null; // This is the actual File object
    pdf: File | null;
    license: string;
    date: string;
    publisher: string;
    doi: string;
    supplemental: string;
}

interface PreviewStageProps {
    formData: FormData;
    keywords: string[];
    onBack: () => void;
}

export default function PreviewStage({ formData, keywords, onBack }: PreviewStageProps) {
    const [coverImageUrl, setCoverImageUrl] = useState<string | null>(null);

    // Effect to create and revoke the object URL for the cover image
    useEffect(() => {
        if (formData.coverImage) {
            const url = URL.createObjectURL(formData.coverImage);
            setCoverImageUrl(url);

            // Cleanup function to revoke the object URL when the component unmounts
            return () => {
                URL.revokeObjectURL(url);
            };
        } else {
            setCoverImageUrl(null); // No image, so clear the URL
        }
    }, [formData.coverImage]); // Re-run effect if coverImage changes

    // Helper to get a readable file name or a placeholder
    const getFileName = (file: File | null, placeholder: string) => {
        return file ? file.name : placeholder;
    };

    return (
        <main className='mt-15 min-h-screen bg-black text-white'>
            {/* Header */}
            <div className='flex justify-between items-center py-2 px-6 h-[47px] w-[98%] absolute top-0 left-0 right-0 bg-black z-10'>
                {/* Placeholder for the Orange Logo */}
                <div className='w-[64px] h-[15px] bg-orange-500 rounded-sm'></div>
                <div className='flex w-[177px] h-[24px] gap-2 items-center justify-center my-auto'>
                    <Image src={Message} alt='Message' width={12} height={12} style={{ objectFit: 'contain' }} />
                    <Image src={Notification} alt='Notification' width={12} height={12} style={{ objectFit: 'contain' }} />
                    <div className='flex items-center w-[143px] pr-8 py-1 pl-1 gap-4 border border-white/20 rounded-2xl'>
                        <Image src={Headshot} alt='Headshot' width={16} height={16} className='profile-img' style={{ objectFit: 'contain' }} />
                        <div className='flex items-center gap-2'>
                            <span className='connected bg-green-500 size-[6px] rounded-full'></span>
                            <span className='wallet-address text-wrap w-[57px] text-[10px] overflow-clip'>uecuvecedceygpo</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Progress Steps */}
            <div className='flex justify-center pt-20 gap-10 bg-black border-b border-gray-800/80 pb-6'>
                <div className='flex items-center gap-3'>
                    <span className='px-4 py-2 rounded-full bg-amber-300 text-black text-xl font-bold'>1</span>
                    <p className='text-sm'>
                        <h2 className='text-[16px] font-semibold'>Paper Information</h2>
                        <h3 className='text-[12px] font-light text-white/70'>Completed</h3>
                    </p>
                </div>
                <div className='flex items-center gap-3'>
                    <span className='px-4 py-2 rounded-full bg-orange-500 text-white text-xl font-bold border border-white'>2</span> {/* Active Step */}
                    <p className='text-sm'>
                        <h2 className='text-[16px] font-semibold'>Preview</h2>
                        <h3 className='text-[12px] font-light text-white/70'>Review Paper</h3>
                    </p>
                </div>
                <div className='flex items-center gap-3'>
                    <span className='px-4 py-2 rounded-full bg-gray-700 text-white text-xl font-bold'>3</span>
                    <p className='text-sm'>
                        <h2 className='text-[16px] font-semibold'>Publishing</h2>
                        <h3 className='text-[12px] font-light text-white/70'>Final Steps</h3>
                    </p>
                </div>
            </div>

            <div className='flex justify-center py-10 px-4'>
                <div className='max-w-[1000px] w-full bg-[#110F0F]/50 p-[50px] rounded-2xl border border-white/10'>
                    <h2 className='text-3xl font-semibold mb-8'>Review Your Paper Details</h2>

                    {/* Paper Cover Section */}
                    <div className='mb-10'>
                        <div className='w-full h-[300px] rounded-lg overflow-hidden relative'>
                            {coverImageUrl ? (
                                // Use a standard <img> tag for object URLs
                                // eslint-disable-next-line @next/next/no-img-element
                                <img
                                    src={coverImageUrl}
                                    alt={formData.coverImage?.name || 'Paper Cover'}
                                    className='w-full h-full object-cover' // object-cover ensures it fills the space
                                />
                            ) : (
                                // Placeholder if no image is uploaded, with the gradient background
                                <div className='w-full h-full bg-gradient-to-br from-[#8330ED] to-[#FA6800] flex items-center justify-center'>
                                    <div className='flex flex-col items-center justify-center text-center'>
                                        <div className='w-20 h-20 bg-white/20 rounded-xl mb-3 flex items-center justify-center'>
                                            {/* Icon placeholder */}
                                            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L20 20m-5-9l-1.586 1.586a2 2 0 01-2.828 0L6 10"></path></svg>
                                        </div>
                                        <span className='text-white text-3xl font-bold'>Paper Cover</span>
                                        <span className='text-white/70 text-sm mt-1'>No Cover Image Uploaded</span>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Paper Title */}
                    <div className='mb-16'>
                        <span className='text-[#F97316] text-[12px] mb-[16px] bg-[#FF4C0C]/8 rounded-3xl px-[24px] py-[8px] w-[124px] flex justify-center'>{formData.paperType || 'N/A'}</span>
                        <h1 className='text-2xl font-medium'>{formData.title}</h1>
                    </div>

                    {/* Overview & Summary Containers */}
                    <div className='flex flex-col'>
                        {/* Nav Section */}
                        <div className='  mb-16'>
                            <div className='flex justify-between items-center border-b border-white/10 pb-2 max-w-[543px] [&_h3]:text-[16px]'>
                                <h3 className=''>Overview</h3>
                                <h3 className=''>Metadata</h3>
                                <h3 className=''>External Links</h3>
                                <h3 className=''>Setting</h3>

                            </div>
                        </div>

                        {/* Summary Section */}
                        <div className='grid gap-10'>
                            <div className='grid gap-[16px]'>
                                <h3 className='text-[20px]'>Abstract</h3>
                                <p className='text-white/60 text-sm mt-1 whitespace-pre-wrap'>{formData.abstract || 'N/A'}</p>
                            </div>
                            <div className='grid gap-[16px]'>
                                <p className='text-white/60 text-xs uppercase'>Keywords</p>
                                <div className='flex flex-wrap gap-2 mt-2'>
                                    {keywords.map((word, index) => (
                                        <span key={index} className='bg-white/10 border border-white/20 px-3 py-1 rounded-md text-sm'>
                                            {word}
                                        </span>
                                    ))
                                    }
                                </div>
                            </div>
                        </div>

                        {/* Co-authors Section */}
                        <div className='grid gap-[16px]'>
                            <h3 className='text-[20px]'>Co-Authors</h3>
                            <div className='space-y-4'>
                                <div>
                                    <Image src={Headshot} alt='File Icon' width={16} height={16} style={{ objectFit: 'contain', display: 'inline-block', marginRight: '8px' }} />
                                    <p className='text-base text-orange-400 break-all hover:underline'>{formData.publisher || 'N/A'}</p>
                                </div>
                                <div>
                                    <p className='text-white/60 text-xs uppercase'>Supplemental Materials</p>
                                    <p className='text-base text-orange-400 break-all hover:underline'>{formData.supplemental || 'N/A'}</p>
                                </div>
                            </div>
                        </div>

                        {/* Publication Date Box */}
                        <div className='flex justify-start text-sm pt-4'>
                            <div className='p-3 rounded-lg bg-[#3A220F] text-orange-400 border border-orange-400/50'>
                                <p>Publication Date: <span className='font-bold'>{formData.date || 'N/A'}</span></p>
                            </div>
                        </div>

                    </div> {/* End of main content gap */}

                    {/* Action Buttons & Agreement */}
                    <div className='mt-12 space-y-6'>

                        <div className='flex items-start'>
                            <input type='checkbox' id='agreement' className='mt-1 mr-3 size-4 accent-orange-500' required />
                            <label htmlFor='agreement' className='text-white text-sm'>
                                I confirm that all information provided is accurate and I own all rights to publish this paper.
                                I agree to the <a href='#' className='text-orange-500 hover:underline'>Terms and Conditions</a>.
                            </label>
                        </div>

                        <div className='flex justify-start gap-8'>
                            <button
                                type='button'
                                onClick={onBack}
                                className='px-[80px] py-[14px] rounded-[40px] bg-gray-700 hover:bg-gray-600 text-[16px] font-semibold transition'
                            >
                                Cancel
                            </button>
                            <button
                                type='button'
                                // This should be the final submit action
                                className='px-[80px] py-[14px] rounded-[40px] bg-orange-500 hover:bg-orange-600 text-[16px] font-semibold transition'
                            >
                                Publish
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}
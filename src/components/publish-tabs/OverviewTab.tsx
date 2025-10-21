'use client'
import { useState } from 'react'
import Image from 'next/image'
import { OrangeLogo, Notification, Message, HeadshotIcon, UploadIcon, FileIcon, CopyIcon } from '@/assets/images'
import { CopyButton } from '@/components/ui/shadcn-io/copy-button';


// Define the shape of the data for clarity
interface FormData {
    abstract: string;
    keywords: string[];
    github: string;
}

interface PreviewStageProps {
    formData: FormData;
    keywords: string;
    coAuthors: string[]; // <-- ADDED: Co-Authors array
}

interface OverviewTabProps {
    formData: FormData;
    keywords: string[];
    coAuthors: string[]; // <-- ADDED: Co-Authors array
    onBack: () => void;
}

// Destructure coAuthors from props
export default function OverviewTab({ formData, keywords = [], coAuthors = [], onBack }: OverviewTabProps) {

    // Function to handle copying the wallet address to clipboard
    const handleCopy = (address: string) => {
        // Fallback for document.execCommand('copy') which works well in iFrames
        if (document.execCommand('copy')) {
            const textarea = document.createElement('textarea');
            textarea.value = address;
            document.body.appendChild(textarea);
            textarea.select();
            document.execCommand('copy');
            document.body.removeChild(textarea);
            console.log(`Copied: ${address}`);
            // In a real app, you would show a toast/notification here
        } else {
            console.error('Copy command failed.');
        }
    };

    return (
        <div className="grid gap-10">
            {/* Abstract Section */}
            <div className="grid gap-4">
                <h2 className='text-[20px]'>Abstract</h2>
                <p className='text-[14px] text-white/80 leading-6'>{formData.abstract}</p>
            </div>


            {/* Keywords section */}
            <div className='flex max-w-[900px] gap-4'>
                <div className='max-w-[458px]'>
                    <h3 className='text-[20px] mb-2'>Keywords</h3>
                    <div className='flex flex-wrap gap-2'>
                        {keywords && keywords.map((keyword, index) => (
                            <span
                                key={index}
                                className='px-3 py-1 bg-white/10 rounded-full text-sm'
                            >
                                {keyword}
                            </span>
                        ))}
                    </div>
                </div>
            </div>

            {/* CoAuthor Section  */}
            <div className=' max-w-[900px] flex gap-4 flex-col'>
                <h3 className='text-[20px] mb-2'>Co-Authors</h3>
                <div className='flex flex-wrap gap-4 flex-col w-[900px]'>
                    {coAuthors && coAuthors.map((coAuthor, index) => ( // Iterate over coAuthors
                        <div className="flex justify-between items-center gap-2 bg-[#1A1A16]/40 w-[900px] h-[48px] px-6 py-3 rounded-[4px]">
                            <div key={index} className='flex '>
                                <Image
                                    src={HeadshotIcon} // Assuming HeadshotIcon is a default for co-authors
                                    alt='Co-Author Headshot'
                                    width={20}
                                    height={20}
                                    className='rounded-full'
                                />
                                <span
                                    className='text-sm'
                                >
                                    {coAuthor} {/* Display the individual coAuthor */}
                                </span>
                            </div>

                            <CopyButton content={coAuthor} variant="ghost" size="md" />
                        </div>
                    ))}
                </div>
            </div>



        </div>
    );
}

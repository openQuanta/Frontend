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
    pdf?: File | null; // added: optional pdf file from formData
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

    // helper to format bytes (used to show file size)
    const formatBytes = (bytes = 0, decimals = 1) => {
        if (!bytes) return '0 B'
        const k = 1024
        const dm = Math.max(0, decimals)
        const sizes = ['B', 'KB', 'MB', 'GB', 'TB']
        const i = Math.floor(Math.log(bytes) / Math.log(k))
        return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i]
    }

    return (
        <div className="grid gap-10">
            {/* Abstract Section */}
            <div className="grid gap-4">
                <h2 className='text-[20px]'>Abstract</h2>
                <p className='text-[14px] text-white/80 leading-6'>{formData.abstract}</p>
            </div>


            {/* Keywords Section */}

            <div className='w-full max-w-lg gap-4 flex flex-col'>
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

            {/* Co-Author Section */}
            <div className='w-full flex gap-4 flex-col'>
                <h3 className='text-[20px] mb-2'>Co-Authors</h3>
                <div className='flex flex-wrap gap-4 flex-col w-full'>
                    {coAuthors && coAuthors.map((coAuthor, index) => (
                        <div className="flex justify-between items-center gap-2 bg-[#1A1A16]/40 w-full p-3 rounded-lg">
                            <div key={index} className='flex '>
                                <Image
                                    src={HeadshotIcon} // Assuming HeadshotIcon is a default for co-authors
                                    alt='Co-Author Headshot'
                                    width={20}
                                    height={20}
                                    className='rounded-full'
                                />
                                <span
                                    className='text-sm ml-2 truncate'
                                >
                                    {coAuthor} {/* Display the individual coAuthor */}
                                </span>
                            </div>

                            <CopyButton content={coAuthor} variant="ghost" size="sm" />
                        </div>
                    ))}
                    {/* PDF display: name · size */}
                    {formData.pdf && (
                        <div className="w-full">
                            <div className="flex items-center gap-3 bg-[#1A1A16]/40 w-full p-4 rounded-lg">
                                <Image src={FileIcon} alt="PDF icon" width={20} height={20} />
                                <span className="text-[12px] text-white/64">
                                    {formData.pdf.name} <br /> {formatBytes(formData.pdf.size)}
                                </span>
                            </div>
                        </div>
                    )}
                </div>
            </div>





        </div>
    );
}

'use client'

import { useEffect, useState } from 'react'; // Import useEffect and useState
import Image from 'next/image'
import { HeadshotIcon, Message, Notification, FileIcon, ArrowRight, SolIcon } from '@/assets/images'
import OverviewTab from './OverviewTab';
import MetadataTab from './MetadataTab'
import ExternalLinksTab from './ExternalLinksTab'
import SettingsTab from './SettingsTab';


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
    github: string;
    supplementaryMaterials: string;
    keywords: string[];
    coAuthors: string[];
}

interface PreviewStageProps {
    formData: FormData;
    // onBack is now used for "Edit Details" to return to the form stage
    onBack: () => void;
}

type Tab = 'Overview' | 'Metadata' | 'External Links' | 'Setting';

export default function PreviewStage({ formData, onBack }: PreviewStageProps) {
    const [coverImageUrl, setCoverImageUrl] = useState<string | null>(null);
    const [activeTab, setActiveTab] = useState<Tab>('Overview');

    // 💡 Added onCancel function to simulate closing the form/preview
    const handleCancel = () => {
        // In a real application, this would likely trigger a state change 
        // in a parent component to hide the entire form/preview flow.
        alert('Form and Preview closed/canceled.');
    };

    // Effect to create and revoke the object URL for the cover image
    useEffect(() => {
        if (formData.coverImage) {
            const url = URL.createObjectURL(formData.coverImage);
            setCoverImageUrl(url);

            // Cleanup function to revoke the object URL when the component unmounts
            return () => {
                URL.revokeObjectURL(url);
            };
        } else { // If no cover image is selected, ensure the URL is cleared
            setCoverImageUrl(null); // No image, so clear the URL
        }
    }, [formData.coverImage]); // Re-run effect if coverImage changes, but don't scroll here

    // Effect to scroll to the top when the component mounts
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []); // Empty dependency array means this effect runs once on mount

    // Helper to get a readable file name or a placeholder
    const getFileName = (file: File | null, placeholder: string) => {
        return file ? file.name : placeholder;
    };

    const tabs: Tab[] = ['Overview', 'Metadata', 'External Links', 'Setting'];

    return (
        <main className='mt-15 min-h-[2502] ma bg-black text-white'>
            {/* Header */}
            <div className='flex justify-between items-center py-2 px-4 sm:px-6 h-[47px] w-full absolute top-0 left-0 right-0 bg-black z-10'>
                {/* Placeholder for the Orange Logo */}
                <div className='w-[64px] h-[15px] bg-orange-500 rounded-sm'></div>
                <div className='flex w-[177px] h-[24px] gap-2 items-center justify-center my-auto'>
                    <Image src={Message} alt='Message' width={12} height={12} style={{ objectFit: 'contain' }} />
                    <Image src={Notification} alt='Notification' width={12} height={12} style={{ objectFit: 'contain' }} />
                    <div className='hidden sm:flex items-center w-[143px] pr-8 py-1 pl-1 gap-4 border border-white/20 rounded-2xl'>
                        <Image src={HeadshotIcon} alt='Headshot' width={16} height={16} className='profile-img' style={{ objectFit: 'contain' }} />
                        <div className='flex items-center gap-2'>
                            <span className='connected bg-green-500 size-[6px] rounded-full'></span>
                            <span className='wallet-address text-wrap w-[57px] text-[10px] overflow-clip'>uecuvecedceygpo</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Progress Steps */}
            <div className='flex items-center gap-3 border-b border-gray-800/80'>
                <span
                    className={`px-4 py-2 rounded-full text-xl font-bold bg-[#110F0F] text-white`}
                >
                    1
                </span>
                <div className='text-sm'>
                    <h2 className={`text-[16px] font-semibold `}>Paper Information</h2>
                    <h3 className={`text-[12px] font-light `}>Upload details</h3>
                </div>
            </div>

            <div className='flex items-center gap-3 text-white/40 bg-[#F97316] border-b border-gray-800/80'>
                <span
                    className={`px-4 py-2 rounded-full text-xl font-bold bg-[#1A1616]`}
                >
                    2
                </span>
                <div className='text-sm'>
                    <h2 className={`text-[16px] font-semibold `}>Preview</h2>
                    <h3 className={`text-[12px] font-light `}>Review Paper</h3>
                </div>
            </div>

            <div className='flex justify-center py-10 px-4'>
                <div className='w-full max-w-4xl bg-[#110F0F]/50 p-6 md:p-12 rounded-2xl border border-white/10'>
                    <h2 className='text-3xl font-semibold mb-8'>Review Your Paper Details</h2>

                    {/* Paper Cover Section */}
                    <div className='mb-10'>
                        <div className='w-full h-[200px] sm:h-[300px] rounded-lg overflow-hidden relative'>
                            {coverImageUrl ? (
                                <img
                                    src={coverImageUrl}
                                    alt={formData.coverImage?.name || 'Paper Cover'}
                                    className='w-full h-full object-cover' // object-cover ensures it fills the space
                                />
                            ) : (
                                null
                            )}
                        </div>
                    </div>

                    {/* Paper Title */}
                    <div className='mb-10'>
                        <span className='text-[#F97316] text-xs mb-4 bg-[#FF4C0C]/8 rounded-full px-4 py-1.5 inline-block'>{formData.paperType || 'N/A'}</span>
                        <h1 className='text-2xl font-medium'>{formData.title}</h1>
                    </div>

                    <div className='flex flex-col'>
                        {/* Nav Section */}
                        <div className='mb-[64px]'>
                            <div className='flex flex-wrap items-center border-b border-white/10 pb-2 max-w-full sm:max-w-lg'>
                                {tabs.map(tab => (
                                    <button
                                        key={tab}
                                        type='button'
                                        onClick={() => setActiveTab(tab)}
                                        className={`px-2 pb-3 -mb-2 text-sm transition-all hover:cursor-pointer ${activeTab === tab
                                            ? 'border-b-2 border-orange-500 text-white font-semibold'
                                            : 'text-white/60'
                                            }`}
                                    >
                                        {tab}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Tab Content */}
                    {activeTab === 'Overview' && (
                        <OverviewTab
                            formData={formData}
                            keywords={formData.keywords || []} // Add fallback empty array
                            onBack={onBack}
                            coAuthors={formData.coAuthors || []} // Pass coAuthors array

                        />
                    )}

                    {activeTab === 'Metadata' && (
                        <MetadataTab formData={formData} />
                    )}

                    {activeTab === 'External Links' && (
                        <ExternalLinksTab formData={formData} />
                    )}

                    {activeTab === 'Setting' && (
                        <SettingsTab formData={formData} />
                    )}

                    <div className="grid gap-10 mt-[64px]">
                        <div className="grid gap-10">
                            <h2 className='text-[20px]'>Summary</h2>
                            <div className='grid max-w-[900px] gap-6'>
                                <div className='flex flex-col sm:flex-row gap-2'>
                                    <div className='size-6 py-1.5 pr-1.5'>
                                        <Image src={FileIcon} alt='File icon' width={24} height={24} />
                                    </div>

                                    <div className='max-w-[458px] leading-4'>
                                        <h3 className='text-[16px] text-white/40'>Title</h3>
                                        <span>{formData.title}</span>
                                    </div>
                                </div>
                                <div className='flex flex-col sm:flex-row gap-2'>
                                    <div className='size-6 py-1.5 pr-1.5'>
                                        <Image src={FileIcon} alt='File icon' width={24} height={24} />
                                    </div>

                                    <div className='max-w-[458px] leading-4'>
                                        <h3 className='text-[16px] text-white/40'>Research Field</h3>
                                        <span>{formData.paperType}</span>
                                    </div>
                                </div>
                                <div className='flex flex-col sm:flex-row gap-2'>
                                    <div className='size-6 py-1.5 pr-1.5'>
                                        <Image src={FileIcon} alt='File icon' width={24} height={24} />
                                    </div>

                                    <div className='max-w-[458px] leading-4'>
                                        <h3 className='text-[16px] text-white/40'>Date</h3>
                                        <span>{formData.date}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Expected Outcomes Section */}
                        <div className='border-t border-white/10 pt-10'>
                            <h2 className='text-lg md:text-[20px] mb-6'>Expected Outcomes</h2>
                            <div className='w-full'>
                                <ul className='[&_li]:flex [&_li]:items-center [&_li]:gap-1 [&_li]:text-[16px] [&_li]:mb-2 list-disc list-inside'>
                                    <li><Image src={ArrowRight} alt='File icon' width={12} height={12} /> Paper stored permanently on Blockchain</li>
                                    <li><Image src={ArrowRight} alt='File icon' width={12} height={12} /> NFT minted to your wallet</li>
                                    <li><Image src={ArrowRight} alt='File icon' width={12} height={12} /> Visible in your explore gallery</li>
                                    <li><Image src={ArrowRight} alt='File icon' width={12} height={12} /> Community can review & support</li>
                                </ul>
                            </div>
                        </div>

                        <div className='w-full p-4 bg-[#8330ED]/8 mt-[64px] rounded-lg text-xs flex flex-col gap-1 border-white/4 border'>
                            <p className='text-[#C192FD]/64'>
                                <span className='text-purple-600'>Network Fee:</span> Publishing includes blockchain transaction
                            </p>
                            <p>
                                <Image src={SolIcon} alt='Solana icon' width={8} height={7.25} className='inline-block' />
                                <span className='text-purple-600'>~{ }(Varies by network)</span>
                            </p>
                        </div>
                    </div>

                    {/* 💡 NEW: Edit Details Button */}
                    <div className="flex justify-center mb-[80px] mt-10">
                        <button
                            type='button'
                            onClick={onBack}
                            className='w-full max-w-md px-auto py-3 border border-white/20 hover:border-white/50 text-base font-semibold transition text-white/80 flex justify-center rounded-md'
                        >
                            Edit Details
                        </button>
                    </div>

                    {/* Action Buttons & Agreement */}
                    <div className='relative mt-10 flex flex-col gap-10'>


                        <div className='flex items-start gap-3'>
                            <input type='checkbox' id='agreement' className='mt-1 mr-3 size-4 accent-orange-500' required />
                            <label htmlFor='agreement' className='text-white text-sm'>
                                I confirm this is original work or I have rights to publish <br />
                                By publishing, you agree to openQuanta's <a href='#' className='text-orange-500 hover:underline'>Terms and Conditions</a>
                            </label>
                        </div>

                        {/* 💡 UPDATED: Button container and buttons */}
                        <div className='flex flex-col sm:flex-row justify-center gap-4 sm:gap-8 w-full'>

                            {/* 💡 CHANGED: Preview button to Cancel button with new handler */}
                            <button
                                type='button'
                                onClick={handleCancel} // Calls the function to close the form/preview
                                className='w-full sm:w-auto px-12 py-4 rounded-full bg-gray-700 hover:bg-gray-600 text-base font-semibold transition'
                            >
                                Cancel
                            </button>

                            {/* Publish button logic remains the same (advancing tabs) */}
                            <button
                                type='button'
                                onClick={() => {
                                    const idx = tabs.indexOf(activeTab)
                                    if (idx < tabs.length - 1) {
                                        const next = tabs[idx + 1];
                                        setActiveTab(next);
                                    }
                                }}
                                className='w-full sm:w-auto px-12 py-4 rounded-full bg-orange-500 hover:bg-orange-600 text-base font-semibold transition'
                            >
                                Publish
                            </button>
                        </div>
                    </div>

                    <div className='flex items-center mt-6'>
                        <span role='img' aria-label='info icon' className='mr-3 size-3 bg-white rounded-full text-[10px] flex items-center justify-center text-black font-bold'>
                            i
                        </span>
                        <p className='text-[12px] text-white/60'>
                            <strong className='font-semibold text-white/100'>Pro tip:</strong> Review all details carefully. You can edit your paper after publishing, but metadata changes require a new transaction.
                        </p>
                    </div>
                </div>
            </div>
        </main>
    )
}
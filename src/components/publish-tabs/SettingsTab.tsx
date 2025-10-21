'use client'

import { useState } from 'react';

// Define the component's expected props
interface SettingsTabProps {
    formData: any;
}

export default function SettingsTab({ formData }: SettingsTabProps) {
    // State variables to manage the boolean status of each setting
    const [isPublic, setIsPublic] = useState(true);
    const [allowComments, setAllowComments] = useState(true);
    const [openForReview, setOpenForReview] = useState(false);

    // This reusable function is now only used by the onChange handler of the input itself.
    const handleCheckboxChange = (setter: React.Dispatch<React.SetStateAction<boolean>>) => {
        setter(prev => !prev);
    };

    const settingsItems = [
        {
            id: 'makePublic',
            label: 'Make Paper Public',
            description: 'Anyone can view your paper',
            state: isPublic,
            setter: setIsPublic,
        },
        {
            id: 'allowComments',
            label: 'Allow Comments',
            description: 'Community can leave feedback/review your paper',
            state: allowComments,
            setter: setAllowComments,
        },
        {
            id: 'openForReview',
            label: 'Open for Peer Review',
            description: 'Experts can submit reviews',
            state: openForReview,
            setter: setOpenForReview,
        },
    ];

    return (
        <div className="grid gap-4 mt-[40px] mb-[64px] w-[900px]">
            {settingsItems.map((item) => (
                // Individual setting card container
                <div
                    key={item.id}
                    // Layout: items-center for vertical alignment, py-4 for height, bg and border radius for style.
                    className="flex items-center py-4 px-6 bg-[#1A1616]/40 rounded-[4px] min-h-[70px]"
                // 💡 REMOVED onClick here. Clicking the input/label now handles the state change.
                >
                    {/* 1. Checkbox (Placed FIRST for left alignment) */}
                    <input
                        id={item.id}
                        type="checkbox"
                        checked={item.state} // Controlled by state
                        // Use native browser checkbox styling and function (accent-orange-500)
                        onChange={() => handleCheckboxChange(item.setter)}
                        className="h-5 w-5 accent-orange-500 cursor-pointer mr-4"
                    // The 'mr-4' class adds space between the checkbox and the text
                    />

                    {/* 2. Label and Description Group (Uses flex-grow to take up remaining space) */}
                    <label
                        htmlFor={item.id}
                        className="flex flex-col flex-grow cursor-pointer"
                    >
                        {/* Label (Main Text) */}
                        <span className="text-[14px] text-white/90 font-medium">
                            {item.label}
                        </span>
                        {/* Description (Small, Gray Text) */}
                        <span className="text-[12px] text-white/40 mt-0.5">
                            {item.description}
                        </span>
                    </label>
                </div>
            ))}
        </div>
    );
}
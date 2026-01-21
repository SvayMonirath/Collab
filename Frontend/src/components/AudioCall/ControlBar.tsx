import React from "react";
import { Mic, Phone, MessageSquareDot } from "lucide-react";

interface ControlBarProps {
    leave?: () => void;
}

export const ControlBar: React.FC<ControlBarProps> = ({ leave }) => {
    return (
        <div className="p-1  border-3 border-gray-300! fixed! bottom-10! left-1/2! transform! -translate-x-1/2! bg-white! rounded-full! flex flex-row! items-center! sm:gap-2! lg:gap-3! hover:opacity-100! transition-all! duration-200!">
            <button className="text-black! bg-transparent! rounded-full! hover:border hover:border-black!"><Mic className="size-5! lg:size-6!"/></button>
            <button className="text-black! bg-transparent! rounded-full! hover:border hover:border-black!"><MessageSquareDot className="size-5! lg:size-6!"/></button>
            <span className="text-gray-400!">|</span>
            <button onClick={leave} className="ml-3! text-white! font-bold! rounded-full! bg-red-600! hover:bg-red-700! flex flex-row! gap-5!"><Phone className="fill-white rotate-135 size-5! lg:size-6!"/><span >Leave</span></button>
        </div>
    )
};

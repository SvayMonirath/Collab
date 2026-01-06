import React from "react";
import { AudioLines, Settings, UserPlus } from "lucide-react";

interface AudioCallNavProps {
    meetingTitle?: string;

}

export const AudioCallNav: React.FC<AudioCallNavProps> = ({ meetingTitle }) => {

    // mock state for UI
    const [isRecording, setIsRecording] = React.useState<boolean>(false);
    const [meetingTime, setMeetingTime] = React.useState<string>("0:00");

    return (
        <nav className="flex flex-row fixed min-w-full bg-white! justify-between items-center px-4! py-7! bg-white z-[100]!">
            <div className="flex flex-row gap-4">
                <div className="text-blue-! bg-purple-900/60! p-2! rounded-xl size-fit!"><AudioLines className="size-3! sm:size-6! lg:size-8!"/></div>

                {/* Meeting Info */}
                <div className="flex flex-col">
                    <span className="text-black! font-semibold! font-mono! text-base! sm:text-xl! lg:text-2xl!">{meetingTitle ? meetingTitle : "Meeting"}</span>
                    <div className="flex flex-row items-center gap-2!">
                        <div className={`w-2! h-2! rounded-full! ${isRecording ? "bg-red-600! animate-pulse!" : "bg-gray-400!"}`}></div>
                        <span className={`text-sm! sm:text-base! ${isRecording ? "text-red-600! font-bold!" : "text-gray-600!"}`}>
                            {isRecording ? "Recording..." : "Not Recording"}
                        </span>
                    </div>
                </div>

            </div>

            {/* Meeting timer */}
            <div className="hidden! sm:inline-block!  text-purple-600! px-4! py-2! rounded-lg! text-xl! sm:text-2xl! lg:text-3xl! font-mono! font-semibold!">
                {meetingTime}
            </div>

            {/* Other Options */}
            <div className="flex flex-row gap-2! lg:gap-3! items-center!">
                <button className="hidden! bg-purple-600! sm:inline-block! hover:scale-110! transition-all! duration-300! text-white! px-4! py-2! lg:px-6! lg:py-3! rounded-xl! text-base! sm:text-lg! lg:text-xl! font-bold! lg:flex! flex-row items-center gap-2!">
                    <UserPlus className=" fill-white!"/>
                    <span className="hidden! lg:inline-block!">Invite</span>
                </button>
                <button className="hidden!  sm:inline-block!  duration-300! text-gray-700! border-none! bg-white!"><Settings className="size-8! hover:scale-110! transition-all! duration-300!"/></button>
            </div>
        </nav>
    );
}

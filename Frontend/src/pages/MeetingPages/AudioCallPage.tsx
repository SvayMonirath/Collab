import { useState } from "react";
import { MessageSquareDot, Mic, Mic2, PanelRightClose, PanelRightOpen, Phone, Search, Sparkles } from "lucide-react";
import { AudioCallNav } from "../../components/AudioCallNav";

export function MeetingAudioCallPage() {

    const [participantCount, setParticipantCount] = useState<number>(0);
    const [showSearch, setShowSearch] = useState<boolean>(false);
    const [showParticipants, setShowParticipants] = useState<boolean>(true);

    const showParticipantsBtn = showParticipants ? <PanelRightClose className="text-black!"/> : <PanelRightOpen className="text-black!"/>;

    const [showTask, setShowTask] = useState<boolean>(true);
    const [showTranscript, setShowTranscript] = useState<boolean>(false);

    const active = "bg-gray-600! text-white! px-3! py-2! rounded-lg! transition-all! duration-200!";
    const inactive = "text-black! px-3! py-2! rounded-lg! transition-all! duration-200! ";

    return (
        <div className="flex flex-row min-w-screen min-h-screen! bg-white! overflow-hidden!">
            <main className="">
                {/* Nav */}
                <AudioCallNav />

                <div className="flex flex-col min-w-screen! h-full! bg-red-400! mt-28!  lg:flex-row!">
                    {/* Main Section */}
                    <div className="flex flex-row flex-1! h-full! ">
                        {/* Participant Container */}
                        {/* animation */}
                        <div className={`flex flex-col bg-white! p-6! lg:w-80! h-full!  sm:w-1/3! lg:w-1/6! ${showParticipants ? "inline-block!" : "hidden!"} border-r-3! border-t-3! border-gray-300!`}>
                            {/* Participant Count and Search Box */}
                            <div className="flex flex-row justify-between items-center mb-6! gap-16! sm:gap-24! lg:gap-28!">
                                <span className="text-black! font-bold!  text-xs! sm:text-base! lg:text-lg!">PARTICIPANTS ({participantCount})</span>
                                < Search className="size-2! sm:size-4! text-gray-600! cursor-pointer!" onClick={() => setShowSearch(!showSearch)}/>
                            </div>

                            <div className={`mb-6! transition-all! duration-150! ${showSearch ? "h-fit! opacity-100! pb-4!" : "h-0! opacity-0! overflow-hidden!"}`}>
                                <input type="text" placeholder="Search Participants" className="w-full! border! border-gray-300! rounded-lg! px-2! py-1! text-sm! sm:text-base! focus:outline-none! focus:ring-2! focus:ring-purple-600! text-gray-700!"/>
                            </div>
                        </div>
                        {/* Activity Section */}
                        <div className="bg-white! w-full! h-full! relative! border-t-3! border-gray-300!">
                            <button onClick={() => setShowParticipants(!showParticipants)} className="absolute! top-4! left-0!flex flex-row items-center border-none! bg-transparent! gap-2!">
                                {showParticipantsBtn}
                            </button>
                        </div>
                    </div>
                    {/* Task/Transcript */}
                    <div className="bg-white! h-1/2! sm:h-1/3! lg:h-full! lg:w-1/3! border-l-3! border-t-3! border-gray-300!">
                        <nav className="flex flex-row w-full! bg-white! justify-between! items-center! border-b-3! border-gray-300! gap-8! ">
                            <div className="flex flex-row p-4! items-center! gap-4! ">
                                <Sparkles className="text-purple-700! size-5! sm:size-8! "/>
                                <span className="text-black! font-bold! text-xs! sm:text-xl!">AI Assistant</span>
                            </div>
                            <div className="flex flex-row">
                                <span className={`cursor-pointer px-3! py-2! font-bold text-sm! lg:text-base! ${showTask ? active : inactive}`} onClick={() => {
                                    setShowTask(!showTask)
                                    setShowTranscript(!showTranscript)
                                }}>Tasks</span>
                                <span className={`cursor-pointer px-3! py-2! font-bold text-sm! lg:text-base! ${showTranscript ? active : inactive}`} onClick={() => {
                                    setShowTranscript(!showTranscript)
                                    setShowTask(!showTask)
                                }}>Transcript</span>
                            </div>
                        </nav>
                        <div className="w-full! h-full! bg-white!">
                            {/* Content Component */}
                        </div>
                    </div>
                </div>
            </main>

            <div className="p-1  border-3 border-gray-300! absolute! bottom-10! left-1/2! transform! -translate-x-1/2! bg-white! rounded-full! flex flex-row! items-center! sm:gap-2! lg:gap-3! hover:opacity-100! transition-all! duration-200!">
                <button className="text-black! bg-transparent! rounded-full! hover:border hover:border-purple-700!"><Mic className="size-5! lg:size-6!"/></button>
                <button className="text-black! bg-transparent! rounded-full! hover:border hover:border-purple-700!"><MessageSquareDot className="size-5! lg:size-6!"/></button>
                <span className="text-gray-400!">|</span>
                <button className="ml-3! text-white! font-bold! rounded-full! bg-red-600! hover:bg-red-700! flex flex-row! gap-5!"><Phone className="fill-white rotate-135 size-5! lg:size-6!"/><span >Leave</span></button>
            </div>
        </div>
    );
}

import { useState } from "react";
import { MessageSquareDot, Mic, Mic2, PanelRightClose, PanelRightOpen, Phone, Search, Sparkles } from "lucide-react";
import { useParams } from "react-router-dom";

// COMPONENTS
import { AudioCallNav } from "../../components/AudioCallNav";
import { ControlBar } from "../../components/AudioCall/ControlBar";
// Hooks
import { useMeetingByID, useLeaveMeeting, useParticipantCountWebSocket } from "../../hooks/meetingHooks";

export function MeetingAudioCallPage() {

    const meetingID = useParams<{ meetingID: string }>().meetingID || "";
    const { meeting, meetingState,  loading: meetingLoading, error: meetingError } = useMeetingByID(meetingID);
    const { leave, loading: leaveLoading, error: leaveError } = useLeaveMeeting(meetingID, meeting?.team_id || "");
    const participantCount = useParticipantCountWebSocket(meetingID);

    const [showSearch, setShowSearch] = useState<boolean>(false);
    const [showParticipants, setShowParticipants] = useState<boolean>(true);

    const showParticipantsBtn = showParticipants ? (
      <PanelRightClose className="text-black! absolute! top-4! left-4! cursor-pointer!" onClick={() => setShowParticipants(false)} />
    ) : (
      <PanelRightOpen className="text-black! absolute! top-4! left-4! cursor-pointer" onClick={() => setShowParticipants(true)} />
    );

    const [showTask, setShowTask] = useState<boolean>(true);
    const [showTranscript, setShowTranscript] = useState<boolean>(false);

    const active = "bg-gray-600! text-white! px-3! py-2! rounded-lg! transition-all! duration-200!";
    const inactive = "text-black! px-3! py-2! rounded-lg! transition-all! duration-200! ";

    return (
        <div className="flex flex-row min-w-screen min-h-screen! bg-white! overflow-y-hidden!">
            <main className="">
                {/* Nav */}
                <AudioCallNav  meetingTitle={meeting?.title} />

                <div className="flex flex-col min-w-screen! h-full! mt-24! lg:flex-row!">
                    {/* Main Section */}
                    <div className="flex flex-row flex-1! h-full! ">
                        {/* Participant Container */}
                        <div className={`flex flex-col bg-white! p-6! lg:w-80! h-full!  sm:w-1/3! lg:w-1/6! ${showParticipants ? "inline-block!" : "hidden!"} border-r-3! border-t-3! border-gray-300!`}>
                            {/* Participant Count and Search Box */}
                            <div className="flex flex-row justify-between items-center mb-6! gap-16! sm:gap-24! lg:gap-28!">
                                <span className="text-black! font-bold!  text-xs! sm:text-base! lg:text-lg!">PARTICIPANTS ({participantCount})</span>
                                < Search className="size-2! sm:size-4! text-gray-600! cursor-pointer!" onClick={() => setShowSearch(!showSearch)}/>
                            </div>

                            <div className={`mb-6! transition-all! duration-150! ${showSearch ? "h-fit! opacity-100! pb-4!" : "h-0! opacity-0! overflow-hidden!"}`}>
                                <input type="text" placeholder="Search participants" className="w-full! border! border-gray-300! rounded-lg! px-2! py-1! text-sm! sm:text-base! focus:outline-none! focus:ring-2! focus:ring-purple-600! text-gray-700!"/>
                            </div>
                            <div className="min-h-screen! overflow-y-auto! flex flex-col">
                                {meetingState?.participants.map((participant) => (
                                <div key={participant.id} className="flex justify-between items-center! mb-3! border border-gray-300! rounded-lg! px-3! py-2! bg-white! hover:bg-gray-50! hover:shadow-sm! transition-all! duration-200!">
                                    <div className="flex items-center! gap-3!">
                                    <div className="size-8! rounded-full! bg-purple-200! flex items-center justify-center! text-xs! font-semibold! text-gray-700!">
                                        {participant.username?.[0]?.toUpperCase()}
                                    </div>
                                    <span className="text-black! font-medium! text-sm! sm:text-base!">{participant.username}</span>
                                    </div>
                                    <Mic2 className="size-4! sm:size-5! text-gray-600!"/>
                                </div>
                                ))}
                            </div>
                        </div>

                        {/* Activity Section */}
                        <div className="bg-white! w-full! h-full! relative! border-t-3! border-gray-300!">
                            {showParticipantsBtn}
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

            <ControlBar leave={leave}/>
        </div>
    );
}

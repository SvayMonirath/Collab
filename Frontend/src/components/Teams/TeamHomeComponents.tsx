import React from "react";
import { useState } from "react";
import { Coffee, Video, History, CheckCircle2, CheckCircle, Plus, ThumbsUp, SquarePen, Phone, X, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";

// hooks
import { useCreateMeeting } from "../../hooks/meetingHooks";
import type { CreateMeetingSchemas } from "../../types/meetingTypes";

// components
import { useJoinMeeting } from "../../hooks/meetingHooks";

interface CreateMeetingModalProps {
    onClose?: () => void;
    onOpen?: () => void;
    onSubmit?: () => void;
    teamID?: string;
}

interface CurrentActiveMeetingProps {
    activeMeeting: any;
}

interface InviteMemberModalProps {
  team: any;
  onClose: () => void;
}

export const CurrentActiveMeeting: React.FC<CurrentActiveMeetingProps> = ({ activeMeeting }) => {

    const navigate = useNavigate();
    const { join, loading, error } = useJoinMeeting(activeMeeting.id);

    return (
        // todo[]: Improve Current Active Meeting UI
        <div className="flex flex-col gap-2! sm:px-20! border border-gray-300! rounded-3xl! p-5! sm:py-10!">
            <div className="flex flex-row gap-3 items-center mb-4! px-5!">
                <div className="bg-green-500! rounded-full size-2! animate-pulse!"></div><span className="text-sm! text-green-600! font-bold! ">LIVE NOW</span>
            </div>
            <div className="flex flex-col mx-8! sm:mx-12! min-w-full">
                <h1 className="text-black! font-semibold! font-mono! text-2xl! sm:text-4xl! lg:text-5xl!">{activeMeeting.title}</h1>
                {/* Format Time  */}
                <h3 className="flex flex-row items-center! text-center! gap-2! text-black/60! font-medium! text-md! sm:text-lg!"><Clock className="size-4! sm:size-5!"/><span>{formatElapsedTime(activeMeeting.started_at)}</span></h3>

                <button className="bg-blue-600! text-white! font-bold! flex flex-row items-center! rounded-2xl! mt-8! mx-5! justify-center! gap-3! size-fit sm:mt-15! hover:bg-blue-700! px-4! py-3! transition-all! duration-200!"
                onClick={() => join()}>
                  <Video className="size-4! sm:size-5! "/><span className="text-sm! sm:text-base!">Join Meeting</span>
                </button>
            </div>
        </div>
    );
}
// Helper function to format elapsed time
function formatElapsedTime(startTime: string, endTime: string = new Date().toISOString()) {
  const start = new Date(startTime).getTime();
  const end = new Date(endTime).getTime();
  const diffSec = Math.floor((end - start) / 1000);

  if (diffSec < 10) return "just now";
  if (diffSec < 60) return `${diffSec} sec ago`;

  const diffMin = Math.floor(diffSec / 60);
  if (diffMin < 60) return `${diffMin} min ago`;

  const diffHr = Math.floor(diffMin / 60);
  if (diffHr < 24) return `${diffHr} hr ago`;

  const diffDay = Math.floor(diffHr / 24);
  if (diffDay < 7) return `${diffDay} day${diffDay > 1 ? "s" : ""} ago`;

  // fallback to full date
  return new Date(startTime).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}


export const CurrentlyActiveMeetingEmpty: React.FC<CreateMeetingModalProps> = ({ onOpen }) => {
  return (
    <div className="min-w-full flex flex-col px-5! py-5! justify-center items-center sm:px-32! sm:py-8!">
      <Coffee
        className="w-12! h-12! text-black! mb-2!
                    lg:w-20! lg:h-20! sm:mb-4!"
      />
      <h2
        className="text-black! font-bold! text-xl! mb-2! text-center!
                    sm:text-2xl! sm:mb-4!
                    lg:text-3xl! lg:mb-6!"
      >
        No active meetings
      </h2>
      <p
        className="text-black/60! text-center! text-xs! mb-4!
                    sm:text-base! sm:mb-6!
                    lg:text-lg! lg:mb-8!"
      >
        You currently have no active meetings. Click the button below to start a
        new meeting and collaborate with your team in real-time.
      </p>

      {/* Join/View History Button */}
      <div className="flex flex-row gap-4!">
        {/* todo[]: Scheduling Meeting */}
        <button
          className="bg-purple-700! hover:bg-purple-800! text-white! rounded-2xl! px-4! py-4! mt-4! flex flex-row  items-center gap-2! transition-all! duration-200
            md:px-4! md:py-4! md:mt-6! md:text-lg md:gap-4!
            lg:px-6! lg:py-3! lg:mt-8! lg:text-xl!" onClick={onOpen}
        >
          <Video
            className="w-4! h-4! text-white!
                        sm:w-6! sm:h-6!"
          />{" "}
          <span
            className="text-sm!
                    sm:text-base! md:text-xl!"
          >
            Start Meeting
          </span>
        </button>
        <button
          className="hidden! sm:flex! flex-row! cursor-not-allowed! hover:border-2! hover:border-purple-800! bg-white! text-black! rounded-2xl! px-4! py-4! mt-4!  items-center gap-2! transition-all! duration-200
            md:px-4! md:py-4! md:mt-6! md:text-lg md:gap-4!
            lg:px-6! lg:py-3! lg:mt-8! lg:text-xl!
        "
        >
          <History
            className="w-4! h-4!
                    sm:w-6! sm:h-6!
                "
          />{" "}
          <span
            className="text-sm! font-medium
                        sm:text-base! md:text-xl!
                    "
          >
            View History
          </span>
        </button>
      </div>
    </div>
  );
};

export const ShowTasksEmpty: React.FC = () => {
    return (
        <section className="flex flex-col">
            <div className="flex flex-row justify-between items-center mb-4! px-5!">
                <h1 className="flex flex-row items-center">
                    <CheckCircle2 className="w-6! h-6! text-orange-500! mr-2!" />
                    <span className="font-semibold text-black! text-base! sm:text-lg! lg:text-xl!">Tasks / To-dos</span>
                </h1>

                <span className="text-gray-500! cursor-pointer">See All</span>

            </div>
            <div className="flex flex-col justify-center! items-center! py-10!">
                <CheckCircle className="w-8! h-8! text-orange-500! mb-2!
                    lg:w-9! lg:h-9! sm:mb-4!"
                />
                <h2 className="text-black! font-bold! text-lg! mb-2! text-center!
                    sm:text-xl! sm:mb-4!
                    lg:text-2xl! lg:mb-6!"
                >
                    No Tasks Available
                </h2>
                <p className="text-black/60! text-center! text-xs! mb-4!
                    sm:text-base! sm:mb-6!
                    lg:text-lg! lg:mb-8!"
                >
                    You have no pending task.
                </p>

                {/* todo[]: Add Task */}
                <button className="flex flex-row gap-2! font-bold! text-sm! text-orange-500! bg-transparent! items-center mt-3! px-4! py-2! rounded-xl! hover:border hover:border-orange-500! transition-all! duration-200

                    sm:text-base! sm:gap-3! sm:px-5! sm:py-3! sm:mt-4!
                    lg:text-lg! lg:gap-4! lg:px-6! lg:py-4! lg:mt-5!
                ">
                    <Plus className="w-4! h-4! text-orange-500!
                        sm:w-6! sm:h-6!"
                    /><span>Add New Task</span>
                </button>

            </div>
        </section>
    );

}

export const ShowReviewsEmpty: React.FC = () => {
    return (
        <section>
            <div className="flex flex-row justify-between items-center mb-4! px-5!">
                <h1 className="flex flex-row items-center">
                    <SquarePen className="w-6! h-6! text-purple-500! mr-2!" />
                    <span className="font-semibold text-black! text-base! sm:text-lg! lg:text-xl!">Reviews</span>
                </h1>

                <span className="text-gray-500! cursor-pointer">See All</span>

            </div>
            <div className="flex flex-col justify-center! items-center! py-10!">
                <ThumbsUp className="w-8! h-8! text-purple-500! mb-2!
                    lg:w-9! lg:h-9! sm:mb-4!"
                />
                <h2 className="text-black! font-bold! text-lg! mb-2! text-center!
                    sm:text-xl! sm:mb-4!
                    lg:text-2xl! lg:mb-6!"
                >
                    Nothing to review
                </h2>
                <p className="text-black/60! text-center! text-xs! mb-4!
                    sm:text-base! sm:mb-6!
                    lg:text-lg! lg:mb-8!"
                >
                    Pending items will appear here.
                </p>
                {/* todo[]: Add Review */}
                <h2 className="flex flex-row gap-2! font-base! text-sm! text-gray-500! bg-transparent! items-center mt-3! px-4! py-2!

                    sm:text-base! sm:gap-3! sm:px-5! sm:py-3! sm:mt-4!
                    lg:text-lg! lg:gap-4! lg:px-6! lg:py-4! lg:mt-5!
                ">
                    Waiting for new summaries...

                </h2>

            </div>
        </section>
    );

}

export const AsideMeetingAction: React.FC<CreateMeetingModalProps> = ({ onOpen }) => {
    return (
        <div
            className="flex flex-col bg-gradient-to-r from-blue-500! to-blue-600! min-w-full! px-6! py-6! rounded-4xl! shadow-lg! text-white! gap-3!
        hover:shadow-xl! transition-all! duration-300!"
        >
            <Phone className="size-12! mb-2! bg-blue-300/50! p-3! rounded-2xl! fill-white!" />
            <h3 className="text-2xl! font-bold">
            Start A Meeting
            </h3>
            <p className="text-gray-200! mb-4!">
            Start a instant meeting or schedule one for
            later.
            </p>
            <button className="bg-white! text-blue-700! rounded-2xl! px-4! py-2! hover:bg-blue-100!" onClick={onOpen}>
            Launch Now
            </button>
        </div>
    );
}

export const CreateMeetingModal: React.FC<CreateMeetingModalProps> = ({ onClose, teamID, onSubmit }) => {
    const [title , setTitle] = useState<string>("");
    const { createNewMeeting, loading, error } = useCreateMeeting();

    const handleCreateMeeting = async () => {
        if(!title) return;
        const meetingData: CreateMeetingSchemas = {
            title: title,
        };

        const res = await createNewMeeting(teamID || "", meetingData);
        if(res) {
            onClose && onClose();
            onSubmit && onSubmit();
        }
    };

    return (
      <div className="fixed! inset-0! bg-black/50! backdrop-blur-md! flex! justify-center! items-center! z-[200]!">
        <div className="relative! bg-white! rounded-2xl! p-6! w-11/12! max-w-xl!">
          <h2 className="text-2xl! font-bold! mb-4! text-black!">
            Create New Meeting
          </h2>
          <form className="flex flex-col gap-4!" onSubmit={(e) => {
            e.preventDefault();
            }}>
            <input
              type="text"
              placeholder="Meeting Title"
              className="w-full! border! border-gray-300! rounded-lg! text-black! px-3! py-2! focus:outline-none! focus:ring-2! focus:ring-purple-600!"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            />
            <div className="flex flex-row justify-center! gap-4! mt-4!">
              <button className="border border-black! bg-white! text-black! rounded-2xl! px-4! py-2! flex flex-row items-center gap-2! transition-all! duration-200 hover:bg-gray-100! hover:border-gray-700!" >
                <Plus className="w-5! h-5! text-black! mr-2!" />
                <span>Schedule Meeting</span>
              </button>
              <button className="bg-purple-700! hover:bg-purple-800! text-white! rounded-2xl! px-4! py-2! flex flex-row items-center gap-2! transition-all! duration-200" onClick={handleCreateMeeting} disabled={loading}>
                <Video className="w-5! h-5! text-white!" />
                <span>Start an instant meeting</span>
              </button>
            </div>
          </form>

            <X className="w-6 h-6 text-black! absolute top-3! right-3! cursor-pointer! hover:text-red-500!" onClick={onClose} />
        </div>
      </div>
    );
}

export const InviteMemberModal: React.FC<InviteMemberModalProps> = ({ team, onClose})  => {

    const [message, setMessage] = useState<string>("");

    const handleCopyLink = () => {
        navigator.clipboard.writeText(team.code);
        setMessage("Invite link copied to clipboard!");
        setTimeout(() => {
            setMessage("");
        }, 2000);
    }

    return (
      <div className="fixed! inset-0! bg-black/50! backdrop-blur-md! flex! justify-center! items-center! z-[200]!">
        <div className="bg-white! p-10! rounded-2xl flex flex-col! w-11/12! max-w-xl!">
            <div className="flex flex-row items-center justify-between! mb-4!">
                <h2 className="text-lg! font-bold! text-black! sm:text-xl! lg:text-2xl!">Invite Members </h2>
                <X className="w-6! h-6! text-black! cursor-pointer! hover:text-red-500!" onClick={onClose} />
            </div>

            {message && (
                <div className="text-white flex flex-row justify-center items-center font-bold! bg-green-700/40 border-2 border-green-900/20 rounded-lg p-2 mb-4!">
                    {message}
                </div>
            )}

            <div className="flex flex-col gap-4! mt-8!">
                <div className="flex flex-col! gap-2! mb-5!">
                  <p className="text-gray-500! text-sm! sm:text-base! lg:text-lg! font-mono! font-bold!">JOIN VIA CODE</p>
                  <p className="text-gray-500! text-sm! sm:text-base! lg:text-lg!">
                      Share the invite link below to invite members to the team
                  </p>
                </div>
                <div className="flex flex-col! border! border-gray-300! rounded-lg! overflow-hidden! sm:flex-row!">
                    <input
                        type="text"
                        readOnly
                        value={`${team.code}`}
                        className="flex-grow! px-3! py-2! text-black! focus:outline-none!"
                    />
                    <button
                        className="bg-purple-700! hover:bg-purple-800! text-white! px-4! py-2! transition-all! duration-200!"
                        onClick={() => {
                            handleCopyLink();
                        }}
                    >
                        Copy
                    </button>
                </div>
            </div>

        </div>
      </div>
    )
}

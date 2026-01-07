import React from "react";
import { Coffee, Video, History, CheckCircle2, CheckCircle, Plus, ThumbsUp, SquarePen, Phone, X } from "lucide-react";

interface CreateMeetingModalProps {
    onClose?: () => void;
    onOpen?: () => void;
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
        {/* TODO[]: Implement start meeting either Schedule or Instant */}
        <button
          className="bg-purple-700! hover:bg-purple-800! text-white! rounded-2xl! px-4! py-4! mt-4! flex flex-row items-center gap-2! transition-all! duration-200
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

                {/* TODO[]: Implement Add Tas */}
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
                {/* TODO[]: Implement Add Review */}
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
            {/* TODO[]: Implement Start Meeting either Schedule or Instant */}
            <button className="bg-white! text-blue-700! rounded-2xl! px-4! py-2! hover:bg-blue-100!" onClick={onOpen}>
            Launch Now
            </button>
        </div>
    );
}

export const CreateMeetingModal: React.FC<CreateMeetingModalProps> = ({ onClose }) => {
    return (
      <div className="fixed! inset-0! bg-black/50! backdrop-blur-md! flex! justify-center! items-center! z-[200]!">
        <div className="relative! bg-white! rounded-2xl! p-6! w-11/12! max-w-xl!">
          <h2 className="text-2xl! font-bold! mb-4! text-black!">
            Create New Meeting
          </h2>
          <form className="flex flex-col gap-4!">
            <input
              type="text"
              placeholder="Meeting Title"
              className="w-full! border! border-gray-300! rounded-lg! text-black! px-3! py-2! focus:outline-none! focus:ring-2! focus:ring-purple-600!"
            />
            <div className="flex flex-row justify-center! gap-4! mt-4!">
              <button className="border border-black! bg-white! text-black! rounded-2xl! px-4! py-2! flex flex-row items-center gap-2! transition-all! duration-200 hover:bg-gray-100! hover:border-gray-700!">
                <Plus className="w-5! h-5! text-black! mr-2!" />
                <span>Schedule Meeting</span>
              </button>
              <button className="bg-purple-700! hover:bg-purple-800! text-white! rounded-2xl! px-4! py-2! flex flex-row items-center gap-2! transition-all! duration-200">
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

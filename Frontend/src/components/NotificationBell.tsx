import React from "react";
import { Bell, BellOff, Video, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

// Hooks
import { useNotificationWebsocket } from "../hooks/websocketHooks";
import { useJoinMeeting } from "../hooks/meetingHooks";

// Helpers
import { MainTeamsUrl, TeamMeetingsUrl} from "../urlPath";

// todo[]: Real Time counter for unread notifications

export const NotificationBell: React.FC = () => {
    const [isOpen, setIsOpen] = React.useState(false);
    const [AllNotificationsRead, IsAllNotificationsRead] = React.useState(true);
    const [unRead, setUnRead] = React.useState(false);


    const notifications = useNotificationWebsocket();
    const navigate = useNavigate();

    const HandleJoinMeeting = (meetingID: string) => {
        const { join } = useJoinMeeting(meetingID);
        join();
    }

    const handleNotificationType = (notification: any) => {
        // todo[]: Handle different types of notifications with different actions or display formats
        switch(notification.type) {
            case "meeting":
                return (
                    <div className="relative! flex flex-row! gap-6! p-4! rounded-2xl! border border-gray-200! bg-white! hover:bg-gray-50! transition-all! duration-200!">

                        {/* Left icon */}
                            <div className="absolute! top-0! left-0! flex! items-center! justify-center! size-10! rounded-xl! bg-blue-50!">
                                <Video className="size-5! text-blue-600! fill-blue-600!" />
                            </div>

                        {/* Main content */}
                        <div className="flex! flex-col! flex-1! gap-1! ml-8!">
                            <div className="flex! items-center! gap-2!">
                                <p className="text-gray-900! font-semibold! text-base! sm:text-xl! leading-tight!">
                                    {notification.meeting_data.title}
                                </p>

                                {/* Status pill */}
                            </div>

                            <p className="text-gray-500! text-sm! line-clamp-1!">
                                {notification.meeting_data.description || "No description provided"}
                            </p>
                        </div>

                        {/* Action */}
                        <div className="flex! flex-col! items-end! gap-4!">
                            <span
                                className={`px-2! py-0.5! rounded-full! text-xs! font-semibold!
                                ${
                                    !notification.meeting_data.status
                                        ? "bg-green-100! text-green-700!"
                                        : "bg-red-100! text-red-700!"
                                }`}
                            >
                                {!notification.meeting_data.status ? "LIVE NOW" : "ENDED"}
                            </span>
                            <button
                                onClick={ () => navigate(`${MainTeamsUrl}`) }
                                className={`px-4! py-2! rounded-lg! text-sm! font-semibold! transition-all! duration-150!
                                ${
                                    !notification.meeting_data.status
                                        ? "bg-purple-700! text-white! hover:bg-purple-700! active:scale-[0.97]!"
                                        : "bg-gray-200! text-gray-500! cursor-not-allowed!"
                                }`}
                            >
                                Navigate to Team
                            </button>
                        </div>

                    </div>
                )

            default:
                return notification.message;
        }
    }

    const clickAllNotifications = () => {
        IsAllNotificationsRead(true);
        setUnRead(false);
    }

    const clickUnRead = () => {
        IsAllNotificationsRead(false);
        setUnRead(true);
    }

    return (
      <div className="">
        {/* Notification Count  */}

        <Bell
          onClick={() => setIsOpen(!isOpen)}
          className={`w-4! h-4! text-gray-600! hover:cursor-pointer! md:w-6! md:h-6! relative! ${isOpen ? "fill-black!" : ""}`}
        />
        <div
          className={`absolute! bottom-2! right-8! w-4! h-4! bg-red-500! text-white! text-xs! font-bold! rounded-full! flex! items-center! justify-center md:bottom-3! md:right-14! lg:bottom-6! lg:right-28! float-right! ${notifications.length === 0 ? "hidden!" : ""}`}
        >
          {notifications.length}
        </div>
        {isOpen &&  (
          <div className="absolute! text-xs! right-8! top-12! w-[90%]! min-h-[40rem]! bg-white! rounded-xl! shadow-xl! z-50! sm:text-base! sm:right-12! sm:top-14! lg:right-28! lg:top-20! sm:w-1/2! lg:w-1/3! 2xl:w-1/4!">
            <header className="p-6! pb-8! font-bold! text-black! flex flex-row justify-between! sm:text-2xl!">
              <span>Activity Center</span>
              <span>
                <X
                  onClick={() => setIsOpen(false)}
                  className="w-4! h-4! text-gray-400! hover:cursor-pointer! hover:text-red-400! md:w-6! md:h-6!"
                />
              </span>
            </header>

            {/* overview  */}
            <div className="w-full! p-4! flex flex-row! gap-4! border-b! text-xs! sm:text-base!">
                <span onClick={clickAllNotifications} className={`${AllNotificationsRead ? "font-bold! underline underline-offset-6 text-black!" : "text-gray-600!"} hover:cursor-pointer! transition-all! ease-in-out! duration-200!`}>All Notifications</span>
                <span onClick={clickUnRead} className={`${unRead ? "font-bold! underline underline-offset-6 text-black!" : "text-gray-600!"} hover:cursor-pointer! transition-all! duration-200!`}>Unread</span>
            </div>
            {AllNotificationsRead && (
                <div>
                    <div className=" px-4 pt-6! bg-gray-50! rounded-b-xl! min-w-full! max-h-80!">
                    {notifications.length === 0 ? (
                        <div className="flex flex-col! justify-center! items-center! gap-4! py-10! lg:py-20! min-h-full!">
                            <BellOff className="w-8! h-8! text-gray-300! fill-gray-300! sm:w-12! sm:h-12! lg:w-16! lg:h-16!" />
                            <p className="text-black! font-medium! text-sm! pt-3! sm:pt-5! md:text-xl!">You all caught up!</p>
                            <p className="text-gray-500! text-center! px-3! text-xs! sm:px-10! sm:text-sm! md:text-base!">No new notifications right now. We'll alert you when there's an update.</p>
                            <p className="text-purple-700! mt-4! font-medium! hover:text-purple-800! cursor-pointer! sm:text-base sm:mt-6!">View Notifications History </p>
                        </div>
                    ) : (
                        notifications.map((notification, index) => (
                        <div
                            key={index}
                            className="mb-3! p-3! bg-gray-100! rounded-lg!"
                        >
                            {handleNotificationType(notification)}
                        </div>
                        ))
                    )}
                    </div>

                    <footer className={`${notifications.length === 0 ? "hidden!" : ""} `}>
                    <button className="bg-transparent! text-gray-500! min-w-full! border-0! pt-28! pb-4! hover:text-gray-600!">
                        View Notification History
                    </button>
                    </footer>
                </div>
            )}
          </div>
        )}
      </div>
    );

}

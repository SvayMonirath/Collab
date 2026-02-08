import React from "react";
import { Bell, X } from "lucide-react";

// Hooks
import { useNotificationWebsocket } from "../hooks/websocketHooks";

// todo[]: Real Time counter for unread notifications

export const NotificationBell: React.FC = () => {
    const [isOpen, setIsOpen] = React.useState(false);
    const notifications = useNotificationWebsocket();

    return (
      <div className="">
        {/* Notification Count  */}

        <Bell
          onClick={() => setIsOpen(!isOpen)}
          className="w-4! h-4! text-gray-600! hover:cursor-pointer! md:w-6! md:h-6! relative!"
        />
        <div className={`absolute! bottom-2! right-8! w-4! h-4! bg-red-500! text-white! text-xs! font-bold! rounded-full! flex! items-center! justify-center md:bottom-3! md:right-14! lg:bottom-6! lg:right-28! float-right! ${notifications.length === 0 ? "hidden!" : ""}`}>
          {notifications.length}
        </div>
        {isOpen && (
          <div className="absolute! text-xs! right-8! top-12! w-1/2! min-h-50! bg-white! border! border-gray-400! rounded-xl! shadow-xl! z-50! sm:text-base! sm:right-12! sm:top-14! lg:right-28! lg:top-20! lg:w-1/5!">
            <header className="p-4! font-medium! text-black! flex flex-row justify-between!">
              <span>Notification</span>
              <span>
                <X
                  onClick={() => setIsOpen(false)}
                  className="w-4! h-4! text-gray-600! hover:cursor-pointer! hover:text-red-400! md:w-6! md:h-6!"
                />
              </span>
            </header>

            <div className=" p-4! border-t! border-gray-400! bg-gray-50! rounded-b-xl! overflow-y-auto! min-w-full! max-h-80!">
              {notifications.length === 0 ? (
                <p className="text-gray-600!">No new notifications</p>
              ) : (
                notifications.map((notification, index) => (
                  <div
                    key={index}
                    className="mb-3! p-3! bg-gray-100! rounded-lg!"
                  >
                    <p className="text-gray-800!">{notification.message}</p>
                    <span className="text-gray-500! text-xs!">
                      {new Date(notification.timestamp).toLocaleTimeString()}
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </div>
    );

}

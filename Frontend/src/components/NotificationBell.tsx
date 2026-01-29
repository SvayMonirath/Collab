import React from "react";
import { Bell, X } from "lucide-react";


export const NotificationBell: React.FC = () => {
    const [isOpen, setIsOpen] = React.useState(false);

    return (
        <div>
            <Bell onClick={() => setIsOpen(!isOpen)} className="w-4! h-4! text-gray-600! hover:cursor-pointer! md:w-6! md:h-6!" />
            {isOpen && (
                <div className="absolute! text-xs! right-8! top-12! w-1/2! min-h-50! bg-white! border! border-gray-400! rounded-xl! shadow-xl! z-50! sm:text-base! sm:right-12! sm:top-14! lg:right-28! lg:top-24! lg:w-1/5!">
                    <header className="p-4! font-medium! text-black! flex flex-row justify-between!"><span>Notification</span><span><X onClick={() => setIsOpen(false)} className="w-4! h-4! text-gray-600! hover:cursor-pointer! hover:text-red-400! md:w-6! md:h-6!" /></span>
                    </header>

                    <div className="p-4! border-t! border-gray-400!">
                    </div>
                </div>
            )}
        </div>
    )

}

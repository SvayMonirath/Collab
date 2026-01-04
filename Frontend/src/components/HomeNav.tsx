import { useState } from "react";
import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Bell, Menu, CirclePlus, LogIn, House, Users, Calendar, NotebookText, LogOut } from "lucide-react";

// API
import { LogoutUser } from "../api/authAPI";
// Components
import { MobileDropDown } from "./MobileDropDown";

interface HomeNavProps {
    onOpenCreateTeam: ()  => void;
    onOpenJoinTeam?: ()  => void;
    Username?: string;
    Email?: string;
}

export const HomeNav: React.FC<HomeNavProps> = ({ onOpenCreateTeam, onOpenJoinTeam, Username, Email}) => {
    const appName = import.meta.env.VITE_APP_NAME;
    const navigate = useNavigate();
    const [showMobileMenu, setShowMobileMenu] = useState(false);

    const handleLogout = async () => {
        await LogoutUser();
        navigate("/login", { state: { message: "You have been logged out." } });

    }

    return (
      <div className="fixed relative w-full bg-transparent">
        <nav
          className="flex flex-row fixed border justify-between items-center bg-white! min-w-screen! py-3! px-2! z-[100]!
                md:px-6! md:py-4! lg:py-6! lg:px-10!
            "
        >
          <h1
            className="text-black! font-extrabold text-lg!
                    sm:text-2xl! lg:text-4xl!
                "
          >
            {appName}
          </h1>

          <div className="flex flex-row space-x-12">
            <div className="flex flex-row space-x-5">
              {/* Create Team Button */}
              <button
                onClick={onOpenCreateTeam}
                className="hidden! bg-white! text-black! px-4! py-2! rounded-lg! hover:bg-gray-200! transition-all! duration-200!
                            lg:inline-block!
                        "
              >
                Create Team
              </button>
              {/* Join Team Button */}
              <button
                onClick={onOpenJoinTeam}
                className="hidden! bg-purple-700! text-white! px-4! py-2! rounded-lg! font-bold! hover:bg-purple-800! transition-all! duration-200!
                            lg:inline-block!
                        "
              >
                Join Teams
              </button>
            </div>

            <div
              className="flex flex-row space-x-4 items-center
                        md:space-x-4!
                    "
            >
              {/* Notification Icon */}
              {/* TODO[]: Implement Show Notification */}
              <Bell
                className="w-4! h-4! text-gray-600! hover:cursor-pointer!
                            md:w-6! md:h-6!
                        "
              />

              {/* profile or hamburger menu */}
              {/* TODO[]: Implement Profile Page */}
              <div
                className="hidden! border-2! border-gray-400! rounded-full! w-8! h-8! bg-gray-300! cursor-pointer!
                            md:w-12! md:h-12! lg:inline-block!
                        "
              ></div>

              {/* hamburger menu for mobile */}
              {/* TODO[X]: Implement Mobile Drop down menu */}
              <div
                className="flex flex-col space-y-1! hover:cursor-pointer!
                            lg:hidden! cursor-pointer
                        "
                onClick={() => setShowMobileMenu(!showMobileMenu)}
              >
                <Menu
                  className="w-4! h-4! text-gray-600!
                                sm:w-6! sm:h-6!
                            "
                />
              </div>
            </div>
          </div>
        </nav>

        {/* MOBILE DROPDOWN MENU */}
        <MobileDropDown
          showMobileMenu={showMobileMenu}
          onOpenCreateTeam={onOpenCreateTeam}
          onOpenJoinTeam={onOpenJoinTeam}
          Username={Username}
          Email={Email}
        />

      </div>
    );
}

import React from "react";
import { NavLink } from "react-router-dom";
import {
  House,
  Users,
  Calendar,
  NotebookText,
  LogOut,
  LogIn,
  CirclePlus,
  DoorOpen,
  BookUser,
  LayoutTemplate,
} from "lucide-react";
import { LogoutUser } from "../api/authAPI";

interface MobileDropDownProps {
  showMobileMenu: boolean;
  onOpenCreateTeam?: () => void;
  onOpenJoinTeam?: () => void;
  Username?: string;
  Email?: string;
}

interface TeamMobileDropDownProps {
  showMobileMenu: boolean;
  TeamID?: string;
  Username?: string;
  Email?: string;
}

const handleLogout = async () => {
  await LogoutUser();
  window.location.href = "/login";
}

const isActiveStyle = "text-black! bg-black! text-white! p-3! rounded-lg! transition-all! duration-300! font-semibold! flex flex-row items-center! gap-3! text-base!";
const isInactiveStyle = "text-black! hover:bg-black! hover:text-white! hover:p-3! rounded-lg transition-all! duration-300! font-semibold! flex flex-row items-center! gap-3! text-base!";

export const MainMobileDropDown: React.FC<MobileDropDownProps> = ({
  showMobileMenu,
  onOpenCreateTeam,
  onOpenJoinTeam,
  Username,
  Email,
}) => {
  return (
    <div
      className={`fixed  top-16 left-0 py-4! px-8! z-50! bg-white border border-gray-700! min-w-full  rounded-lg! flex flex-col! ${
        showMobileMenu
          ? "opacity-100 translate-y-0"
          : "opacity-0 -translate-y-24 pointer-events-none"
      } transition-all! duration-400! sm:p-12! lg:hidden!

    `}
    >
      {/* Profile Picture */}
      <div className="flex flex-row gap-2">
        <div className="size-12 rounded-full border-2 border-gray-500! bg-gray-100!"></div>
        <div className="text-black! flex flex-col!">
          <span className="font-bold! text-lg! sm:text-xl!">{Username}</span>
          <span className="text-gray-600! text-sm! sm:text-base!">{Email}</span>
        </div>
      </div>

      {/* Join/Create Button */}
      <div className="flex flex-row gap-2! justify-center sm:gap-4! items-center! mt-8!">
        <button
          onClick={onOpenCreateTeam}
          className="px-2! py-1! border-b! hover:scale-110! transition-all! duration-200! sm:px-3! sm:py-2! rounded-t-lg! font-bold! flex justify-center items-center gap-2"
        >
          <span className="inline-block! text-center!">
            <CirclePlus className="size-5! sm:size-7!" />
          </span>
          <span className="text-xs! sm:text-base!">Create Team</span>
        </button>
        <button
          onClick={onOpenJoinTeam}
          className="px-2! py-1! hover:scale-110! text-white! bg-purple-700! rounded-b-lg! font-bold! transition-all! duration-200! flex justify-center items-center sm:px-3! sm:py-2! gap-2"
        >
          <span className="inline-block! ">
            <LogIn className="size-5! sm:size-7!" />
          </span>
          <span className="text-xs! sm:text-base!">Join Team</span>
        </button>
      </div>

      {/* Nav Section */}
      <hr className="my-8 text-gray-300" />
      <h1 className="text-gray-500! opacity-70  text-sm! font-medium! mb-4!">
        MENU
      </h1>

      <div className="flex flex-col gap-4!">
        <NavLink
          to="/home"
          className={({isActive}) => (isActive ? isActiveStyle : isInactiveStyle)}
        >
          <span>
            <House className="size-5!" />
          </span>
          <span className="font-normal!">Home</span>
        </NavLink>
        <NavLink
          to="/MainTeams"
          className={({isActive}) => (isActive ? isActiveStyle : isInactiveStyle)}
        >
          <span>
            <Users className="size-5!" />
          </span>
          <span className="font-normal!">Teams</span>
        </NavLink>
        <NavLink
          to="/MainCalendar"
          className={({isActive}) => (isActive ? isActiveStyle : isInactiveStyle)}
        >
          <span>
            <Calendar className="size-5!" />
          </span>
          <span className="font-normal!">Global Calendar</span>
        </NavLink>
        <NavLink
          to="/MainCalendar"
          className={({isActive}) => (isActive ? isActiveStyle : isInactiveStyle)}

        >
          <span>
            <NotebookText className="size-5!" />
          </span>
          <span className="font-normal!">NoteBook</span>
        </NavLink>
      </div>

      {/* More section */}
      <hr className="my-8 text-gray-300" />
      <h1 className="text-gray-500! opacity-70  text-sm! font-medium! mb-4!">
        More
      </h1>
      <div className="flex flex-col gap-4! mb-6!">
        <div
          onClick={() => {
            handleLogout();
          }}
          className="text-black! hover:bg-red-600! hover:font-bold! hover:border-2 hover:border-red-900/30! cursor-pointer! hover:text-white! hover:p-3! rounded-lg transition-all! duration-300! font-semibold! flex flex-row items-center! gap-3! text-base!"
        >
          <span>
            <LogOut className="size-5!" />
          </span>
          <span className="font-normal!">LogOut</span>
        </div>
      </div>
    </div>
  );
};

export const TeamMobileDropDown: React.FC<TeamMobileDropDownProps> = ( {
  showMobileMenu,
  TeamID,
  Username,
  Email,
}
) => {
  return (
    <div
      className={`fixed  top-0 left-0 py-4! px-8! z-50! bg-white border border-gray-700! min-w-full  rounded-lg! flex flex-col! ${
        showMobileMenu
          ? "opacity-100 translate-y-0"
          : "opacity-0 -translate-y-24 pointer-events-none"
      } transition-all! duration-400! sm:p-12! lg:hidden!

    `}
    >
      {/* Profile Picture */}
      <div className="flex flex-row gap-2">
        <div className="size-12 rounded-full border-2 border-gray-500! bg-gray-100!"></div>
        <div className="text-black! flex flex-col!">
          <span className="font-bold! text-lg! sm:text-xl!">{Username}</span>
          <span className="text-gray-600! text-sm! sm:text-base!">{Email}</span>
        </div>
      </div>

      {/* Nav Section */}
      <hr className="my-8 text-gray-300" />
      <h1 className="text-gray-500! opacity-70  text-sm! font-medium! mb-4!">
        MENU
      </h1>

      <div className="flex flex-col gap-4!">
        <NavLink
          to={`/TeamHome/${TeamID}`}
          className={({isActive}) => (isActive ? isActiveStyle : isInactiveStyle)}
        >
          <span>
            <LayoutTemplate className="size-5!" />
          </span>
          <span className="font-normal!">Home</span>
        </NavLink>
        <NavLink
          to={`/TeamCalendar/${TeamID}`}
          className={({isActive}) => (isActive ? isActiveStyle : isInactiveStyle)}
        >
          <span>
            <Calendar className="size-5!" />
          </span>
          <span className="font-normal!">Team Calendar</span>
        </NavLink>
        <NavLink
          to={`/TeamTasks/${TeamID}`}
          className={({isActive}) => (isActive ? isActiveStyle : isInactiveStyle)}

        >
          <span>
            <NotebookText className="size-5!" />
          </span>
          <span className="font-normal!">Team Tasks</span>
        </NavLink>
        <NavLink
          to={`/TeamMembers/${TeamID}`}
          className={({isActive}) => (isActive ? isActiveStyle : isInactiveStyle)}
        >
          <span>
            <BookUser className="size-5!" />
          </span>
          <span className="font-normal!">Teams</span>
        </NavLink>
      </div>

      {/* More section */}
      <hr className="my-8 text-gray-300" />
      <h1 className="text-gray-500! opacity-70  text-sm! font-medium! mb-4!">
        More
      </h1>
      <div className="flex flex-col gap-4! mb-6!">
        <NavLink
          to="/home"
          className="text-black! hover:bg-red-600! hover:font-bold! hover:border-2 hover:border-red-900/30! cursor-pointer! hover:text-white! hover:p-3! rounded-lg transition-all! duration-300! font-semibold! flex flex-row items-center! gap-3! text-base!"
        >
          <span>
            <DoorOpen className="size-5!" />
          </span>
          <span className="font-normal!">Leave</span>
        </NavLink>
      </div>
    </div>
  );
};

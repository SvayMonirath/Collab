import React from "react";
import { NavLink } from "react-router-dom";
import {
  House,
  Users,
  Calendar,
  NotebookText,
  LogOut,
  LogIn,
  Plus,
  DoorOpen,
  BookUser,
  LayoutTemplate,
  Settings,
} from "lucide-react";

// API
import { LogoutUser } from "../../api/authAPI";

// URL PATH
import { MainHomeUrl, MainTeamsUrl, TeamHomeUrl, TeamMeetingsUrl } from "../../urlPath";

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
  onOpenStartMeeting?: () => void;
}

const handleLogout = async () => {
  await LogoutUser();
  window.location.href = "/login";
}

const isActiveStyle = "text-black! bg-black! text-white! p-3! rounded-lg! transition-all! duration-300! font-semibold! flex flex-row items-center! gap-3! text-base!";
const isInactiveStyle = "text-black! hover:border-black! hover:border hover:p-3! rounded-lg transition-all! duration-200! font-semibold! flex flex-row items-center! gap-3! text-base!";


export const MainMobileDropDown: React.FC<MobileDropDownProps> = ({
  showMobileMenu,
  onOpenCreateTeam,
  onOpenJoinTeam,
  Username,
  Email,
}) => {
  const CTALayout = [
    {
      label: "Create Team",
      description: "Start a new project hub",
      icon: <Plus className="size-5!" />,
      onClick: () => {
        if (onOpenCreateTeam) {
          onOpenCreateTeam();
        }
      }
    },
    {
      label: "Join Team",
      description: "Find and join existing teams",
      icon: <LogIn className="size-5!" />,
      onClick: () => {
        if (onOpenJoinTeam) {
          onOpenJoinTeam();
        }
      }
    }
  ]

  const Navigations = [
    {
      label: "Home",
      icon: <House className="size-5!" />,
      to: MainHomeUrl,
    },
    {
      label: "Teams",
      icon: <Users className="size-5!" />,
      to: MainTeamsUrl,
    },
    {
      label: "Global Calendar",
      icon: <Calendar className="size-5!" />,
      to: "/MainCalendar",
    },
    {
      label: "Notebook",
      icon: <NotebookText className="size-5!" />,
      to: "/MainCalendar",
    },
  ]
  return (
    <div
      className={`fixed top-16 left-0 z-50! bg-white! min-w-full!
      px-6! py-6! rounded-b-2xl! shadow-xl! overflow-auto!
      flex flex-col!
      ${
        showMobileMenu
          ? "opacity-100 translate-y-0"
          : "opacity-0 -translate-y-24 pointer-events-none"
      }
      transition-all! duration-400! lg:hidden!`}
    >
      {/* Profile */}
      <div className="flex flex-col! sm:flex-row! gap-8! sm:gap-14!">
        <div className="flex flex-row! gap-4! p-4! sm:flex-col! sm:items-center! sm:gap-6!">
          <div className="size-20! rounded-2xl! border-2 border-gray-300! bg-gray-100!" />
          <div className="flex flex-col!">
            <span className="font-bold! text-xl! text-black!">{Username}</span>
            <span className="text-gray-500! text-sm!">{Email}</span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row! sm:gap-36 w-full! justify-between! gap-10!">
          {/* Menu */}
          <div className="flex flex-col! gap-4! sm:w-[60%]">
            <h1 className="text-gray-400! text-xs! font-semibold! mb-4! tracking-widest!">
              NAVIGATION
            </h1>
            <div className="flex flex-col! gap-4! sm:gap-7!">
              {Navigations.map((nav, index) => (
                <NavLink
                  key={index}
                  to={nav.to}
                  className={({ isActive }) => (isActive ? isActiveStyle : isInactiveStyle)}
                >
                  {nav.icon}
                  {nav.label}
                </NavLink>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="flex flex-col! gap-2! mt-4! sm:gap-4! sm:mt-0! sm:w-[40%]">
            <h1 className="text-gray-400! text-xs! font-semibold! mb-4! tracking-widest!">QUICK ACTIONS</h1>
            {CTALayout.map((action, index) => (
              <div
                key={index}
                onClick={action.onClick}
                className="flex flex-row! justify-between! items-center! bg-transparent! text-black! cursor-pointer! mb-4! rounded-lg! transition-all! duration-200!"
              >
                <div className="flex flex-col">
                  <span className="text-sm! text-start! font-semibold!">{action.label}</span>
                  <span className="text-xs! text-gray-400!">{action.description}</span>
                </div>
                {action.icon}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* More */}
      <div className="mt-10! flex flex-row! justify-between!">
        <button className="flex flex-row! items-center! gap-3! text-black! bg-transparent!" >
          {/* todo[]: Implement Account settings in Mobile DropDown */}
          <Settings className="size-7! fill-gray-600! text-white! hover:fill-gray-800! transition-all! duration-200!" />
          <span className="">Account Settings</span>
        </button>
        <div
          onClick={handleLogout}
          className="text-red-600!
          hover:bg-red-50!
          px-4! py-3! rounded-xl!
          cursor-pointer!
          transition-all! duration-200!
          flex items-center gap-3!
          font-semibold!"
        >
          <LogOut className="size-5!" />
          Log Out
        </div>
      </div>
    </div>
  );
};


export const TeamMobileDropDown: React.FC<TeamMobileDropDownProps> = ({
  showMobileMenu,
  TeamID,
  Username,
  Email,
  onOpenStartMeeting,

}) => {

  const CTALayout = [
    { label: "Start New Meeting", description: "Kick off a new discussion", icon: <Plus className="size-5!" />, onClick: onOpenStartMeeting },
  ]

  const Navigations = [
    { label: "Home", icon: <LayoutTemplate className="size-5!" />, to: `${TeamHomeUrl}/${TeamID}` },
    { label: "Team Calendar", icon: <Calendar className="size-5!" />, to: `/TeamCalendar/${TeamID}` },
    { label: "Tasks", icon: <NotebookText className="size-5!" />, to: `/TeamTasks/${TeamID}` },
    { label: "Members", icon: <BookUser className="size-5!" />, to: `/TeamMembers/${TeamID}` },
    { label: "Meetings", icon: <Users className="size-5!" />, to: `${TeamMeetingsUrl}/${TeamID}` },
  ]

  return (
    <div className={`fixed top-16 left-0 z-50! bg-white! min-w-full! px-6! py-6! rounded-b-2xl! shadow-xl! overflow-auto! flex flex-col! ${showMobileMenu?"opacity-100 translate-y-0":"opacity-0 -translate-y-24 pointer-events-none"} transition-all! duration-400! lg:hidden!`}>

      {/* Profile */}
      <div className="flex flex-col! sm:flex-row! gap-8! sm:gap-14!">
        <div className="flex flex-row! gap-4! p-4! sm:flex-col! sm:items-center! sm:gap-6!">
          <div className="size-20! rounded-2xl! border-2 border-gray-300! bg-gray-100!" />
          <div className="flex flex-col!">
            <span className="font-bold! text-xl! text-black!">{Username}</span>
            <span className="text-gray-500! text-sm!">{Email}</span>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex flex-col sm:flex-row! sm:gap-36 w-full! justify-between! gap-10!">
          <div className="flex flex-col! gap-4! sm:w-[60%]">
            <h1 className="text-gray-400! text-xs! font-semibold! mb-4! tracking-widest!">NAVIGATION</h1>
            <div className="flex flex-col! gap-4! sm:gap-7!">
              {Navigations.map((nav,index)=>(
                <NavLink key={index} to={nav.to} className={({isActive})=>isActive?isActiveStyle:isInactiveStyle}>
                  {nav.icon}
                  {nav.label}
                </NavLink>
              ))}
            </div>
          </div>

          {/* CTA - Team Actions */}
          <div className="flex flex-col! gap-2! mt-4! sm:gap-4! sm:mt-0! sm:w-[40%]">
            <h1 className="text-gray-400! text-xs! font-semibold! mb-4! tracking-widest!">TEAM ACTIONS</h1>
            {CTALayout.map((cta, index) => (
              <div key={index} onClick={cta.onClick} className="flex flex-row! justify-between! items-center! bg-transparent! text-black! cursor-pointer! mb-4! rounded-lg! transition-all! duration-200!">
                <div className="flex flex-col">
                  <span className="text-sm! text-start! font-semibold!">{cta.label}</span>
                  <span className="text-xs! text-gray-400! ">{cta.description}</span>
                </div>
                {cta.icon}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Account & Leave */}
      <div className="mt-10! flex flex-row! justify-between!">
        <button className="flex flex-row! items-center! gap-3! text-black! bg-transparent!">
          <Settings className="size-7! fill-gray-600! text-white! hover:fill-gray-800! transition-all! duration-200!" />
          <span>Account Settings</span>
        </button>
        <div  className="text-red-600! hover:bg-red-50! px-4! py-3! rounded-xl! cursor-pointer! transition-all! duration-200! flex items-center gap-3! font-semibold!">
          <NavLink to={MainHomeUrl} className="text-red-600! hover:bg-red-50! px-4! py-3! rounded-xl! transition-all! duration-200! flex items-center gap-3! font-semibold!" > <DoorOpen className="size-5!" /> Exit Team </NavLink>
        </div>
      </div>
    </div>
  )
}

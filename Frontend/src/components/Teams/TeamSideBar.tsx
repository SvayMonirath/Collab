import React from "react";
import { NavLink } from "react-router-dom";
import { BookCheck, Calendar, DoorOpen, LayoutTemplate, Users, Video } from "lucide-react";

// Path URL
import { MainHomeUrl, TeamHomeUrl, TeamMeetingsUrl } from "../../urlPath";
import { TeamHome } from "../../pages/TeamsPages/TeamHome";

const active =
  "w-12 h-12 p-2 bg-black text-white! rounded-xl flex items-center justify-center transition-all duration-200";

const inactive =
  "w-8 h-8 text-gray-700! hover:bg-black! hover:text-white! hover:w-12 hover:h-12 hover:p-2 hover:rounded-xl transition-all duration-200 flex items-center justify-center";

interface TeamSideBarProps {
  TeamID?: string;
}

export const TeamSideBar: React.FC<TeamSideBarProps> = ({ TeamID }) => {
    return (
        <aside className="hidden lg:flex! lg:flex-col lg:justify-between lg:items-center lg:fixed lg:top-0 lg:left-0 lg:h-full lg:w-20 bg-white pt-10 z-50">

        <div className="flex flex-col items-center space-y-8">

            <NavLink
            to={`${TeamHomeUrl}/${TeamID}`}
            className={({ isActive }) => (isActive ? active : inactive)}
            >
            <LayoutTemplate />
            </NavLink>

            <NavLink
            to="/TeamCalendar"
            className={({ isActive }) => (isActive ? active : inactive)}
            >
            <Calendar />
            </NavLink>

            <NavLink
            to="/TeamTasks"
            className={({ isActive }) => (isActive ? active : inactive)}
            >
            <BookCheck />
            </NavLink>

            <NavLink
            to="/TeamMembers"
            className={({ isActive }) => (isActive ? active : inactive)}
            >
            <Users />
            </NavLink>

            {/* todo[m]: Create Team Meetings page showing both active and upcoming meetings and inactive meetings */}
            <NavLink
            to={`${TeamMeetingsUrl}/${TeamID}`}
            className={({ isActive }) => (isActive ? active : inactive)}
            >
            <Video />
            </NavLink>
        </div>

        <NavLink
            to={MainHomeUrl}>
            <DoorOpen  className="w-8 h-8 text-gray-700 hover:text-red-600 cursor-pointer mb-10" />
        </NavLink>

        </aside>
    );
}

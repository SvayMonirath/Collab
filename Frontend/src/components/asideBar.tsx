import React from "react";
import { NavLink } from "react-router-dom";
import { House, Users, Calendar, NotebookText, LogOut } from "lucide-react";

const active =
  "w-12 h-12 p-2 bg-black text-white! rounded-xl flex items-center justify-center transition-all duration-200";

const inactive =
  "w-8 h-8 text-gray-700! hover:bg-black! hover:text-white! hover:w-12 hover:h-12 hover:p-2 hover:rounded-xl transition-all duration-200 flex items-center justify-center";

export const SideBar: React.FC = () => {
  return (
    <aside className="hidden lg:flex lg:flex-col lg:justify-between lg:items-center lg:fixed lg:top-0 lg:left-0 lg:h-full lg:w-20 bg-white pt-40 shadow-md z-50">

      <div className="flex flex-col items-center space-y-16">

        <NavLink
          to="/home"
          className={({ isActive }) => (isActive ? active : inactive)}
        >
          <House />
        </NavLink>

        <NavLink
          to="/users"
          className={({ isActive }) => (isActive ? active : inactive)}
        >
          <Users />
        </NavLink>

        <NavLink
          to="/calendar"
          className={({ isActive }) => (isActive ? active : inactive)}
        >
          <Calendar />
        </NavLink>

        <NavLink
          to="/notes"
          className={({ isActive }) => (isActive ? active : inactive)}
        >
          <NotebookText />
        </NavLink>

      </div>

      <LogOut className="w-8 h-8 text-gray-700 hover:text-red-600 cursor-pointer mb-10" />
    </aside>
  );
};

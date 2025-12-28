import React from "react";
import { Link } from "react-router-dom";

const UnAuthNav: React.FC = () => {
    return (
        <nav className="flex flex-row justify-between items-center p-4 bg-linear-to-r from-white via-gray-200 to-white shadow-md">
            <div className="text-gray-800 font-extrabold text-xl!
                md:text-2xl! lg:text-3xl!
            ">COLLAB</div>
            <div className="flex flex-row items-center gap-7!
                md:gap-6! lg:gap-8!
                text-sm! md:text-base! lg:text-lg!
            ">
                <Link to="/login" className="!text-gray-800
                    hover:bg-purple-700! hover:text-white! px-4! py-2! rounded-md! transition-colors! duration-300!
                ">Login</Link>
                <Link to="/register" className="flex justify-center items-center px-4 py-2 rounded-md bg-slate-700 text-white! hover:opacity-70! transition-opacity! duration-300!">Sign up</Link>
            </div>
        </nav>
    );
};

export default UnAuthNav;


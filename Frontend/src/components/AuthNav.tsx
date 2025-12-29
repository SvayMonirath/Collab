import React from "react";
import { Navigate } from "react-router-dom";

export const AuthNav: React.FC = () => {
    const appName = import.meta.env.VITE_APP_NAME;
    return (
        <nav className="bg-white shadow-md py-4 px-5
            sm:px-18! lg:px-20! sm:py-8
        ">
            <h1 className="font-extrabold text-black! text-lg! hover:cursor-pointer!
                sm:text-3xl!
                md:text-4xl!
            " onClick={() => {
                return <Navigate to="/" />;
            }}>{appName}</h1>
        </nav>
    );
}

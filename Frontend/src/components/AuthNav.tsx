import React from "react";

export const AuthNav: React.FC = () => {
    return (
        <nav className="bg-white shadow-md py-4 px-5
            sm:px-18! lg:px-20! sm:py-8
        ">
            <h1 className="font-extrabold text-black! text-lg! hover:cursor-pointer!
                sm:text-3xl!
                md:text-4xl!
            " onClick={() => {
                window.location.href = "/";
            }}>COLLAB</h1>
        </nav>
    );
}

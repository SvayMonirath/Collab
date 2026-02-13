import React from "react";

export const DefaultAuthNav: React.FC = () => {
    const appName = import.meta.env.VITE_APP_NAME;
    return (
        <nav className="flex flex-row fixed border justify-between items-center bg-white! min-w-screen! py-3! px-2! z-[100]!
            md:px-6! md:py-4! lg:py-6! lg:px-10!
        ">
            <h1 className="text-black! font-extrabold text-lg!
                sm:text-2xl! lg:text-4xl!
            ">{appName}</h1>

        </nav>
    );
}

import { useState } from "react";
import { useParams } from "react-router-dom";

import { TeamSideBar } from "../../components/TeamSideBar";
import { useTeamById } from "../../hooks/teamHooks";
import { Menu, Plus } from "lucide-react";

export function TeamHome() {

    const { teamID } = useParams<{ teamID: string }>();
    const { team, loading, error } = useTeamById(teamID);

    return (
        <div>
            <TeamSideBar />
            <main className="bg-white! min-h-screen p-12! py-6! lg:px-32! lg:py-12!">
                <div className="flex flex-row justify-between items-center mb-10!
                    sm:mb-16! lg:mb-20!
                ">
                    <div className="flex flex-col gap-3">
                        <h1 className="text-xl! text-black! font-bold
                        sm:text-3xl! lg:text-4xl!
                        ">Team: {team?.title}</h1>
                        <p className="hidden! text-gray-500! text-sm! mt-2
                        sm:text-base! sm:inline-block! lg:text-lg!
                        ">{ team?.description ? team.description : "Team Home Page - Manage your team workspace here." }</p>
                    </div>
                    <div className="inline-block! lg:hidden!">
                        {/* hamburger icon */}
                        <Menu className="w-4! h-4! text-black! cursor-pointer! hover:text-gray-700!
                            sm:size-6!
                        "/>
                    </div>

                </div>
                <div className="flex flex-row">
                    <div className="flex flex-col">
                        <div className="flex flex-col">
                            <h2 className="text-black! text-base! sm:text-lg! md:text-xl!">Meeting Action</h2>
                            <button className="bg-purple-700! hover:bg-purple-800! text-white! font-semibold! rounded-md! px-3! py-2! mt-4! flex flex-row items-center gap-2!
                                md:px-4! md:py-2! md:mt-6! md:text-lg
                                lg:px-6! lg:py-2! lg:mt-8! lg:text-xl!
                            ">
                                <Plus className="w-4! h-4! text-white!
                                    sm:w-6! sm:h-6!
                                " /> <span className="text-base! font-medium
                                    sm:text-lg! md:text-xl!
                                ">Meeting</span>
                            </button>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

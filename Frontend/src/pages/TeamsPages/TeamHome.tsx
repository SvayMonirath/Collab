import { useState } from "react";
import { useParams } from "react-router-dom";

import { TeamSideBar } from "../../components/TeamSideBar";
import { useTeamById } from "../../hooks/teamHooks";
import { Menu } from "lucide-react";

export function TeamHome() {

    const { teamID } = useParams<{ teamID: string }>();
    const { team, loading, error } = useTeamById(teamID);

    return (
        <div>
            <TeamSideBar />
            <main className="bg-white! min-h-screen p-12! py-6! lg:px-32! lg:py-12!">
                <div className="flex flex-row justify-between items-center">
                    <div className="flex flex-col">
                        <h1 className="text-xl! text-black! font-bold
                        sm:text-3xl! lg:text-4xl!
                        ">{team?.title}</h1>
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
            </main>
        </div>
    );
}

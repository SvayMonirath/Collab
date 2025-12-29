import { useState } from "react";
import { Plus } from "lucide-react";
import { HomeNav } from "../components/HomeNav"
import { SideBar } from "../components/asideBar";

import { CreateTeamModal } from "../components/HomeComponents";
import { JoinTeamModal } from "../components/HomeComponents";
import { useCreateTeam } from "../hooks/teamHooks";
import { useJoinTeam } from "../hooks/teamHooks";
import { PopUpMessage } from "../components/popUpMessage";
import { useUserTeams } from "../hooks/teamHooks";

import type { CreateTeamSchemas } from "../types/teamTypes";
import type { JoinTeamSchemas } from "../types/teamTypes";


export function Home() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isJoinModalOpen, setIsJoinModalOpen] = useState(false);
    const { create, loading: createLoading, error: createError, message: createMessage } = useCreateTeam();
    const { teams, loading: teamsLoading, error: teamsError, refetch: refetchTeams } = useUserTeams();
    const { join, loading: joinLoading, error: joinError, message: joinMessage } = useJoinTeam();

    const handleCreateTeam = async (teamData: CreateTeamSchemas) => {
        const result = await create(teamData);
        if (result) {
            refetchTeams();
        }
        return result;
    }

    const handleJoinTeam = async (joinData: JoinTeamSchemas) => {
        const result = await join(joinData);
        if (result) {
            refetchTeams();
        }
        return result;
    }

    return (
      <div>
        <HomeNav onOpenCreateTeam={() => setIsModalOpen(true)} onOpenJoinTeam={() => setIsJoinModalOpen(true)} />
        <main className="flex flex-row ">
            {/* SIDE BAR */}
            <SideBar />

            {/* MAIN CONTENT */}
            <section className="bg-gray-400! min-h-screen min-w-screen flex flex-row mt-10 ml-0!
                lg:pl-20! xl:w-[90%] 2xl:w-[93%]!"
            >
                <div className="bg-white! w-[100%] px-10 lg:w-[70%] text-black! pt-12!
                    sm:pt-16! lg:pt-30! lg:px-16!
                ">
                    <div className="flex flex-row min-w-full justify-between items-center">
                        <h1 className="font-bold text-2xl!
                            md:text-4xl! lg:text-5xl!
                        ">Your Teams</h1>

                        <button className="bg-white! text-black! text-sm! flex flex-row gap-3 justify-center items-center
                            md:text-base! lg:text-lg! px-4! py-2! rounded-lg
                        " onClick={() => setIsJoinModalOpen(true)}><span><Plus /></span><span className="hidden! md:inline-block!">Join Team</span>
                        </button>
                    </div>
                    <div id="yourTeamContainer" className="grid grid-cols-1!
                        md:grid-cols-2! lg:grid-cols-3! gap-6! mt-8!
                    ">
                    {teamsLoading && <p>Loading teams...</p>}

                        {teams.length === 0 && !teamsLoading && <p>No teams found.</p>}

                        {teams.map((team) => (
                            <div
                            key={team.id}
                            className="group relative bg-white rounded-xl shadow-lg hover:scale-105 transition-all! duration-300 cursor-pointer overflow-hidden"
                            >
                            {/* Accent bar */}
                            <div className="h-2 w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>

                            {/* Card content */}
                            <div className="p-5 flex flex-col justify-between border border-black
                                md:h-40!
                            ">
                                <h3 className="text-lg font-semibold text-gray-900 group-hover:text-purple-600 transition-colors
                                    md:text-2xl!
                                ">
                                {team.title}
                                </h3>

                                <p className="text-gray-600 text-sm line-clamp-4 my-2">
                                {team.description || "No description available."}
                                </p>

                            </div>

                            {/* Hover overlay */}
                            <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-5 transition-opacity rounded-xl"></div>
                            </div>
                        ))}
                    </div>

                </div>
                <div className="hidden! bg-yellow-300! lg:inline-block! lg:w-[30%] text-black! pt-10!
                    lg:pt-20!
                ">
                    placeholder for calendar
                </div>
            </section>
        </main>

        { (createMessage || createError) && <PopUpMessage message={createMessage} error={createError} /> }
        { (joinMessage || joinError) && <PopUpMessage message={joinMessage} error={joinError} /> }

        {isModalOpen && <CreateTeamModal
            onClose={() => setIsModalOpen(false)}
            onCreate={handleCreateTeam}
            loading={createLoading}
            />}

        {isJoinModalOpen && <JoinTeamModal
            onClose={() => setIsJoinModalOpen(false)}
            onJoin={handleJoinTeam}
            loading={joinLoading}
        />}

      </div>
    );
}

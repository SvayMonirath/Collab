import { useState } from "react";
import { Plus } from "lucide-react";

import { HomeNav } from "../components/HomeNav"
import { SideBar } from "../components/asideBar";
import { CreateTeamModal } from "../components/HomeComponents";
import { useCreateTeam } from "../hooks/teamHooks";
import { PopUpMessage } from "../components/popUpMessage";
import { useUserTeams } from "../hooks/teamHooks";

import type { CreateTeamSchemas } from "../types/teamTypes";


export function Home() {
    const [isModalOpen, setIsModalOpen] = useState(false); // modal state
    const { create, loading, error, message } = useCreateTeam();
    const { teams, loading: teamsLoading, error: teamsError } = useUserTeams();

    const handleCreateTeam = async (teamData: CreateTeamSchemas) => {
        const result = await create(teamData);
        return result;
    }

    return (
      <div>
        <HomeNav onOpenCreateTeam={() => setIsModalOpen(true)} />
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
                        "><span><Plus /></span><span className="hidden! md:inline-block!">Join Team</span>
                        </button>
                    </div>
                    <div id="yourTeamContainer" className="grid grid-cols-1!
                        md:grid-cols-2! lg:grid-cols-3! gap-6! mt-8!
                    ">
                    {loading && <p>Loading teams...</p>}
                        {error && <p style={{ color: "red" }}>{error}</p>}

                        {teams.length === 0 && !loading && <p>No teams found.</p>}

                        {teams.map((team) => (
                            <div key={team.id} className="team-card border border-black! rounded-lg! p-4! shadow-md! bg-gray-100!">
                                <h3>{team.title}</h3>
                                <p>{team.description}</p>
                                <p>Owner ID: {team.owner_id}</p>
                                <p>Code: {team.code}</p>
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

        { (message || error) && <PopUpMessage message={message} error={error} /> }

        {isModalOpen && <CreateTeamModal
            onClose={() => setIsModalOpen(false)}
            onCreate={handleCreateTeam}
            loading={loading}
            />}

      </div>
    );
}

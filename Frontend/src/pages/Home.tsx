import { useState } from "react";
import { LogIn, Clock, Target, Zap } from "lucide-react";
import { HomeNav } from "../components/HomeNav"
import { SideBar } from "../components/asideBar";

import { CreateTeamModal } from "../components/HomeComponents";
import { JoinTeamModal } from "../components/HomeComponents";
import { useCreateTeam } from "../hooks/teamHooks";
import { useJoinTeam } from "../hooks/teamHooks";
import { PopUpMessage } from "../components/popUpMessage";
import { useUserLatestTeams } from "../hooks/teamHooks";
import { useNavigate } from "react-router-dom";

import type { CreateTeamSchemas } from "../types/teamTypes";
import type { JoinTeamSchemas } from "../types/teamTypes";


export function Home() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isJoinModalOpen, setIsJoinModalOpen] = useState(false);
    const { create, loading: createLoading, error: createError, message: createMessage } = useCreateTeam();
    const { teams, loading: teamsLoading, error: teamsError, refetch: refetchTeams } = useUserLatestTeams();
    const { join, loading: joinLoading, error: joinError, message: joinMessage } = useJoinTeam();

    const navigate = useNavigate();

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
        <main className="flex flex-row min-w-screen! pt-10! bg-gray-100!">
            {/* SIDE BAR */}
            <SideBar />

            <div className="flex flex-col flex-1!">
                {/* OverView */}
                {/* TODO[]: Add OverView functionality with fetches from backend */}
                <div className="px-10! lg:px-16! bg-white! pt-10!
                    sm:pt-16! lg:pt-20! lg:pb-6! lg:pl-32!
                ">
                    <h1 className="font-semibold text-xl! text-gray-500!">OVERVIEW</h1>
                    <div className="grid grid-cols-1
                        md:grid-cols-3! gap-6! mt-6!
                    ">
                        <div className="p-2 flex flex-col relative gap-3 border border-gray-300! rounded-lg! shadow-xl transition-all! duration-200!
                            md:p-4! lg:p-6!
                        ">
                            <Clock className="w-4! h-4! text-black!
                                lg:w-7! lg:h-7!
                            " />
                            <p className="text-gray-500! text-sm! mt-2
                                md:text-base! lg:text-lg!
                            ">Weekly Meetings</p>
                            <h2 className="text-lg font-semibold text-black!
                                md:text-xl! lg:text-2xl!
                            ">PlaceHolder</h2>

                            <div className="absolute top-2 right-2 text-green-700! text-sm!
                                 lg:text-lg!
                            ">Message</div>
                        </div>
                        <div className="p-2 flex flex-col relative gap-3 border border-gray-300! rounded-lg! shadow-xl transition-all! duration-200!
                            md:p-4! lg:p-6!
                        ">
                            <Target className="w-4! h-4! text-black!
                                lg:w-7! lg:h-7!
                            " />
                            <p className="text-gray-500! text-sm! mt-2
                                md:text-base! lg:text-lg!
                            ">Open Tasks</p>
                            <h2 className="text-lg font-semibold text-black!
                                md:text-xl! lg:text-2xl!
                            ">PlaceHolder</h2>

                            <div className="absolute top-2 right-2 text-red-700! text-sm!
                                 lg:text-lg!
                            ">Message</div>
                        </div>
                        <div className="p-2 flex flex-col relative gap-3 border border-gray-300! rounded-lg! shadow-xl transition-all! duration-200!
                            md:p-4! lg:p-6!
                        ">
                            <Zap className="w-4! h-4! text-black!
                                lg:w-7! lg:h-7!
                            " />
                            <p className="text-gray-500! text-sm! mt-2
                                md:text-base! lg:text-lg!
                            ">AI Summarizes</p>
                            <h2 className="text-lg font-semibold text-black!
                                md:text-xl! lg:text-2xl!
                            ">PlaceHolder</h2>

                            <div className="absolute top-2 right-2 text-green-700! text-sm!
                                 lg:text-lg!
                            ">Message</div>
                        </div>
                    </div>
                </div>

                <section className="bg-gray-400! min-h-screen flex flex-row
                    "
                >
                    <div className="bg-white! w-[100%] px-10 lg:w-[70%] lg:pl-28! text-black! pt-12!
                        sm:pt-16! lg:pt-30! lg:px-16!
                    ">
                        <div className="flex flex-row min-w-full justify-between items-center">
                            <h1 className="font-bold text-xl!
                                md:text-2xl!
                            ">Latest Teams</h1>

                            <button className="bg-white! text-black! text-sm! flex flex-row gap-2 justify-center items-center
                                md:text-base! px-4! py-2! rounded-lg
                            " onClick={() => setIsJoinModalOpen(true)}><span><LogIn /></span><span className="hidden! md:inline-block!">Join Team</span>
                            </button>
                        </div>
                        <div id="yourTeamContainer" className="grid grid-cols-1!
                            md:grid-cols-2! lg:grid-cols-3! gap-6! mt-8!
                        ">
                        {teamsLoading && <p>Loading teams...</p>}

                            {teams.length === 0 && !teamsLoading && <p>No teams found.</p>}
                            {teams.map((team) => (
                                <div key={team.id} className="p-4! bg-white! rounded-lg! border border-gray-300! cursor-pointer!
                                    hover:scale-105! hover:border-purple-700! transition-all! duration-200!
                                ">
                                    <h3 className="text-lg! font-semibold! text-black!
                                        md:text-xl! lg:text-2xl!
                                    ">{team.title}</h3>
                                    <p className="text-gray-600! mt-2!
                                        md:text-base! lg:text-lg!
                                    ">{team.description || "No description available."}</p>
                                </div>
                            ))}
                            {teams.length > 0 && !teamsLoading && (<div className="flex items-center hover:">
                                <button
                                    onClick={() => navigate("/teams")}
                                    className="mt-6 bg-purple-700! text-white text-sm! px-3! py-2! rounded-lg hover:bg-purple-800! transition-colors! duration-200!"
                                >
                                    Show More
                                </button>
                            </div>)}
                        </div>

                    </div>
                    <div className="hidden! bg-white! border border-gray-300! lg:inline-block! lg:w-[30%] text-black! pt-10!
                        lg:pt-20!
                    ">
                        placeholder for calendar
                    </div>
                </section>
            </div>
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

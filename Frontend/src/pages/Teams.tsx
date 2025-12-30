import { Settings, CirclePlus, LogIn } from "lucide-react";

import { SideBar } from "../components/asideBar";
import { DefaultAuthNav } from "../components/DefaultNav";
import { useUserTeams } from "../hooks/teamHooks";

export function TeamsPage() {

    const { teams, loading: teamsLoading, error: teamsError, refetch: refetchTeams } = useUserTeams();

    return (
        <div>
            <DefaultAuthNav />
            <main className="flex flex-row min-h-screen! bg-gray-100!">
                {/* SIDE BAR */}
                <SideBar />
                {/* TEAMS CONTENT */}
                <div className="flex flex-col flex-1! pt-20! px-8! sm:px-16! sm:pt-24! lg:px-40! lg:pt-32! ">
                    <div className="flex flex-row justify-between items-center mb-10! text-center!
                        md:mb-16! lg:mb-30!
                    ">
                        <h1 className="font-medium text-xl! text-gray-700!
                            md:text-2xl! lg:text-3xl!
                        ">Teams Page</h1>

                        <div className="flex flex-row gap-1 lg:gap-4!">
                            <button className="text-sm!  bg-white! text-black! px-4! py-2! rounded-lg! font-medium!
                                md:text-base! lg:text-lg!
                            "><span className="lg:hidden!"><CirclePlus /></span><span className="hidden! lg:inline-block!">Create Team</span></button>

                            <button className="text-sm! bg-purple-700! text-white! px-4! py-2! rounded-lg! font-bold! hover:bg-purple-800! transition-all! duration-200!
                                md:text-base! lg:text-lg!
                            "><span className="lg:hidden!"><LogIn /></span><span className="hidden! lg:inline-block!">Join Team</span></button>
                        </div>

                    </div>
                    {/* TODO[]: Implement Teams Page */}

                    <div className="flex flex-row justify-between items-center mb-10! text-center! ">
                        <h2 className="font-medium text-base! px-8! text-gray-700!
                        sm:px-12! md:px-20! md:text-lg! lg:text-xl!
                        ">ALL TEAMS</h2>
                        <Settings className="w-6! h-6! text-gray-600! hover:cursor-pointer!
                            md:w-7! md:h-7!
                        " />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6!">
                        {teamsLoading && <p className="text-black!">Loading teams...</p>}
                        {teamsError && <p className="text-red-600!">Error: {teamsError}</p>}
                        {!teamsLoading && teams.length === 0 && <p className="text-black!">No teams found.</p>}
                        {teams.map((team) => (
                            <div key={team.id} className="p-4! bg-white! rounded-lg! border border-gray-300! cursor-pointer!
                                hover:scale-105! hover:border-purple-700! transition-all! duration-200! group
                            ">
                                <h3 className="text-lg! font-semibold! text-black! group-hover:text-purple-700!
                                    md:text-xl! lg:text-2xl!
                                ">{team.title}</h3>
                                <p className="text-gray-600! mt-2!
                                    md:text-base! lg:text-lg!
                                ">{team.description || "No description available."}</p>
                            </div>
                        ))}
                    </div>
                </div>

            </main>
        </div>
    );
}

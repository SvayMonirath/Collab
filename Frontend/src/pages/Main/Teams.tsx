import { Settings, CirclePlus, LogIn } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { SideBar } from "../../components/asideBar";
import { DefaultAuthNav } from "../../components/DefaultNav";
import { useUserTeams } from "../../hooks/teamHooks";

export function MainTeams() {
  const {
    teams,
    loading: teamsLoading,
    error: teamsError,
    refetch: refetchTeams,
  } = useUserTeams();

  const navigate = useNavigate();

  return (
    <div>
      <DefaultAuthNav />
      <main className="flex flex-row min-h-screen! bg-white!">
        {/* SIDE BAR */}
        <SideBar />
        {/* TEAMS CONTENT */}
        <div className="flex flex-col flex-1! pt-20! px-8! sm:px-16! sm:pt-24! lg:px-40! lg:pt-32! ">
          <div
            className="flex flex-row justify-between items-center mb-10!
                        md:mb-16! lg:mb-24!
                    "
          >
            <div className="flex flex-col ">
              <h1
                className="font-medium text-2xl! text-black! font-bold!
                                sm:text-3xl! lg:text-4xl!
                            "
              >
                Teams
              </h1>
              <p className="hidden! text-gray-500! sm:inline-block! sm:text-base! lg:text-lg!">
                Manage your teams workspaces
              </p>
            </div>

            <div className="flex flex-row gap-3 lg:gap-4!">
              <button
                className="text-sm!  bg-white! text-black! px-4! py-2! rounded-lg! font-medium!
                                md:text-base! lg:text-lg!
                            "
              >
                <span className="lg:hidden!">
                  <CirclePlus />
                </span>
                <span className="hidden! lg:inline-block!">Create Team</span>
              </button>

              <button
                className="text-sm! bg-purple-700! text-white! px-4! py-2! rounded-lg! font-bold! hover:bg-purple-800! transition-all! duration-200!
                                md:text-base! lg:text-lg!
                            "
              >
                <span className="lg:hidden!">
                  <LogIn />
                </span>
                <span className="hidden! lg:inline-block!">Join Team</span>
              </button>
            </div>
          </div>
          {/* TODO[]: Implement Teams Page */}

          <div
            className="flex flex-row justify-between items-center mb-5! text-center!
                        sm:mb-7!
                    "
          >
            <div></div>
            <Settings
              className="w-6! h-6! text-gray-600! hover:cursor-pointer!
                            md:w-7! md:h-7!
                        "
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {teamsLoading && <p className="text-black">Loading teams...</p>}
            {teamsError && <p className="text-red-600">Error: {teamsError}</p>}
            {!teamsLoading && teams.length === 0 && (
              <p className="text-black">No teams found.</p>
            )}

            {teams.map((team) => (
              <div
                key={team.id}
                className="
                  flex flex-col justify-between bg-white rounded-2xl shadow-sm hover:shadow-lg
                  border border-gray-200 transition-all duration-300
                  p-6 md:p-8 lg:p-10
                "
              >
                {/* Title and Description */}
                <div className="flex flex-col gap-3">
                  <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900">
                    {team.title}
                  </h3>
                  <p className="text-gray-600 text-sm md:text-base lg:text-lg line-clamp-3">
                    {team.description || "No description available."}
                  </p>
                </div>

                {/* Stats Section */}
                <div className="grid grid-cols-3 gap-4 mt-6">
                  {/* Member Count */}
                  <div className="flex flex-col items-center justify-center p-3 bg-gray-50 rounded-xl">
                    <span className="text-lg md:text-xl font-semibold text-gray-900">{team.membersCount}</span>
                    <span className="text-xs md:text-sm text-gray-500 uppercase tracking-wide">Members</span>
                  </div>

                  {/* Task Count */}
                  <div className="flex flex-col items-center justify-center p-3 bg-gray-50 rounded-xl">
                    <span className="text-lg md:text-xl font-semibold text-gray-900">{team.tasksCount}</span>
                    <span className="text-xs md:text-sm text-gray-500 uppercase tracking-wide">Tasks</span>
                  </div>

                  {/* Meeting Count */}
                  <div className="flex flex-col items-center justify-center p-3 bg-gray-50 rounded-xl">
                    <span className="text-lg md:text-xl font-semibold text-gray-900">{team.meetingsCount}</span>
                    <span className="text-xs md:text-sm text-gray-500 uppercase tracking-wide">Meetings</span>
                  </div>
                </div>

                {/* Action Button */}
                <button
                  onClick={() => navigate(`/TeamHome/${team.id}`)}
                  className="
                    mt-6 w-full py-2 md:py-3 text-white font-semibold bg-purple-600 rounded-lg
                    hover:bg-purple-700 transition-colors duration-200
                  "
                >
                  Enter Team
                </button>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

import { Settings, CirclePlus, LogIn } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { SideBar } from "../../components/asideBar";
import { DefaultAuthNav } from "../../components/DefaultNav";
import { useUserTeams } from "../../hooks/teamHooks";

export function TeamsPage() {
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
      <main className="flex flex-row min-h-screen! bg-gray-100!">
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
                className="flex flex-col justify-between p-6 bg-white rounded-lg "
              >
                <div>
                  <h3 className="text-xl font-semibold text-black mb-8! md:mb-12! md:text-2xl lg:text-3xl">
                    {team.title}
                  </h3>
                  <p className="text-gray-600 mt-2 mb-12! md:text-base lg:text-lg">
                    {team.description || "No description available."}
                  </p>

                  <div className="flex justify-between mt-4">
                    {/* Member Count */}
                    <div>
                      <h2 className="text-black font-semibold text-base md:text-lg lg:text-xl">
                        Count
                      </h2>
                      <p className="text-gray-500 text-sm md:text-base lg:text-lg">
                        Members
                      </p>
                    </div>

                    {/* Task Count */}
                    <div>
                      <h2 className="text-black font-semibold text-base md:text-lg lg:text-xl">
                        Count
                      </h2>
                      <p className="text-gray-500 text-sm md:text-base lg:text-lg">
                        Tasks
                      </p>
                    </div>

                    {/* Meeting Count */}
                    <div>
                      <h2 className="text-black font-semibold text-base md:text-lg lg:text-xl">
                        Count
                      </h2>
                      <p className="text-gray-500 text-sm md:text-base lg:text-lg">
                        Meetings
                      </p>
                    </div>
                  </div>
                </div>

                {/* Button at the bottom */}
                <button
                  onClick={() => {
                    navigate(`/TeamHome/${team.id}`);
                  }}
                  className="mt-6 bg-black text-white px-4 py-2 rounded-lg w-full font-semibold! hover:bg-gray-800! transition-colors! duration-200
                                md:mt-12!
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

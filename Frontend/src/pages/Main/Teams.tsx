import { Settings } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

// Components
import { CreateTeamModal } from "../../components/HomeComponents";
import { JoinTeamModal } from "../../components/HomeComponents";
import { SideBar } from "../../components/SideBars/asideBar";
import { HomeNav } from "../../components/Navbars/HomeNav";
import { LoadingScreen } from "../../components/Loaders/LoadingScreenComponent";

// Hooks
import { useCurrentUser } from "../../hooks/userHooks";
import { useCreateTeam } from "../../hooks/teamHooks";
import { useJoinTeam } from "../../hooks/teamHooks";
import { useUserTeams } from "../../hooks/teamHooks";

// Types
import type { CreateTeamSchemas, JoinTeamSchemas } from "../../types/teamTypes";

import { TeamHomeUrl } from "../../urlPath";

export function MainTeams() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isJoinModalOpen, setIsJoinModalOpen] = useState(false);

  const {
    teams,
    loading: teamsLoading,
    error: teamsError,
    refetch: refetchTeams,
  } = useUserTeams();

  const navigate = useNavigate();
  const { create, loading: createLoading } = useCreateTeam();
  const { join, loading: joinLoading } = useJoinTeam();

  const { user, loading: userLoading, error: userError } = useCurrentUser();

  const handleCreateTeam = async (teamData: CreateTeamSchemas) => {
    const result = await create(teamData);
    if (result) {
      refetchTeams();
    }
    return result;
  };

  const handleJoinTeam = async (joinData: JoinTeamSchemas) => {
    const result = await join(joinData);
    if (result) {
      refetchTeams();
    }
    return result;
  };

  return (
    <div>
      <HomeNav
        onOpenCreateTeam={() => setIsCreateModalOpen(true)}
        onOpenJoinTeam={() => setIsJoinModalOpen(true)}
        Username={user?.username || ""}
        Email={user?.email || ""}
      />
      <main className="flex flex-row min-h-screen! bg-white!">
        {/* SIDE BAR */}
        <SideBar />
        {/* TEAMS CONTENT */}
        <div className="flex flex-col flex-1! pt-20! px-8! sm:px-16! sm:pt-24! lg:px-40! lg:pt-32! ">
          <div className="flex flex-row justify-between items-center mb-6! md:mb-8! lg:mb-12!">
            <div className="flex flex-col">
              <h1 className="font-medium text-2xl! text-black! sm:text-3xl! lg:text-4xl!">
                Teams
              </h1>
              <p className="hidden! text-gray-500! sm:inline-block! sm:text-base! lg:text-lg!">
                Manage your teams workspaces
              </p>
            </div>
            <Settings className="w-6! h-6! text-gray-600! hover:cursor-pointer! md:w-7! md:h-7!" />
          </div>
          {/* todo[x]: Teams Page */}

          <div className="flex flex-row justify-between items-center text-center!">
            <div></div>
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
                  <h3 className="text-xl md:text-2xl  font-bold text-gray-900">
                    {team.title}
                  </h3>
                  <p className="text-gray-400! text-xs md:text-sm lg:text-base line-clamp-2 overflow-auto">
                    {team.description || "No description available."}
                  </p>
                </div>

                {/* Action Button */}
                <button
                  onClick={() => navigate(`${TeamHomeUrl}/${team.id}`)}
                  className="
                    mt-6 w-full py-2 md:py-3 text-white font-semibold bg-purple-600! rounded-lg
                    hover:opacity-80! transition-opacity! duration-200!
                  "
                >
                  Enter Team
                </button>
              </div>
            ))}
          </div>
        </div>
      </main>
      {isCreateModalOpen && (
        <CreateTeamModal
          onClose={() => setIsCreateModalOpen(false)}
          onCreate={handleCreateTeam}
          loading={createLoading}
        />
      )}

      {isJoinModalOpen && (
        <JoinTeamModal
          onClose={() => setIsJoinModalOpen(false)}
          onJoin={handleJoinTeam}
          loading={joinLoading}
        />
      )}

      {(teamsLoading || userLoading) && <LoadingScreen message="Loading..."/>}
    </div>

  );
}

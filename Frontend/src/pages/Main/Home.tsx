import { useEffect, useState } from "react";
import { LogIn, Clock, Target, Zap } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

import { HomeNav } from "../../components/HomeNav";
import { SideBar } from "../../components/asideBar";

// Hooks
import { useCreateTeam } from "../../hooks/teamHooks";
import { useJoinTeam } from "../../hooks/teamHooks";
import { useUserLatestTeams } from "../../hooks/teamHooks";
import { useCurrentUser } from "../../hooks/userHooks";
// Components
import { PopUpMessage } from "../../components/popUpMessage";
import { CreateTeamModal } from "../../components/HomeComponents";
import { JoinTeamModal } from "../../components/HomeComponents";

import type { CreateTeamSchemas } from "../../types/teamTypes";
import type { JoinTeamSchemas } from "../../types/teamTypes";
import { MainTeamsUrl, TeamHomeUrl } from "../../urlPath";

export function MainHome() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isJoinModalOpen, setIsJoinModalOpen] = useState(false);
  const {
    create,
    loading: createLoading,
    error: createError,
    message: createMessage,
  } = useCreateTeam();
  const {
    teams,
    loading: teamsLoading,
    error: teamsError,
    refetch: refetchTeams,
  } = useUserLatestTeams();
  const {
    join,
    loading: joinLoading,
    error: joinError,
    message: joinMessage,
  } = useJoinTeam();
  const {
    user,
    loading: userLoading,
    error: userError,
  } = useCurrentUser();

  const navigate = useNavigate();
  const location = useLocation();
  const redirectError = location.state?.error || null;
  const [showRedirectError, setShowRedirectError] = useState<string | null>(redirectError);

  useEffect(() => {
    if(redirectError) {
      setShowRedirectError(redirectError);
      setTimeout(() => {
        setShowRedirectError(null);
      }, 3000);
    }

  }, [redirectError]);

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
        onOpenCreateTeam={() => setIsModalOpen(true)}
        onOpenJoinTeam={() => setIsJoinModalOpen(true)}
        Username={user ? user.username : ""}
        Email={user ? user.email : ""}
      />
      <main className="flex flex-row min-w-screen! pt-10! bg-gray-100!">
        {/* SIDE BAR */}
        <SideBar />

        <div className="flex flex-col flex-1!">
          {/* Welcoming */}
          <div className="bg-white! pt-10! px-10! sm:pt-16! lg:pt-20! lg:px-28!">
            <h1
              className="font-bold text-xl! text-black! sm:px-8! lg:px-10!
                        sm:text-3xl! lg:text-4xl! mb-2!
                    "
            >
              Welcome, {user ? user.username : "User"}!
            </h1>
          </div>

          {/* OverView */}
          {/* todo[]: Make Overview dynamic and functional */}
          <div className="bg-white! px-6! sm:px-10! lg:px-16! pt-10! sm:pt-12! lg:px-32! lg:pt-16! lg:pb-6!">
            {/* Heading */}
            <h1 className="text-gray-500! font-semibold text-lg! sm:text-xl! lg:text-2xl! tracking-wide!">
              OVERVIEW
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">

              {/* Cards Data */}
              {[
                {
                  icon: <Clock className="w-6 h-6 lg:w-8 lg:h-8 text-white" />,
                  label: "Weekly Meetings",
                  value: "0",
                  status: { text: "On Track", color: "bg-green-100 text-green-700" },
                  iconBg: "bg-purple-600",
                },
                {
                  icon: <Target className="w-6 h-6 lg:w-8 lg:h-8 text-white" />,
                  label: "Open Tasks",
                  value: "0",
                  status: { text: "Overdue", color: "bg-red-100 text-red-700" },
                  iconBg: "bg-red-600",
                },
                {
                  icon: <Zap className="w-6 h-6 lg:w-8 lg:h-8 text-white" />,
                  label: "AI Summarizes",
                  value: "0",
                  status: { text: "New Insights", color: "bg-yellow-100 text-yellow-700" },
                  iconBg: "bg-yellow-500",
                },
              ].map((card, idx) => (
                <div
                  key={idx}
                  className="relative flex flex-col p-6 rounded-2xl bg-white "
                >
                  {/* Icon */}
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${card.iconBg}`}>
                    {card.icon}
                  </div>

                  {/* Label */}
                  <p className="mt-4 text-gray-500 font-medium text-sm lg:text-base">{card.label}</p>

                  {/* Value */}
                  <h2 className="mt-1 text-2xl lg:text-3xl font-bold text-gray-900">{card.value}</h2>

                  {/* Status badge */}
                  <div className={`absolute top-4 right-4 px-2 py-1 rounded-full text-xs font-semibold ${card.status.color}`}>
                    {card.status.text}
                  </div>

                  {/* Optional: subtle progress bar */}
                  <div className="mt-4 h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${card.iconBg}`}
                      style={{ width: `${Math.min(card.value * 8, 100)}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <section
            className="bg-gray-400! min-h-screen flex flex-row
                    "
          >
            <div
              className="bg-white! w-[100%] px-10 lg:w-[70%] lg:pl-28! text-black! pt-12!
                        sm:pt-16! lg:pt-20! lg:px-16!
                    "
            >
              <div className="flex flex-row min-w-full justify-between items-center">
                <h1
                  className="font-bold text-xl!
                                md:text-2xl!
                            "
                >
                  Latest Joined Teams
                </h1>

                <button
                  className="bg-white! text-black! text-sm! flex flex-row gap-2 justify-center items-center
                                md:text-base! px-6! py-2! rounded-lg
                            "
                  onClick={() => navigate(MainTeamsUrl)}
                >
                  <span className="hidden! md:inline-block! font-medium text-gray-500">See All</span>
                </button>
              </div>

              {/* Latest Joined Teams CARDS  */}
              <div className="grid gap-6 mt-10! sm:grid-cols-2 lg:grid-cols-3">
                {/* if no teams display you have no team joined */}
                {teams.length > 0 ? teams.map((team) => (
                  <div
                    key={team.id}
                    onClick={() => navigate(`${TeamHomeUrl}/${team.id}`)}
                    className="
                      group relative cursor-pointer overflow-hidden rounded-2xl
                      bg-white! border border-gray-100!
                      transition-all duration-300
                      hover:-translate-y-1
                    "
                  >
                    {/* subtle top color accent */}
                    <div className="h-1 w-full bg-purple-600"></div>

                    <div className="p-6 flex flex-col justify-between">
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 group-hover:text-purple-700 transition-colors duration-300">
                          {team.title}
                        </h3>
                        <p className="mt-2 text-gray-600 text-sm leading-relaxed overflow-auto! h-12">
                          {team.description || "No description available."}
                        </p>
                      </div>

                      <div className="opacity-0! mt-4 flex items-center justify-between text-purple-600 font-semibold opacity-80 group-hover:opacity-100! transition-opacity! duration-300!">
                        <span>Open →</span>
                      </div>
                    </div>
                  </div>
                )) : (
                  <p className="text-gray-500! px-4!">You have not joined any teams yet.</p>
                )}

                {/* Show More Card */}
                {teams.length > 0 && !teamsLoading && (
                  <div
                    onClick={() => navigate(MainTeamsUrl)}
                    className="
                      flex cursor-pointer items-center justify-center rounded-2xl
                      border-2 border-dashed border-gray-300 p-6 text-gray-500
                      transition-all duration-300
                      hover:border-purple-600 hover:text-purple-700 hover:bg-purple-50
                    "
                  >
                    <span className="text-sm font-semibold">Show more teams +</span>
                  </div>
                )}
              </div>
            </div>
            <div
              className="hidden! bg-white! border border-gray-300! lg:inline-block! lg:w-[30%] text-black! pt-10!
                        lg:pt-20!
                    "
            >
              placeholder for calendar
            </div>
          </section>
        </div>
      </main>

      {(createMessage || createError) && (
        <PopUpMessage message={createMessage} error={createError} />
      )}
      {(joinMessage || joinError) && (
        <PopUpMessage message={joinMessage} error={joinError} />
      )}

      {
        showRedirectError && <PopUpMessage message="" error={showRedirectError} />
      }

      {isModalOpen && (
        <CreateTeamModal
          onClose={() => setIsModalOpen(false)}
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
    </div>
  );
}

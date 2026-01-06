import { useState } from "react";
import { useParams } from "react-router-dom";
import { BookCheck, Coffee, History, Menu, Phone, Plus, Sparkle, UserPlus, Users, Video } from "lucide-react";

// Components
import { TeamSideBar } from "../../components/TeamSideBar";
import { TeamMobileDropDown } from "../../components/MobileDropDown";
// Hooks
import { useTeamById } from "../../hooks/teamHooks";
import { useCurrentUser } from "../../hooks/userHooks";

export function TeamHome() {
    const { teamID } = useParams<{ teamID: string }>();
    const { team, loading, error } = useTeamById(teamID);
    const { user, loading: userLoading, error: userError } = useCurrentUser();

    const [showMobileMenu, setShowMobileMenu] = useState(false);
    const [ActiveMeeting, setActiveMeeting] = useState(false);

    return (
        <div>
            <TeamSideBar />
            <main className="bg-white! min-h-screen p-6! py-3! lg:ml-20! lg:py-6!">
                <div className="flex flex-row justify-between items-center mb-10!
                    sm:mb-14! lg:mb-16!
                ">
                    <div className="flex flex-col flex-1!">
                        <h1 className="text-lg! text-black! font-mono font-bold
                        sm:text-xl! lg:text-2xl!
                        ">{team?.title}</h1>
                        <p className="hidden! text-gray-500! text-sm! mt-2
                        sm:text-base! sm:inline-block! lg:text-lg!
                        ">{ team?.description ? team.description : "Team Home Page - Manage your team workspace here." }</p>
                    </div>
                    {/* Invite Member */}

                    {/* TODO[]: Implement Inviting Non Members to the team  */}
                    <div className="flex flex-row items-center px-3! py-2! gap-2! text-black! sm:border-2 sm:border-blue-500! sm:   text-blue-500! font-bold! rounded-lg!
                        md:px-3! md:py-2! md:gap-2! hover:bg-blue-600! hover:text-white! cursor-pointer! transition-all! duration-200!
                    ">
                        <span><UserPlus className="w-5! h-5!"/></span><span className="hidden! md:inline-block!">Invite Member</span>
                    </div>
                    {/* Hamburger Menu */}
                    <div className="inline-block! lg:hidden! z-[100]! ml-4!">
                        {/* hamburger icon */}
                        <Menu className="w-4! h-4! text-black! cursor-pointer! hover:text-gray-700!
                            sm:size-6!
                        " onClick={() => setShowMobileMenu(!showMobileMenu)}/>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4 lg:gap-8 md:grid-cols-4 min-w-full mb-10!">
                    {[
                        { label: "Total Members", value: 0, icon: <Users /> , iconColor: "text-orange-700!", borderColor: "border-black!", bgColor: "bg-white!" },
                        { label: "Pending Tasks", value: 0, icon: <BookCheck /> , iconColor: "text-green-600!", borderColor: "border-green-600!", bgColor: "bg-green-600/20!" },
                        { label: "Unreviewed Items", value: 0, icon: <Sparkle /> , iconColor: "text-purple-700!", borderColor: "border-purple-700!", bgColor: "bg-purple-700/20!" },
                        { label: "Upcoming Meetings", value: 0, icon: <Video /> , iconColor: "text-blue-700!", borderColor: "border-blue-700!", bgColor: "bg-blue-700/20!" },
                    ].map((stat, index) => (
                        <div
                            key={index}
                            // give me a better backround design better than that this is ugly and dont fit the productivity vibe
                            className={`flex flex-col border-2 border-black! rounded-2xl! shadow-xl! p-3! md:p-6! md:py-4! lg:gap-4!
                                hover:shadow-md! transition-all! duration-300!
                            `}
                        >
                            <div className="flex flex-row justify-between items-center">
<span className="text-black/60! font-bold! text-xs! sm:text-xs! md:text-base! lg:text-md!">
                                    {stat.label}
                                </span>
                                <span className={`hidden! ${stat.iconColor} p-2! rounded-lg! font-medium! lg:inline-block! `}>
                                    {stat.icon}
                                </span>
                            </div>
                            <span className="text-black! font-bold! text-2xl! md:text-3xl! lg:text-4xl! mt-2!">
                                {stat.value}
                            </span>
                        </div>
                    ))}
                </div>
                {/* main section */}
                <div className="flex flex-row px-5! md:px-5! min-w-full! min-h-screen!">
                    <section className="flex flex-col flex-3">

                        {/* Currently Active Meeting Container */}
                        <div className="min-w-full flex flex-col px-5! py-5! justify-center items-center sm:px-32! sm:py-8!">

                            < Coffee className="w-12! h-12! text-black! mb-2!
                                lg:w-20! lg:h-20! sm:mb-4!

                            " />k
                            <h2 className="text-black! font-bold! text-xl! mb-2! text-center!
                                sm:text-2xl! sm:mb-4!
                                lg:text-3xl! lg:mb-6!
                            ">No active meetings</h2>
                            <p className="text-black/60! text-center! text-xs! mb-4!
                                sm:text-base! sm:mb-6!
                                lg:text-lg! lg:mb-8!
                            ">You currently have no active meetings. Click the button below to start a new meeting and collaborate with your team in real-time.</p>

                            {/* Join/View History Button */}
                            <div className="flex flex-row gap-4!">
                                {/* TODO[]: Implement start meeting either Schedule or Instant */}
                                <button  className="bg-purple-700! hover:bg-purple-800! text-white! font-semibold! rounded-2xl! px-4! py-4! mt-4! flex flex-row items-center gap-2! transition-all! duration-200
                                    md:px-4! md:py-4! md:mt-6! md:text-lg md:gap-4!
                                    lg:px-6! lg:py-3! lg:mt-8! lg:text-xl!
                                ">
                                    <Video className="w-4! h-4! text-white!
                                        sm:w-6! sm:h-6!
                                    " /> <span className="text-sm! font-medium
                                        sm:text-base! md:text-xl!
                                    ">Start Meeting</span>
                                </button>
                                <button  className="hidden! sm:flex! flex-row! hover:border-2! hover:border-purple-800! bg-white! text-black! font-semibold! rounded-2xl! px-4! py-4! mt-4!  items-center gap-2! transition-all! duration-200
                                    md:px-4! md:py-4! md:mt-6! md:text-lg md:gap-4!
                                    lg:px-6! lg:py-3! lg:mt-8! lg:text-xl!
                                ">
                                    <History className="w-4! h-4!
                                        sm:w-6! sm:h-6!
                                    " /> <span className="text-sm! font-medium
                                        sm:text-base! md:text-xl!
                                    ">View History</span>
                                </button>
                            </div>

                            {/* line break */}
                            <hr className="w-[100%] border-t border-gray-300 my-6" />

                            {/* section */}

                        </div>
                    </section>
                    <div className="hidden! p-8! bg-white! flex-1 lg:inline-block!">

                        {/* Meeting Action */}
                        <div className="flex flex-col bg-gradient-to-r from-blue-500! to-blue-600! min-w-full! px-4! py-6! rounded-4xl! shadow-lg! text-white! gap-3!
                            hover:shadow-xl! transition-all! duration-300!
                        ">
                            <Phone className="size-12! mb-2! bg-blue-300/50! p-3! rounded-2xl! fill-white!" />
                            <h3 className="text-2xl! font-bold">Start A Meeting</h3>
                            <p className="text-gray-200! mb-4!">Start a instant meeting or schedule one for later.</p>
                            {/* TODO[]: Implement Start Meeting either Schedule or Instant */}
                            <button className="bg-white! text-blue-700! rounded-2xl! px-4! py-2! hover:bg-blue-100!">Launch Now</button>
                        </div>
                    </div>
                </div>
            </main>

            <TeamMobileDropDown
                showMobileMenu={showMobileMenu}
                TeamID={teamID}
                Username={user?.username || ""}
                Email={user?.email || ""}
            />

        </div>
    );
}

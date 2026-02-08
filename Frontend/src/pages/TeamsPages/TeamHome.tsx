import { useState } from "react";
import { useParams } from "react-router-dom";
import { BookCheck,  Menu, Sparkle, UserPlus, Users, Video } from "lucide-react";

// Components
import { TeamSideBar } from "../../components/Teams/TeamSideBar";
import { TeamMobileDropDown } from "../../components/DropDowns/MobileDropDown";
import { CurrentlyActiveMeetingEmpty, CurrentActiveMeeting, ShowTasksEmpty, ShowReviewsEmpty, AsideMeetingAction, CreateMeetingModal, InviteMemberModal } from "../../components/Teams/TeamHomeComponents";
import { LoadingScreen } from "../../components/Loaders/LoadingScreenComponent";

// Hooks
import { useTeamById } from "../../hooks/teamHooks";
import { useCurrentUser } from "../../hooks/userHooks";
import { useLatestActiveMeetingWS } from "../../hooks/meetingHooks";

export function TeamHome() {
    const { teamID } = useParams<{ teamID: string }>();
    const { team, loading: teamLoading, error: teamError } = useTeamById(teamID || "");
    const { user, loading: userLoading, error: userError } = useCurrentUser();
    const { latestActiveMeeting, startMeeting } = useLatestActiveMeetingWS(teamID || "");

    const [showMobileMenu, setShowMobileMenu] = useState(false);
    const [ShowTasks, setShowTasks] = useState(false);
    const [ShowReviews, setShowReviews] = useState(false);
    const [showInviteMemberModal, setShowInviteMemberModal] = useState(false);

    const [showCreateMeetingModal, setShowCreateMeetingModal] = useState(false);

    const loading = userLoading && teamLoading;

    return (
        <div>
            <TeamSideBar TeamID={teamID} />
            <main className="bg-white! min-h-screen p-6! py-3! lg:ml-20! lg:py-6!">
                <div className="flex flex-row justify-between items-center mb-10!
                    sm:mb-14! lg:mb-16!
                ">
                    <div className="flex flex-col flex-1!">
                        <h1 className="text-lg! text-black! font-mono font-bold
                        sm:text-xl! lg:text-2xl!
                        ">{team?.title}</h1>
                        <p className="hidden! text-gray-500! text-sm!
                        sm:text-base! sm:inline-block! lg:text-lg!  max-w-md! lg:max-w-lg!
                        ">{ team?.description ? team.description : "Team Home Page - Manage your team workspace here." }</p>
                    </div>
                    {/* Invite Member */}

                    <div className="flex flex-row items-center px-3! py-2! gap-2! cursor-pointer! text-black! sm:border-2 sm:border-blue-500! sm:text-blue-500! font-bold! rounded-lg!
                        md:px-3! md:py-2! md:gap-2! hover:bg-blue-600! hover:text-white! transition-all! duration-200!
                    " onClick={() => setShowInviteMemberModal(true)}>
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

                {/* todo[]: Fetch Team Info For updating Hero Overview */}
                <div className="grid grid-cols-2 gap-4 lg:gap-8 md:grid-cols-4 min-w-full mb-10!">
                    {[
                        { label: "Total Members", value: team?.member_count, icon: <Users /> , iconColor: "text-orange-700!", borderColor: "border-black!", bgColor: "bg-white!" },
                        { label: "Pending Tasks", value: 0, icon: <BookCheck /> , iconColor: "text-green-600!", borderColor: "border-green-600!", bgColor: "bg-green-600/20!" },
                        { label: "Unreviewed Items", value: 0, icon: <Sparkle /> , iconColor: "text-purple-700!", borderColor: "border-purple-700!", bgColor: "bg-purple-700/20!" },
                        { label: "Upcoming Meetings", value: 0, icon: <Video /> , iconColor: "text-blue-700!", borderColor: "border-blue-700!", bgColor: "bg-blue-700/20!" },
                    ].map((stat, index) => (
                        <div
                            key={index}
                            className={`flex flex-col border-2 border-gray-300! rounded-2xl! p-3! md:p-6! md:py-4! lg:gap-4!
                                 transition-all! duration-300!
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

                        {/* Currently Active Meeting */}
                        {latestActiveMeeting ? <CurrentActiveMeeting activeMeeting={latestActiveMeeting} /> : <CurrentlyActiveMeetingEmpty onOpen={() => setShowCreateMeetingModal(true)} />  }

                        {/* line break */}
                        <hr className=" border-t border-gray-300 my-6" />

                        {/* Todo and Reviews */}
                        <div className="grid grid-cols-1 gap-6! sm:grid-cols-2!">
                            {/* Todo Section */}
                            {!ShowTasks && <ShowTasksEmpty />}
                            {/* Reviews Section */}
                            {!ShowReviews && <ShowReviewsEmpty />}
                        </div>
                    </section>

                    {/* Aside Bar */}
                    <aside className="hidden! p-8! bg-white! flex-1 lg:inline-block!">

                        {/* Meeting Action */}
                        <AsideMeetingAction onOpen={() => setShowCreateMeetingModal(true)} />
                    </aside>
                </div>
            </main>

            <TeamMobileDropDown
                showMobileMenu={showMobileMenu}
                TeamID={teamID}
                Username={user?.username || ""}
                Email={user?.email || ""}
            />

            {showCreateMeetingModal && <CreateMeetingModal onClose={() => {
                setShowCreateMeetingModal(false);
            } } teamID={teamID} onSubmit={startMeeting}/>}
            {showInviteMemberModal && <InviteMemberModal team={team} onClose={() => setShowInviteMemberModal(false)} />}
            {loading && <LoadingScreen message="Loading team information..." />}
        </div>
    );
}

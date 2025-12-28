import { AuthNav } from "../components/AuthNav";
import VideoCall from "../assets/videoCall.svg"
import GoogleIcon from "../assets/googleIcon.png";
import GithubIcon from "../assets/githubIcon.png";

export function Register() {
    return (
        <div>
            <AuthNav />
            <main className="bg-white min-h-screen flex flex-row justify-center! pb-20! pt-5!
                md:pt-5! md:text-left! md:items-center! lg:justify-around!
            ">
                {/* illustration */}
                <img src={VideoCall} alt="Video Call Illustration" className="hidden! md:block! size-[30rem]"/>
                {/* input content */}
                <div className="flex flex-col gap-4 w-full max-w-md px-4!
                    sm:mt-6 md:max-w-lg! md:px-6! lg:max-w-xl! lg:px-8!
                ">
                    <h2 className="text-black! font-extrabold text-3xl text-center mb-2!
                        sm:text-5xl! md:text-5xl!
                    ">Create Your Account</h2>
                    <p className="text-gray-500 text-xs mb-10 text-center opacity-80
                        sm:text-sm! md:text-base!
                    ">Join your team and start collaborating smarter today. Turn calls into actionable insights with AI-powered tools.</p>
                    {/* name */}
                    <div className="flex flex-col gap-2 ">
                        <label htmlFor="" className="text-black! font-bold text-base ml-5
                            sm:text-lg! md:text-xl!
                        ">Name</label>
                        <input type="text" className="rounded-md! px-2! text-black!
                            sm:p-3! md:p-4! text-sm! sm:text-base! md:text-lg!
                        " placeholder="Enter your name" id="name" />
                    </div>
                    {/* email */}
                    <div className="flex flex-col gap-2 ">
                        <label htmlFor="" className="text-black! font-bold text-base ml-5
                            sm:text-lg! md:text-xl!
                        ">Email</label>
                        <input type="email" className="rounded-md! px-2! text-black!
                            sm:p-3! md:p-4! text-sm! sm:text-base! md:text-lg!
                        " placeholder="Enter your email" id="email" />
                    </div>
                    {/* passwords */}
                    <div className="flex flex-row justify-between ">
                        {/* password */}
                        <div className="flex flex-col gap-2 ">
                            <label htmlFor="" className="text-black! font-bold text-base ml-5
                                sm:text-lg! md:text-xl!
                            ">Password</label>
                            <input type="text" className="rounded-md! px-2! text-black!
                                sm:p-3! md:p-4! text-sm! sm:text-base! md:text-lg!
                            " placeholder="*************" id="password" />
                        </div>
                        {/* confirm */}
                        <div className="flex flex-col gap-2">
                            <label htmlFor="" className="text-black! font-bold text-base ml-5
                                sm:text-lg! md:text-xl!
                            ">Confirm</label>
                            <input type="text" className="rounded-md! px-2! text-black!
                                sm:p-3! md:p-4! text-sm! sm:text-base! md:text-lg!
                            " placeholder="*************" id="confirmPassword" />
                        </div>

                    </div>

                    <button className="bg-purple-700 text-white font-semibold py-2 px-4 rounded-md
                        sm:text-base! md:text-lg!
                    ">Register</button>
                    <p className="text-gray-500 text-center text-sm opacity-80
                        md:text-base!
                    ">Or Register With</p>
                    <div className="flex flex-row justify-around mt-2!">
                        <div className="flex flex-row gap-2 hover:cursor-pointer! items-center text-center">
                            <img src={GoogleIcon} alt="Google Icon" className="w-6 h-6
                                md:w-8! md:h-8!
                            "/>
                            <span className="text-black! text-base!
                                sm:text-xl! md:text-2xl!
                            ">Google</span>
                        </div>
                        <div className="flex flex-row gap-2 hover:cursor-pointer! items-center text-center">
                            <img src={GithubIcon} alt="Github Icon" className="w-6 h-6
                                md:w-8! md:h-8!
                            "/>
                            <span className="text-black! text-base!
                                sm:text-xl! md:text-2xl!
                            ">Github</span>
                        </div>
                    </div>

                    <div className="">
                        <p className="text-gray-600! text-center! mt-2! sm:mt-6! text-sm!
                            sm:text-base! md:text-lg!
                        ">
                            Already have an account?{' '}
                            <a href="/login" className="ml-2 text-purple-700! font-semibold! hover:text-purple-900!">
                                Log In
                            </a>
                        </p>
                    </div>
                </div>
            </main>
        </div>
    );
}

import { Phone, Captions, Brain, Users, Search } from "lucide-react";
import { Link } from "react-router-dom";

import ReviewApprove from "../assets/Review_Approve.svg";
import CallingAmico from "../assets/Calling-amico.svg";
import LiveTranscript from "../assets/live_transcription.svg";
import AiSuggestion from "../assets/AI_suggestion.svg";
import UnAuthNav from "../components/unAuthNav";

export function Landing() {

    return (
      <div className="">
        <UnAuthNav />

        {/* Main section */}
        <div className="min-h-screen flex flex-col items-center bg-white!">
          {/* Hero section */}
          <h1
            className="text-black! text-lg! mt-8 font-bold
                md:text-4xl! md:mt-16
                lg:text-5xl! lg:mt-20"
          >
            Live Transcription <span className="text-purple-700">+</span> AI
            Summaries
          </h1>
          <Link to="/register" className="bg-slate-700 text-white! px-6! py-3! rounded-md! mt-6!
                hover:scale-110 transition-all! duration-300!
                md:text-lg! md:px-8! md:py-4! md:mt-10!
                lg:text-xl! lg:px-10! lg:py-5! lg:mt-12!
            ">
            Get Started
          </Link>

          {/* placeholder for image of landing page */}
          <div
            className="relative flex flex-col justify-center items-center gap-3 mt-10 min-w-screen
                    md:mt-16! md:gap-5 md:flex-row
                    lg:mt-20! lg:gap-7
                "
          >
            <div
              className="w-[12rem] h-[5rem] bg-gray-200! border-2 border-dashed border-gray-400! flex justify-center items-center shadow-xl shadow-gray-300!
                        md:w-[15rem]! md:h-[10rem]! md:rotate-[-5deg] md:mt-5!
                        lg:w-[25rem]! lg:h-[15rem]! lg:mt-10!
                    "
            >
              <span className="text-black!">
                Landing Page Image Placeholder
              </span>
            </div>
            <div
              className="w-[12rem] h-[5rem] bg-gray-200! border-2 border-dashed border-gray-400! flex justify-center items-center shadow-xl shadow-gray-300!
                        md:w-[15rem]! md:h-[10rem]!
                        lg:w-[25rem]! lg:h-[15rem]!
                    "
            >
              <span className="text-black!">
                Landing Page Image Placeholder
              </span>
            </div>
            <div
              className="w-[12rem] h-[5rem] bg-gray-200! border-2 border-dashed border-gray-400! flex justify-center items-center shadow-xl shadow-gray-300!
                        md:w-[15rem]! md:h-[10rem]! md:rotate-[5deg] md:mt-5!
                        lg:w-[25rem]! lg:h-[15rem]! lg:mt-10!
                    "
            >
              <span className="text-black!">
                Landing Page Image Placeholder
              </span>
            </div>
          </div>

          {/* Feature Section */}
          <h1
            className="mt-12 text-black! text-lg! px-10! py-5! font-bold text-center
                md:mt-28! md:text-3xl!
                lg:mt-32! lg:text-4xl!
                "
          >
            Powerful Features to Enhance Your Experience
          </h1>
          <p
            className="text-gray-500 text-xs! text-center px-10!
                md:text-lg! md:px-20!
                lg:text-xl! lg:px-40!
                "
          >
            From live audio transcription to AI-generated summaries, our
            platform offers a range of tools designed to improve your
            productivity and collaboration.
          </p>

          {/* display feature */}
          <div
            className="grid grid-cols-1 gap-6 mt-10 px-5
                    md:grid-cols-2! md:gap-8! md:px-20!
                    lg:grid-cols-3! lg:gap-10! lg:px-40!"
          >
            <div className=" border border-purple-700! rounded-lg! p-6! shadow-md! flex flex-col ! hover:scale-105! transition-transform! duration-300!">
              <Phone
                className="text-purple-700! mb-4! w-5! h-5!
                            md:w-6! md:h-6!
                            lg:w-8! lg:h-8!
                        "
              />
              <h2 className="text-black! font-semibold! text-lg! mb-2!">
                Live Transcription
              </h2>
              <p className="text-gray-500! text-sm!">
                Convert speech to text in real-time with high accuracy.
              </p>
            </div>
            <div className=" border border-green-700! rounded-lg! p-6! shadow-md! flex flex-col ! hover:scale-105! transition-transform! duration-300!">
              <Captions
                className="text-green-700! mb-4! w-5! h-5!
                            md:w-6! md:h-6!
                            lg:w-8! lg:h-8!
                        "
              />
              <h2 className="text-black! font-semibold! text-lg! mb-2!">
                Real-Time Transcription
              </h2>
              <p className="text-gray-500! text-sm!">
                Every word is transcribed as it is spoken, ensuring you never
                miss a detail.
              </p>
            </div>
            <div className=" border border-red-700! rounded-lg! p-6! shadow-md! flex flex-col ! hover:scale-105! transition-transform! duration-300!">
              <Brain
                className="text-red-700! mb-4! w-5! h-5!
                            md:w-6! md:h-6!
                            lg:w-8! lg:h-8!
                        "
              />
              <h2 className="text-black! font-semibold! text-lg! mb-2!">
                AI Summarization
              </h2>
              <p className="text-gray-500! text-sm!">
                Automatically generate concise summaries of your meetings to
                capture key points and action items.
              </p>
            </div>
            <div className=" border border-blue-700! rounded-lg! p-6! shadow-md! flex flex-col ! hover:scale-105! transition-transform! duration-300!">
              <Users
                className="text-blue-700! mb-4! w-5! h-5!
                            md:w-6! md:h-6!
                            lg:w-8! lg:h-8!
                        "
              />
              <h2 className="text-black! font-semibold! text-lg! mb-2!">
                Team Collaboration
              </h2>
              <p className="text-gray-500! text-sm!">
                Collaborate seamlessly with your team through shared notes,
                comments, and real-time updates.
              </p>
            </div>
            <div className=" border border-indigo-700! rounded-lg! p-6! shadow-md! flex flex-col ! hover:scale-105! transition-transform! duration-300!">
              <Search
                className="text-indigo-700! mb-4! w-5! h-5!
                            md:w-6! md:h-6!
                            lg:w-8! lg:h-8!
                        "
              />
              <h2 className="text-black! font-semibold! text-lg! mb-2!">
                Search Functionality
              </h2>
              <p className="text-gray-500! text-sm!">
                Quickly find specific information within your transcriptions and
                summaries using our powerful search tools.
              </p>
            </div>
          </div>

          <div
            className="flex flex-col md:flex-row items-center min-w-screen mt-20 mb-20 px-5 gap-10
                md:mt-48! md:px-16
            "
          >
            {/* Text Section */}
            <div className="md:w-1/4 flex flex-col justify-center">
              <h1 className="text-3xl! md:text-4xl! lg:text-5xl! font-bold text-black mb-4 pl-10 md:pl-2">
                See How It Works
              </h1>
              <p className="text-gray-600 text-sm! md:text-sm! lg:text-xl! pl-10 md:pl-2">
                Explore our intuitive interface and powerful features designed
                to enhance your productivity.
              </p>
            </div>
            {/* Placeholder for video/demo image */}
            <div
              className="grid grid-cols-1 w-2/3 gap-4
                md:grid-cols-2 md:w-3/4"
            >
              <div className="flex flex-col  border border-purple-700! rounded-lg! shadow-md! p-4! items-center">
                {/* from asset */}
                <div className="flex flex-col font-semibold! justify-center mt-4 gap-4 rounded-lg! shadow-md!">
                  <img
                    src={CallingAmico}
                    alt="Calling Illustration"
                    className="size-32 lg:size-40"
                  />
                  <div className="flex flex-row justify-between items-center gap-1">
                    <div className="flex text-purple-700! font-bold text-xl bg-purple-700/20 rounded-full p-2 w-10 h-10 items-center justify-center lg:text-2xl! lg:w-20 lg:h-auto">
                      1
                    </div>
                    i
                    <div className="text-black! text-lg! md:text-xl! lg:text-2xl! w-full">
                      Start a Call
                    </div>
                  </div>
                </div>
                <p className="text-gray-500! text-sm! mt-4 text-center md:text-base!">
                  Invite team members or friends and begin a call instantly—no
                  third-party tools needed.
                </p>
              </div>

              {/* section2  */}
              <div className="flex flex-col  border border-purple-700! rounded-lg! shadow-md! p-4! items-center">
                {/* from asset */}
                <div className="flex flex-col font-semibold! justify-center mt-4 gap-4 rounded-lg! shadow-md!">
                  <img
                    src={LiveTranscript}
                    alt="Live Transcription Illustration"
                    className="size-32 lg:size-40 "
                  />
                  <div className="flex flex-row justify-between items-center gap-1">
                    <div className="flex text-purple-700! font-bold text-xl bg-purple-700/20 rounded-full p-2 w-10 h-10 items-center justify-center lg:text-2xl! lg:w-20 lg:h-auto">
                      2
                    </div>
                    i
                    <div className="text-black! text-lg! md:text-xl! lg:text-2xl! w-full">
                      Live Transcription
                    </div>
                  </div>
                </div>
                <p className="text-gray-500! text-sm! mt-4 text-center md:text-base!">
                    Your conversations are transcribed in real time, so no one misses a detail.
                </p>
              </div>
              {/* section3  */}
              <div className="flex flex-col  border border-purple-700! rounded-lg! shadow-md! p-4! items-center">
                {/* from asset */}
                <div className="flex flex-col font-semibold! justify-center mt-4 gap-4 rounded-lg! shadow-md!">
                  <img
                    src={AiSuggestion}
                    alt="AI Suggestion Illustration"
                    className="size-32 lg:size-40 "
                  />
                  <div className="flex flex-row justify-between items-center gap-1">
                    <div className="flex text-purple-700! font-bold text-xl bg-purple-700/20 rounded-full p-2 w-10 h-10 items-center justify-center lg:text-2xl! lg:w-20 lg:h-auto">
                      3
                    </div>
                    i
                    <div className="text-black! text-lg! md:text-xl! lg:text-2xl! w-full">
                      AI Suggestion
                    </div>
                  </div>
                </div>
                <p className="text-gray-500! text-sm! mt-4 text-center md:text-base!">
                  After the meeting, get actionable AI suggestions like
                  assigning tasks or updating your calendar.
                </p>
              </div>

              {/* section4  */}
              <div className="flex flex-col  border border-purple-700! rounded-lg! shadow-md! p-4! items-center">
                {/* from asset */}
                <div className="flex flex-col font-semibold! justify-center mt-4 gap-4 rounded-lg! shadow-md!">
                  <img
                    src={ReviewApprove}
                    alt="Review & Approve Illustration"
                    className="size-32 lg:size-40 "
                  />
                  <div className="flex flex-row justify-between items-center gap-1">
                    <div className="flex text-purple-700! font-bold text-xl bg-purple-700/20 rounded-full p-2 w-10 h-10 items-center justify-center lg:text-2xl! lg:w-20 lg:h-auto">
                      4
                    </div>
                    i
                    <div className="text-black! text-lg! md:text-xl! lg:text-2xl! w-full">
                      Approve & Stay Organized
                    </div>
                  </div>
                </div>
                <p className="text-gray-500! text-sm! mt-4 text-center md:text-base!">
                    Quickly approve suggestions and keep your team aligned and on track.
                </p>
              </div>
            </div>
          </div>
        </div>

        <footer className="min-w-full">
            <div className="bg-gray-800! text-white! py-6! flex flex-col items-center!">
                <p className="text-sm!">
                    &copy; {new Date().getFullYear()} Collab. All rights reserved.
                </p>
            </div>
        </footer>
      </div>
    );
}

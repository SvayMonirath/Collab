import { Phone, Captions, Brain, Users, Search } from "lucide-react";
import { Link } from "react-router-dom";

import ReviewApprove from "../../assets/Review_Approve.svg";
import CallingAmico from "../../assets/Calling-amico.svg";
import LiveTranscript from "../../assets/live_transcription.svg";
import AiSuggestion from "../../assets/AI_suggestion.svg";
import UnAuthNav from "../../components/unAuthNav";

export function Landing() {
  const features = [
    {
      icon: <Phone className="text-purple-700! w-8 h-8" />,
      title: "Live Transcription",
      description: "Convert speech to text in real-time with high accuracy.",
    },
    {
      icon: <Captions className="text-green-500! w-8 h-8" />,
      title: "Real-Time Transcription",
      description:
        "Every word is transcribed as it is spoken, ensuring you never miss a detail.",
    },
    {
      icon: <Brain className="text-red-500! w-8 h-8" />,
      title: "AI Summarization",
      description:
        "Automatically generate concise summaries of your meetings to capture key points and action items.",
    },
    {
      icon: <Users className="text-blue-500! w-8 h-8" />,
      title: "Team Collaboration",
      description:
        "Collaborate seamlessly with your team through shared notes, comments, and real-time updates.",
    },
    {
      icon: <Search className="text-indigo-500! w-8 h-8" />,
      title: "Search Functionality",
      description:
        "Quickly find specific information within your transcriptions and summaries using our powerful search tools.",
    },
  ];

  const steps = [
    {
      id: 1,
      title: "Start a Call",
      description:
        "Invite team members or friends and begin a call instantly—no third-party tools needed.",
      img: CallingAmico,
      alt: "Calling Illustration",
    },
    {
      id: 2,
      title: "Live Transcription",
      description:
        "Your conversations are transcribed in real time, so no one misses a detail.",
      img: LiveTranscript,
      alt: "Live Transcription Illustration",
    },
    {
      id: 3,
      title: "AI Suggestion",
      description:
        "After the meeting, get actionable AI suggestions like assigning tasks or updating your calendar.",
      img: AiSuggestion,
      alt: "AI Suggestion Illustration",
    },
    {
      id: 4,
      title: "Approve & Stay Organized",
      description:
        "Quickly approve suggestions and keep your team aligned and on track.",
      img: ReviewApprove,
      alt: "Review & Approve Illustration",
    },
  ];

  return (
    <div className="relative overflow-hidden">
      <UnAuthNav />

      {/* Hero Section */}
      <section className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-white to-purple-50 px-6 text-center
        pt-32! sm:pt-0!
      ">
        <h1 className="text-3xl! md:text-6xl! lg:text-7xl! font-extrabold text-transparent bg-clip-text bg-black! leading-tight">
          Live Transcription <span className="text-purple-700">+</span> AI Summaries
        </h1>
        <p className="mt-6 text-gray-600! max-w-2xl text-base! md:text-lg! lg:text-xl!">
          Record meetings, get instant transcripts, and let AI extract decisions, tasks, and calendar events automatically.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 mt-8">
          <Link
            to="/register"
            className="px-6 py-3 bg-purple-700 text-white! rounded-lg font-semibold shadow-lg hover:scale-105 transition-transform! duration-300!"
          >
            Get Started
          </Link>
          <Link
            to=""
            className="px-6 py-3 border border-purple-700 text-purple-700! rounded-lg font-semibold hover:bg-purple-50! transition-colors! duration-300"
          >
            Learn More
          </Link>
        </div>

        {/* Hero Images */}
        <div className="flex flex-wrap justify-center gap-6 mt-12">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className={`w-56 h-36 md:w-72 md:h-48 lg:w-96 lg:h-60 bg-white shadow-2xl rounded-xl transform ${i === 1 ? "-rotate-3" : i === 3 ? "rotate-3" : ""} transition-transform duration-500 hover:scale-105 flex items-center justify-center`}
            >
              <span className="text-gray-400 font-semibold">Landing Page Image</span>
            </div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 bg-white">
        <h2 className="text-black! text-3xl! md:text-4xl! lg:text-5xl! font-bold text-center mb-4">
          Powerful Features
        </h2>
        <p className="text-gray-600! text-center max-w-3xl mx-auto mb-12">
          From live audio transcription to AI-generated summaries, our platform offers a range of tools designed to improve your productivity and collaboration.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, i) => (
            <div
              key={i}
              className="flex flex-col items-center text-center p-6 rounded-2xl bg-white/70! backdrop-blur-md shadow-lg hover:scale-105 transition-transform! duration-300!"
            >
              <div className="p-4 rounded-full bg-purple-100 mb-4">{feature.icon}</div>
              <h3 className="font-semibold text-xl mb-2 text-black!">{feature.title}</h3>
              <p className="text-gray-600!">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 px-6 bg-purple-50!">
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-12 items-center">
          <div className="lg:w-1/3">
            <h2 className="text-3xl! md:text-4xl! lg:text-5xl! font-bold mb-4 text-black">
              See How It Works
            </h2>
            <p className="text-gray-600! text-base! md:text-lg! lg:text-xl!">
              Explore our intuitive interface and powerful features designed to enhance your productivity.
            </p>
          </div>

          <div className="lg:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {steps.map((step) => (
              <div
                key={step.id}
                className="flex flex-col items-center text-center p-6 rounded-2xl bg-white hover:scale-105 transition-transform! duration-300!"
              >
                <img
                  src={step.img}
                  alt={step.alt}
                  className="w-32 h-32 md:w-36 md:h-36 lg:w-44 lg:h-44 mb-4"
                />
                <h3 className="font-semibold text-xl mb-2 text-black!">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900! text-white! py-8 flex flex-col items-center">
        <p className="text-sm">&copy; {new Date().getFullYear()} Collab. All rights reserved.</p>
      </footer>
    </div>
  );
}

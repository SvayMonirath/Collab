import React from "react";
import { useState } from "react";

interface CreateTeamModalProps {
    onClose: () => void;
    onCreate: (teamData: { title: string; description?: string }) => Promise<any>;
    loading: boolean;
}

interface JoinTeamModalProps {
    onClose: () => void;
    onJoin: (joinData: { team_code: string }) => Promise<any>;
    loading: boolean;
}

export const CreateTeamModal: React.FC<CreateTeamModalProps> = ({ onClose, onCreate, loading }) => {

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const result = await onCreate({ title, description });
        if (result) {
            setTitle("");
            setDescription("");
            onClose();
        }
    };

  return (
    <div className="fixed inset-0 z-[9999]! flex items-center justify-center
                    bg-gradient-to-br from-black/80 via-black/70 to-black/90!
                    backdrop-blur-3xl!">

      {/* Ambient Glows */}
      <div className="absolute -top-40! left-1/4!
                      w-[30rem]! h-[30rem]!
                      bg-blue-500/25!
                      blur-[150px]!
                      rounded-full!" />

      <div className="absolute bottom-0! right-0!
                      w-[24rem]! h-[24rem]!
                      bg-indigo-600/25!
                      blur-[130px]!
                      rounded-full!" />

      {/* Modal Card */}
      <div className="relative w-11/12! max-w-xl!
                      rounded-3xl!
                      bg-white/85! backdrop-blur-2xl!
                      border border-white/30!
                      shadow-[0_30px_90px_-25px_rgba(0,0,0,0.6)]!
                      px-10! py-12!
                      flex flex-col gap-8!">

        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5!
                    w-9! h-9!
                    rounded-full!
                    flex items-center justify-center!
                    bg-black/5!
                    text-gray-600!
                    hover:bg-black/10!
                    hover:text-black!
                    transition-all!"
        >
          ✕
        </button>

        {/* Header */}
        <div className="text-center flex flex-col gap-3!">
          <div className="mx-auto w-14! h-14! items-center justify-center!
                          rounded-2xl!
                          bg-gradient-to-br from-purple-600 to-indigo-600!
                          text-white!
                          flex items-center justify-center!
                          text-2xl! font-bold!">
            #
          </div>

          <h2 className="text-4xl! font-extrabold! tracking-tight! text-black!">
            Create a New Team
          </h2>

          <p className="text-gray-600! text-sm! max-w-md! mx-auto!">
            Give your team a name and short description.
            You can invite members right after.
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-6!"
        >
          {/* Team Name */}
          <div className="flex flex-col gap-2!">
            <label className="text-sm! font-semibold! text-gray-700!">
              Team Name
            </label>
            <input
              type="text"
              placeholder="e.g. Product Engineering"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full!
                        rounded-2xl!
                        px-5! py-4!
                        bg-white!
                        text-black! text-lg!
                        border border-gray-300!
                        focus:outline-none!
                        focus:ring-2! focus:ring-purple-600!
                        focus:border-purple-600!
                        transition-all!"
            />
          </div>

          {/* Description */}
          <div className="flex flex-col gap-2!">
            <label className="text-sm! font-semibold! text-gray-700!">
              Description <span className="text-gray-400!">(optional)</span>
            </label>
            <textarea
              placeholder="What does this team work on?"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              className="w-full!
                        rounded-2xl!
                        px-5! py-4!
                        bg-white!
                        text-black!
                        border border-gray-300!
                        resize-none!
                        focus:outline-none!
                        focus:ring-2! focus:ring-purple-600!
                        focus:border-purple-600!
                        transition-all!"
            />
          </div>

          {/* Actions */}
          <div className="flex gap-4! mt-4!">
            <button
              type="button"
              onClick={onClose}
              className="flex-1!
                        py-3!
                        rounded-2xl!
                        bg-gray-100!
                        text-gray-700! font-semibold!
                        hover:bg-gray-200!
                        transition-all!"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="flex-1!
                        py-3!
                        rounded-2xl!
                        bg-gradient-to-r from-purple-600 to-indigo-600!
                        text-white! font-semibold!
                        shadow-lg!
                        hover:shadow-blue-600/40!
                        hover:scale-[1.03]!
                        active:scale-[0.97]!
                        transition-all!"
            >
              {loading ? "Creating Team..." : "Create Team"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );

}

export const JoinTeamModal: React.FC<JoinTeamModalProps> = ({ onClose, onJoin, loading }) => {

    const [teamCode, setTeamCode] = useState("");
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const result = await onJoin({ team_code: teamCode });
        if (result) {
            setTeamCode("");
            onClose();
        }
    };

  return (
    <div
      className="fixed inset-0 z-[9999]! flex items-center justify-center
                    bg-gradient-to-br from-black/80 via-black/70 to-black/90!
                    backdrop-blur-3xl!"
    >
      {/* Ambient Glows */}
      <div
        className="absolute -top-32! -left-32!
                      w-[28rem]! h-[28rem]!
                      bg-purple-600/30!
                      blur-[140px]!
                      rounded-full!"
      />

      <div
        className="absolute bottom-0! right-0!
                      w-[22rem]! h-[22rem]!
                      bg-indigo-500/30!
                      blur-[120px]!
                      rounded-full!"
      />

      {/* Modal Card */}
      <div
        className="relative w-11/12! max-w-lg!
                      rounded-3xl!
                      bg-white/80! backdrop-blur-2xl!
                      border border-white/30!
                      shadow-[0_25px_80px_-20px_rgba(0,0,0,0.5)]!
                      px-10! py-12!
                      flex flex-col gap-8!"
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5!
                    w-9! h-9!
                    rounded-full!
                    flex items-center justify-center!
                    bg-black/5!
                    text-gray-600!
                    hover:bg-black/10!
                    hover:text-black!
                    transition-all!"
        >
          ✕
        </button>

        {/* Header */}
        <div className="text-center flex flex-col gap-3!">
          <div
            className="mx-auto w-12! h-12!
                          rounded-xl!
                          bg-gradient-to-br from-purple-600 to-indigo-600!
                          text-white!
                          flex items-center justify-center!
                          text-xl! font-bold!"
          >
            #
          </div>

          <h2 className="text-4xl! font-extrabold! tracking-tight! text-black!">
            Join Your Team
          </h2>

          <p className="text-gray-600! text-sm! max-w-sm! mx-auto!">
            Paste the invite code you received to instantly join your workspace
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-6!">
          {/* Input Wrapper */}
          <div className="relative">
            <input
              type="text"
              placeholder="TEAM-CODE"
              value={teamCode}
              onChange={(e) => setTeamCode(e.target.value.toUpperCase())}
              className="w-full!
                        rounded-2xl!
                        px-5! py-4!
                        bg-white!
                        text-black! text-lg! tracking-widest!
                        text-center!
                        border border-gray-300!
                        focus:outline-none!
                        focus:ring-2! focus:ring-purple-600!
                        focus:border-purple-600!
                        transition-all!"
            />
            <span
              className="absolute -bottom-5! left-1/2! -translate-x-1/2!
                            text-xs! text-gray-400!"
            >
              Case-insensitive
            </span>
          </div>

          {/* CTA */}
          <button
            type="submit"
            disabled={loading}
            className="relative w-full!
                      py-4!
                      rounded-2xl!
                      bg-gradient-to-r from-purple-600 to-indigo-600!
                      text-white! text-lg! font-semibold!
                      shadow-lg!
                      hover:shadow-purple-600/40!
                      hover:scale-[1.03]!
                      active:scale-[0.97]!
                      transition-all!"
          >
            {loading ? "Joining Team..." : "Join Team"}
          </button>
        </form>
      </div>
    </div>
  );
}

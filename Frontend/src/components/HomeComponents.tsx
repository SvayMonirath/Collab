import React from "react";
import { useState } from "react";

import { PopUpMessage } from "./popUpMessage";

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
      <div className="fixed inset-0 backdrop-blur-3xl bg-opacity-50 flex justify-center items-center z-50">
        <div className="bg-white! rounded-lg! h-2/3 w-11/12! md:w-2/3! lg:w-1/2! p-6! border border-black shadow-lg!">
          <h2 className="text-2xl! font-bold! mb-4! text-black!">
            Create New Team
          </h2>
          <form
            className="flex flex-col space-y-4! text-black!"
            onSubmit={handleSubmit}
          >
            <input
              type="text"
              placeholder="Team Name"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="border! border-gray-300! rounded-md! p-2! focus:outline-none! focus:ring-2! focus:ring-blue-500!"
            />
            <textarea
              placeholder="Team Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="border! border-gray-300! rounded-md! p-2! h-24! focus:outline-none! focus:ring-2! focus:ring-blue-500!"
            ></textarea>
            <div className="flex justify-end! space-x-4!">
              <button
                onClick={onClose}
                type="button"
                className="px-4! py-2! bg-gray-300! rounded-md! hover:bg-gray-400! transition-colors! duration-200!"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-4! py-2! bg-blue-600! text-white! rounded-md! hover:bg-blue-700! transition-colors! duration-200!"
              >
                {loading ? "Creating..." : "Create Team"}
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
      <div className="fixed inset-0 backdrop-blur-3xl bg-opacity-50 flex justify-center items-center z-50">
        <div className="relative bg-white! rounded-lg! flex flex-col justify-center items-center h-2/3 w-11/12! md:w-2/3! lg:w-1/2! p-6! border border-black shadow-lg!">
          <button className="absolute top-2 right-2" onClick={onClose}>X</button>
          <h2 className="text-2xl! font-bold! mb-4! text-black!">
            Join Team
          </h2>
            <form className="flex flex-col space-y-4! text-black! w-1/2" onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Enter Team Code"
                className="border! border-gray-300! rounded-md! p-2! focus:outline-none! focus:ring-2! focus:ring-blue-500! w-full"
                value={teamCode}
                onChange={(e) => setTeamCode(e.target.value)}
              />
                <button
                    type="submit"
                    disabled={loading}
                    className="px-4! py-2! bg-blue-600! text-white! rounded-md! hover:bg-blue-700! transition-colors! duration-200!"
                >
                    Join Team
                </button>
            </form>
        </div>
      </div>
    );
}

import React from "react";

export const PopUpMessage: React.FC<{ message: string, error: string }> = ({ message, error }) => {
    return (
        // if error show red if message show green
        <div className="fixed top-10 left-0 w-full flex justify-center p-4 z-[9999] sm:top-20!">
        {error ? (
            <div
            className="flex items-center gap-3 max-w-md w-full bg-red-700/20 border border-red-900/50 backdrop-blur-lg px-6 py-4 rounded-2xl text-red-800 text-center transform transition-all duration-500 ease-out translate-y-0 opacity-100"
            role="alert"
            >
            {/* Error icon */}
            <svg
                className="w-6 h-6 flex-shrink-0"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
            >
                <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
                />
            </svg>

            {/* Message text */}
            <span className="flex-1 text-black!">{error}</span>
            </div>
        ) : (
            <div
            className="flex items-center gap-3 max-w-md w-full bg-green-500/20 border border-green-600/50 backdrop-blur-lg px-6 py-4 rounded-2xl text-green-800 text-center transform transition-all duration-500 ease-out translate-y-0 opacity-100"
            role="alert"
            >
            {/* Success icon */}
            <svg
                className="w-6 h-6 flex-shrink-0"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
            >
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>

            {/* Message text */}
            <span className="flex-1 text-black!">{message}</span>
            </div>
        )}
        </div>
    );
};

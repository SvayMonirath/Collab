import React from "react";

interface LoadingScreenProps {
    message?: string;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ message = "Loading..." }) => {
    return (
        <div className="fixed inset-0 flex! flex-col! justify-center! items-center! bg-white! z-[1000]!">
            <div className="w-12 h-12 border-4! border-blue-500! border-t-transparent! rounded-full! animate-spin!"></div>
            {message && (
                <p className="mt-4 text-gray-600 text-sm font-light">{message}</p>
            )}
        </div>
    );
}

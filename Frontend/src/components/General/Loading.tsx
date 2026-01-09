export const Loading: React.FC<{ message?: string }> = ({ message }) => {
    return (
        <div className="fixed inset-0 z-[9999]! flex items-center justify-center backdrop-blur-md! bg-black/50!">
            <div className="bg-white/90! backdrop-blur-lg! rounded-lg! p-6! flex flex-col items-center gap-4! shadow-lg!">
                <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-16 w-16"></div>
                {message && <div className="text-gray-800 font-medium!">{message}</div>}
            </div>
        </div>
    );
}

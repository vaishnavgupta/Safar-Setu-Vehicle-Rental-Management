import React from 'react';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';

const Shimmer = ({ className = '' }) => (
    <div
        className={`bg-gray-200 rounded-lg ${className}`}
        style={{ animation: 'shimmer 1.5s ease-in-out infinite', backgroundSize: '200% 100%' }}
    />
);

const LoadingSkeleton = () => {
    return (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-xl shadow-indigo-100/50 overflow-hidden">
            <div className="h-1.5 w-full bg-gradient-to-r from-indigo-300 via-purple-300 to-blue-300" />
            <div className="p-6">
                {/* Pulsing icon */}
                <div className="flex items-center justify-center mb-6">
                    <div
                        className="w-16 h-16 rounded-full bg-indigo-100 flex items-center justify-center"
                        style={{ animation: 'pulse-glow 1.2s ease-in-out infinite' }}
                    >
                        <AutoAwesomeIcon className="text-indigo-500" style={{ fontSize: 28 }} />
                    </div>
                </div>

                <p className="text-center text-sm font-semibold text-indigo-500 mb-6 tracking-wide">
                    Analysing your trip details...
                </p>

                <Shimmer className="h-5 w-2/3 mb-3" />
                <Shimmer className="h-16 w-full mb-4" />
                <Shimmer className="h-10 w-full mb-3" />
                <Shimmer className="h-14 w-full mb-4" />
                <div className="flex gap-2">
                    <Shimmer className="h-7 w-20" />
                    <Shimmer className="h-7 w-24" />
                    <Shimmer className="h-7 w-16" />
                </div>
            </div>

            <style>{`
        @keyframes shimmer {
          0% { background-color: #e5e7eb; }
          50% { background-color: #f3f4f6; }
          100% { background-color: #e5e7eb; }
        }
        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 0 0 rgba(99, 102, 241, 0.3); }
          50% { box-shadow: 0 0 0 12px rgba(99, 102, 241, 0); }
        }
      `}</style>
        </div>
    );
};

export default LoadingSkeleton;
import React from 'react';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';

const SaathiHero = () => {
    return (
        <div className="relative overflow-hidden bg-gradient-to-br from-indigo-50 via-white to-blue-50 py-14 px-6 text-center">
            {/* Decorative blobs */}
            <div className="absolute top-0 left-1/4 w-72 h-72 bg-indigo-100 rounded-full blur-3xl opacity-50 -translate-y-1/2 pointer-events-none" />
            <div className="absolute bottom-0 right-1/4 w-56 h-56 bg-blue-100 rounded-full blur-3xl opacity-40 translate-y-1/2 pointer-events-none" />

            <div className="relative z-10 max-w-2xl mx-auto">
                {/* Badge */}
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-100 border border-indigo-200 text-indigo-700 text-xs font-semibold tracking-widest uppercase mb-6">
                    <AutoAwesomeIcon style={{ fontSize: 14 }} />
                    Saathi AI · Powered by SafarSetu
                </div>

                {/* Heading */}
                <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight tracking-tight mb-4">
                    Your Gateway to a{' '}
                    <span className="text-indigo-600">Premium Experience.</span>
                </h1>

                <p className="text-gray-500 text-base md:text-lg leading-relaxed max-w-xl mx-auto">
                    Tell Saathi about your journey — distance, passengers, budget — and it will instantly match you with the perfect vehicle.
                </p>

                {/* Animated dots row */}
                <div className="flex justify-center gap-2 mt-8">
                    {[0, 1, 2, 3, 4].map((i) => (
                        <div
                            key={i}
                            className="w-2 h-2 rounded-full bg-indigo-400"
                            style={{ animation: `bounce 1.2s ease-in-out ${i * 0.15}s infinite` }}
                        />
                    ))}
                </div>
            </div>

            <style>{`
        @keyframes bounce {
          0%, 100% { transform: translateY(0); opacity: 0.4; }
          50% { transform: translateY(-6px); opacity: 1; }
        }
      `}</style>
        </div>
    );
};

export default SaathiHero;

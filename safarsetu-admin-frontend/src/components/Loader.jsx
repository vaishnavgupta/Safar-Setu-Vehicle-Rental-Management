import React from 'react';
import CarLoader from '../assets/animations/car_loader.json'
import Lottie from "lottie-react";

const Loader = ({ text = "Getting things ready..." }) => {
    return (
        <div className="flex flex-col items-center justify-center p-6 bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl border border-indigo-50 w-64 mx-auto transition-all duration-500">

            <div className="w-32 h-32 flex items-center justify-center overflow-hidden">
                <Lottie
                    animationData={CarLoader}
                    loop={true}
                    style={{ width: '100%', height: '100%' }}
                />
            </div>

            <div className="mt-2 flex flex-col items-center gap-2">
                <p className="text-[10px] font-black tracking-[0.3em] text-indigo-400 uppercase">
                    Please Wait
                </p>
                <p className="text-sm text-center justify-center font-bold tracking-widest text-indigo-900 italic animate-pulse">
                    {text}
                </p>
            </div>

            {/* Decorative Progress Bar (Static or CSS Animated) */}
            <div className="w-full h-1 bg-indigo-50 rounded-full mt-4 overflow-hidden">
                <div className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 w-1/2 animate-shimmer"
                     style={{ animation: 'shimmer 1.5s infinite linear' }}>
                </div>
            </div>

            <style jsx>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(200%); }
        }
      `}</style>
        </div>
    );
};

export default Loader;

import React from 'react';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import {useNavigate} from "react-router";

const SaathiBanner = () => {
    const navigate = useNavigate();

    return (
        <div className="mx-4 my-6 md:mx-0 rounded-2xl overflow-hidden bg-gradient-to-r from-indigo-600 to-violet-600 p-px shadow-lg shadow-indigo-200">
            <div className="rounded-2xl bg-gradient-to-r from-indigo-50 via-white to-violet-50 px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-4">

                {/* Left */}
                <div className="flex items-center gap-4">
                    <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-indigo-600 to-violet-600 flex items-center justify-center shadow-md flex-shrink-0">
                        <AutoAwesomeIcon style={{ color: '#fff', fontSize: 22 }} />
                    </div>
                    <div>
                        <div className="flex items-center gap-2 mb-0.5">
              <span className="text-base font-extrabold text-gray-900">
                Saathi AI
              </span>
                            <span className="text-[10px] font-bold text-indigo-600 bg-indigo-100 rounded-full px-2 py-0.5 uppercase tracking-wider">
                New
              </span>
                        </div>
                        <p className="text-sm text-gray-500">
                            Tell us your trip — we'll find your perfect vehicle instantly.
                        </p>
                    </div>
                </div>

                {/* Right */}
                <button
                    onClick={() => navigate('/saathi-ai')}
                    className="flex-shrink-0 cursor-pointer flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-bold shadow-md transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0"
                >
                    Try Saathi AI
                    <ArrowForwardIcon style={{ fontSize: 16 }} />
                </button>

            </div>
        </div>
    );
};

export default SaathiBanner;
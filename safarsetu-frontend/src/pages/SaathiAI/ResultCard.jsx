import React from 'react';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import EmojiTransportationIcon from '@mui/icons-material/EmojiTransportation';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import MatchMeter from './MatchMeter';
import {useNavigate} from "react-router";

const ChipTag = ({ children, color = 'indigo' }) => {

    const styles = {
        indigo: 'bg-indigo-100 text-indigo-700 border-indigo-200',
        green: 'bg-green-100 text-green-700 border-green-200',
        amber: 'bg-amber-100 text-amber-700 border-amber-200',
        blue: 'bg-blue-100 text-blue-700 border-blue-200',
    };

    return (
        <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold border ${styles[color]}`}>
      {children}
    </span>
    );
};

const getRandomValue = () => {
    return Math.floor(Math.random() * (100 - 70 + 1)) + 70
}

const ResultCard = ({ result, formData }) => {
    const navigate = useNavigate();

    const summaryChips = [
        { label: `${formData.distanceKm} km`, icon: '📍' },
        { label: `${formData.durationDays} day(s)`, icon: '📅' },
        { label: `${formData.passengers} passengers`, icon: '👥' },
        { label: formData.tripType, icon: '🗺️' },
        ...(formData.luggageRequired ? [{ label: 'Luggage', icon: '🧳' }] : []),
    ];

    return (
        <div
            className="bg-white rounded-2xl border border-gray-100 shadow-xl shadow-indigo-100/50 overflow-hidden"
            style={{ animation: 'fadeUp 0.5s ease forwards' }}
        >
            {/* Top gradient bar */}
            <div className="h-1.5 w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-blue-500" />

            <div className="p-6">
                {/* Header */}
                <div className="flex items-start justify-between mb-6">
                    <div>
                        <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-1">
                            Saathi Recommends
                        </p>
                        <h3 className="text-xl font-extrabold text-gray-900 tracking-tight">Your Perfect Ride</h3>
                    </div>
                    <MatchMeter value={result.matchPercentage ? result.matchPercentage : getRandomValue()} />
                </div>

                {/* Primary vehicle card */}
                <div className="rounded-xl bg-gradient-to-br from-indigo-50 to-blue-50 border border-indigo-100 p-5 mb-4">
                    <div className="flex items-start justify-between gap-3">
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-xl bg-indigo-600 flex items-center justify-center shadow-md shadow-indigo-200 flex-shrink-0">
                                <DirectionsCarIcon style={{ color: '#fff', fontSize: 24 }} />
                            </div>
                            <div>
                                <ChipTag color="indigo">
                                    <CheckCircleIcon style={{ fontSize: 12 }} /> Top Pick
                                </ChipTag>
                                <p className="text-lg font-extrabold text-gray-900 mt-1 leading-tight">
                                    {result.recommendedVehicle}
                                </p>
                            </div>
                        </div>
                    </div>

                    <p className="text-sm text-gray-600 leading-relaxed mt-3 pl-0">
                        {result.reason}
                    </p>

                    {/* Cost + CTA */}
                    <div className="flex items-center justify-between mt-4 pt-4 border-t border-indigo-100 gap-4 cursor-pointer"
                         onClick={() => navigate('/login')}
                    >
                        <div>
                            <p className="text-xs text-gray-400 font-medium uppercase tracking-widest">Estimated Cost</p>
                            <p className="text-xl font-extrabold text-green-600 flex items-center gap-0.5 mt-0.5">
                                <CurrencyRupeeIcon style={{ fontSize: 20 }} />
                                {result.estimatedCost.replace(' INR', '')}
                            </p>
                        </div>
                        <button className="flex items-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-bold rounded-xl shadow-md shadow-indigo-200 transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0">
                            {result.callToAction}
                            <ArrowForwardIcon style={{ fontSize: 16 }} />
                        </button>
                    </div>
                </div>

                {/* Alternative vehicle */}
                <div className="rounded-xl bg-amber-50 border border-amber-100 p-4 flex items-center justify-between mb-5">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-amber-400 flex items-center justify-center">
                            <EmojiTransportationIcon style={{ color: '#fff', fontSize: 20 }} />
                        </div>
                        <div>
                            <ChipTag color="amber">
                                <InfoOutlinedIcon style={{ fontSize: 12 }} /> Alternative
                            </ChipTag>
                            <p className="text-base font-bold text-gray-800 mt-1">{result.alternativeVehicle}</p>
                            <p className="text-xs text-gray-400 mt-0.5">Budget-friendly option</p>
                        </div>
                    </div>
                    <button onClick={() => navigate('/login')}  className="px-4 py-2 rounded-lg border border-amber-200 bg-white text-amber-700 text-xs font-semibold hover:bg-amber-50 transition-all">
                        View →
                    </button>
                </div>

                {/* Summary chips */}
                <div className="flex flex-wrap gap-2">
                    {summaryChips.map((chip) => (
                        <span
                            key={chip.label}
                            className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-gray-100 border border-gray-200 text-xs text-gray-500 font-medium"
                        >
              {chip.icon} {chip.label}
            </span>
                    ))}
                </div>
            </div>

            <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
        </div>
    );
};

export default ResultCard;
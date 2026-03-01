import React from 'react';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import SpeedIcon from '@mui/icons-material/Speed';
import TerrainIcon from '@mui/icons-material/Terrain';
import FlightIcon from '@mui/icons-material/Flight';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import BeachAccessIcon from '@mui/icons-material/BeachAccess';

export const TRIP_TYPES = [
    { value: 'CITY', label: 'City', icon: <LocationCityIcon style={{ fontSize: 16 }} /> },
    { value: 'HIGHWAY', label: 'Highway', icon: <SpeedIcon style={{ fontSize: 16 }} /> },
    { value: 'WEEKEND', label: 'Weekend', icon: <TerrainIcon style={{ fontSize: 16 }} /> },
];

const TripTypeSelector = ({ value, onChange }) => {
    return (
        <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-widest mb-2">
                Trip Type
            </label>
            <div className="flex flex-wrap gap-2">
                {TRIP_TYPES.map((t) => {
                    const active = value === t.value;
                    return (
                        <button
                            key={t.value}
                            type="button"
                            onClick={() => onChange(t.value)}
                            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl border text-sm font-medium transition-all duration-200 cursor-pointer
                ${active
                                ? 'bg-indigo-600 border-indigo-600 text-white shadow-md shadow-indigo-200'
                                : 'bg-white border-gray-200 text-gray-600 hover:border-indigo-400 hover:text-indigo-600 hover:bg-indigo-50'
                            }`}
                        >
                            {t.icon}
                            {t.label}
                        </button>
                    );
                })}
            </div>
        </div>
    );
};

export default TripTypeSelector;
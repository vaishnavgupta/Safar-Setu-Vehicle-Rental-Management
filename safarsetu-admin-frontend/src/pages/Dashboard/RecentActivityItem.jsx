import React from 'react';
import ActivityTypeBadge from "./ActivityTypeBadge.jsx";
import { Chip } from "@mui/material";

const RecentActivityItem = ({ type, description, time }) => {
    return (
        <div className="flex items-center justify-between gap-4 px-5 py-3 rounded-xl hover:bg-gray-50 transition-all duration-200 border-b border-gray-100 last:border-0">

            <ActivityTypeBadge type={type} />

            <div className="flex flex-col flex-1 min-w-0 text-center">
                <h3 className="text-sm font-semibold text-gray-800 truncate">{description}</h3>
                <p className="text-xs text-gray-400 mt-0.5">{time}</p>
            </div>

            <Chip
                variant="filled"
                label={type}
                size="small"
                sx={{
                    fontWeight: 600,
                    fontSize: '0.7rem',
                    borderRadius: '8px',
                }}
            />

        </div>
    );
};

export default RecentActivityItem;
import React from 'react';
import { Box, Typography, Avatar } from '@mui/material';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';

const StatsCard = ({ title, value, subtitle, trend, icon: Icon, bgClass, trendClass }) => {
    return (
        <Box
            className={`bg-gradient-to-br ${bgClass} rounded-2xl p-5 flex flex-col justify-between min-w-[200px] flex-1 `}
            sx={{ color: 'white', minHeight: 160, boxShadow: '0 8px 32px rgba(0,0,0,0.18)' }}
        >
            {/* Top Row */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <Typography variant="caption" sx={{ fontWeight: 600, opacity: 0.9, textTransform: 'uppercase', letterSpacing: 1 }}>
                    {title}
                </Typography>
                <Avatar className="p-6 rounded-full bg-white backdrop-blur-xl" sx={{ width: 44, height: 44 }}>
                    <Icon sx={{ color: 'white', fontSize: 24 }} />
                </Avatar>
            </Box>

            {/* Value */}
            <Box sx={{ mt: 1 }}>
                <Typography variant="h4" sx={{ fontWeight: 700, lineHeight: 1.1 }}>
                    {value}
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.85, mt: 0.5 }}>
                    {subtitle}
                </Typography>
            </Box>

            {/* Trend */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mt: 2 }}>
                <TrendingUpIcon className={trendClass} sx={{ fontSize: 18 }} />
                <Typography variant="caption" className={trendClass} sx={{ fontWeight: 500 }}>
                    {trend}
                </Typography>
            </Box>
        </Box>
    );
};

export default StatsCard;
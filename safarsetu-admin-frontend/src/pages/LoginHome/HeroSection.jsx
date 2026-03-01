import React from 'react';
import CarRentalIcon from '@mui/icons-material/CarRental';
import ShieldIcon from '@mui/icons-material/Shield';
import SpeedIcon from '@mui/icons-material/Speed';
import GroupsIcon from '@mui/icons-material/Groups';

const HeroSection = () => {
    return (
        <div className="relative flex flex-col items-center justify-center text-center px-6 py-20 overflow-hidden">
            {/* Background decorative circles */}
            <div className="absolute top-[-80px] left-[-80px] w-72 h-72 rounded-full opacity-10"
                 style={{ background: 'radial-gradient(circle, #ef4444, transparent)' }} />
            <div className="absolute bottom-[-60px] right-[-60px] w-56 h-56 rounded-full opacity-10"
                 style={{ background: 'radial-gradient(circle, #ef4444, transparent)' }} />

            {/* Logo Badge */}
            <div className="flex items-center gap-3 mb-6">
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg"
                     style={{ background: 'linear-gradient(135deg, #c0392b, #8b0000)' }}>
                    <CarRentalIcon style={{ color: 'white', fontSize: 30 }} />
                </div>
                <div className="text-left">
                    <h1 className="text-3xl font-black tracking-tight" style={{ color: '#1a0505', fontFamily: "'Georgia', serif" }}>
                        Safar<span style={{ color: '#c0392b' }}> Setu</span>
                    </h1>
                    <p className="text-xs font-semibold tracking-widest uppercase" style={{ color: '#9b2222' }}>Admin Portal</p>
                </div>
            </div>

            {/* Headline */}
            <h2 className="text-4xl md:text-5xl font-black mb-4 leading-tight max-w-2xl"
                style={{ color: '#1a0505', fontFamily: "'Georgia', serif" }}>
                Manage Your Fleet,<br />
                <span style={{ color: '#c0392b' }}>Drive the Business.</span>
            </h2>
            <p className="text-gray-500 text-lg max-w-xl mb-10">
                The central command for vehicles, rentals, reservations, and everything in between.
            </p>

            {/* Stats row */}
            <div className="flex flex-wrap justify-center gap-6">
                {[
                    { icon: <SpeedIcon fontSize="small" />, label: 'Real-time Tracking' },
                    { icon: <GroupsIcon fontSize="small" />, label: 'User Management' },
                    { icon: <ShieldIcon fontSize="small" />, label: 'Secure Access' },
                ].map((item, i) => (
                    <div key={i} className="flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-medium"
                         style={{ borderColor: '#f5c6c6', color: '#9b2222', background: '#fff5f5' }}>
                        <span style={{ color: '#c0392b' }}>{item.icon}</span>
                        {item.label}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default HeroSection;
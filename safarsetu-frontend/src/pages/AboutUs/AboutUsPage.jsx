import React from 'react';
import { Avatar, Chip } from "@mui/material";
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import LanguageIcon from '@mui/icons-material/Language';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import SubscriptionsIcon from '@mui/icons-material/Subscriptions';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import PaymentIcon from '@mui/icons-material/Payment';
import SecurityIcon from '@mui/icons-material/Security';
import SmartToyIcon from '@mui/icons-material/SmartToy';



const techStack = [
    { label: "Spring Boot",   color: "#6db33f", bg: "#f0fdf4" },
    { label: "React",         color: "#0ea5e9", bg: "#f0f9ff" },
    { label: "MySQL",         color: "#f97316", bg: "#fff7ed" },
    { label: "Material UI",   color: "#007fff", bg: "#eff6ff" },
    { label: "Tailwind CSS",  color: "#06b6d4", bg: "#ecfeff" },
    { label: "Razorpay",      color: "#2d6ef7", bg: "#eef2ff" },
    { label: "JWT Auth",      color: "#8b5cf6", bg: "#f5f3ff" },
    { label: "Hibernate",     color: "#59666c", bg: "#f8fafc" },
];

const features = [
    { icon: <DirectionsCarIcon sx={{ fontSize: 28 }} />, title: "Fleet Management",     desc: "Full vehicle CRUD with category management, availability tracking, and image support.",         color: "#4f46e5", bg: "#eef2ff" },
    { icon: <SubscriptionsIcon sx={{ fontSize: 28 }} />, title: "Smart Subscriptions",  desc: "Tiered subscription plans with Razorpay payment gateway and automatic status management.",      color: "#0891b2", bg: "#ecfeff" },
    { icon: <BookmarkIcon sx={{ fontSize: 28 }} />,      title: "Reservations Queue",   desc: "Priority-based vehicle reservation system with automatic notifications and expiry handling.",    color: "#7c3aed", bg: "#f5f3ff" },
    { icon: <PaymentIcon sx={{ fontSize: 28 }} />,       title: "Payment Integration",  desc: "End-to-end Razorpay integration with payment verification, status tracking, and fine handling.", color: "#059669", bg: "#f0fdf4" },
    { icon: <SecurityIcon sx={{ fontSize: 28 }} />,      title: "Secure Auth",          desc: "JWT-based authentication with Google & GitHub OAuth2, role-based access control.",              color: "#dc2626", bg: "#fef2f2" },
    { icon: <SmartToyIcon sx={{ fontSize: 28 }} />,      title: "Saathi AI",            desc: "Integrated AI assistant to help users navigate rentals, subscriptions, and support queries.",    color: "#d97706", bg: "#fffbeb" },
];

const socialLinks = [
    { icon: <GitHubIcon fontSize="small" />,   label: "GitHub",    href: "https://github.com/vaishnavgupta",         color: "#24292e", bg: "#f6f8fa", border: "#d1d5db" },
    { icon: <LinkedInIcon fontSize="small" />, label: "LinkedIn",  href: "https://linkedin.com/in/vaishnavgupta",    color: "#0077b5", bg: "#e8f4fb", border: "#bfdbfe" },
    { icon: <LanguageIcon fontSize="small" />, label: "Portfolio", href: "https://vaishnav-gupta-portfolio.vercel.app/",                color: "#4f46e5", bg: "#eef2ff", border: "#c7d2fe" },
];



const AboutUsPage = () => {
    return (
        <div className="min-h-screen bg-gray-50">


            <div className="relative overflow-hidden bg-gradient-to-br from-indigo-600 via-blue-600 to-cyan-500 px-6 py-20 text-center">
                {/* Decorative blobs */}
                <div className="absolute top-[-60px] left-[-60px] w-72 h-72 rounded-full bg-white opacity-5" />
                <div className="absolute bottom-[-40px] right-[-40px] w-56 h-56 rounded-full bg-white opacity-5" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-white opacity-[0.03]" />

                <div className="relative z-10 flex flex-col items-center gap-4">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/15 border border-white/25 text-white text-xs font-semibold tracking-widest uppercase">
                        🚗 Open Source Project
                    </div>
                    <h1 className="text-5xl md:text-6xl font-black text-white tracking-tight"
                        style={{ fontFamily: "'Georgia', serif" }}>
                        Safar <span className="text-cyan-300">Setu</span>
                    </h1>
                    <p className="text-xl text-indigo-100 font-medium max-w-xl">
                        Smarter Rentals. Seamless Mobility. Built with ❤️ for the modern rider.
                    </p>

                    {/* Tech stack pills */}
                    <div className="flex flex-wrap justify-center gap-2 mt-4 max-w-2xl">
                        {techStack.map((t) => (
                            <span key={t.label}
                                  className="px-3 py-1 rounded-full text-xs font-bold bg-white/15 text-white border border-white/20">
                                {t.label}
                            </span>
                        ))}
                    </div>
                </div>
            </div>

            <div className="px-4 sm:px-8 lg:px-16 py-16 flex flex-col gap-16 max-w-6xl mx-auto">


                <div className="flex flex-col items-center text-center gap-4">
                    <p className="text-xs font-bold uppercase tracking-widest text-indigo-500">The Project</p>
                    <h2 className="text-3xl font-black text-gray-900" style={{ fontFamily: "'Georgia', serif" }}>
                        What is Safar Setu?
                    </h2>
                    <p className="text-gray-500 text-lg leading-relaxed max-w-2xl">
                        Safar Setu is a full-stack vehicle rental management platform that brings together
                        fleet management, subscription billing, smart reservations, and AI assistance
                        into one seamless experience — for both admins and riders.
                    </p>
                </div>


                <div>
                    <div className="flex flex-col items-center text-center gap-2 mb-10">
                        <p className="text-xs font-bold uppercase tracking-widest text-indigo-500">What's Inside</p>
                        <h2 className="text-3xl font-black text-gray-900" style={{ fontFamily: "'Georgia', serif" }}>
                            Key Features
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                        {features.map((f, i) => (
                            <div key={i}
                                 className="group relative bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-xl hover:scale-[1.02] transition-all duration-300 overflow-hidden">
                                {/* Accent top bar */}
                                <div className="absolute top-0 left-0 right-0 h-0.5 rounded-t-2xl"
                                     style={{ background: f.color }} />

                                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                                     style={{ background: f.bg, color: f.color }}>
                                    {f.icon}
                                </div>
                                <h3 className="font-bold text-gray-900 mb-2">{f.title}</h3>
                                <p className="text-sm text-gray-500 leading-relaxed">{f.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>

                <div>
                    <div className="flex flex-col items-center text-center gap-2 mb-10">
                        <p className="text-xs font-bold uppercase tracking-widest text-indigo-500">The Builder</p>
                        <h2 className="text-3xl font-black text-gray-900" style={{ fontFamily: "'Georgia', serif" }}>
                            Meet the Developer
                        </h2>
                    </div>

                    <div className="relative bg-white rounded-3xl border border-gray-100 shadow-lg overflow-hidden">
                        {/* Top gradient band */}
                        <div className="h-24 bg-gradient-to-br from-indigo-500 via-blue-500 to-cyan-400" />

                        <div className="px-8 pb-8">
                            {/* Avatar — overlapping the band */}
                            <div className="flex items-end gap-6 -mt-12 mb-6">
                                <Avatar
                                    src="/profile.jpg"
                                    sx={{
                                        width: 96, height: 96,
                                        border: '4px solid white',
                                        boxShadow: '0 8px 32px rgba(79,70,229,0.25)',
                                        fontSize: '2rem',
                                        background: 'linear-gradient(135deg, #4f46e5, #0ea5e9)',
                                    }}
                                >
                                    VG
                                </Avatar>
                                <div className="mb-1">
                                    <h3 className="text-2xl font-black text-gray-900"
                                        style={{ fontFamily: "'Georgia', serif" }}>
                                        Vaishnav Gupta
                                    </h3>
                                    <p className="text-sm font-semibold text-indigo-500">Full Stack Developer</p>
                                </div>
                            </div>

                            <p className="text-gray-500 leading-relaxed mb-6 max-w-2xl">
                                Passionate about building scalable, user-centric web applications.
                                SafarSetu is a personal project built to explore real-world problems in
                                fleet management, payment workflows, and modern React/Spring Boot architecture.
                            </p>

                            {/* Skills */}
                            <div className="flex flex-wrap gap-2 mb-6">
                                {["Spring Boot", "React", "Android", "MySQL", "REST APIs", "OAuth2"].map((skill) => (
                                    <span key={skill}
                                          className="px-3 py-1 rounded-full text-xs font-bold bg-indigo-50 text-indigo-600 border border-indigo-100">
                                        {skill}
                                    </span>
                                ))}
                            </div>

                            {/* Social links */}
                            <div className="flex flex-wrap gap-3">
                                {socialLinks.map((link) => (
                                    <a key={link.label}
                                       href={link.href}
                                       target="_blank" rel="noreferrer"
                                       className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-all hover:scale-105 hover:shadow-md"
                                       style={{
                                           color: link.color, background: link.bg,
                                           border: `1px solid ${link.border}`,
                                           textDecoration: 'none'
                                       }}>
                                        {link.icon}
                                        {link.label}
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>


                <div className="flex flex-col items-center text-center gap-2 pb-4">
                    <p className="text-xs text-gray-400 font-medium">
                        Built with Spring Boot · React · MySQL · Razorpay · ❤️
                    </p>
                    <p className="text-xs text-gray-300">© {new Date().getFullYear()} Safar Setu · Vaishnav Gupta</p>
                </div>

            </div>
        </div>
    );
};

export default AboutUsPage;
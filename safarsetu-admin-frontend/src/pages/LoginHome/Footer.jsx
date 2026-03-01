import React from 'react';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import LanguageIcon from '@mui/icons-material/Language';
import FavoriteIcon from '@mui/icons-material/Favorite';

const links = [
    {
        label: 'GitHub',
        href: 'https://github.com/vaishnavgupta',
        icon: <GitHubIcon fontSize="small" />,
        color: '#24292e',
        bg: '#f6f8fa',
        border: '#d1d5db',
    },
    {
        label: 'LinkedIn',
        href: 'https://linkedin.com/in/vaishnavgupta',
        icon: <LinkedInIcon fontSize="small" />,
        color: '#0077b5',
        bg: '#e8f4fb',
        border: '#bfdbfe',
    },
    {
        label: 'Portfolio',
        href: 'https://vaishnav-gupta-portfolio.vercel.app/',
        icon: <LanguageIcon fontSize="small" />,
        color: '#c0392b',
        bg: '#fff5f5',
        border: '#fecaca',
    },
];

const Footer = () => {
    return (
        <footer className="w-full border-t" style={{ borderColor: '#f5c6c6', background: '#fff5f5' }}>
            <div className="max-w-3xl mx-auto px-6 py-8 flex flex-col items-center gap-4 text-center">

                <p className="text-xs font-semibold uppercase tracking-widest" style={{ color: '#9b2222' }}>
                    Designed & Developed by
                </p>

                <h3 className="text-xl font-black" style={{ color: '#1a0505', fontFamily: "'Georgia', serif" }}>
                    Vaishnav Gupta
                </h3>

                <div className="flex flex-wrap justify-center gap-3">
                    {links.map((link) => (
                        <a
                            key={link.label}
                            href={link.href}
                            target="_blank"
                            rel="noreferrer"
                            className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-all hover:scale-105 hover:shadow-md"
                            style={{
                                color: link.color,
                                background: link.bg,
                                border: `1px solid ${link.border}`,
                                textDecoration: 'none',
                            }}
                        >
                            {link.icon}
                            {link.label}
                        </a>
                    ))}
                </div>

                <p className="text-xs text-gray-400 flex items-center gap-1 mt-2">
                    Built with ❤️ for Safar Setu © {new Date().getFullYear()}
                </p>
            </div>
        </footer>
    );
};

export default Footer;
import {Divider} from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import LanguageIcon from '@mui/icons-material/Language';
import CarRentalIcon from "@mui/icons-material/CarRental";

const Footer = () => {
    return (
        <footer className="bg-gradient-to-br from-indigo-900 via-indigo-800 to-blue-900 text-white pt-16 pb-8 px-6">
            <div className="max-w-7xl mx-auto">

                {/* Top Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">

                    {/* Brand Section */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-indigo-600 rounded-lg">
                                <CarRentalIcon className="text-white" />
                            </div>
                            <h2 className="text-2xl font-bold">
                                Safar <span className="text-indigo-300">Setu</span>
                            </h2>
                        </div>

                        <p className="text-indigo-200 text-sm leading-relaxed">
                            Smarter rentals and seamless mobility designed to simplify
                            your journey with trust, flexibility, and premium experience.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="font-semibold text-lg mb-4 text-indigo-200">
                            Quick Links
                        </h3>
                        <ul className="space-y-2 text-indigo-100">
                            <li className="hover:text-white cursor-pointer transition">Dashboard</li>
                            <li className="hover:text-white cursor-pointer transition">Browse Vehicles</li>
                            <li className="hover:text-white cursor-pointer transition">Subscriptions</li>
                            <li className="hover:text-white cursor-pointer transition">Contact</li>
                        </ul>
                    </div>

                    {/* Support */}
                    <div>
                        <h3 className="font-semibold text-lg mb-4 text-indigo-200">
                            Support
                        </h3>
                        <ul className="space-y-2 text-indigo-100">
                            <li className="hover:text-white cursor-pointer transition">Help Center</li>
                            <li className="hover:text-white cursor-pointer transition">Privacy Policy</li>
                            <li className="hover:text-white cursor-pointer transition">Terms of Service</li>
                            <li className="hover:text-white cursor-pointer transition">FAQs</li>
                        </ul>
                    </div>

                    {/* About Developer */}
                    <div>
                        <h3 className="font-semibold text-lg mb-4 text-indigo-200">
                            About Developer
                        </h3>

                        <p className="text-indigo-100 text-sm leading-relaxed mb-4">
                            Built with passion as a full-stack personal project to showcase
                            modern SaaS architecture, intuitive UI, and scalable backend design.
                        </p>

                        {/* Social Links */}
                        <div className="flex gap-4">
                            <a
                                href="https://github.com/vaishnavgupta"
                                className="p-2 bg-indigo-700 rounded-lg hover:bg-indigo-600 transition"
                            >
                                <GitHubIcon />
                            </a>

                            <a
                                href="https://linkedin.com/in/vaishanvgupta"
                                className="p-2 bg-indigo-700 rounded-lg hover:bg-indigo-600 transition"
                            >
                                <LinkedInIcon />
                            </a>

                            <a
                                href="https://vaishnav-gupta-portfolio.vercel.app"
                                className="p-2 bg-indigo-700 rounded-lg hover:bg-indigo-600 transition"
                            >
                                <LanguageIcon />
                            </a>
                        </div>
                    </div>

                </div>

                {/* Divider */}
                <Divider sx={{ my: 6, bgcolor: "rgba(255,255,255,0.2)" }} />

                {/* Bottom Section */}
                <div className="flex flex-col md:flex-row items-center justify-between text-indigo-300 text-sm gap-4">
                    <p>
                        © {new Date().getFullYear()} Safar Setu. All rights reserved.
                    </p>

                    <p>
                        Designed & Developed with ❤️ by <span className="font-bold">Vaishnav Gupta</span>
                    </p>
                </div>

            </div>
        </footer>
    );
};

export default Footer;

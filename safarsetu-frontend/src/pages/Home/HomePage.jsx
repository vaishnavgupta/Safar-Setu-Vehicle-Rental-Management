import React from 'react';
import {Box, Chip, Toolbar} from "@mui/material";
import NavbarHome from "./NavbarHome.jsx";
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import AnimatedHero from "./AnimatedHero.jsx";
import Typewriter from "typewriter-effect";
import {homeFeatures, homeNumberFeatures, homeReviewFeatures} from "./constants.js";
import FeaturesCard from "./FeaturesCard.jsx";
import NumbersCard from "./NumbersCard.jsx";
import ReviewsCards from "./ReviewsCards.jsx";
import Footer from "./Footer.jsx";
import { useNavigate } from "react-router";
import drivingAnimation from "../../assets/animations/driving.json";
import SaathiBanner from "./SaathiBanner.jsx";

const HomePage = () => {

    const navigate = useNavigate();

  return (
    <div className="min-h-screen">

        <div className="flex flex-col items-center justify-center gap-20 mb-16">

            <NavbarHome />
            <Toolbar />

            <div className="max-w-7xl w-full mx-auto
                  grid grid-cols-1 lg:grid-cols-2
                  gap-12 lg:gap-20
                  items-center
                  px-6 py-12">

                {/* LEFT DIV */}
                <div className="space-y-8">

                    <Chip
                        size="medium"
                        icon={<AutoAwesomeIcon />}
                        sx={{
                            color: "#372aac",
                            fontWeight: "bold",
                            backgroundColor: "#eef2ff"
                        }}
                        label="Welcome to Safar Setu"
                    />

                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
                        Your Gateway to{" "}
                        <span className="text-indigo-600">
                            <Typewriter
                                options={{
                                    strings: [
                                        "Smarter Rentals.",
                                        "Seamless Mobility.",
                                        "Premium Experience."
                                    ],
                                    autoStart: true,
                                    loop: true,
                                    delay: 50,
                                    deleteSpeed: 30,
                                }}
                            />
                        </span>
                    </h1>

                    <p className="text-gray-600 text-lg md:text-xl max-w-xl leading-relaxed">
                        Safar Setu brings you effortless, premium vehicle access with smart bookings,
                        flexible plans, and a ride experience designed around you.
                    </p>

                    {/* Buttons */}
                    <div className="flex flex-wrap gap-4">

                        <div
                            className="bg-blue-600 px-6 py-3
                        flex items-center gap-2
                        cursor-pointer rounded-xl
                        shadow-md hover:bg-blue-800
                        hover:shadow-xl
                        transition-all duration-300"
                            onClick={() => navigate("/dashboard")}
                        >
                            <p className="text-white font-semibold">Explore</p>
                            <KeyboardArrowRightIcon className="text-white" />
                        </div>

                        <div
                            className="bg-indigo-600 px-6 py-3
                        flex items-center gap-2
                        cursor-pointer rounded-xl
                        shadow-md hover:bg-indigo-800
                        hover:shadow-xl
                        transition-all duration-300"
                            onClick={() => navigate("/login")}
                        >
                            <p className="text-white font-semibold">Login</p>
                            <LockOpenIcon className="text-white" />
                        </div>

                    </div>

                </div>

                {/* RIGHT DIV */}
                <div className="flex justify-center lg:justify-end">
                    <div className="w-full max-w-md lg:max-w-lg">
                        <AnimatedHero animation={drivingAnimation}/>
                    </div>
                </div>

            </div>

            {/* Saathi Card Banner */}
            <SaathiBanner />

            {/*  Features Summary Cards  */}
            <div className="w-full max-w-7xl mx-auto px-6 lg:px-8 py-16 text-center ">
                <h2 className="text-black text-4xl md:text-5xl font-bold mb-6">
                    What Safar Setu <span className="text-indigo-600">Offers ?</span>
                </h2>
                <p className="text-gray-600 text-lg max-w-2xl mx-auto mb-14">
                    Discover smart features designed to make your vehicle rental
                    experience seamless, secure, and effortless.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 flex-wrap gap-8">
                    {
                        homeFeatures.map((item) => {
                            return <FeaturesCard feature={item} key={item.id} />;
                        })
                    }
                </div>
            </div>

            {/*  Impact Numbers  */}
            <div className="w-full max-w-7xl mx-auto px-6 lg:px-8 py-16 text-center ">
                <h2 className="text-black text-4xl md:text-5xl font-bold mb-6">
                    Our Impact In <span className="text-indigo-600">Numbers</span>
                </h2>
                <p className="text-gray-600 text-lg max-w-2xl mx-auto mb-14">
                    Join thousands of commuters who trust Safar Setu to make their journeys smoother and stress-free.
                    Experience rentals and mobility designed around your comfort.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 flex-wrap gap-8">
                    {
                        homeNumberFeatures.map((item) => {
                            return <NumbersCard feature={item} key={item.id} />;
                        })
                    }
                </div>
            </div>

            {/*  Customers Reviews  */}
            <div className="w-full max-w-7xl mx-auto px-6 lg:px-8 py-16 text-center ">
                <h2 className="text-black text-4xl md:text-5xl font-bold mb-6">
                    Customer <span className="text-indigo-600">Reviews</span>
                </h2>
                <p className="text-gray-600 text-lg max-w-2xl mx-auto mb-14">
                    Hear from riders who trust Safar Setu for seamless and stress-free journeys.
                    Real experiences. Real reliability. Real mobility.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 flex-wrap gap-8">
                    {
                        homeReviewFeatures.map((item) => {
                            return <ReviewsCards feature={item} key={item.id} />;
                        })
                    }
                </div>
            </div>

        </div>

        <Footer/>

    </div>
  );
};

export default HomePage;

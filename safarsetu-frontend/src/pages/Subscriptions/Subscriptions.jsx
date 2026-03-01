import React, {useEffect, useState} from 'react';
import LoyaltyIcon from '@mui/icons-material/Loyalty';
import Card from "./Card.jsx";
import {
    fetchActiveSubscriptions,
    fetchAllSubscriptions,
    subscribeToSubscription
} from "../../services/subscriptionService.js";
import toast from "react-hot-toast";
import {Backdrop} from "@mui/material";
import Loader from "../../components/Loader.jsx";
import PaymentInitiateDialog from "./PaymentInitiateDialog.jsx";
import {getProfile} from "../../services/authService.js";

const Subscriptions = () => {
    const [loading, setLoading] = useState(false);
    const [subscriptions, setSubscriptions] = useState([]);
    const [activeSubscription, setActiveSubscription] = useState({});
    const [getPlanLoading, setGetPlanLoading] = useState(false);
    const [planDialog, setPlanDialog] = useState({open: false, paymentRequest: null});
    const [userId, setUserId] = useState(null);

    const getAllSubscriptions = async () => {
        setLoading(true);
        try {
            const response = await fetchAllSubscriptions();
            setSubscriptions(response.data);
        }
        catch (error) {
            console.error(error);
            toast.error("Error fetching subscription plans");
        }
        finally {
            setLoading(false);
        }
    }

    const getActiveSubscriptions = async () => {
        setLoading(true);
        try {
            const response = await fetchActiveSubscriptions();
            setActiveSubscription(response.data);
        }
        catch (error) {
            console.error(error);
            toast.error("Error fetching active subscriptions");
        }
        finally {
            setLoading(false);
        }
    }

    const getSubscriptionPlan = async (planId) => {
        setGetPlanLoading(true);
        try {
            const response = await subscribeToSubscription({
                planId: planId,
                userId: userId
            })
            setPlanDialog({open: true, paymentRequest: response.data});
            toast.success("Payment request initiated")
        }
        catch (error) {
            console.error(error);
            toast.error("Error subscribing to subscription plans");
        }
        finally {
            setGetPlanLoading(false);
        }
    }

    const getUserProfile = async () => {
        setLoading(true);
        try {
            const response = await getProfile();
            setUserId(response.data.id);
        }
        catch(e) {
            console.log(e);
            toast.error("Error fetching user profile");
        }
        finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getAllSubscriptions()
        getActiveSubscriptions()
        getUserProfile()
    }, []);

    return (
    <div className="min-h-screen " >
        <div className="px-4 sm:px-6 lg:px-8 py-8 mb-6 flex flex-col items-center justify-center" >
            {/*  Header  */}
            <div className="mb-4 bg-gray-300/30 backdrop-blur-2xl text-center flex-col justify-center px-6 py-4 rounded-xl inline-flex w-fit" >
                <div className= 'flex flex-row items-center justify-center gap-4 '>
                    <LoyaltyIcon sx={{width:"34px" , height:"34px", color: "indigo"}} />
                    <h1 className="text-4xl font-bold bg-gradient-to-br from-indigo-500 via-purple-400 to-blue-600 bg-clip-text text-transparent">Subscription Plans</h1>
                </div>
            </div>
            {/*  Subheading  */}
            <div className="text-center flex-col justify-center px-6 py-4 rounded-xl inline-flex w-fit mb-18" >
                <h2 className="text-xl font-semibold text-gray-500">Flexible plans designed for every kind of rider.</h2>
                <h2 className="text-xl font-semibold text-gray-500">More rides, fewer worries.</h2>
            </div>

            {/* Active Subscription Plan */}
            <div className="relative overflow-hidden px-8 py-8 bg-gradient-to-br from-indigo-600 via-blue-600 to-cyan-500 rounded-3xl shadow-2xl w-full mb-12">

                {/* Background decorative circles */}
                <div className="absolute top-[-40px] right-[-40px] w-48 h-48 rounded-full bg-white opacity-5" />
                <div className="absolute bottom-[-30px] left-[-30px] w-36 h-36 rounded-full bg-white opacity-5" />

                <h3 className="text-sm font-semibold text-indigo-200 uppercase tracking-widest mb-1 text-center">Current Plan</h3>
                <p className="text-2xl font-black text-white mb-6 text-center">Active Subscription</p>

                {activeSubscription ? (
                    <div className="flex flex-col items-center justify-center gap-6">

                        {/* Plan Info */}
                        <div className="flex flex-col items-center gap-2">
                            <p className="text-3xl font-black text-white">{activeSubscription.planName}</p>
                            <span className="inline-block px-3 py-1 rounded-full bg-white/20 text-white text-xs font-semibold tracking-wider">
                    {activeSubscription.planCode}
                </span>
                        </div>

                        {/* Dates */}
                        <div className="flex gap-6">
                            <div className="flex flex-col items-center bg-white/10 rounded-2xl px-5 py-3">
                                <p className="text-xs text-indigo-200 font-semibold uppercase tracking-wider mb-1">Start Date</p>
                                <p className="text-white font-bold text-sm">{activeSubscription.startDate}</p>
                            </div>
                            <div className="flex flex-col items-center bg-white/10 rounded-2xl px-5 py-3">
                                <p className="text-xs text-indigo-200 font-semibold uppercase tracking-wider mb-1">End Date</p>
                                <p className="text-white font-bold text-sm">{activeSubscription.endDate}</p>
                            </div>
                        </div>

                    </div>
                ) : (
                    <div className="flex items-center justify-center">
                        <div className="flex items-center gap-3 bg-white/10 rounded-2xl px-5 py-4">
                            <div className="w-2 h-2 rounded-full bg-red-400 animate-pulse" />
                            <p className="text-white font-semibold text-base">No Active Subscription Found</p>
                        </div>
                    </div>
                )}
            </div>

            {/*Dialog to do payment*/}
            <PaymentInitiateDialog
                open={planDialog.open}
                onClose={() => setPlanDialog({open: false, paymentRequest: null}) }
                paymentRequest={planDialog.paymentRequest}  />

            {/*  Choose Your Plan  */}
            <div className="flex items-center justify-center flex-col gap-4 mb-8" >
                <h2 className="text-3xl font-bold text-black">Choose Your Plan</h2>
                <p className="text-lg text-gray-500">Select a plan that move with you.</p>
            </div>
            {/*  Subscriptions Plan Card  */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12 " >
                {
                    subscriptions.map((subscription) => {
                        return <Card key={subscription.planCode} subscription={subscription} onGetPlan={getSubscriptionPlan} isActive={activeSubscription?.planCode === subscription.planCode}/>
                    })
                }
            </div>
            {/*  Why Subscribe card  */}
            <div className="flex flex-col items-center justify-center px-6 py-12 bg-gradient-to-r from-indigo-600 to-blue-600 rounded-2xl shadow-xl w-full">

                {/* Heading */}
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 text-center">
                    Why Subscribe With Us?
                </h2>

                <p className="text-lg text-indigo-100 font-medium mb-12 text-center max-w-2xl">
                    Unlock smarter rides, exclusive benefits, and seamless vehicle access.
                </p>

                {/* Benefits Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">

                    {[
                        {
                            emoji: "🚗",
                            title: "Priority Vehicle Access",
                            desc: "Skip long queues and reserve vehicles instantly with priority booking.",
                        },
                        {
                            emoji: "⚡",
                            title: "Flexible Rental Limits",
                            desc: "Rent multiple vehicles with extended durations tailored to your needs.",
                        },
                        {
                            emoji: "🛡️",
                            title: "Hassle-Free Experience",
                            desc: "Enjoy smooth booking, instant confirmations, and dedicated support.",
                        },
                    ].map((card, i) => (
                        <div key={i}
                             className="relative overflow-hidden bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-6 flex flex-col items-center text-center transition-all duration-300 hover:scale-[1.03] hover:bg-white/20 hover:shadow-2xl group">

                            {/* Decorative circle */}
                            <div className="absolute top-[-20px] right-[-20px] w-24 h-24 rounded-full bg-white opacity-5 group-hover:opacity-10 transition-opacity duration-300" />

                            <div className="w-14 h-14 rounded-2xl bg-white/15 flex items-center justify-center text-3xl mb-4 shadow-inner">
                                {card.emoji}
                            </div>

                            <h3 className="text-lg font-bold text-white mb-2">{card.title}</h3>

                            <p className="text-indigo-100 text-sm leading-relaxed opacity-85">{card.desc}</p>

                        </div>
                    ))}

                </div>
            </div>

            {loading && (
                <Backdrop
                    sx={{
                        color: '#6366f1', // Indigo-600
                        zIndex: (theme) => theme.zIndex.drawer + 1,
                        backgroundColor: 'rgba(255, 255, 255, 0.4)',
                        backdropFilter: 'blur(8px)',
                    }}
                    open={loading}>
                    <Loader  />
                </Backdrop>
            )}

            {getPlanLoading && (
                <Backdrop
                    sx={{
                        color: '#6366f1', // Indigo-600
                        zIndex: (theme) => theme.zIndex.drawer + 1,
                        backgroundColor: 'rgba(255, 255, 255, 0.4)',
                        backdropFilter: 'blur(8px)',
                    }}
                    open={getPlanLoading}>
                    <Loader text="Initiating Subscription Request..." />
                </Backdrop>
            )}

        </div>
    </div>
  );
};

export default Subscriptions;

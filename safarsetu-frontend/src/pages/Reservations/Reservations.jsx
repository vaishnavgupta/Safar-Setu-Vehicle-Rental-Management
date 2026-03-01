import React, {useEffect, useState} from 'react';
import CommuteIcon from '@mui/icons-material/Commute';
import BookmarkAddedIcon from '@mui/icons-material/BookmarkAdded';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import {tabsArray} from "./tabs.jsx";
import {getStatusFromIdx, reservationArray} from "./constants.js";
import ReservationCard from "./ReservationCard.jsx";
import {getCurrentReservations} from "../../services/reservationsService.js";
import toast from "react-hot-toast";
import SearchOffIcon from "@mui/icons-material/SearchOff";


const Reservations = () => {
    const [state, setState] = useState({
        total: 5,
        active: 3,
        ready: 2
    })
    const [activeTab, setActive] = useState(0);
    const [loading, setLoading] = useState(true);
    const [reservations, setReservations] = useState([]);

    const getReservations = async () => {
        setLoading(true);
        try {
            let response = null;
            if( activeTab === 0 ){
                response = await getCurrentReservations();
            }
            else response = await getCurrentReservations(getStatusFromIdx[activeTab]);
            setReservations(response.data.content);
            console.log(response.data);
        }
        catch (error) {
            console.log(error);
            toast.error("Error fetching Reservations data");
        }
        finally {
            setLoading(false);
        }
    }

    const getReservationsForTabs = async () => {
        setLoading(true);
        try {
            const [res1, res2, res3] =
                await
                    Promise.all([getCurrentReservations(),
                        getCurrentReservations(undefined, true),
                        getCurrentReservations("FULFILLED")]);
            setState(state => ({
                ...state,
                total: res1.data.content.length,
                ready: res3.data.content.length,
                active: res2.data.content.length,
            }) )
        }
        catch (error) {
            console.log(error);
            toast.error("Error fetching Reservations tabs data");
        }
        finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getReservationsForTabs();
    }, []);

    useEffect(() => {
        getReservations();
    }, [activeTab]);

  return (
    <div className="min-h-screen py-8 bg-gradient-to-r from-[rgba(255,240,255,1)] via-[rgba(178,138,242,1)] to-[rgba(47,195,245,1)]">
        <div className="px-4 sm:px-6 lg:px-8" >
            {/*  Header  */}
            <div className="mb-8 bg-gradient-to-br from-indigo-100/60 via-purple-100/60 to-sky-100/60 backdrop-blur-xl text-center flex flex-col justify-center p-8">
                <h1 className="text-4xl font-bold text-gray-900 mb-2">
                    My Reservations
                </h1>
                <h3 className="text-lg text-indigo-600 font-bold">
                    View and manage all your upcoming vehicle reservations in one place.
                </h3>
            </div>

            {/*  Info Cards  */}
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-4 mb-6">
                {/* Total */}
                <div className="bg-amber-50 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-lg font-semibold text-gray-500 uppercase tracking-wide" >Total Reservations</p>
                            <p className="text-4xl font-extrabold text-gray-900 mt-1">{state.total}</p>
                        </div>
                        <div className="p-4 bg-gradient-to-r from-amber-500 to-pink-500 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                            <CommuteIcon className="w-8 h-8 text-white" />
                        </div>
                    </div>
                </div>
                {/* Active Reservations */}
                <div className="bg-fuchsia-50 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-lg font-semibold text-gray-500 uppercase tracking-wide" >Active Reservations</p>
                            <p className="text-4xl font-extrabold text-gray-900 mt-1">{state.active}</p>
                        </div>
                        <div className="p-4 bg-gradient-to-r from-fuchsia-500 to-cyan-500 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                            <BookmarkAddedIcon className="w-8 h-8 text-white" />
                        </div>
                    </div>
                </div>
                {/* Ready to Pickup */}
                <div className="bg-emerald-50 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-lg font-semibold text-gray-500 uppercase tracking-wide" >Ready to Pickup</p>
                            <p className="text-4xl font-extrabold text-gray-900 mt-1">{state.ready}</p>
                        </div>
                        <div className="p-4 bg-gradient-to-r from-emerald-500 to-emerald-900 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                            <LocalShippingIcon className="w-8 h-8 text-white" />
                        </div>
                    </div>
                </div>
            </div>

            {/*  Tabs  */}
            <div className="bg-white rounded-xl shadow-lg mb-6 overflow-hidden">
                <div className="flex border-b border-gray-200 gap-1">
                    {tabsArray.map((tab, index) => {
                        return <button
                            key={tab.label}
                            onClick={() => setActive(index)}
                            className={` flex-1 px-6 py-4 font-semibold text-base flex items-center justify-center gap-2 transition-all
                                ${activeTab === index ? "border-b-4 border-indigo-600 bg-indigo-50 text-indigo-600" 
                                    : "text-gray-600 hover:bg-gray-50"}
                            `}
                        >
                            {tab.icon}
                            {tab.label}
                        </button>
                    })}
                </div>
            </div>
            {/*  Reservations Card List  */}

            {
                reservations.length===0 && <div className="flex flex-col items-center justify-center gap-2 p-4 bg-gray-50 rounded-md shadow-xl">
                    <SearchOffIcon sx={{width:32, height:32, color:"#4a5565"}} />
                    <p className="text-lg font-bold text-black">No results found!</p>
                    <p className="text-sm font-semibold text-gray-600">Modify Filters</p>
                </div>
            }

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-2">
                {reservations.map((reservation) => {
                    return <ReservationCard key={reservation.id} reservation={reservation}/>
                })}
            </div>
        </div>
    </div>
  );
};

export default Reservations;

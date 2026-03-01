import React from 'react';
import BikeScooterIcon from '@mui/icons-material/BikeScooter';
import HourglassTopIcon from '@mui/icons-material/HourglassTop';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import AbcIcon from '@mui/icons-material/Abc';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import {getStatusColor} from "./constants.js";
import {Divider} from "@mui/material";
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';
import ToggleOnIcon from "@mui/icons-material/ToggleOn";
import DoneAllIcon from "@mui/icons-material/DoneAll";

const ReservationCard = ({reservation}) => {

    const getStatusIcon = (status) => {
        const iconClass = "w-5 h-5";
        const icons = {
            PENDING: <HourglassTopIcon className={iconClass}/>,
            AVAILABLE: <AssignmentTurnedInIcon className={iconClass}/>,
            FULFILLED: <CheckCircleOutlineIcon className={iconClass}/>,
            EXPIRED: <HighlightOffIcon className={iconClass}/>,
            CANCELLED: <DeleteForeverIcon className={iconClass}/>,
        }
        return icons[status] || <AbcIcon className={iconClass}/>;
    }

    const statusColors = getStatusColor(reservation.status)

    return (
        <div
            className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 hover:traslate-y-1 overflow-hidden border border-gray-100">
            {/* Status Banner */}
            <div
                className={`bg-gradient-to-r ${statusColors.gradient} px-4 py-3 flex items-center justify-between ${statusColors.borderColor}`}>
                <div className="flex items-center gap-2">
                <span>
                    {getStatusIcon(reservation.status)}
                </span>
                    <span className={`${statusColors.text} font-bold text-sm uppercase tracking-wide`}>
                    {reservation.status}
                </span>
                </div>
            </div>
            <div className="p-6">
                {/*  Vehicle Header  */}
                <div className="mb-4">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="p-3 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 shadow-md">
                            <BikeScooterIcon className="w-6 h-6 text-white"/>
                        </div>
                        <div>
                            <p className="uppercase text-sm font-semibold text-gray-900 tracking-wide">Vehicle Id</p>
                            <h3 className="text-xl font-bold font-mono tracking-wider">#{reservation.vehicleId}</h3>
                        </div>
                    </div>
                    <p className="text-lg font-semibold text-shadow-purple-100 text-shadow-2xs hover:shadow-amber-400">{reservation.vehicleModelName}</p>
                </div>
            </div>
            <Divider
                orientation="horizontal"
            />

            {/*  Timeline  */}
            <div className="space-y-3 p-6">
                <div className="flex items-start gap-2">
                    <AccessAlarmIcon className="w-4 h-4 text-gray-400 mt-0.5"/>
                    <div>
                        <p className="text-xs font-semibold text-gray-500 uppercase">
                            Reserved
                        </p>
                        <p className="text-sm font-semibold text-gray-700">
                            {reservation.reservedAt}
                        </p>
                    </div>
                </div>

                {reservation.availableAt && (
                    <div className="flex items-start gap-2 text-green-600 font-semibold">
                        <ToggleOnIcon className="w-4 h-4 mt-0.5"/>
                        <div>
                            <p className="text-xs font-semibold uppercase">
                                Available
                            </p>
                            <p className="text-sm font-semibold">
                                {reservation.availableAt}
                            </p>
                        </div>
                    </div>
                )}

                {reservation.fulfilledAt && (
                    <div className="flex items-start gap-2 text-blue-600 font-semibold">
                        <DoneAllIcon className="w-4 h-4 mt-0.5 "/>
                        <div>
                            <p className="text-xs font-semibold uppercase">
                                Fulfilled
                            </p>
                            <p className="text-sm font-semibold">
                                {reservation.fulfilledAt}
                            </p>
                        </div>
                    </div>
                )}

            </div>
        </div>
    )
}

export default ReservationCard;
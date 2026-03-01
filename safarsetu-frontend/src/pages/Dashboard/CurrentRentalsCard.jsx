import React from 'react';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import GetStatusChip from "./GetStatusChip.jsx";
import {Button, Chip} from "@mui/material";
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

const CurrentRentalsCard = ({rental}) => {
    return (
        <div className="flex items-center justify-between p-6 border border-gray-200 rounded-2xl cursor-pointer">
            <div className="flex items-center space-x-4">
                <img src={rental.vehicleImageUrl} alt={rental.vehicleModelName} className="w-60 h-24 rounded-lg"/>
            </div>
            <div className="flex-1">
                <h4 className="text-lg font-bold text-gray-900" mb-1 >
                    {rental.vehicleModelName}
                </h4>
                <p className="text-gray-600 mb-2">{rental.vehicleBrand}</p>
                <div className="flex items-center space-x-4 text-sm " >
                    <div className="flex items-center space-x-4 text-sm ">
                        <AccessTimeIcon sx={{fontSize: 16}} />
                        <span>Due: {new Date(rental.dueDate).toLocaleDateString()}</span>
                    </div>
                    <GetStatusChip status={rental.status} />
                    <Chip variant="outlined" size="small" label={`${rental.remainingDays > 0 ? rental.remainingDays : rental.overdueDays} days ${rental.remainingDays > 0 ? "remaining" : "overdue"}`} />
                </div>
            </div>
            <div>
                <Button variant='contained' size='medium' endIcon={<KeyboardArrowRightIcon/>}>View</Button>
            </div>
        </div>
    );
};

export default CurrentRentalsCard;

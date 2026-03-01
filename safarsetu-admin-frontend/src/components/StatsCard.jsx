import React from 'react';
import {Avatar} from "@mui/material";
import {deepOrange} from "@mui/material/colors";

const StatsCard = ({imageUrl, fullName, email}) => {
  return (
    <div className="flex flex-row gap-2 items-center justify-center">
        <Avatar
            alt={fullName}
            src={imageUrl ? imageUrl : undefined}
            sx={{ bgcolor: deepOrange[500] }}>
            {fullName.split(' ')[0][0]}
        </Avatar>
        <div className="flex flex-col gap-2 items-center justify-center">
            <h3 className="font-bold text-lg text-gray-900">{fullName}</h3>
            <p className="font-semibold text-sm text-gray-500">{email}</p>
        </div>
    </div>
  );
};

export default StatsCard;

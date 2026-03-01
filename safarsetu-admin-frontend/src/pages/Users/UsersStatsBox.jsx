import React from 'react';
import {Box} from "@mui/material";

const UsersStatsBox = ({value, title, textClass}) => {
  return (
    <Box
        className="rounded-2xl p-4 flex flex-col items-center justify-between min-w-[200px] border border-gray-600 shadow-lg "
        sx={{ color: 'white' }}>
        <h3 className={`text-4xl font-bold mb-1 ${textClass}`}>{value}</h3>
        <p className="uppercase font-semibold tracking-wide text-gray-600">{title}</p>
    </Box>
  );
};

export default UsersStatsBox;

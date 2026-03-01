import React from 'react';
import {Avatar, Box} from "@mui/material";

const StatsCardLong = ({bgClass, icon: Icon, value, title}) => {
  return (
      <Box
          className={`bg-gradient-to-br ${bgClass} rounded-2xl p-5 flex flex-col justify-between min-w-[200px] flex-1`}
          sx={{ color: 'white', boxShadow: '0 8px 32px rgba(0,0,0,0.18)' }}
      >
          <div className="flex flex-row justify-between items-center w-full">
              <div className="flex flex-col gap-2 ">
                    <h2 className="text-3xl font-bold text-white">{value}</h2>
                    <p className="text-lg font-semibold text-white">{title}</p>
              </div>
              <Avatar className="p-6 rounded-full bg-white backdrop-blur-xl">
                  <Icon sx={{ color: 'white', fontSize: 24 }} />
              </Avatar>
          </div>
      </Box>
  );
};

export default StatsCardLong;

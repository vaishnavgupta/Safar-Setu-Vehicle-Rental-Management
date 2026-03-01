import React from 'react';
import BusinessIcon from '@mui/icons-material/Business';
import NumbersIcon from '@mui/icons-material/Numbers';
import {Button, Skeleton} from "@mui/material";

const VehicleCard = ({vehicle, loading, onViewClick}) => {

  if(loading || !vehicle) {
      return (
          <div className="group bg-white backdrop-blur-xl rounded-xl cursor-pointer border border-gray-200 p-4">
              {/*  Model Image  */}
              <Skeleton variant="rectangular" height={200} className="rounded-xl mb-6" />

              <div className="p-5">
                  <Skeleton className="mb-4" variant="text" width="40%" />

                  <Skeleton className="mb-4" variant="text" width="30%" />

                  <Skeleton className="mb-4" variant="text" width="30%" />

                  <Skeleton className="mb-12" variant="text" width="100%" />

                  <Skeleton className="rounded-md" height={35} variant="rectangular" width="100%" />
              </div>

          </div>
      );
  }

  else {
      return (
          <div className="group bg-white backdrop-blur-xl rounded-xl shadow-md hover:shadow-xl transition-all duration-400 overflow-hidden cursor-pointer border border-gray-200 hover:translate-y-1.5">
              {/*  Model Image  */}
              <div className='relative h-64 overflow-hidden'>
                  <img
                      src={vehicle.vehicleImageUrl ? vehicle.vehicleImageUrl : 'https://imgd.aeplcdn.com/1920x1080/n/cw/ec/45299/jimny-exterior-right-front-three-quarter-23.png?isig=0&q=80&q=80' }
                      alt={vehicle.vehicleModelName}
                      className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300 ease-in-out"
                  />
              </div>

              <div className="p-5">
                  <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-indigo-600 transition-colors">
                      {vehicle.modelName}
                  </h3>

                  <div className="flex items-center space-x-2 mb-3 text-gray-600" >
                      <BusinessIcon sx={{fontSize: 16}}/>
                      <span className='text-sm line-clamp-1 underline'>{vehicle.brand}</span>
                  </div>
                  <div className="flex items-center space-x-2 mb-3 text-gray-600" >
                      <NumbersIcon sx={{fontSize: 16}}/>
                      <span className='text-sm line-clamp-1'>{vehicle.registrationNumber}</span>
                  </div>
                  {vehicle.description && (
                      <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                          {vehicle.description}
                      </p>
                  )}
                  <div className="flex gap-2">
                      <Button variant="contained" size="medium" fullWidth
                              onClick={onViewClick}>
                          View
                      </Button>
                  </div>
              </div>

          </div>
      );
  }

};

export default VehicleCard;

import React from 'react';
import styled from 'styled-components';
import {Button, Chip, Divider} from "@mui/material";
import GradeIcon from '@mui/icons-material/Grade';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CommuteIcon from "@mui/icons-material/Commute";
import WatchLaterIcon from '@mui/icons-material/WatchLater';

const Card = ({subscription, onGetPlan,isActive=false}) => {

    return (
        <StyledWrapper>
            <div className="flip-card">
                <div className="flip-card-inner">
                    <div className="flip-card-front gap-4 px-2 flex flex-col">
                        <div className="flex flex-row gap-1 text-center justify-center">
                            <Chip icon={<GradeIcon sx={{color: "#fff"}}/>} label={subscription.badgeFeatures} variant="outlined" />
                            {isActive &&
                                <Chip icon={<CheckCircleIcon sx={{color: "#fff"}}/>} label="Active" variant="filled" color="success"/>
                            }
                        </div>
                        <p className="title">{subscription.planName}</p>
                        <p>{subscription.description}</p>
                    </div>
                    <div className="flip-card-back gap-4 px-2">
                        <p className="title text-gray-200">{subscription.planName}</p>
                        <div className="flex flex-row gap-2 align-text-bottom justify-center">
                            <h2 className="text-4xl  font-bold text-gray-200">Rs. {subscription.price}</h2>
                            <p>/mo</p>
                        </div>
                        <Divider >
                            <Chip label="Benefits" size="small" sx={{color: "white"}} />
                        </Divider>
                        {/* Benefits */}
                        <div className="flex items-center gap-3 bg-indigo-200/80 rounded-xl p-3 backdrop-blur-xl">

                            {/* Icon box */}
                            <div className="flex items-center justify-center p-2 bg-gradient-to-r from-indigo-500 to-blue-600 rounded-lg shadow-md">
                                <CommuteIcon className="w-5 h-5 text-white" />
                            </div>

                            {/* Text */}
                            <div className="flex flex-col leading-tight">
                                <p className="text-xs text-indigo-700">Borrow Limit</p>
                                <h3 className="text-lg font-semibold text-indigo-900">
                                    {subscription.maxVehiclesAllowed} Vehicles
                                </h3>
                            </div>

                        </div>

                        <div className="flex items-center gap-3 bg-indigo-200/80 rounded-xl p-3 backdrop-blur-xl">
                            <div className="flex items-center justify-center p-2 bg-gradient-to-r from-indigo-500 to-blue-600 rounded-lg shadow-md">
                                <WatchLaterIcon className="w-5 h-5 text-white" />
                            </div>

                            <div className="flex flex-col leading-tight">
                                <p className="text-xs text-indigo-700">Rental Duration</p>
                                <h3 className="text-lg font-semibold text-indigo-900">
                                    {subscription.validityInDays} Days / Vehicle
                                </h3>
                            </div>
                        </div>

                        <Button variant="contained" size="medium" color="success" fullWidth sx={{fontStyle:"bold"}}
                                onClick={() => onGetPlan(subscription.id)}>
                            Get Plan
                        </Button>
                    </div>
                </div>
            </div>
        </StyledWrapper>
    );
}

const StyledWrapper = styled.div`
  .flip-card {
    background-color: transparent;
    width: 300px;
    height: 500px;
    perspective: 1000px;
    font-family: sans-serif;
  }

  .title {
    font-size: 1.5em;
    font-weight: 900;
    text-align: center;
    margin: 0;
    color: #1e1b4b; /* deep indigo */
  }

  .flip-card-inner {
    position: relative;
    width: 100%;
    height: 100%;
    text-align: center;
    transition: transform 0.8s cubic-bezier(0.4, 0.2, 0.2, 1);
    transform-style: preserve-3d;
  }

  .flip-card:hover .flip-card-inner {
    transform: rotateY(180deg);
  }

  .flip-card-front,
  .flip-card-back {
    box-shadow: 0 12px 25px rgba(30, 27, 75, 0.25);
    position: absolute;
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100%;
    height: 100%;
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
    border-radius: 1.25rem;
  }

  /* FRONT SIDE */
  .flip-card-front {
    background: linear-gradient(
      135deg,
      #eef2ff 0%,      /* indigo-50 */
      #e0e7ff 45%,     /* indigo-100 */
      #c7d2fe 70%,     /* indigo-200 */
      #a5b4fc 100%     /* indigo-300 */
    );
    color: #312e81;   /* indigo-900 */
    border: 1px solid rgba(99, 102, 241, 0.4);
  }

  /* BACK SIDE */
  .flip-card-back {
    background: linear-gradient(
      135deg,
      #4f46e5 0%,      /* indigo-600 */
      #3b82f6 45%,     /* blue-500 */
      #2563eb 70%,     /* blue-600 */
      #1e40af 100%     /* indigo-800 */
    );
    color: white;
    transform: rotateY(180deg);
    border: 1px solid rgba(255, 255, 255, 0.25);
  }
`;


export default Card;

import React from "react";
import {activityLists, statsCards, statsCardsLong} from './constants.js';
import StatsCard from "./StatsCard.jsx";
import StatsCardLong from "./StatsCardLong.jsx";
import {Chip} from "@mui/material";
import RecentActivityItem from "./RecentActivityItem.jsx";

const Dashboard = () => {
  return (
      <div className="min-h-screen bg-white py-8" >
          <div className="px-4 sm:px-8 lg:px-8" >
              <div className="mb-8 animate-fade-in-up" >
                  <h1 className="text-4xl font-bold text-gray-800 mb-2" >Dashboard Overview</h1>

                  <p className="text-lg text-gray-600" >Welcome back! Here's what happening in your Rental System.</p>

              </div>

              {/*  State Card 1 */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8" >
                  {
                      statsCards.map((card) => (
                            <StatsCard className="hover:shadow-2xl" key={card.title} {...card} />
                      ))
                  }
              </div>

              {/*  State Card 2 */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8" >
                  {
                      statsCardsLong.map((card) => (
                          <StatsCardLong className="hover:shadow-2xl" key={card.title} {...card} />
                      ))
                  }
              </div>

              {/*  Vehicle Rent Target */}
              <div className="bg-white rounded-2xl shadow-2xl p-6 mb-8" >
                  <div className="flex flex-col justify-between mb-4 gap-2">
                        <div className="flex flex-row w-full justify-between mb-4">
                            <p className="font-bold text-xl">Recent Activities</p>
                            <Chip variant="filled" label="Live" sx={{bgcolor:"#90EE90", fontWeight:"bold"}}></Chip>
                        </div>
                      {
                          activityLists.map((item) => (
                              <RecentActivityItem key={item.title} {...item} />
                          ))
                      }
                  </div>
              </div>

          </div>
      </div>
  );
};

export default Dashboard;

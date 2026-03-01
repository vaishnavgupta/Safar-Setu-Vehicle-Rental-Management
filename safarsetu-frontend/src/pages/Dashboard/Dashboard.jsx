import React, {useState} from "react";
import StateCard from "./StateCard.jsx";
import {StateConfig} from "./StateConfig.jsx";
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import {Box, LinearProgress, Tabs, Tab} from "@mui/material";
import CurrentRentalsTab from "./CurrentRentalsTab.jsx";
import ReservationsTab from "./ReservationsTab.jsx";
import RentalsHistoryTab from "./RentalsHistoryTab.jsx";
import RecommendationsTab from "./RecommendationsTab.jsx";

const Dashboard = () => {

    const stateData = StateConfig({
        myRentals: [1, 2, 3],
        reservations: [2,4],
        stats: [2, 8]
    })

    const [activeTab, setActiveTab] = useState(0);

    const handleTabChange = (e, newValue) => {
        setActiveTab(newValue);
    }

  return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-400 to-indigo-600 py-8" >
          <div className="px-4 sm:px-8 lg:px-8" >
              <div className="mb-8 animate-fade-in-up" >
                  <h1 className="text-4xl font-bold text-indigo-800 mb-2" >My <span className="bg-gradient-to-br from-indigo-600 to-purple-400 bg-clip-text text-transparent" >Dashboard</span></h1>

                  <p className="text-lg text-gray-600" >From garage to road — all in one place.</p>

              </div>

            {/*  State Card  */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8" >
                  {
                      stateData.map((item) => (<StateCard
                        bgColor={item.bgColor}
                        textColor={item.textColor}
                        icon={item.icon}
                        subtitle={item.subtitle}
                        title={item.title}
                        key={item.id}
                        value={item.value}
                      />))
                  }
              </div>

            {/*  Vehicle Rent Target */}
              <div className="bg-white rounded-2xl shadow-2xl p-6 mb-8" >
                  <div className="flex items-center justify-between mb-4">
                      <div>
                          <h3 className="text-xl font-bold text-gray-900 mb-1">Vehicle Target</h3>
                          <p className="text-gray-600">
                              {25} of 50 Vehicles Rented
                          </p>
                      </div>
                      <div className="p-3 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-full" >
                            <AutoAwesomeIcon sx={{fontSize: 32, color: "#4F46E5"}} />
                      </div>
                  </div>
                  <LinearProgress variant="determinate" value={30}
                                  sx={{
                                      height: 12,
                                      borderRadius: 6,
                                      backgroundColor: "#E0E7FF",
                                      "& .MuiLinearProgress-bar": {
                                          background: "linear-gradient(90deg, #4F46E5 0%, #9333EA 100%)"
                                      }
                                  }}/>
                  <p className="text-sm text-gray-600 mt-2">
                   70% Complete
                  </p>
              </div>
            {/*  Tab Section  */}
              <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
                    <Box sx={{borderBottom: 1, borderColor: 'divider'}} >
                        <Tabs value={activeTab} onChange={handleTabChange} aria-label="Tabs For Rentals, History, ReservationsTab">
                            <Tab label="Current Rentals" />
                            <Tab label="Reservations" />
                            <Tab label="Rentals History" />
                            <Tab label="Recommendations" />
                        </Tabs>
                    </Box>
                {/*  Current Rentals Tab  */}
                  {activeTab===0 && <CurrentRentalsTab/>}
                  {/*  Reservations Tab  */}
                  {activeTab===1 && <ReservationsTab/>}
                  {/*  Rentals History Tab  */}
                  {activeTab===2 && <RentalsHistoryTab/>}
                  {/*  Recommendations Tab  */}
                  {activeTab===3 && <RecommendationsTab/>}
              </div>
          </div>
      </div>
  )
}

export default Dashboard;
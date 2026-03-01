import React, {useEffect, useState} from 'react';
import {Box, Card, Pagination, Tab, Tabs} from "@mui/material";
import {tabs} from "./constants.js";
import RentalCard from "./RentalCard.jsx";
import toast from "react-hot-toast";
import {getUserRentals} from "../../services/rentalsService.js";
import SearchOffIcon from "@mui/icons-material/SearchOff";

const Rentals = () => {
    const [activeTab, setActiveTab] = React.useState(0);
    const [loading, setLoading] = React.useState(false);
    const [page, setPage] = React.useState(0);
    const [rentalsArr, setRentalsArr] = useState([]);

    const getRentals = async () => {
        setLoading(true);
        try {
            const status = tabs[activeTab].value;
            const response = await getUserRentals(status, page, 5)
            setRentalsArr(response.data.content);
            console.log(response.data);
        }
        catch (error) {
            console.log(error);
            toast.error("Error fetching rental details");
        }
        finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getRentals();
    }, [activeTab, page]);

  return (
    <div className="min-h-screen bg-gradient-to-r from-[rgba(255,240,255,1)] via-[rgba(178,138,242,1)] to-[rgba(47,195,245,1)]">
      <div className="px-4 sm:px-6 lg:px-8 py-8">
           {/*  Header  */}
            <div className="mb-8 bg-gradient-to-br from-indigo-100/60 via-purple-100/60 to-sky-100/60 backdrop-blur-xl text-center flex flex-col justify-center p-8">
                <h1 className="text-4xl font-bold text-gray-900 mb-2">
                    My Vehicle Rentals
                </h1>
                <h3 className="text-lg text-indigo-600 font-bold">
                    Track your active, completed, and overdue vehicle rentals with ease.
                </h3>
            </div>
          {/* Tabs List */}
          <Card className="mb-6">
              <Box sx={{borderBottom:1, borderColor: 'solid'}}>
                <Tabs value={activeTab} onChange={(e, newValue)=>setActiveTab(newValue)} aria-label="Rentals Tab">
                    {
                        tabs.map((tab) => {
                            return <Tab key={tab.label} label={tab.label}/>
                        })
                    }
                </Tabs>
              </Box>
          </Card>

        {/*  Rentals List  */}
          <div className="space-y-4" >
              {
                  rentalsArr.length === 0
                  &&
                  <div className="flex flex-col items-center justify-center gap-2 p-4 bg-gray-50 rounded-md shadow-xl">
                      <SearchOffIcon sx={{width:32, height:32, color:"#4a5565"}} />
                      <p className="text-lg font-bold text-black">No results found!</p>
                      <p className="text-sm font-semibold text-gray-600">Modify Filters</p>
                  </div>
              }
              {rentalsArr.map((rental) => <RentalCard key={rental.id} rental={rental} />)}
          </div>
          {
              rentalsArr.length > 0 && <div className="flex flex-col items-center justify-center p-2">
                  <Pagination
                      count={5}
                      shape="rounded"
                      variant="outlined"
                      color="primary"
                      onChange={(event, value) => setPage(value-1)} />
              </div>
          }
      </div>
    </div>
  );
};

export default Rentals;

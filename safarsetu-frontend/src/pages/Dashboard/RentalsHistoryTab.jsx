import React, {useEffect, useState} from 'react';
import {getUserRentals} from "../../services/rentalsService.js";
import toast from "react-hot-toast";
import CurrentRentalsCard from "./CurrentRentalsCard.jsx";

const RentalsHistoryTab = () => {
    const [loading, setLoading] = useState(false);
    const [rentals, setRentals] = useState([])

    const getRentals = async () => {
        setLoading(true);
        try {
            const respone = await getUserRentals(
                 "RETURNED",0, 20
            )
            setRentals(respone.data.content)
            console.log(respone.data)
        }
        catch (error) {
            toast.error("Error fetching rentals.");
            console.log(error);
        }
        finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getRentals()
    }, [])

  return (
      <div className="p-6">

          <h3 className="mb-6 text-2xl font-bold text-gray-900">
              Vehicles You've Previously Rented
          </h3>

          <div className="space-y-4">
              {/*  Current Rentals Card  */}
              {
                  rentals.length===0 && (<div className='text-indigo-600 text-lg font-bold '>No Rentals Found</div>)
              }
              {
                  rentals && rentals.map((rental) => {
                      return (
                          <CurrentRentalsCard rental={rental} key={rental.id}/>
                      )
                  })
              }
          </div>

      </div>
  );
};

export default RentalsHistoryTab;

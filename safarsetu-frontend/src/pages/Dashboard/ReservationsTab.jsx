import React, {useEffect} from 'react';
import {getUserRentals} from "../../services/rentalsService.js";
import toast from "react-hot-toast";
import ReservationCard from "../Reservations/ReservationCard.jsx";
import {getCurrentReservations} from "../../services/reservationsService.js";

const ReservationsTab = () => {
    const [loading, setLoading] = React.useState(false);
    const [currentReservations, setCurrentReservations] = React.useState([]);

    const getActiveRentals = async () => {
        setLoading(true);
        try {
            const respone = await getCurrentReservations()
            setCurrentReservations(respone.data.content)
            console.log(respone);
        }
        catch (error) {
            toast.error("Error fetching current reservations.");
            console.log(error);
        }
        finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getActiveRentals()
    }, [])
  return (
      <div className="p-6">

          <h3 className="mb-6 text-2xl font-bold text-gray-900">
              Your Current Reservations
          </h3>

          <div className="space-y-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {/*  Current Rentals Card  */}
              {
                  currentReservations.length===0 && (<div className='text-indigo-600 text-lg font-bold '>No Active Reservations Found</div>)
              }
              {
                  currentReservations && currentReservations.map((reservation, index) => {
                      return (
                          <ReservationCard reservation={reservation} key={index}/>
                      )
                  })
              }
          </div>

      </div>
  );
};

export default ReservationsTab;

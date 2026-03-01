import React, {useEffect} from "react";
import CurrentRentalsCard from "./CurrentRentalsCard.jsx";
import {getUserRentals} from "../../services/rentalsService.js";
import toast from "react-hot-toast";

const CurrentRentalsTab = () => {

    const [loading, setLoading] = React.useState(false);
    const [activeRentals, setActiveRentals] = React.useState([]);

    const getActiveRentals = async () => {
        setLoading(true);
        try {
            const respone = await getUserRentals(
                'ACTIVE', 0, 20
            )
            setActiveRentals(respone.data.content)
            console.log(respone);
        }
        catch (error) {
            toast.error("Error fetching active rentals.");
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
                Vehicles You've Currently Rented
            </h3>

            <div className="space-y-4">
                {/*  Current Rentals Card  */}
                {
                    activeRentals.length===0 && (<div className='text-indigo-600 text-lg font-bold '>No Active Rentals Found</div>)
                }
                {
                    activeRentals && activeRentals.map((rental, index) => {
                        return (
                            <CurrentRentalsCard rental={rental} key={index}/>
                        )
                    })
                }
            </div>

        </div>
    )
}

export default CurrentRentalsTab;
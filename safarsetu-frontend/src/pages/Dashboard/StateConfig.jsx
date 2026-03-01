import CarRentalIcon from "@mui/icons-material/CarRental";
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import HistoryIcon from '@mui/icons-material/History';

export const StateConfig = ( {myRentals, reservations, stats} ) =>
    [
        {
            id: "rentals",
            title: "Current Rentals",
            subtitle: "Vehicles you have rented",
            value: myRentals.length,
            icon: <CarRentalIcon sx={{fontSize: 32, color: "#4F46E5"}} />,
            bgColor: "bg-indigo-100",
            textColor: "text-indigo-600"
        },
        {
            id: "reservations",
            title: "ReservationsTab",
            subtitle: "Vehicles on hold",
            value: reservations?.length || 0,
            icon: <EventAvailableIcon sx={{fontSize: 32, color: "#9333EA"}} />,
            bgColor: "bg-purple-100",
            textColor: "text-purple-600"
        },
        {
            id: "read",
            title: "Vehicles Used",
            subtitle: "This year",
            value: myRentals.length,
            icon: <HistoryIcon sx={{fontSize: 32, color: "#9333EA"}} />,
            bgColor: "bg-green-200",
            textColor: "text-purple-600"
        },
    ]



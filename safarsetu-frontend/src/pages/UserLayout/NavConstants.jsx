import SpaceDashboardIcon from "@mui/icons-material/SpaceDashboard";
import CommuteIcon from '@mui/icons-material/Commute';
import EventNoteIcon from '@mui/icons-material/EventNote';
import BookmarksIcon from '@mui/icons-material/Bookmarks';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import LoyaltyIcon from '@mui/icons-material/Loyalty';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import InfoIcon from '@mui/icons-material/Info';

import React from 'react';

    export const secondaryConstants = [
        {
            title: "Profile",
            description: "User Profile",
            path: "/profile",
            icon: <ManageAccountsIcon />
        },
        {
            title: "About Us",
            description: "Explore About Us",
            path: "/about-us",
            icon: <InfoIcon />
        },
    ]

    export const NavConstants = [
        {
            title: "Dashboard",
            description: "User Dashboard",
            path: "/dashboard",
            icon: <SpaceDashboardIcon />
        },
        {
            title: "Browse Vehicles",
            description: "Explore Vehicles",
            path: "/vehicles",
            icon: <CommuteIcon />
        },
        {
            title: "My Rentals",
            path: "/rentals",
            description: "Vehicle Rentals",
            icon: <EventNoteIcon />
        },
        {
            title: "My Reservations",
            description: "Reservations Rentals",
            icon: <BookmarksIcon />,
            path: "/my-reservations"
        },
        {
            title: "My Fines",
            description: "Rentals Fines",
            icon: <ReceiptLongIcon />,
            path: "/my-fines"
        },
        {
            title: "Subscriptions",
            description: "Manage Subscriptions",
            icon: <LoyaltyIcon />,
            path: "/subscriptions"
        },

    ];



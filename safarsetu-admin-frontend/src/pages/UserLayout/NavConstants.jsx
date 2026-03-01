import SpaceDashboardIcon from "@mui/icons-material/SpaceDashboard";
import CommuteIcon from '@mui/icons-material/Commute';
import EventNoteIcon from '@mui/icons-material/EventNote';
import BookmarksIcon from '@mui/icons-material/Bookmarks';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import LoyaltyIcon from '@mui/icons-material/Loyalty';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import CategoryIcon from '@mui/icons-material/Category';

import React from 'react';

    export const secondaryConstants = [
        {
            title: "Profile",
            description: "Admin Profile",
            path: "/profile",
            icon: <ManageAccountsIcon />
        },
    ]

    export const NavConstants = [
        {
            title: "Dashboard",
            description: "Admin Dashboard",
            path: "/dashboard",
            icon: <SpaceDashboardIcon />
        },
        {
            title: "Vehicles",
            description: "Manage Vehicles",
            path: "/vehicles",
            icon: <CommuteIcon />
        },
        {
            title: "Vehicle Rentals",
            path: "/rentals",
            description: "Manage Vehicle Rentals",
            icon: <EventNoteIcon />
        },
        {
            title: "Reservations",
            description: "Manage Reservations",
            icon: <BookmarksIcon />,
            path: "/reservations"
        },
        {
            title: "Fines",
            description: "Manage Fines",
            icon: <ReceiptLongIcon />,
            path: "/my-fines"
        },
        {
            title: "Category",
            description: "Manage Vehicle Category",
            icon: <CategoryIcon />,
            path: "/category"
        },
        {
            title: "Users",
            description: "Manage Users",
            icon: <PeopleAltIcon />,
            path: "/users"
        },
        {
            title: "Subscriptions",
            description: "Manage Subscriptions",
            icon: <LoyaltyIcon />,
            path: "/subscriptions"
        },

    ];



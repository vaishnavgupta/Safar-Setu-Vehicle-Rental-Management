import React from "react";
import ChecklistIcon from '@mui/icons-material/Checklist';
import ToggleOnIcon from '@mui/icons-material/ToggleOn';
import DoneAllIcon from '@mui/icons-material/DoneAll';

export const tabsArray = [
    {
        label: "All Reservations",
        icon: <ChecklistIcon className="w-5 h-5"/>
    },
    {
        label:"Active",
        icon: <ToggleOnIcon className="w-5 h-5"/>
    },
    {
        label: "Completed",
        icon: <DoneAllIcon className="w-5 h-5"/>
    }
]
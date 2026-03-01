import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import AssignmentIcon from '@mui/icons-material/Assignment';
import GroupIcon from '@mui/icons-material/Group';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import CommuteIcon from '@mui/icons-material/Commute';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import GavelIcon from '@mui/icons-material/Gavel';
import SubscriptionsIcon from '@mui/icons-material/Subscriptions';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import HowToRegIcon from '@mui/icons-material/HowToReg';

export const statsCards = [
    {
        title: "Manage Garage Vehicle",
        value: "9",
        subtitle: "In garage",
        trend: "+12% from last month",
        icon: CommuteIcon,
        bgClass: "from-purple-500 to-indigo-600",
        iconBgClass: "bg-purple-400/40",
        trendClass: "text-green-200",
    },
    {
        title: "Active Loans",
        value: "14",
        subtitle: "10 overdue",
        trend: "+8% from last month",
        icon: AssignmentIcon,
        bgClass: "from-green-500 to-emerald-600",
        iconBgClass: "bg-green-400/40",
        trendClass: "text-green-200",
    },
    {
        title: "Total Users",
        value: "9",
        subtitle: "Registered members",
        trend: "+23% from last month",
        icon: GroupIcon,
        bgClass: "from-sky-400 to-blue-600",
        iconBgClass: "bg-sky-300/40",
        trendClass: "text-green-200",
    },
    {
        title: "Revenue",
        value: "$5,158",
        subtitle: "This month",
        trend: "+15% from last month",
        icon: CreditCardIcon,
        bgClass: "from-orange-400 to-amber-500",
        iconBgClass: "bg-orange-300/40",
        trendClass: "text-yellow-100",
    },
];

export const statsCardsLong = [
    {
        title: "Active Subscriptions",
        value: "13",
        icon: SubscriptionsIcon,
        bgClass: "from-purple-500 to-indigo-400",
    },
    {
        title: "Pending Reservations",
        value: "4",
        icon: BookmarkIcon,
        bgClass: "from-pink-400 to-rose-300",
    },
    {
        title: "Pending Fines",
        value: "Rs. 560.45",
        icon: ReceiptLongIcon,
        bgClass: "from-blue-400 to-cyan-300",
    },
];

export const activityTypeConfig = {
    Rental: {
        icon: DirectionsCarIcon,
        bgClass: "from-blue-500 to-indigo-500",
        chipClass: "bg-blue-100 text-blue-700",
        label: "Rental",
    },
    Fine: {
        icon: GavelIcon,
        bgClass: "from-red-500 to-rose-500",
        chipClass: "bg-red-100 text-red-700",
        label: "Fine",
    },
    Subscription: {
        icon: SubscriptionsIcon,
        bgClass: "from-purple-500 to-violet-500",
        chipClass: "bg-purple-100 text-purple-700",
        label: "Subscription",
    },
    Reservation: {
        icon: BookmarkIcon,
        bgClass: "from-pink-400 to-rose-300",
        chipClass: "bg-pink-100 text-pink-700",
        label: "Reservation",
    },
    Register: {
        icon: HowToRegIcon,
        bgClass: "from-green-400 to-emerald-500",
        chipClass: "bg-green-100 text-green-700",
        label: "Register",
    },
};

export const activityLists = [
    {
        type: "Rental",
        description: "Ravi Kushwah rented Honda Aviator",
        time: "1 hours ago"
    },
    {
        type: "Fine",
        description: "Aditi Singh got a fine of Rs. 250",
        time: "3 hours ago"
    },
    {
        type: "Subscription",
        description: "Deepanshi Singhal subscribed to Gold Membership",
        time: "4 hours ago"
    },
    {
        type: "Register",
        description: "Soham Varshney registerd on Safar Setu",
        time: "4 hours ago"
    }
]
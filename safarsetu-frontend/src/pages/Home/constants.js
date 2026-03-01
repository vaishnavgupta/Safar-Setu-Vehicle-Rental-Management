import SearchIcon from '@mui/icons-material/Search';
import EventAvailableIcon from '@mui/icons-material/EventAvailable'
import PaymentIcon from '@mui/icons-material/Payment';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import CarRentalIcon from '@mui/icons-material/CarRental';
import SecurityIcon from '@mui/icons-material/Security';
import CommuteIcon from '@mui/icons-material/Commute';
import PeopleIcon from '@mui/icons-material/People';
import MilitaryTechIcon from '@mui/icons-material/MilitaryTech';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';

export const homeFeatures = [
    {
        id: 1,
        title: "Smart Vehicle Search",
        description:
            "Find your perfect ride with advanced filters. Search by model, brand, category, or availability in seconds.",
        icon: SearchIcon,
        cardBg: "bg-indigo-50 hover:bg-indigo-100",
        iconBg: "bg-indigo-500/10",
        iconColor: "text-indigo-600"
    },
    {
        id: 2,
        title: "Instant Reservations",
        description:
            "Reserve vehicles online and schedule pickups at your convenience with real-time availability updates.",
        icon: EventAvailableIcon,
        cardBg: "bg-blue-50 hover:bg-blue-100",
        iconBg: "bg-blue-500/10",
        iconColor: "text-blue-600"
    },
    {
        id: 3,
        title: "Secure Payments",
        description:
            "Integrated and secure payment gateway for subscriptions, rentals, and fines with multiple payment options.",
        icon: PaymentIcon,
        cardBg: "bg-purple-50 hover:bg-purple-100",
        iconBg: "bg-purple-500/10",
        iconColor: "text-purple-600"
    },
    {
        id: 4,
        title: "Digital Membership",
        description:
            "Manage your subscriptions, rental history, and membership benefits digitally in one place.",
        icon: WorkspacePremiumIcon,
        cardBg: "bg-pink-50 hover:bg-pink-100",
        iconBg: "bg-pink-500/10",
        iconColor: "text-pink-600"
    },
    {
        id: 5,
        title: "Personal Garage",
        description:
            "Track your active rentals, reservations, and saved vehicles for a personalized experience.",
        icon: CarRentalIcon,
        cardBg: "bg-emerald-50 hover:bg-emerald-100",
        iconBg: "bg-emerald-500/10",
        iconColor: "text-emerald-600"
    },
    {
        id: 6,
        title: "Safe & Secure",
        description:
            "Your data is encrypted and protected with industry-standard security and privacy measures.",
        icon: SecurityIcon,
        cardBg: "bg-orange-50 hover:bg-orange-100",
        iconBg: "bg-orange-500/10",
        iconColor: "text-orange-600"
    }
];

export const homeNumberFeatures = [
    {
        id: 1,
        title: "100",
        description:
            "Vehicles Available",
        icon: CommuteIcon,
        cardBg: "bg-indigo-50 hover:bg-indigo-100",
        iconBg: "bg-indigo-500/10",
        iconColor: "text-indigo-600",
        symbol: "+"
    },
    {
        id: 2,
        title: "800",
        description:
            "Active Members",
        icon: PeopleIcon,
        cardBg: "bg-emerald-50 hover:bg-emerald-100",
        iconBg: "bg-emerald-500/10",
        iconColor: "text-emerald-600",
        symbol: "+"
    },
    {
        id: 3,
        title: "5",
        description:
            "Awards Won",
        icon: MilitaryTechIcon,
        cardBg: "bg-orange-50 hover:bg-orange-100",
        iconBg: "bg-orange-500/10",
        iconColor: "text-orange-600",
        symbol: "+"
    },
    {
        id: 1,
        title: "92",
        description:
            "Satisfaction Rate",
        icon: TrendingUpIcon,
        cardBg: "bg-pink-50 hover:bg-pink-100",
        iconBg: "bg-pink-500/10",
        iconColor: "text-pink-600",
        symbol: "%"
    },
];

export const homeReviewFeatures = [
    {
        id: 1,
        username: "Aarav Sharma",
        rating: 4.5,
        review:
            "Safar Setu made my daily commute effortless. The booking process is smooth, vehicles are well-maintained, and the subscription plans are truly worth it!",
        imgUrl: "https://randomuser.me/api/portraits/men/32.jpg"
    },
    {
        id: 2,
        username: "Priya Verma",
        rating: 4,
        review:
            "I love how easy it is to reserve a vehicle and track my rentals. The interface is clean and the customer support is very responsive.",
        imgUrl: "https://randomuser.me/api/portraits/women/44.jpg"
    },
    {
        id: 3,
        username: "Rohan Mehta",
        rating: 5,
        review:
            "From secure payments to timely notifications, everything feels premium. Safar Setu has completely simplified my weekend travel plans.",
        imgUrl: "https://randomuser.me/api/portraits/men/65.jpg"
    }
];
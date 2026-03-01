import './App.css'
import Dashboard from "./pages/Dashboard/Dashboard.jsx";
import {Routes, Route, Outlet} from "react-router";
import UserLayout from "./pages/UserLayout/UserLayout.jsx";
import Rentals from "./pages/Rentals/Rentals.jsx";
import Reservations from "./pages/Reservations/Reservations.jsx";
import MyFines from "./pages/MyFine/MyFines.jsx";
import Subscriptions from "./pages/Subscriptions/Subscriptions.jsx";
import Vehicles from "./pages/Vehicles/Vehicles.jsx";
import ProfilePage from "./pages/Profile/ProfilePage.jsx";
import AboutUsPage from "./pages/AboutUs/AboutUsPage.jsx";
import HomePage from "./pages/Home/HomePage.jsx";
import LoginPage from "./pages/Login/LoginPage.jsx";
import SignUpPage from "./pages/SignUp/SignUpPage.jsx";
import OAuthSuccess from "./pages/Login/OAuthSuccess.jsx";
import {Toaster} from "react-hot-toast";
import SaathiAiPage from "./pages/SaathiAI/SaathiAiPage.jsx";
import PaymentSuccess from "./pages/Payment/PaymentSuccess.jsx";
import ProtectedRoute from "./routes/ProtectedRoute.jsx";
import PublicRoute from "./routes/PublicRoute.jsx";


function App() {

  return (
    <>
        <Toaster position="top-center"/>
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route element={<PublicRoute/>}>
                <Route path="/login" element={<LoginPage/>} />
                <Route path="/sign-up" element={<SignUpPage/>} />
            </Route>
            <Route path="/oauth-success" element={<OAuthSuccess/>} />
            <Route path="/saathi-ai" element={<SaathiAiPage/>} />
            <Route path="/payment-success/:id" element={ <PaymentSuccess /> } />
            <Route element={<ProtectedRoute/>}>
                <Route element={<UserLayout/>} >
                    {/* User Routes */}
                    <Route path="/dashboard" element={<Dashboard/>} />
                    <Route path="/vehicles" element={<Vehicles/>} />
                    <Route path="/rentals" element={<Rentals/>} />
                    <Route path="/my-reservations" element={<Reservations/>} />
                    <Route path="/my-fines" element={<MyFines/>} />
                    <Route path="/subscriptions" element={<Subscriptions/>} />
                    <Route path="/profile" element={<ProfilePage/>} />
                    <Route path="/about-us" element={<AboutUsPage/>} />
                </Route>
            </Route>
        </Routes>
    </>
  )
}

export default App

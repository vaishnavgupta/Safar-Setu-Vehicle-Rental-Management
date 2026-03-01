import {Toaster} from "react-hot-toast";
import {Routes, Route} from "react-router";
import UserLayout from "./pages/UserLayout/UserLayout.jsx";
import Dashboard from "./pages/Dashboard/Dashboard.jsx"
import Vehicle from "./pages/Vehicle/Vehicle.jsx";
import Users from "./pages/Users/Users.jsx";
import VehicleRental from "./pages/VehicleRentals/VehicleRental.jsx";
import Reservations from "./pages/Reservations/Reservations.jsx";
import Subscriptions from "./pages/Subscriptions/Subscriptions.jsx";
import Category from "./pages/Category/Category.jsx";
import Home from "./pages/LoginHome/Home.jsx";
import ProtectedRoute from "./routes/ProtectedRoute.jsx";
import Profile from "./pages/Profile/Profile.jsx";

function App() {

  return (
    <>
        <Toaster position="top-center" />
        <Routes>
            <Route path="/" element={<Home />} />
            <Route element={<ProtectedRoute/>}>
                <Route element={<UserLayout/>} >
                    {/* Admin Routes */}
                    <Route path="/dashboard" element={<Dashboard/>} />
                    <Route path="/vehicles" element={<Vehicle/>} />
                    <Route path="/users" element={<Users/>} />
                    <Route path="/rentals" element={<VehicleRental/>} />
                    <Route path="/reservations" element={<Reservations/>} />
                    <Route path="/subscriptions" element={<Subscriptions/>} />
                    <Route path="/category" element={<Category/>} />
                    <Route path="/profile" element={<Profile/>} />
                </Route>
            </Route>
        </Routes>
    </>
  )
}

export default App

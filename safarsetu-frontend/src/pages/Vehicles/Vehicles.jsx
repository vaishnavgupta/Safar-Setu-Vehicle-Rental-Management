import React, {useEffect, useState} from 'react';
import CategoryFilter from "./CategoryFilter.jsx";
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import {Backdrop, InputAdornment, Pagination, TextField} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import SwapVertIcon from '@mui/icons-material/SwapVert';
import VehicleCard from "./VehicleCard.jsx";
import toast from "react-hot-toast";
import SearchOffIcon from '@mui/icons-material/SearchOff';
import {getVehicleCategory} from "../../services/vehicleCategoryService.js";
import {getVehicleWithFilters} from "../../services/vehiclesService.js";
import VehicleDetailDialog from "./VehicleDetailDialog.jsx";
import {checkoutVehicleRequest} from "../../services/vehicleRentalsService.js";
import Loader from "../../components/Loader.jsx";

const Vehicles = () => {

    const [categoryId, setCategoryId] = useState(null);
    const [availability, setAvailability] = useState('ALL');
    const [searchTerm, setSearchTerm] = useState("");
    const [sortDirection, setSortDirection] = useState("DESC");
    const [sortField, setSortField] = useState("createdAt");
    const [page, setPage] = useState(0);
    const [vehicleArray, setVehicleArray] = useState([]);
    const [categoryArray, setCategoryArray] = useState([]);
    const [loading, setLoading] = useState(false);
    const [detailDialog, setDetailDialog] = useState({open: false, vehicle: null});
    const [rentalLoading, setRentalLoading] = useState(false);

    const handleCategoryChange = (event) => {
        const id = event.target.value;
        setCategoryId(id)
        console.log("Selected category: ", id);
    }

    const handleSortChange = (value) => {
        const [field, direction] = value.split('-');
        setSortDirection(direction);
        setSortField(field);
    }

    const getCurrentSortValue = () => {
        return `${sortField}-${sortDirection.toLowerCase()}`;
    }

    const fetchVehicleCategory = async () => {
        try {
            setLoading(true);
            const response = await getVehicleCategory();
            setCategoryArray(response.data);
            console.log(response.data);
        }
        catch (error) {
            console.error(error);
            toast("Error fetching vehicle categories");
        }
        finally {
            setLoading(false);
        }
    }

    const fetchVehiclesWithFilters = async () => {
        const data = {
            "searchTerm": searchTerm,
            "vehicleCategoryId" : categoryId,
            "availableOnly" : availability!=="ALL",
            "page" : page,
            "sortOrder": sortDirection,
            "sortBy": sortField,
        }
        console.log(data)
        try {
            setLoading(true);
            const response = await getVehicleWithFilters(data);
            setVehicleArray(response.data.content)
        }
        catch (error) {
            toast.error("Error fetching vehicles")
            console.error(error);
        }
        finally {
            setLoading(false);
        }
    }

    const handleRentClick = async ({vehicle, returnDays, notes}) => {
        setRentalLoading(true);
        try {
            const payload = {
                vehicleId: vehicle.id,
                returnDays: parseInt(returnDays),
                notes: notes
            };
            console.log("Payload types:", {
                vehicleId: typeof payload.vehicleId,    // should be "number"
                returnDays: typeof payload.returnDays,  // should be "number"
                notes: typeof payload.notes             // should be "string"
            });
            const response = await checkoutVehicleRequest(payload)
            console.log(response.data)
            toast.success("Vehicle Rental Activated Successfully")
        }
        catch (error) {
            console.log("Error response data:", error.response?.data);  // ← add this
            toast.error(error.response?.data?.message || error.message)
        }
        finally {
            setRentalLoading(false);
        }
    }

    useEffect(() => {
        fetchVehicleCategory();
    }, []);

    useEffect(() => {
        fetchVehiclesWithFilters();
    }, [categoryId, searchTerm, sortDirection, sortField, page, availability]);

  return (
    <div className="min-h-screen bg-gradient-to-r from-[rgba(255,240,255,1)] via-[rgba(178,138,242,1)] to-[rgba(47,195,245,1)]">
        {/* Header */}
        <div className="bg-gradient-to-br from-indigo-100/60 via-purple-100/60 to-sky-100/60 backdrop-blur-xl
 text-center" >
            <div className="px-4 sm:px-6 lg:px-8 py-8" >
                <div className="text-4xl font-bold text-gray-900 mb-2">
                    <h2>Browse Our {" "}<span
                        className="bg-gradient-to-br from-indigo-500 via-purple-400 to-blue-600 bg-clip-text text-transparent"
                    >
                        Vehicles
                    </span> </h2>
                    <p className="text-lg text-indigo-600 mt-2 font-bold">
                        Find your perfect riding partner from our collection
                    </p>
                </div>
            </div>
        </div>

        {/*Dialog*/}
        <VehicleDetailDialog
            open={detailDialog.open}
            vehicle={detailDialog.vehicle}
            onClose={() => setDetailDialog({open: false, vehicle: null})}
            onRent={handleRentClick}
        />

        {/*  Main Content  */}
        <div className="px-4 sm:px-6 lg:px-8 py-8" >
            <div className="flex flex-col lg:flex-row gap-8" >
                {/*  Sidebar - For Filter  */}
                <aside className="lg:w-72 space-y-6" >
                    {/*  Filter Container  */}
                    <div className="space-y-6" >
                        {/* Category Filter */}
                        <CategoryFilter categories={categoryArray} selectedCategoryId={categoryId} onCategorySelect={handleCategoryChange}/>

                        {/*  Availabilities Filter  */}
                        <div className="bg-white rounded-xl shadow-md p-4 border border-gray-200" >
                            <h3 className="text-lg font-bold text-gray-900 border-b mb-4 pb-3 border-gray-200">Availability</h3>
                            <Box sx={{ minWidth: 120 }}>
                                <FormControl fullWidth>
                                    <Select
                                        id="availability"
                                        value={availability}
                                        onChange={ (e) => setAvailability(e.target.value) }
                                        variant="filled"
                                    >
                                        <MenuItem value={"AVAILABLE"}>Available Only</MenuItem>
                                        <MenuItem value={"NOT_AVAILABLE"}>Not Available</MenuItem>
                                        <MenuItem value={"ALL"}>All Vehicles</MenuItem>
                                    </Select>
                                </FormControl>
                            </Box>
                    </div>

                        {/*  Pagination  */}
                        <div className="bg-white rounded-xl shadow-md py-4 border border-gray-200 flex flex-col items-center justify-center gap-2">
                            <p className="font-bold">Page Number</p>
                            <Pagination
                                count={5}
                                shape="rounded"
                                variant="outlined"
                                color="primary"
                                onChange={(event, value) => setPage(value-1)} />
                        </div>
                    </div>
                </aside>
                {/*  Main Content Area  */}
                <main className="flex-1 space-y-6 ">
                    <div className="flex flex-col md:flex-row gap-6 bg-white rounded-xl shadow-md p-4 border border-gray-200">
                        {/*  Search Input  */}
                        <TextField
                            fullWidth
                            placeholder="Search by model, brand or category..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <SearchIcon className="text-gray-400" />
                                    </InputAdornment>
                                ),
                            }}
                            sx={{
                                '&.MuiOutlinedInput-notchedOutline' : {
                                    borderColor: '#E5E7EB'
                                },
                                '&:hover .MuiOutlinedInput-notchedOutline' : {
                                    borderColor: '#4F46E5'
                                },
                                '&.Mui-focused .MuiOutlinedInput-notchedOutline' : {
                                    borderColor: '#4F46E5'
                                },
                            }}
                        >
                        </TextField>
                        {/*  Sort Dropdown  */}
                        <div className="md:w-64">
                            <FormControl fullWidth>
                                <InputLabel>Sort By</InputLabel>
                                <Select
                                    variant="outlined"
                                    value={getCurrentSortValue()}
                                    onChange={(e) => handleSortChange(e.target.value)}
                                    label="Sort By"
                                    startAdornment={
                                        <InputAdornment position="start"> <SwapVertIcon className="text-gray-400"/> </InputAdornment>
                                    }
                                    sx={{
                                        '&.MuiOutlinedInput-notchedOutline' : {
                                            borderColor: '#E5E7EB'
                                        },
                                        '&:hover .MuiOutlinedInput-notchedOutline' : {
                                            borderColor: '#4F46E5'
                                        },
                                        '&.Mui-focused .MuiOutlinedInput-notchedOutline' : {
                                            borderColor: '#4F46E5'
                                        },
                                    }}
                                >
                                    <MenuItem value="modelName-asc">Model (A-Z)</MenuItem>
                                    <MenuItem value="modelName-desc">Model (Z-A)</MenuItem>
                                    <MenuItem value="brand-asc">Brand (A-Z)</MenuItem>
                                    <MenuItem value="brand-desc">Brand (Z-A)</MenuItem>
                                    <MenuItem value="createdAt-desc">Newest First</MenuItem>
                                    <MenuItem value="createdAt-asc">Oldest First</MenuItem>
                                </Select>
                            </FormControl>
                        </div>
                    </div>
                    {/*  Vehicles Card Section */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-gray-600 " >
                        {
                            !loading && vehicleArray.length===0
                            &&
                            <div className="flex flex-col items-center justify-center gap-2 p-4 bg-gray-50 rounded-md shadow-xl">
                                <SearchOffIcon sx={{width:32, height:32, color:"#4a5565"}} />
                                <p className="text-lg font-bold text-black">No results found!</p>
                                <p className="text-sm font-semibold text-gray-600">Modify Filters</p>
                            </div>
                        }
                        {
                            loading && [1,2,3].map((item) => {
                                return <VehicleCard loading={loading} key={item} />
                            })
                        }
                        {!loading && vehicleArray.map((vehicle) => {
                            return <VehicleCard
                                key={vehicle.id}
                                vehicle={vehicle}
                                onViewClick={() => setDetailDialog({open: true, vehicle: vehicle})}/>;
                        })}
                    </div>
                </main>
            </div>
        </div>

        {/*  Loader  */}
        {rentalLoading && (
            <Backdrop
                sx={{
                    color: '#6366f1', // Indigo-600
                    zIndex: (theme) => theme.zIndex.drawer + 1,
                    backgroundColor: 'rgba(255, 255, 255, 0.4)',
                    backdropFilter: 'blur(8px)',
                }}
                open={rentalLoading}>
                <Loader text="Cold starting your vehicle..." />
            </Backdrop>
        )}
    </div>
  );
};

export default Vehicles;

import React, {useEffect, useState} from 'react';
import {
    Button,
    Chip, CircularProgress,
    FormControl,
    IconButton,
    InputAdornment,
    InputLabel,
    MenuItem,
    Select,
    TextField
} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import SwapVertIcon from '@mui/icons-material/SwapVert';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import AddIcon from "@mui/icons-material/Add";
import DangerousIcon from "@mui/icons-material/Dangerous";
import toast from "react-hot-toast";
import {getVehicleWithFilters} from "../../services/vehicleService.js";
import {getAllCategory} from "../../services/categoryService.js";
import VehicleAddDialog from "./VehicleAddDialog.jsx";
import VehicleUpdateDialog from "./VehicleUpdateDialog.jsx";
import VehicleDeleteDialog from "./VehicleDeleteDialog.jsx";

const Vehicle = () => {

    const [categoryId, setCategoryId] = useState(1);
    const [availability, setAvailability] = useState('ALL');
    const [searchTerm, setSearchTerm] = useState("");
    const [sortDirection, setSortDirection] = useState("DESC");
    const [sortField, setSortField] = useState("createdAt");
    const [page, setPage] = useState(0);
    const [vehicleArray, setVehicleArray] = useState([]);
    const [categoryArray, setCategoryArray] = useState([]);
    const [loading, setLoading] = useState(false);
    const [addOpen, setAddOpen] = useState(false);
    const [updateOpen, setUpdateOpen] = useState({open:false, vehicle:null});
    const [deleteOpen, setDeleteOpen] = useState({open:false, vehicle:null});

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
            const response = await getAllCategory();
            setCategoryArray(response.data);
            console.log(response.data);
        }
        catch (error) {
            console.error(error);
            toast.error("Error fetching vehicle categories");
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

    const updateVehicleDetail = (vehicle) => {
        setUpdateOpen({open:true, vehicle:vehicle});
    }

    const deleteVehicleDetail = (vehicle) => {
        setDeleteOpen({open:true, vehicle:vehicle});
    }

    useEffect(() => {
        fetchVehicleCategory();
    }, []);

    useEffect(() => {
        fetchVehiclesWithFilters();
    }, [categoryId, searchTerm, sortDirection, sortField, page, availability, addOpen, updateOpen.open, deleteOpen.open]);

  return (
    <div className="min-h-screen bg-white py-8">
        <div className="px-4 sm:px-8 lg:px-8" >
            <div className="mb-8 animate-fade-in-up flex items-center justify-between" >
                <div className="flex flex-col">
                    <h1 className="text-4xl font-bold text-gray-800 mb-2" >Vehicle Management</h1>

                    <p className="text-lg text-gray-600" >Manage your garage's vehicles.</p>
                </div>
                <Button variant="contained"  startIcon={<AddIcon/>} onClick={() => setAddOpen(true)}>
                    Add New Vehicle
                </Button>
            </div>
            <VehicleAddDialog open={addOpen} onClose={() => setAddOpen(false)}/>
            <VehicleUpdateDialog open={updateOpen.open} onClose={() => setUpdateOpen({open: false, vehicle:null} ) } vehicle={updateOpen.vehicle}/>
            <VehicleDeleteDialog open={deleteOpen.open} onClose={() => setDeleteOpen({open:false, vehicle:null})} vehicle={deleteOpen.vehicle}/>
            {/*  Filters  */}
            <div className="flex flex-wrap items-center gap-3 mb-8 p-4 bg-gray-50 rounded-2xl border border-gray-200 shadow-sm">

                {/*  Search Input  */}
                <div className="flex-1 min-w-[220px]">
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
                    />
                </div>

                {/*  Category Filter  */}
                <div className="min-w-[160px]">
                    <Select
                        fullWidth
                        label="Vehicle Category"
                        value={categoryId}
                        onChange={handleCategoryChange}
                        variant="outlined"
                    >
                        <MenuItem value={null} >All</MenuItem>
                        {
                            categoryArray.map((category) => {
                                return <MenuItem key={category.id} value={category.id}>{category.name}</MenuItem>
                            })
                        }
                    </Select>
                </div>

                {/*  Availability Filter  */}
                <div className="min-w-[160px]">
                    <FormControl fullWidth>
                        <Select
                            id="availability"
                            value={availability}
                            onChange={(e) => setAvailability(e.target.value)}
                            variant="outlined"
                            displayEmpty
                        >
                            <MenuItem value={"AVAILABLE"}>Available Only</MenuItem>
                            <MenuItem value={"NOT_AVAILABLE"}>Not Available</MenuItem>
                            <MenuItem value={"ALL"}>All Vehicles</MenuItem>
                        </Select>
                    </FormControl>
                </div>

                {/*  Sort Dropdown  */}
                <div className="min-w-[180px]">
                    <FormControl fullWidth>
                        <InputLabel>Sort By</InputLabel>
                        <Select
                            variant="outlined"
                            value={getCurrentSortValue()}
                            onChange={(e) => handleSortChange(e.target.value)}
                            label="Sort By"
                            startAdornment={
                                <InputAdornment position="start">
                                    <SwapVertIcon className="text-gray-400" />
                                </InputAdornment>
                            }
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

                <Button variant="outlined" color="error" size="medium" endIcon={<DangerousIcon/>}>
                    Clear
                </Button>
            </div>

            {/*   Table Header     */}

            <div className="w-full overflow-x-auto rounded-xl shadow-sm border border-gray-200 text-center py-2">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                    <tr>
                        {["Cover", "Model", "Brand", "Reg. No", "Category", "Total Units", "Available", "Actions"].map((col) => (
                            <th
                                key={col}
                                className="px-4 py-3  text-center text-xs font-semibold text-gray-500 uppercase tracking-wider whitespace-nowrap"
                            >
                                {col}
                            </th>
                        ))}
                    </tr>
                    </thead>
                    {
                        !loading && <tbody className="bg-white divide-y divide-gray-100 text-center">
                        {
                            vehicleArray.map((vehicle) => {
                                return <tr >
                                    <td>
                                        <img src={vehicle.vehicleImageUrl ? vehicle.vehicleImageUrl : "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/330px-No_image_available.svg.png"} className="w-50 h-20 p-2" alt={vehicle.modelName} />
                                    </td>
                                    <td>
                                        <p className="font-bold">{vehicle.modelName}</p>
                                    </td>
                                    <td>
                                        <p className="font-bold">{vehicle.brand}</p>
                                    </td>
                                    <td>
                                        <p className="font-bold">{vehicle.registrationNumber}</p>
                                    </td>
                                    <td>
                                        <div>
                                            <Chip variant="outlined" color="primary" sx={{fontWeight:"bold"}} label={vehicle.categoryName}></Chip>
                                        </div>
                                    </td>
                                    <td>
                                        <p className="font-bold">{vehicle.totalUnits}</p>
                                    </td>
                                    <td>
                                        <Chip variant="filled" color="error" label={vehicle.availableUnits}></Chip>
                                    </td>
                                    <td>
                                        <div className="flex gap-2 justify-center">
                                            <IconButton
                                                aria-label="edit"
                                                onClick={() => updateVehicleDetail(vehicle)}
                                            >
                                                <EditIcon sx={{color:"#4169E1"}}/>
                                            </IconButton>
                                            <IconButton
                                                aria-label="delete"
                                                onClick={() => deleteVehicleDetail(vehicle)}
                                            >
                                                <DeleteForeverIcon sx={{color:"#DC143C"}}/></IconButton>
                                        </div>
                                    </td>
                                </tr>
                            })
                        }
                        </tbody>
                    }
                </table>
                {
                    loading && <div>
                        <CircularProgress enableTrackSlot size="3rem"  />
                    </div>
                }
            </div>

    </div>
    </div>
  );
};

export default Vehicle;

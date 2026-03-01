import React, {useEffect, useState} from 'react';
import {z} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {
    Backdrop, Button, Dialog, DialogContent, DialogTitle,
    Divider, IconButton, InputAdornment, MenuItem, TextField
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import BadgeIcon from "@mui/icons-material/Badge";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import CategoryIcon from "@mui/icons-material/Category";
import EvStationIcon from "@mui/icons-material/EvStation";
import AirlineSeatReclineNormalIcon from "@mui/icons-material/AirlineSeatReclineNormal";
import InventoryIcon from "@mui/icons-material/Inventory";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import LinkIcon from "@mui/icons-material/Link";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import Loader from "../../components/Loader.jsx";
import toast from "react-hot-toast";
import {updateVehicle} from "../../services/vehicleService.js";
import {getAllCategory} from "../../services/categoryService.js";

const vehicleUpdateSchema = z.object({
    registrationNumber: z.string().min(1, "Registration number is required"),
    modelName: z.string().min(1).max(255),
    brand: z.string().min(1).max(200),
    categoryId: z.coerce.number().int().min(1, "Category is required"),
    variant: z.string().max(50).optional(),
    manufacturingDate: z.string().optional(),
    fuelType: z.string().min(1, "Fuel type is required"),
    seatingCapacity: z.coerce.number().int().min(1).max(1000),
    description: z.string().max(2000).optional(),
    totalUnits: z.coerce.number().int().min(0),
    availableUnits: z.coerce.number().int().min(0),
    rentalPrice: z.coerce.number().min(0),
    vehicleImageUrl: z.string().max(500).optional(),
    active: z.coerce.boolean().default(true),
});

const inputSx = {
    '& .MuiOutlinedInput-root': {
        borderRadius: 2,
        fontSize: '0.9rem',
        '&:hover fieldset': {borderColor: '#374151'},
        '&.Mui-focused fieldset': {borderColor: '#111827', borderWidth: 1.5},
    },
    '& label.Mui-focused': {color: '#111827'},
};

const VehicleUpdateDialog = ({open, onClose, vehicle}) => {
    const [loading, setLoading] = useState(false);
    const [categories, setCategories] = useState([]);
    const [categoryLoading, setCategoryLoading] = useState(false);

    const {register, handleSubmit, reset, formState: {errors}} = useForm({
        resolver: zodResolver(vehicleUpdateSchema),
        mode: 'onBlur',
    });

    const fetchCategories = async () => {
        setCategoryLoading(true);
        try {
            const response = await getAllCategory();
            setCategories(response.data);
        } catch (error) {
            console.error(error)
            toast.error("Error fetching categories");
        } finally {
            setCategoryLoading(false);
        }
    };

    const onSubmit = async (data) => {
        setLoading(true);
        try {
            await updateVehicle(vehicle.id, data);
            toast.success("Vehicle updated successfully");
            onClose();
        } catch (error) {
            toast.error("Error updating vehicle");
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (open && vehicle) {
            fetchCategories();
            reset({
                registrationNumber: vehicle.registrationNumber,
                modelName: vehicle.modelName,
                brand: vehicle.brand,
                categoryId: vehicle.categoryId,
                variant: vehicle.variant ?? '',
                manufacturingDate: vehicle.manufacturingDate ?? '',
                fuelType: vehicle.fuelType,
                seatingCapacity: vehicle.seatingCapacity,
                description: vehicle.description ?? '',
                totalUnits: vehicle.totalUnits,
                availableUnits: vehicle.availableUnits,
                rentalPrice: vehicle.rentalPrice,
                vehicleImageUrl: vehicle.vehicleImageUrl ?? '',
                active: vehicle.active,
            });
        }
    }, [open, vehicle]);

    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth
                PaperProps={{sx: {borderRadius: 3, boxShadow: '0 20px 60px rgba(0,0,0,0.12)'}}}>

            <DialogTitle sx={{px: 3, pt: 3, pb: 1}}>
                <div className="flex items-start justify-between">
                    <div>
                        <h2 className="text-lg font-bold text-gray-900 leading-tight">Update Vehicle</h2>
                        <p className="text-sm text-gray-400 font-normal mt-0.5">
                            Editing: <span className="font-semibold text-gray-600">{vehicle?.modelName}</span>
                        </p>
                    </div>
                    <IconButton onClick={onClose} size="small" sx={{color: 'gray', mt: -0.5, mr: -1}}>
                        <CloseIcon fontSize="small"/>
                    </IconButton>
                </div>
            </DialogTitle>

            <Divider/>

            <DialogContent sx={{px: 3, py: 2.5}}>
                <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>

                    <div className="grid grid-cols-2 gap-4">
                        <TextField label="Registration Number" {...register("registrationNumber")}
                                   error={!!errors.registrationNumber} helperText={errors.registrationNumber?.message}
                                   fullWidth size="small" sx={inputSx}
                                   slotProps={{input: {startAdornment: <InputAdornment position="start"><BadgeIcon/></InputAdornment>}}}
                        />
                        <TextField label="Model Name" {...register("modelName")}
                                   error={!!errors.modelName} helperText={errors.modelName?.message}
                                   fullWidth size="small" sx={inputSx}
                                   slotProps={{input: {startAdornment: <InputAdornment position="start"><DirectionsCarIcon/></InputAdornment>}}}
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <TextField label="Brand" {...register("brand")}
                                   error={!!errors.brand} helperText={errors.brand?.message}
                                   fullWidth size="small" sx={inputSx}
                                   slotProps={{input: {startAdornment: <InputAdornment position="start"><DirectionsCarIcon/></InputAdornment>}}}
                        />
                        <TextField label="Variant" {...register("variant")}
                                   fullWidth size="small" sx={inputSx}
                                   slotProps={{input: {startAdornment: <InputAdornment position="start"><BadgeIcon/></InputAdornment>}}}
                        />
                    </div>

                    <TextField select label="Category" {...register("categoryId")}
                               error={!!errors.categoryId} helperText={errors.categoryId?.message}
                               fullWidth size="small" sx={inputSx}
                               slotProps={{input: {startAdornment: <InputAdornment position="start"><CategoryIcon/></InputAdornment>}}}
                    >
                        {categories.map((cat) => (
                            <MenuItem key={cat.id} value={cat.id}>{cat.name}</MenuItem>
                        ))}
                    </TextField>

                    <div className="grid grid-cols-2 gap-4">
                        <TextField select label="Fuel Type" {...register("fuelType")}
                                   error={!!errors.fuelType} helperText={errors.fuelType?.message}
                                   fullWidth size="small" sx={inputSx}
                                   slotProps={{input: {startAdornment: <InputAdornment position="start"><EvStationIcon/></InputAdornment>}}}
                        >
                            {["Petrol", "Diesel", "Electric", "CNG", "Hybrid"].map((f) => (
                                <MenuItem key={f} value={f}>{f}</MenuItem>
                            ))}
                        </TextField>
                        <TextField label="Seating Capacity" type="number" {...register("seatingCapacity")}
                                   error={!!errors.seatingCapacity} helperText={errors.seatingCapacity?.message}
                                   fullWidth size="small" sx={inputSx}
                                   slotProps={{input: {startAdornment: <InputAdornment position="start"><AirlineSeatReclineNormalIcon/></InputAdornment>}}}
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <TextField label="Manufacturing Date" type="date" {...register("manufacturingDate")}
                                   fullWidth size="small" sx={inputSx} InputLabelProps={{shrink: true}}
                                   slotProps={{input: {startAdornment: <InputAdornment position="start"><CalendarMonthIcon/></InputAdornment>}}}
                        />
                        <TextField label="Rental Price (₹)" type="number" {...register("rentalPrice")}
                                   error={!!errors.rentalPrice} helperText={errors.rentalPrice?.message}
                                   fullWidth size="small" sx={inputSx}
                                   slotProps={{input: {startAdornment: <InputAdornment position="start"><AttachMoneyIcon/></InputAdornment>}}}
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <TextField label="Total Units" type="number" {...register("totalUnits")}
                                   error={!!errors.totalUnits} helperText={errors.totalUnits?.message}
                                   fullWidth size="small" sx={inputSx}
                                   slotProps={{input: {startAdornment: <InputAdornment position="start"><InventoryIcon/></InputAdornment>}}}
                        />
                        <TextField label="Available Units" type="number" {...register("availableUnits")}
                                   error={!!errors.availableUnits} helperText={errors.availableUnits?.message}
                                   fullWidth size="small" sx={inputSx}
                                   slotProps={{input: {startAdornment: <InputAdornment position="start"><InventoryIcon/></InputAdornment>}}}
                        />
                    </div>

                    <TextField label="Description" {...register("description")}
                               fullWidth size="small" multiline rows={2} sx={inputSx}
                    />

                    <TextField label="Image URL" {...register("vehicleImageUrl")}
                               fullWidth size="small" sx={inputSx}
                               slotProps={{input: {startAdornment: <InputAdornment position="start"><LinkIcon/></InputAdornment>}}}
                    />

                    <TextField select label="Status" {...register("active")}
                               fullWidth size="small" sx={inputSx}
                    >
                        <MenuItem value={true}>Active</MenuItem>
                        <MenuItem value={false}>Inactive</MenuItem>
                    </TextField>

                    <Button variant="contained" color="primary" sx={{fontWeight: 'bold'}} type="submit">
                        Update Vehicle
                    </Button>
                </form>

                {(categoryLoading || loading) && (
                    <Backdrop sx={{color: '#6366f1', zIndex: (t) => t.zIndex.drawer + 1, backgroundColor: 'rgba(255,255,255,0.4)', backdropFilter: 'blur(8px)'}}
                              open={categoryLoading || loading}>
                        <Loader text={loading ? "Updating Vehicle..." : "Loading..."}/>
                    </Backdrop>
                )}
            </DialogContent>
        </Dialog>
    );
};

export default VehicleUpdateDialog;
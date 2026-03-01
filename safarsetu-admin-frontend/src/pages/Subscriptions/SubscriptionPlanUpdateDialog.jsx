import React, {useEffect, useState} from 'react';
import {z} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {
    Backdrop, Button, Dialog, DialogContent, DialogTitle,
    Divider, IconButton, InputAdornment, MenuItem, TextField
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import CodeIcon from "@mui/icons-material/Code";
import BadgeIcon from "@mui/icons-material/Badge";
import DescriptionIcon from "@mui/icons-material/Description";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import StarIcon from "@mui/icons-material/Star";
import SortByAlphaIcon from "@mui/icons-material/SortByAlpha";
import NoteIcon from "@mui/icons-material/Note";
import toast from "react-hot-toast";
import Loader from "../../components/Loader.jsx";
import {updateSubscriptionPlan} from "../../services/subscriptionsPlanService.js";

const subscriptionUpdateSchema = z.object({
    planCode: z.string().min(1, "Plan code is required"),
    planName: z.string().min(1, "Plan name is required"),
    description: z.string().optional(),
    price: z.coerce.number().positive("Price must be positive"),
    validityInDays: z.coerce.number().int().positive("Validity must be positive"),
    maxVehiclesAllowed: z.coerce.number().int().positive("Must allow at least 1 vehicle"),
    badgeFeatures: z.string().min(1, "Badge features are required"),
    displayOrder: z.coerce.number().int().min(0).default(0),
    autoRenew: z.coerce.boolean().default(false),
    active: z.coerce.boolean().default(true),
    isFeatured: z.coerce.boolean().default(false),
    adminNotes: z.string().optional(),
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

const SubscriptionPlanUpdateDialog = ({open, onClose, plan}) => {
    const [loading, setLoading] = useState(false);

    const {register, handleSubmit, reset, formState: {errors}} = useForm({
        resolver: zodResolver(subscriptionUpdateSchema),
        mode: 'onBlur',
    });

    useEffect(() => {
        if (open && plan) {
            reset({
                planCode: plan.planCode,
                planName: plan.planName,
                description: plan.description ?? '',
                price: plan.price,
                validityInDays: plan.validityInDays,
                maxVehiclesAllowed: plan.maxVehiclesAllowed,
                badgeFeatures: plan.badgeFeatures,
                displayOrder: plan.displayOrder,
                autoRenew: plan.autoRenew,
                active: plan.active,
                isFeatured: plan.isFeatured,
                adminNotes: plan.adminNotes ?? '',
            });
        }
    }, [open, plan]);

    const onSubmit = async (data) => {
        setLoading(true);
        try {
            await updateSubscriptionPlan(plan.id, data);
            toast.success("Subscription plan updated successfully");
            onClose();
        } catch (error) {
            toast.error("Error updating subscription plan");
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth
                PaperProps={{sx: {borderRadius: 3, boxShadow: '0 20px 60px rgba(0,0,0,0.12)'}}}>

            <DialogTitle sx={{px: 3, pt: 3, pb: 1}}>
                <div className="flex items-start justify-between">
                    <div>
                        <h2 className="text-lg font-bold text-gray-900 leading-tight">Update Subscription Plan</h2>
                        <p className="text-sm text-gray-400 font-normal mt-0.5">
                            Editing: <span className="font-semibold text-gray-600">{plan?.planName}</span>
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

                    <TextField
                        label="Plan Code"
                        {...register("planCode")}
                        fullWidth size="small" sx={inputSx}
                        disabled
                        slotProps={{input: {startAdornment: <InputAdornment position="start"><CodeIcon/></InputAdornment>}}}
                    />

                    <TextField label="Plan Name" {...register("planName")}
                               error={!!errors.planName} helperText={errors.planName?.message}
                               fullWidth size="small" sx={inputSx}
                               slotProps={{input: {startAdornment: <InputAdornment position="start"><BadgeIcon/></InputAdornment>}}}
                    />

                    <TextField label="Description" {...register("description")}
                               fullWidth size="small" multiline rows={2} sx={inputSx}
                               slotProps={{input: {startAdornment: <InputAdornment position="start"><DescriptionIcon/></InputAdornment>}}}
                    />

                    <div className="grid grid-cols-2 gap-4">
                        <TextField label="Price (₹)" type="number" {...register("price")}
                                   error={!!errors.price} helperText={errors.price?.message}
                                   fullWidth size="small" sx={inputSx}
                                   slotProps={{input: {startAdornment: <InputAdornment position="start"><AttachMoneyIcon/></InputAdornment>}}}
                        />
                        <TextField label="Validity (Days)" type="number" {...register("validityInDays")}
                                   error={!!errors.validityInDays} helperText={errors.validityInDays?.message}
                                   fullWidth size="small" sx={inputSx}
                                   slotProps={{input: {startAdornment: <InputAdornment position="start"><CalendarMonthIcon/></InputAdornment>}}}
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <TextField label="Max Vehicles Allowed" type="number" {...register("maxVehiclesAllowed")}
                                   error={!!errors.maxVehiclesAllowed} helperText={errors.maxVehiclesAllowed?.message}
                                   fullWidth size="small" sx={inputSx}
                                   slotProps={{input: {startAdornment: <InputAdornment position="start"><DirectionsCarIcon/></InputAdornment>}}}
                        />
                        <TextField label="Display Order" type="number" {...register("displayOrder")}
                                   fullWidth size="small" sx={inputSx}
                                   slotProps={{input: {startAdornment: <InputAdornment position="start"><SortByAlphaIcon/></InputAdornment>}}}
                        />
                    </div>

                    <TextField label="Badge Features" {...register("badgeFeatures")}
                               error={!!errors.badgeFeatures} helperText={errors.badgeFeatures?.message}
                               fullWidth size="small" sx={inputSx}
                               slotProps={{input: {startAdornment: <InputAdornment position="start"><StarIcon/></InputAdornment>}}}
                    />

                    <div className="grid grid-cols-3 gap-4">
                        <TextField select label="Auto Renew" {...register("autoRenew")}
                                   fullWidth size="small" sx={inputSx}>
                            <MenuItem value={true}>Yes</MenuItem>
                            <MenuItem value={false}>No</MenuItem>
                        </TextField>
                        <TextField select label="Status" {...register("active")}
                                   fullWidth size="small" sx={inputSx}>
                            <MenuItem value={true}>Active</MenuItem>
                            <MenuItem value={false}>Inactive</MenuItem>
                        </TextField>
                        <TextField select label="Featured" {...register("isFeatured")}
                                   fullWidth size="small" sx={inputSx}>
                            <MenuItem value={true}>Yes</MenuItem>
                            <MenuItem value={false}>No</MenuItem>
                        </TextField>
                    </div>

                    <TextField label="Admin Notes" {...register("adminNotes")}
                               fullWidth size="small" multiline rows={2} sx={inputSx}
                               slotProps={{input: {startAdornment: <InputAdornment position="start"><NoteIcon/></InputAdornment>}}}
                    />

                    <Button variant="contained" color="primary" sx={{fontWeight: 'bold'}} type="submit">
                        Update Plan
                    </Button>
                </form>

                {loading && (
                    <Backdrop sx={{color: '#6366f1', zIndex: (t) => t.zIndex.drawer + 1, backgroundColor: 'rgba(255,255,255,0.4)', backdropFilter: 'blur(8px)'}}
                              open={loading}>
                        <Loader text="Updating Subscription Plan..."/>
                    </Backdrop>
                )}
            </DialogContent>
        </Dialog>
    );
};

export default SubscriptionPlanUpdateDialog;
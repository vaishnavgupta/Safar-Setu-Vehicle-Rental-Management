import React, {useState} from 'react';
import {
    Button, Chip, Dialog, DialogActions, DialogContent,
    DialogTitle, Divider, IconButton, MenuItem, TextField
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import EvStationIcon from "@mui/icons-material/EvStation";
import AirlineSeatReclineNormalIcon from "@mui/icons-material/AirlineSeatReclineNormal";
import InventoryIcon from "@mui/icons-material/Inventory";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import CategoryIcon from "@mui/icons-material/Category";
import KeyIcon from "@mui/icons-material/Key";
import NoteIcon from "@mui/icons-material/Note";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";

const inputSx = {
    '& .MuiOutlinedInput-root': {
        borderRadius: 2,
        fontSize: '0.9rem',
        '&:hover fieldset': {borderColor: '#4f46e5'},
        '&.Mui-focused fieldset': {borderColor: '#4f46e5', borderWidth: 1.5},
    },
    '& label.Mui-focused': {color: '#4f46e5'},
};

const VehicleDetailDialog = ({open, onClose, vehicle, onRent}) => {

    const [returnDays, setReturnDays] = useState('');
    const [notes, setNotes] = useState('');

    const canRent = returnDays !== '' && notes.trim() !== ''
        && vehicle?.availableUnits > 0
        && !vehicle?.alreadyHaveVehicle;

    const handleRent = () => {
        if (canRent) onRent({ vehicle, returnDays, notes });
    };

    const handleClose = () => {
        setReturnDays('');
        setNotes('');
        onClose();
    };

    return (
        <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth
                PaperProps={{sx: {borderRadius: 3, boxShadow: '0 20px 60px rgba(0,0,0,0.15)', overflow: 'hidden'}}}>

            {/* Image Header */}
            <div className="relative w-full h-48 bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden">
                <img
                    src={vehicle?.vehicleImageUrl ?? "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/330px-No_image_available.svg.png"}
                    alt={vehicle?.modelName}
                    className="w-full h-full object-contain p-4"
                />
                <IconButton onClick={handleClose} size="small"
                            sx={{position: 'absolute', top: 8, right: 8, bgcolor: 'rgba(255,255,255,0.9)', '&:hover': {bgcolor: 'white'}}}>
                    <CloseIcon fontSize="small"/>
                </IconButton>
                <div className="absolute bottom-3 left-3">
                    <Chip size="small"
                          label={vehicle?.availableUnits > 0 ? `${vehicle?.availableUnits} Available` : 'Not Available'}
                          sx={{
                              fontWeight: 700, fontSize: '0.75rem',
                              bgcolor: vehicle?.availableUnits > 0 ? '#dcfce7' : '#fee2e2',
                              color: vehicle?.availableUnits > 0 ? '#16a34a' : '#dc2626',
                          }}
                    />
                </div>
            </div>

            <DialogTitle sx={{px: 3, pt: 2.5, pb: 1}}>
                <div className="flex flex-col">
                    <div className="flex items-center justify-between">
                        <h2 className="text-xl font-black text-gray-900">{vehicle?.modelName}</h2>
                        <p className="text-xl font-black text-indigo-600">₹{vehicle?.rentalPrice}
                            <span className="text-xs font-medium text-gray-400">/day</span>
                        </p>
                    </div>
                    <div className="flex items-center gap-2 mt-1 flex-wrap">
                        <p className="text-sm text-gray-400 font-medium">{vehicle?.brand}</p>
                        {vehicle?.variant && (<>
                            <span className="text-gray-300">•</span>
                            <p className="text-sm text-gray-400">{vehicle?.variant}</p>
                        </>)}
                        <span className="text-gray-300">•</span>
                        <p className="text-xs font-mono text-gray-400">{vehicle?.registrationNumber}</p>
                    </div>
                </div>
            </DialogTitle>

            <Divider/>

            <DialogContent sx={{px: 3, py: 2.5}}>
                <div className="flex flex-col gap-4">

                    {/* Description */}
                    {vehicle?.description && (
                        <p className="text-sm text-gray-500 leading-relaxed bg-gray-50 rounded-xl px-4 py-3 border border-gray-100">
                            {vehicle.description}
                        </p>
                    )}

                    {/* Specs Grid */}
                    <div className="grid grid-cols-2 gap-2">
                        {[
                            {icon: <CategoryIcon sx={{fontSize: 16}}/>,                  label: 'Category',    value: vehicle?.categoryName},
                            {icon: <EvStationIcon sx={{fontSize: 16}}/>,                 label: 'Fuel Type',   value: vehicle?.fuelType},
                            {icon: <AirlineSeatReclineNormalIcon sx={{fontSize: 16}}/>,  label: 'Seats',       value: vehicle?.seatingCapacity},
                            {icon: <CalendarMonthIcon sx={{fontSize: 16}}/>,             label: 'Year',        value: vehicle?.manufacturingDate?.split('-')[0]},
                            {icon: <InventoryIcon sx={{fontSize: 16}}/>,                 label: 'Total Units', value: vehicle?.totalUnits},
                            {icon: <KeyIcon sx={{fontSize: 16}}/>,                       label: 'Reg. No',     value: vehicle?.registrationNumber},
                        ].map(({icon, label, value}) => (
                            <div key={label} className="flex items-center gap-2.5 px-3 py-2.5 bg-gray-50 rounded-xl border border-gray-100">
                                <span className="text-indigo-500">{icon}</span>
                                <div>
                                    <p className="text-xs text-gray-400 font-medium">{label}</p>
                                    <p className="text-sm font-bold text-gray-700">{value ?? '—'}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <Divider/>

                    {/* Rental Options */}
                    <div>
                        <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3">Rental Details</p>
                        <div className="flex flex-col gap-3">

                            {/* Return Days */}
                            <TextField
                                select
                                label="Return Days"
                                value={returnDays}
                                onChange={(e) => setReturnDays(e.target.value)}
                                fullWidth size="small" sx={inputSx}
                                slotProps={{input: {startAdornment:
                                            <span className="mr-2 text-indigo-500"><EventAvailableIcon sx={{fontSize: 18}}/></span>
                                    }}}
                            >
                                {[1, 2, 3, 4, 5, 6, 7, 8].map((day) => (
                                    <MenuItem key={day} value={day}>
                                        <div className="flex items-center justify-between w-full">
                                            <span>{day} {day === 1 ? 'Day' : 'Days'}</span>
                                            {vehicle?.rentalPrice && (
                                                <span className="text-xs text-indigo-500 font-semibold ml-4">
                                                    ₹{(vehicle.rentalPrice * day).toFixed(2)}
                                                </span>
                                            )}
                                        </div>
                                    </MenuItem>
                                ))}
                            </TextField>

                            {/* Total Cost Preview */}
                            {returnDays !== '' && vehicle?.rentalPrice && (
                                <div className="flex items-center justify-between px-4 py-2.5 bg-indigo-50 border border-indigo-100 rounded-xl">
                                    <p className="text-xs font-semibold text-indigo-400 uppercase tracking-wide">Estimated Total</p>
                                    <p className="text-lg font-black text-indigo-600">
                                        ₹{(vehicle.rentalPrice * returnDays).toFixed(2)}
                                    </p>
                                </div>
                            )}

                            {/* Notes */}
                            <TextField
                                label="Notes"
                                placeholder="Add any special requirements or notes..."
                                value={notes}
                                onChange={(e) => setNotes(e.target.value)}
                                fullWidth size="small" multiline rows={2} sx={inputSx}
                                slotProps={{input: {startAdornment:
                                            <span className="mr-2 mt-1 text-indigo-500"><NoteIcon sx={{fontSize: 18}}/></span>
                                    }}}
                            />

                            {/* Helper text */}
                            {!canRent && !vehicle?.alreadyHaveVehicle && vehicle?.availableUnits > 0 && (
                                <p className="text-xs text-gray-400 text-center">
                                    Select return days and add a note to enable rental
                                </p>
                            )}
                        </div>
                    </div>

                </div>
            </DialogContent>

            <Divider/>

            <DialogActions sx={{px: 3, py: 2, gap: 1}}>
                <Button onClick={handleClose} size="small"
                        sx={{color: '#6b7280', textTransform: 'none', fontWeight: 600, '&:hover': {background: '#f3f4f6'}}}>
                    Close
                </Button>
                <Button
                    onClick={handleRent}
                    variant="contained"
                    size="small"
                    startIcon={<CurrencyRupeeIcon/>}
                    disabled={!canRent}
                    disableElevation
                    sx={{
                        textTransform: 'none', fontWeight: 700, borderRadius: 2, px: 2.5,
                        background: 'linear-gradient(135deg, #4f46e5, #2563eb)',
                        '&:hover': {background: 'linear-gradient(135deg, #4338ca, #1d4ed8)'},
                    }}
                >
                    Rent Vehicle
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default VehicleDetailDialog;
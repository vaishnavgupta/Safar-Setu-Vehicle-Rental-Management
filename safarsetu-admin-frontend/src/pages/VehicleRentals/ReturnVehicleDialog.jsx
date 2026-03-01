import React, {useState} from 'react';
import {
    Backdrop, Button, Dialog, DialogContent, DialogTitle,
    Divider, IconButton, MenuItem, TextField
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import KeyboardReturnIcon from "@mui/icons-material/KeyboardReturn";
import NoteIcon from "@mui/icons-material/Note";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import Loader from "../../components/Loader.jsx";
import toast from "react-hot-toast";
import {returnRentalForUser} from "../../services/rentalsService.js";

const inputSx = {
    '& .MuiOutlinedInput-root': {
        borderRadius: 2,
        fontSize: '0.9rem',
        '&:hover fieldset': {borderColor: '#374151'},
        '&.Mui-focused fieldset': {borderColor: '#111827', borderWidth: 1.5},
    },
    '& label.Mui-focused': {color: '#111827'},
};

const conditionColor = {
    RETURNED: 'text-green-600',
    DAMAGED:  'text-amber-600',
    LOST:     'text-red-600',
};

const ReturnVehicleDialog = ({open, onClose, rental, onSuccess}) => {
    const [condition, setCondition] = useState('RETURNED');
    const [notes, setNotes]         = useState('');
    const [loading, setLoading]     = useState(false);

    const handleClose = () => {
        setCondition('RETURNED');
        setNotes('');
        onClose();
    };

    const handleSubmit = async () => {
        setLoading(true);
        try {
            await returnRentalForUser({
                vehicleRentalId: rental?.id,
                condition: condition,
                notes: notes || null,
            });
            toast.success("Vehicle checked in successfully");
            onSuccess?.();
            handleClose();
        } catch (error) {
            toast.error(error?.response?.data?.message ?? "Error returning vehicle");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={open} onClose={handleClose} maxWidth="xs" fullWidth
                PaperProps={{sx: {borderRadius: 3, boxShadow: '0 20px 60px rgba(0,0,0,0.12)'}}}>

            <DialogTitle sx={{px: 3, pt: 3, pb: 1}}>
                <div className="flex items-start justify-between">
                    <div>
                        <h2 className="text-lg font-bold text-gray-900 leading-tight">Return Vehicle</h2>
                        <p className="text-sm text-gray-400 font-normal mt-0.5">
                            Rental <span className="font-semibold text-gray-600">#{rental?.id}</span>
                        </p>
                    </div>
                    <IconButton onClick={handleClose} size="small" sx={{color: 'gray', mt: -0.5, mr: -1}}>
                        <CloseIcon fontSize="small"/>
                    </IconButton>
                </div>
            </DialogTitle>

            <Divider/>

            <DialogContent sx={{px: 3, py: 2.5}}>
                <div className="flex flex-col gap-4">

                    {/* Rental Info */}
                    <div className="flex items-center gap-3 px-4 py-3 bg-gray-50 rounded-xl border border-gray-100">
                        <DirectionsCarIcon sx={{color: '#6366f1', fontSize: 22}}/>
                        <div>
                            <p className="font-bold text-sm text-gray-800">{rental?.vehicleModelName}</p>
                            <p className="text-xs text-gray-400">{rental?.userName} · {rental?.vehicleRegsNo}</p>
                        </div>
                    </div>

                    {/* Condition Select */}
                    <TextField
                        select
                        label="Vehicle Condition"
                        value={condition}
                        onChange={(e) => setCondition(e.target.value)}
                        fullWidth size="small" sx={inputSx}
                    >
                        <MenuItem value="RETURNED">
                            <span className="font-semibold text-green-600">✓ Returned — Good Condition</span>
                        </MenuItem>
                        <MenuItem value="DAMAGED">
                            <span className="font-semibold text-amber-600">⚠ Damaged</span>
                        </MenuItem>
                        <MenuItem value="LOST">
                            <span className="font-semibold text-red-600">✕ Lost</span>
                        </MenuItem>
                    </TextField>

                    {/* Warning for bad conditions */}
                    {condition !== 'RETURNED' && (
                        <div className={`px-4 py-2.5 rounded-xl border text-xs font-semibold
                            ${condition === 'DAMAGED' ? 'bg-amber-50 border-amber-200 text-amber-700' : 'bg-red-50 border-red-200 text-red-700'}`}>
                            {condition === 'DAMAGED'
                                ? '⚠ A damage fine will be applied to the user.'
                                : '✕ Marking as lost is irreversible. A loss fine will be applied.'}
                        </div>
                    )}

                    {/* Notes */}
                    <TextField
                        label="Notes (Optional)"
                        placeholder="Add any remarks about the return..."
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        fullWidth size="small" multiline rows={2} sx={inputSx}
                        slotProps={{input: {startAdornment:
                                    <span className="mr-2 mt-1 text-gray-400"><NoteIcon sx={{fontSize: 18}}/></span>
                            }}}
                    />

                    <Divider/>

                    <Button
                        onClick={handleSubmit}
                        variant="contained"
                        fullWidth
                        startIcon={<KeyboardReturnIcon/>}
                        disableElevation
                        sx={{
                            textTransform: 'none', fontWeight: 700, borderRadius: 2,
                            bgcolor: condition === 'RETURNED' ? '#16a34a' : condition === 'DAMAGED' ? '#d97706' : '#dc2626',
                            '&:hover': {
                                bgcolor: condition === 'RETURNED' ? '#15803d' : condition === 'DAMAGED' ? '#b45309' : '#b91c1c',
                            }
                        }}
                    >
                        {condition === 'RETURNED' ? 'Confirm Return' : condition === 'DAMAGED' ? 'Mark as Damaged' : 'Mark as Lost'}
                    </Button>
                </div>

                {loading && (
                    <Backdrop sx={{color: '#6366f1', zIndex: (t) => t.zIndex.drawer + 1, backgroundColor: 'rgba(255,255,255,0.4)', backdropFilter: 'blur(8px)'}}
                              open={loading}>
                        <Loader text="Processing Return..."/>
                    </Backdrop>
                )}
            </DialogContent>
        </Dialog>
    );
};

export default ReturnVehicleDialog;
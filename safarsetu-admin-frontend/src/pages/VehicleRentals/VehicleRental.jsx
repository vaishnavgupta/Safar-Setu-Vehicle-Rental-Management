import React, {useEffect, useState} from 'react';
import {
    Button,
    Chip,
    CircularProgress,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Divider,
    FormControl,
    IconButton,
    InputAdornment,
    InputLabel,
    MenuItem,
    Select,
    TextField
} from "@mui/material";
import DangerousIcon from '@mui/icons-material/Dangerous';
import SwapVertIcon from "@mui/icons-material/SwapVert";
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import UsersStatsBox from "../Users/UsersStatsBox.jsx";
import {returnRentalForUser, searchRentals} from "../../services/rentalsService.js";
import toast from "react-hot-toast";
import ReturnVehicleDialog from "./ReturnVehicleDialog.jsx";

const statusColor = {
    ACTIVE:    "primary",
    RETURNED:  "success",
    OVERDUE:   "warning",
    CANCELLED: "default",
    LOST:      "error",
    DAMAGED:   "error",
};

export const ConfirmDialog = ({open, onClose, onConfirm, title, message, confirmLabel, confirmColor}) => (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth
            PaperProps={{sx: {borderRadius: 3, boxShadow: '0 20px 60px rgba(0,0,0,0.12)'}}}>
        <DialogTitle sx={{px: 3, pt: 3, pb: 1}}>
            <div className="flex items-start justify-between">
                <h2 className="text-lg font-bold text-gray-900">{title}</h2>
                <IconButton onClick={onClose} size="small" sx={{color: 'gray', mt: -0.5, mr: -1}}>
                    <CloseIcon fontSize="small"/>
                </IconButton>
            </div>
        </DialogTitle>
        <Divider/>
        <DialogContent sx={{px: 3, py: 3}}>
            <p className="text-sm text-gray-600">{message}</p>
        </DialogContent>
        <Divider/>
        <DialogActions sx={{px: 3, py: 2, gap: 1}}>
            <Button onClick={onClose} size="small"
                    sx={{color: '#6b7280', textTransform: 'none', fontWeight: 600, '&:hover': {background: '#f3f4f6'}}}>
                Cancel
            </Button>
            <Button onClick={onConfirm} variant="contained" color={confirmColor ?? "primary"}
                    size="small" disableElevation
                    sx={{textTransform: 'none', fontWeight: 700, borderRadius: 2, px: 2.5}}>
                {confirmLabel}
            </Button>
        </DialogActions>
    </Dialog>
);


const VehicleRental = () => {
    const [rentals, setRentals] = useState([]);
    const [loading, setLoading] = useState(false);


    const [status, setStatus]       = useState('');
    const [sortBy, setSortBy]       = useState('createdAt');
    const [sortDir, setSortDir]     = useState('DESC');
    const [searchTerm, setSearchTerm] = useState('');

    const [overdueOnly, setOverdueOnly]         = useState(false);
    const [unpaidFinesOnly, setUnpaidFinesOnly] = useState(false);
    const [userId, setUserId]                   = useState('');
    const [vehicleId, setVehicleId]             = useState('');

    const [returnDialog, setReturnDialog] = useState({open: false, rental: null});

    const handleReturn = (rental) => {
        setReturnDialog({open: true, rental});
    };

    const [confirm, setConfirm] = useState({
        open: false,
        title: '',
        message: '',
        confirmLabel: '',
        confirmColor: 'primary',
        onConfirm: null,
    });

    const closeConfirm = () => setConfirm(prev => ({...prev, open: false}));


    const fetchRentals = async () => {
        setLoading(true);
        const request = {
            page: 0,
            size: 30,
            sortBy: sortBy,
            sortDirection: sortDir,
            unpaidFinesOnly: unpaidFinesOnly,
            overdueOnly: overdueOnly,
        };

        if (status)              request.status          = status;

        try {
            const response = await searchRentals(request);
            setRentals(response.data.content ?? response.data);
        } catch (error) {
            console.error(error?.response?.data);
            toast.error("Error fetching vehicle rentals");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRentals();
        }, [status, sortBy, sortDir]);

    const handleClear = () => {
        setStatus('');
        setSortBy('createdAt');
        setSortDir('DESC');
        setSearchTerm('');
    };



    const stats = [
        {title: "Total",    value: rentals.length},
        {title: "Active",   value: rentals.filter(r => r.status === 'ACTIVE').length},
        {title: "Overdue",  value: rentals.filter(r => r.status === 'OVERDUE').length},
        {title: "Returned", value: rentals.filter(r => r.status === 'RETURNED').length},
    ];

    return (
        <div className="min-h-screen bg-white py-8">
            <div className="px-4 sm:px-8 lg:px-8">

                {/* Header */}
                <div className="mb-8 flex items-center justify-between">
                    <div className="flex flex-col">
                        <h1 className="text-4xl font-bold text-gray-800 mb-2">Vehicle Rentals</h1>
                        <p className="text-lg text-gray-600">Monitor and manage vehicle rentals.</p>
                    </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                    {stats.map((s) => (
                        <UsersStatsBox key={s.title} title={s.title} value={s.value} textClass="text-indigo-500"/>
                    ))}
                </div>

                {/* Filters */}
                <div className="flex flex-wrap items-center gap-3 mb-8 p-4 bg-gray-50 rounded-2xl border border-gray-200 shadow-sm">

                    {/* Search */}
                    <div className="flex-1 min-w-[220px]">
                        <TextField
                            fullWidth size="small"
                            placeholder="Search by user, vehicle..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && fetchRentals()}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <SearchIcon className="text-gray-400"/>
                                    </InputAdornment>
                                )
                            }}
                        />
                    </div>

                    {/* Status Filter */}
                    <div className="min-w-[160px]">
                        <FormControl fullWidth size="small">
                            <InputLabel>Status</InputLabel>
                            <Select value={status} onChange={(e) => setStatus(e.target.value)} label="Status">
                                <MenuItem value="">All</MenuItem>
                                {["ACTIVE", "RETURNED", "OVERDUE", "CANCELLED", "LOST", "DAMAGED"].map((s) => (
                                    <MenuItem key={s} value={s}>
                                        <Chip size="small" label={s} color={statusColor[s]} sx={{fontWeight: 700, fontSize: '0.7rem'}}/>
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </div>

                    {/* Sort By */}
                    <div className="min-w-[180px]">
                        <FormControl fullWidth size="small">
                            <InputLabel>Sort By</InputLabel>
                            <Select
                                value={`${sortBy}-${sortDir.toLowerCase()}`}
                                label="Sort By"
                                onChange={(e) => {
                                    const [field, dir] = e.target.value.split('-');
                                    setSortBy(field);
                                    setSortDir(dir.toUpperCase());
                                }}
                                startAdornment={
                                    <InputAdornment position="start">
                                        <SwapVertIcon className="text-gray-400"/>
                                    </InputAdornment>
                                }
                            >
                                <MenuItem value="createdAt-desc">Newest First</MenuItem>
                                <MenuItem value="createdAt-asc">Oldest First</MenuItem>
                                <MenuItem value="dueDate-asc">Due Date (Soonest)</MenuItem>
                                <MenuItem value="dueDate-desc">Due Date (Latest)</MenuItem>
                                <MenuItem value="checkoutDate-desc">Checkout (Latest)</MenuItem>
                                <MenuItem value="checkoutDate-asc">Checkout (Oldest)</MenuItem>
                            </Select>
                        </FormControl>
                    </div>

                    <Button variant="outlined" color="error" size="medium"
                            endIcon={<DangerousIcon/>} onClick={handleClear}>
                        Clear
                    </Button>
                </div>

                {/* Table */}
                <div className="w-full overflow-x-auto rounded-xl shadow-sm border border-gray-200">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                        <tr>
                            {["Rental ID", "Vehicle", "User", "Checkout", "Due Date", "Return Date", "Status", "Actions"].map((col) => (
                                <th key={col}
                                    className="px-4 py-3 text-center text-xs font-semibold text-gray-500 uppercase tracking-wider whitespace-nowrap">
                                    {col}
                                </th>
                            ))}
                        </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-100 text-center">
                        {!loading && rentals.map((rental) => (
                            <tr key={rental.id} className="hover:bg-gray-50 transition-colors">
                                <td className="font-mono font-bold px-4 py-3">#{rental.id}</td>
                                <td className="px-4 py-3">
                                    <div className="flex flex-col items-center">
                                        <p className="font-bold text-sm">{rental.vehicleModelName}</p>
                                        <p className="text-xs text-gray-400">{rental.vehicleBrand}</p>
                                        <p className="text-xs font-mono text-gray-400">{rental.vehicleRegsNo}</p>
                                    </div>
                                </td>
                                <td className="px-4 py-3">
                                    <div className="flex flex-col items-center">
                                        <p className="font-bold text-sm">{rental.userName}</p>
                                        <p className="text-xs text-gray-400">{rental.userEmail}</p>
                                    </div>
                                </td>
                                <td className="font-bold text-sm px-4 py-3">{rental.checkoutDate ?? '—'}</td>
                                <td className="px-4 py-3">
                                    <div className="flex flex-col items-center">
                                        <p className="font-bold text-sm">{rental.dueDate ?? '—'}</p>
                                        {rental.isOverdue && (
                                            <Chip size="small" label={`${rental.overdueDays}d overdue`}
                                                  color="error" sx={{fontSize: '0.65rem', fontWeight: 700, mt: 0.5}}/>
                                        )}
                                    </div>
                                </td>
                                <td className="font-bold text-sm px-4 py-3">{rental.returnDate ?? '—'}</td>
                                <td className="px-4 py-3">
                                    <Chip variant="filled" label={rental.status}
                                          color={statusColor[rental.status] ?? 'default'}
                                          sx={{fontWeight: 700, fontSize: '0.7rem'}}/>
                                </td>
                                <td className="px-4 py-3">
                                    <div className="flex flex-col gap-1 items-center py-1">
                                        <Button variant="contained" color="success" size="small" fullWidth
                                                startIcon={<KeyboardReturnIcon/>}
                                                disabled={!['ACTIVE', 'OVERDUE'].includes(rental.status)}
                                                onClick={() => handleReturn(rental)}
                                                sx={{textTransform: 'none', fontWeight: 700, fontSize: '0.7rem'}}>
                                            Return
                                        </Button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                    {loading && (
                        <div className="flex justify-center py-8">
                            <CircularProgress size="3rem"/>
                        </div>
                    )}
                    {!loading && rentals.length === 0 && (
                        <div className="flex justify-center py-10">
                            <p className="text-gray-400 font-medium">No rentals found.</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Confirm Dialog */}
            <ConfirmDialog
                open={confirm.open}
                onClose={closeConfirm}
                onConfirm={confirm.onConfirm}
                title={confirm.title}
                message={confirm.message}
                confirmLabel={confirm.confirmLabel}
                confirmColor={confirm.confirmColor}
            />
            <ReturnVehicleDialog
                open={returnDialog.open}
                onClose={() => setReturnDialog({open: false, rental: null})}
                rental={returnDialog.rental}
                onSuccess={fetchRentals}
            />
        </div>
    );
};

export default VehicleRental;
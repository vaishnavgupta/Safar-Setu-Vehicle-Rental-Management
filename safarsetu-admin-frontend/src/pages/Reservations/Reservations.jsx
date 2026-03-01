import React, {useEffect, useState} from 'react';
import UsersStatsBox from "../Users/UsersStatsBox.jsx";
import {
    Button, Chip, CircularProgress, FormControl, InputAdornment,
    InputLabel, MenuItem, Select, TextField
} from "@mui/material";
import SwapVertIcon from "@mui/icons-material/SwapVert";
import SearchIcon from "@mui/icons-material/Search";
import DangerousIcon from "@mui/icons-material/Dangerous";
import KeyboardReturnIcon from "@mui/icons-material/KeyboardReturn";
import {daysBetween, formatDateTime} from "../Users/constants.js";
import {searchReservations, allotReservation, cancelReservation} from "../../services/reservationService.js";
import toast from "react-hot-toast";
import {ConfirmDialog} from "../VehicleRentals/VehicleRental.jsx";

const statusColor = {
    PENDING:   "warning",
    NOTIFIED:  "info",
    FULFILLED: "success",
    CANCELLED: "default",
    EXPIRED:   "error",
};

const RESERVATION_STATUSES = ["PENDING", "NOTIFIED", "FULFILLED", "CANCELLED", "EXPIRED"];

const Reservations = () => {
    const [reservations, setReservations] = useState([]);
    const [loading, setLoading]           = useState(false);

    // Filters
    const [status, setStatus]         = useState('');
    const [userId, setUserId]         = useState('');
    const [vehicleId, setVehicleId]   = useState('');
    const [activeOnly, setActiveOnly] = useState(false);
    const [sortBy, setSortBy]         = useState('reservedAt');
    const [sortDir, setSortDir]       = useState('DESC');

    // Confirm dialog
    const [confirm, setConfirm] = useState({
        open: false, title: '', message: '',
        confirmLabel: '', confirmColor: 'primary', onConfirm: null,
    });
    const closeConfirm = () => setConfirm(prev => ({...prev, open: false}));

    const fetchReservations = async () => {
        setLoading(true);
        try {
            const params = {
                page: 0,
                size: 30,
                sortBy,
                sortDirection: sortDir,
                activeOnly: activeOnly
            };
            if (status)    params.status     = status;
            if (userId)    params.userId     = Number(userId);
            if (vehicleId) params.vehicleId  = Number(vehicleId);

            const response = await searchReservations(params);
            setReservations(response.data.content ?? response.data);
        } catch (error) {
            console.error(error?.response?.data);
            toast.error("Error fetching reservations");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchReservations(); }, [status, sortBy, sortDir, activeOnly]);

    const handleClear = () => {
        setStatus('');
        setUserId('');
        setVehicleId('');
        setActiveOnly(false);
        setSortBy('reservedAt');
        setSortDir('DESC');
    };


    const handleAllot = (reservation) => {
        setConfirm({
            open: true,
            title: 'Allot Vehicle',
            message: `Allot "${reservation.vehicleModelName}" to ${reservation.userName}? This will fulfill the reservation and notify the user.`,
            confirmLabel: 'Allot Vehicle',
            confirmColor: 'success',
            onConfirm: async () => {
                closeConfirm();
                try {
                    await allotReservation(reservation.id);
                    toast.success("Vehicle allotted successfully");
                    fetchReservations();
                } catch (error) {
                    toast.error(error?.response?.data?.message ?? "Error allotting vehicle");
                }
            }
        });
    };

    const handleCancel = (reservation) => {
        setConfirm({
            open: true,
            title: 'Cancel Reservation',
            message: `Cancel reservation #${reservation.id} for ${reservation.userName}? The user will be notified.`,
            confirmLabel: 'Cancel Reservation',
            confirmColor: 'error',
            onConfirm: async () => {
                closeConfirm();
                try {
                    await cancelReservation(reservation.id);
                    toast.success("Reservation cancelled successfully");
                    fetchReservations();
                } catch (error) {
                    toast.error(error?.response?.data?.message ?? "Error cancelling reservation");
                }
            }
        });
    };


    const stats = [
        {title: "Total",     value: reservations.length},
        {title: "Pending",   value: reservations.filter(r => r.status === 'PENDING').length},
        {title: "Notified",  value: reservations.filter(r => r.status === 'NOTIFIED').length},
        {title: "Fulfilled", value: reservations.filter(r => r.status === 'FULFILLED').length},
    ];

    return (
        <div className="min-h-screen bg-white py-8">
            <div className="px-4 sm:px-8 lg:px-8">

                {/* Header */}
                <div className="mb-8 flex items-center justify-between">
                    <div className="flex flex-col">
                        <h1 className="text-4xl font-bold text-gray-800 mb-2">Reservations Management</h1>
                        <p className="text-lg text-gray-600">Monitor vehicle reservations and fulfill them.</p>
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

                    {/* Search by User ID */}
                    <div className="min-w-[140px]">
                        <TextField
                            fullWidth size="small"
                            label="User ID"
                            type="number"
                            value={userId}
                            onChange={(e) => setUserId(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && fetchReservations()}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <SearchIcon sx={{fontSize: 18, color: '#9ca3af'}}/>
                                    </InputAdornment>
                                )
                            }}
                        />
                    </div>

                    {/* Search by Vehicle ID */}
                    <div className="min-w-[140px]">
                        <TextField
                            fullWidth size="small"
                            label="Vehicle ID"
                            type="number"
                            value={vehicleId}
                            onChange={(e) => setVehicleId(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && fetchReservations()}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <SearchIcon sx={{fontSize: 18, color: '#9ca3af'}}/>
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
                                {RESERVATION_STATUSES.map((s) => (
                                    <MenuItem key={s} value={s}>
                                        <Chip size="small" label={s} color={statusColor[s]}
                                              sx={{fontWeight: 700, fontSize: '0.7rem'}}/>
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </div>

                    {/* Sort */}
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
                                <MenuItem value="reservedAt-desc">Reserved (Newest)</MenuItem>
                                <MenuItem value="reservedAt-asc">Reserved (Oldest)</MenuItem>
                                <MenuItem value="queuePosition-asc">Queue (1st First)</MenuItem>
                                <MenuItem value="queuePosition-desc">Queue (Last First)</MenuItem>
                                <MenuItem value="availableUntil-asc">Expiry (Soonest)</MenuItem>
                            </Select>
                        </FormControl>
                    </div>

                    {/* Active Only Toggle */}
                    <Button
                        variant={activeOnly ? "contained" : "outlined"}
                        color="primary" size="medium"
                        onClick={() => setActiveOnly(!activeOnly)}
                        sx={{textTransform: 'none', fontWeight: 700}}
                    >
                        Active Only
                    </Button>

                    {/* Clear */}
                    <Button variant="outlined" color="error" size="medium"
                            endIcon={<DangerousIcon/>} onClick={handleClear}
                            sx={{textTransform: 'none', fontWeight: 700}}>
                        Clear
                    </Button>
                </div>

                {/* Table */}
                <div className="w-full overflow-x-auto rounded-xl shadow-sm border border-gray-200">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                        <tr>
                            {["ID", "Vehicle", "User", "Reserved On", "Available Until", "Priority", "Notified", "Status", "Actions"].map((col) => (
                                <th key={col}
                                    className="px-4 py-3 text-center text-xs font-semibold text-gray-500 uppercase tracking-wider whitespace-nowrap">
                                    {col}
                                </th>
                            ))}
                        </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-100 text-center">
                        {!loading && reservations.map((reservation) => (
                            <tr key={reservation.id} className="hover:bg-gray-50 transition-colors">

                                <td className="font-mono font-bold px-4 py-3">#{reservation.id}</td>

                                <td className="px-4 py-3">
                                    <div className="flex flex-col items-center gap-0.5">
                                        <p className="font-bold text-sm">{reservation.vehicleModelName}</p>
                                        <p className="text-xs text-gray-400">{reservation.vehicleBrand}</p>
                                        <p className="text-xs font-mono text-gray-400">{reservation.vehicleRegsNo}</p>
                                    </div>
                                </td>

                                <td className="px-4 py-3">
                                    <div className="flex flex-col items-center gap-0.5">
                                        <p className="font-bold text-sm">{reservation.userName}</p>
                                        <p className="text-xs text-gray-400">{reservation.userEmail}</p>
                                    </div>
                                </td>

                                <td className="px-4 py-3">
                                    <div className="flex flex-col items-center gap-0.5">
                                        <p className="font-bold text-sm">{formatDateTime(reservation.reservedAt)}</p>
                                        <p className="text-xs text-gray-400 font-medium">
                                            {`${daysBetween(reservation.reservedAt, new Date())} days waiting`}
                                        </p>
                                    </div>
                                </td>

                                <td className="px-4 py-3">
                                    {reservation.availableUntil ? (
                                        <div className="flex flex-col items-center gap-0.5">
                                            <p className="font-bold text-sm">{formatDateTime(reservation.availableUntil)}</p>
                                            {reservation.hoursUntilExpiry !== null && (
                                                <Chip size="small"
                                                      label={`${reservation.hoursUntilExpiry}h left`}
                                                      color={reservation.hoursUntilExpiry < 6 ? "error" : "warning"}
                                                      sx={{fontWeight: 700, fontSize: '0.65rem'}}
                                                />
                                            )}
                                        </div>
                                    ) : <span className="text-gray-400">—</span>}
                                </td>

                                <td className="px-4 py-3">
                                    <Chip variant="filled" color="primary" sx={{fontWeight: 'bold'}}
                                          label={reservation.queuePosition > 0 ? `#${reservation.queuePosition}` : '—'}/>
                                </td>

                                <td className="px-4 py-3">
                                    <Chip size="small"
                                          label={reservation.notificationSent ? "Sent" : "Pending"}
                                          color={reservation.notificationSent ? "success" : "default"}
                                          sx={{fontWeight: 700, fontSize: '0.7rem'}}
                                    />
                                </td>

                                <td className="px-4 py-3">
                                    <Chip variant="filled" sx={{fontWeight: 'bold'}}
                                          color={statusColor[reservation.status] ?? 'default'}
                                          label={reservation.status}/>
                                </td>

                                <td className="px-4 py-3">
                                    <div className="flex flex-col gap-1 items-center py-1">
                                        <Button variant="contained" color="success" size="small" fullWidth
                                                startIcon={<KeyboardReturnIcon/>}
                                                disabled={!['PENDING', 'NOTIFIED'].includes(reservation.status)}
                                                onClick={() => handleAllot(reservation)}
                                                sx={{textTransform: 'none', fontWeight: 700, fontSize: '0.7rem'}}>
                                            Allot
                                        </Button>
                                        <Button variant="outlined" color="error" size="small" fullWidth
                                                startIcon={<DangerousIcon/>}
                                                disabled={!['PENDING', 'NOTIFIED'].includes(reservation.status)}
                                                onClick={() => handleCancel(reservation)}
                                                sx={{textTransform: 'none', fontWeight: 700, fontSize: '0.7rem'}}>
                                            Cancel
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
                    {!loading && reservations.length === 0 && (
                        <div className="flex justify-center py-10">
                            <p className="text-gray-400 font-medium">No reservations found.</p>
                        </div>
                    )}
                </div>
            </div>

            <ConfirmDialog
                open={confirm.open}
                onClose={closeConfirm}
                onConfirm={confirm.onConfirm}
                title={confirm.title}
                message={confirm.message}
                confirmLabel={confirm.confirmLabel}
                confirmColor={confirm.confirmColor}
            />
        </div>
    );
};

export default Reservations;
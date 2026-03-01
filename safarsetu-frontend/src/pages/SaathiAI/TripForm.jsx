import React from 'react';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import { styled } from '@mui/material/styles';
import RouteIcon from '@mui/icons-material/Route';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import GroupIcon from '@mui/icons-material/Group';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import LuggageIcon from '@mui/icons-material/Luggage';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import TripTypeSelector from './TripTypeSelector';

const IndigoSwitch = styled(Switch)(({ theme }) => ({
    '& .MuiSwitch-switchBase.Mui-checked': { color: '#4f46e5' },
    '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': { backgroundColor: '#4f46e5' },
}));

const fieldConfig = [
    { name: 'distanceKm', label: 'Distance (km)', type: 'number', icon: <RouteIcon className="text-indigo-400" />, placeholder: 'e.g. 250' },
    { name: 'durationDays', label: 'Duration (days)', type: 'number', icon: <CalendarMonthIcon className="text-indigo-400" />, placeholder: 'e.g. 3' },
    { name: 'passengers', label: 'Passengers', type: 'number', icon: <GroupIcon className="text-indigo-400" />, placeholder: 'e.g. 4' },
    { name: 'budget', label: 'Budget (₹)', type: 'number', icon: <AccountBalanceWalletIcon className="text-indigo-400" />, placeholder: 'e.g. 5000' },
];

const TripForm = ({ form, onChange, onSubmit, loading }) => {
    const isValid = form.distanceKm && form.durationDays && form.passengers && form.budget;

    const handleFieldChange = (e) => {
        const { name, value, type, checked } = e.target;
        onChange({ ...form, [name]: type === 'checkbox' ? checked : value });
    };

    return (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-xl shadow-indigo-100/40 p-6 md:p-8">
            {/* Card header */}
            <div className="mb-7">
                <div className="flex items-center gap-2 mb-1">
                    <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center">
                        <AutoAwesomeIcon style={{ color: '#fff', fontSize: 16 }} />
                    </div>
                    <h2 className="text-xl font-extrabold text-gray-900 tracking-tight">Plan Your Trip</h2>
                </div>
                <p className="text-sm text-gray-400 ml-10">Fill in the details and let Saathi find your perfect ride</p>
            </div>

            {/* Fields grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-6">
                {fieldConfig.map((field) => (
                    <div key={field.name} className="flex flex-col gap-1">
                        <label className="text-xs font-semibold text-gray-500 uppercase tracking-widest flex items-center gap-1.5">
                            {field.icon} {field.label}
                        </label>
                        <TextField
                            name={field.name}
                            value={form[field.name]}
                            onChange={handleFieldChange}
                            type={field.type}
                            placeholder={field.placeholder}
                            variant="outlined"
                            size="small"
                            fullWidth
                            InputProps={{
                                sx: {
                                    borderRadius: '10px',
                                    backgroundColor: '#f9fafb',
                                    fontSize: '14px',
                                    '& fieldset': { borderColor: '#e5e7eb' },
                                    '&:hover fieldset': { borderColor: '#a5b4fc' },
                                    '&.Mui-focused fieldset': { borderColor: '#4f46e5' },
                                },
                            }}
                        />
                    </div>
                ))}
            </div>

            {/* Trip type selector */}
            <div className="mb-6">
                <TripTypeSelector
                    value={form.tripType}
                    onChange={(val) => onChange({ ...form, tripType: val })}
                />
            </div>

            {/* Luggage toggle */}
            <div className="flex items-center justify-between bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 mb-7">
                <div className="flex items-center gap-2">
                    <LuggageIcon className="text-indigo-400" style={{ fontSize: 22 }} />
                    <div>
                        <p className="text-sm font-semibold text-gray-800">Luggage Required</p>
                        <p className="text-xs text-gray-400">Enable if you'll carry luggage</p>
                    </div>
                </div>
                <FormControlLabel
                    control={
                        <IndigoSwitch
                            checked={form.luggageRequired}
                            onChange={(e) => onChange({ ...form, luggageRequired: e.target.checked })}
                            name="luggageRequired"
                        />
                    }
                    label=""
                    sx={{ margin: 0 }}
                />
            </div>

            {/* Submit */}
            <button
                onClick={onSubmit}
                disabled={!isValid || loading}
                className={`w-full flex items-center justify-center gap-2 py-3.5 rounded-xl text-sm font-bold tracking-wide transition-all duration-200
          ${isValid && !loading
                    ? 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-200 hover:-translate-y-0.5'
                    : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                }`}
            >
                {loading ? (
                    <>
            <span
                className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                style={{ animation: 'spin 0.8s linear infinite' }}
            />
                        Saathi is thinking...
                    </>
                ) : (
                    <>
                        <AutoAwesomeIcon style={{ fontSize: 17 }} />
                        Ask Saathi AI
                    </>
                )}
            </button>

            {!isValid && (
                <p className="text-center text-xs text-gray-400 mt-2">Please fill all fields to continue</p>
            )}

            <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        </div>
    );
};

export default TripForm;
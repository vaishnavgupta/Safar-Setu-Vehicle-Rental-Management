import React, {useEffect, useState} from 'react';
import UsersStatsBox from "../Users/UsersStatsBox.jsx";
import {Button, Chip, CircularProgress, IconButton} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import {getAllSubscriptionPlans} from "../../services/subscriptionsPlanService.js";
import SubscriptionPlanAddDialog from "./SubscriptionPlanAddDialog.jsx";
import SubscriptionPlanUpdateDialog from "./SubscriptionPlanUpdateDialog.jsx";
import SubscriptionPlanDeleteDialog from "./SubscriptionPlanDeleteDialog.jsx";
import toast from "react-hot-toast";

const Subscriptions = () => {
    const [plans, setPlans] = useState([]);
    const [loading, setLoading] = useState(false);
    const [addOpen, setAddOpen] = useState(false);
    const [updateDialog, setUpdateDialog] = useState({open: false, plan: null});
    const [deleteDialog, setDeleteDialog] = useState({open: false, plan: null});

    const fetchPlans = async () => {
        setLoading(true);
        try {
            const response = await getAllSubscriptionPlans();
            setPlans(response.data);
        } catch (error) {
            toast.error("Error fetching subscription plans");
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPlans();
    }, [addOpen, updateDialog.open, deleteDialog.open]);

    return (
        <div className="min-h-screen bg-white py-8">
            <div className="px-4 sm:px-8 lg:px-8">
                <div className="mb-8 animate-fade-in-up flex items-center justify-between">
                    <div className="flex flex-col">
                        <h1 className="text-4xl font-bold text-gray-800 mb-2">Subscription Plans</h1>
                        <p className="text-lg text-gray-600">Manage subscription plans and pricing.</p>
                    </div>
                    <Button variant="contained" startIcon={<AddIcon/>} onClick={() => setAddOpen(true)}>
                        Add New Plan
                    </Button>
                </div>

                {/* Dialogs */}
                <SubscriptionPlanAddDialog open={addOpen} onClose={() => setAddOpen(false)}/>
                <SubscriptionPlanUpdateDialog
                    open={updateDialog.open}
                    onClose={() => setUpdateDialog({open: false, plan: null})}
                    plan={updateDialog.plan}
                />
                <SubscriptionPlanDeleteDialog
                    open={deleteDialog.open}
                    onClose={() => setDeleteDialog({open: false, plan: null})}
                    plan={deleteDialog.plan}
                />

                {/* Stats */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                    {[
                        {title: "Total Plans", value: plans.length},
                        {title: "Active Plans", value: plans.filter(p => p.active).length},
                        {title: "Featured Plans", value: plans.filter(p => p.isFeatured).length},
                        {title: "Auto Renew", value: plans.filter(p => p.autoRenew).length},
                    ].map((item) => (
                        <UsersStatsBox key={item.title} title={item.title} value={item.value} textClass="text-indigo-500"/>
                    ))}
                </div>

                {/* Table */}
                <div className="w-full overflow-x-auto rounded-xl shadow-sm border border-gray-200">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                        <tr>
                            {["Order", "Plan Name", "Code", "Price", "Max Vehicles", "Validity", "Featured", "Status", "Actions"].map((col) => (
                                <th key={col}
                                    className="px-4 py-3 text-center text-xs font-semibold text-gray-500 uppercase tracking-wider whitespace-nowrap">
                                    {col}
                                </th>
                            ))}
                        </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-100 text-center">
                        {!loading && plans.map((plan) => (
                            <tr key={plan.id}>
                                <td className="font-mono font-bold">
                                    <Chip variant="filled" color="default" label={plan.displayOrder}/>
                                </td>
                                <td>
                                    <div className="flex flex-col gap-1 items-center justify-center py-2">
                                        <p className="font-bold tracking-wide">{plan.planName}</p>
                                        <Chip variant="filled" color="warning" sx={{fontWeight: 'bold'}} label={plan.badgeFeatures}/>
                                    </div>
                                </td>
                                <td>
                                    <Chip variant="outlined" color="primary" label={plan.planCode}/>
                                </td>
                                <td className="font-bold font-mono">{`₹ ${plan.price}`}</td>
                                <td>
                                    <Chip variant="filled" color="secondary" sx={{fontWeight: 'bold'}} label={plan.maxVehiclesAllowed}/>
                                </td>
                                <td>
                                    <Chip variant="outlined" color="info" sx={{fontWeight: 'bold'}} label={`${plan.validityInDays} days`}/>
                                </td>
                                <td>
                                    <Chip variant="filled" color={plan.isFeatured ? "success" : "default"} sx={{fontWeight: 'bold'}} label={plan.isFeatured ? "Yes" : "No"}/>
                                </td>
                                <td>
                                    <Chip variant="filled" color={plan.active ? "primary" : "error"} sx={{fontWeight: 'bold'}} label={plan.active ? "Active" : "Inactive"}/>
                                </td>
                                <td>
                                    <div className="flex gap-1 items-center justify-center py-2">
                                        <IconButton color="success" onClick={() => setUpdateDialog({open: true, plan})}>
                                            <EditIcon/>
                                        </IconButton>
                                        <IconButton color="error" onClick={() => setDeleteDialog({open: true, plan})}>
                                            <DeleteIcon/>
                                        </IconButton>
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
                </div>
            </div>
        </div>
    );
};

export default Subscriptions;
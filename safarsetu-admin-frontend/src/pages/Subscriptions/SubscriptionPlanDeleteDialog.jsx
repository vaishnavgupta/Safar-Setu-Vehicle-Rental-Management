import React, {useState} from 'react';
import {
    Backdrop, Button, Dialog, DialogActions, DialogContent,
    DialogTitle, Divider, IconButton
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import Loader from "../../components/Loader.jsx";
import toast from "react-hot-toast";
import {deleteSubscriptionPlan} from "../../services/subscriptionsPlanService.js";

const SubscriptionPlanDeleteDialog = ({open, onClose, plan}) => {
    const [loading, setLoading] = useState(false);

    const handleDelete = async () => {
        setLoading(true);
        try {
            await deleteSubscriptionPlan(plan?.id);
            toast.success("Subscription plan deleted successfully");
            onClose();
        } catch (error) {
            toast.error("Error deleting subscription plan");
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth
                PaperProps={{sx: {borderRadius: 3, boxShadow: '0 20px 60px rgba(0,0,0,0.12)'}}}>

            <DialogTitle sx={{px: 3, pt: 3, pb: 1}}>
                <div className="flex items-start justify-between">
                    <div>
                        <h2 className="text-lg font-bold text-gray-900 leading-tight">Delete Subscription Plan</h2>
                        <p className="text-sm text-gray-400 font-normal mt-0.5">
                            Deleting:{' '}
                            <span className="font-semibold text-red-600">{plan?.planName}</span>
                        </p>
                    </div>
                    <IconButton onClick={onClose} size="small" sx={{color: 'gray', mt: -0.5, mr: -1}}>
                        <CloseIcon fontSize="small"/>
                    </IconButton>
                </div>
            </DialogTitle>

            <Divider/>

            <DialogContent sx={{px: 3, py: 3}}>
                <div className="flex flex-col items-center text-center gap-3">
                    <div className="w-14 h-14 rounded-full bg-red-50 flex items-center justify-center">
                        <WarningAmberIcon sx={{color: '#ef4444', fontSize: 32}}/>
                    </div>
                    <p className="text-sm text-gray-600">
                        This action <span className="font-semibold text-gray-800">cannot be undone.</span> Deleting{' '}
                        <span className="font-semibold text-gray-800">{plan?.planCode}</span> will remove the plan
                        and may affect active subscribers.
                    </p>
                </div>

                {loading && (
                    <Backdrop sx={{color: '#6366f1', zIndex: (t) => t.zIndex.drawer + 1, backgroundColor: 'rgba(255,255,255,0.4)', backdropFilter: 'blur(8px)'}}
                              open={loading}>
                        <Loader text="Deleting Subscription Plan..."/>
                    </Backdrop>
                )}
            </DialogContent>

            <Divider/>

            <DialogActions sx={{px: 3, py: 2, gap: 1}}>
                <Button onClick={onClose} size="small"
                        sx={{color: '#6b7280', textTransform: 'none', fontWeight: 600, '&:hover': {background: '#f3f4f6'}}}>
                    Cancel
                </Button>
                <Button onClick={handleDelete} variant="contained" color="error" size="small"
                        startIcon={<DeleteForeverIcon/>} disableElevation
                        sx={{textTransform: 'none', fontWeight: 600, borderRadius: 2, px: 2.5}}>
                    Delete Plan
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default SubscriptionPlanDeleteDialog;
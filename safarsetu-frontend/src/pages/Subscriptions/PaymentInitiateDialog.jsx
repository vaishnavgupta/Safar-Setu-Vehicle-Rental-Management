import React from 'react';
import {
    Button, Dialog, DialogContent, DialogTitle,
    Divider, IconButton, Chip
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import PaymentIcon from "@mui/icons-material/Payment";
import ReceiptIcon from "@mui/icons-material/Receipt";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";

const PaymentInitiateDialog = ({open, onClose, paymentRequest}) => {

    const handleProceedToPay = () => {
        if (paymentRequest?.checkoutUrl) {
            window.open(paymentRequest.checkoutUrl, '_blank');
        }
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth
                PaperProps={{sx: {borderRadius: 3, boxShadow: '0 20px 60px rgba(0,0,0,0.12)'}}}>

            <DialogTitle sx={{px: 3, pt: 3, pb: 1}}>
                <div className="flex items-start justify-between">
                    <div>
                        <h2 className="text-lg font-bold text-gray-900 leading-tight">Payment Summary</h2>
                        <p className="text-sm text-gray-400 font-normal mt-0.5">Review details before proceeding</p>
                    </div>
                    <IconButton onClick={onClose} size="small" sx={{color: 'gray', mt: -0.5, mr: -1}}>
                        <CloseIcon fontSize="small"/>
                    </IconButton>
                </div>
            </DialogTitle>

            <Divider/>

            <DialogContent sx={{px: 3, py: 3}}>
                <div className="flex flex-col gap-4">

                    {/* Status Banner */}
                    <div className={`flex items-center gap-3 px-4 py-3 rounded-2xl ${paymentRequest?.success ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
                        {paymentRequest?.success
                            ? <CheckCircleIcon sx={{color: '#16a34a', fontSize: 22}}/>
                            : <ErrorIcon sx={{color: '#dc2626', fontSize: 22}}/>
                        }
                        <p className={`text-sm font-semibold ${paymentRequest?.success ? 'text-green-700' : 'text-red-700'}`}>
                            {paymentRequest?.message ?? 'Payment initiated'}
                        </p>
                    </div>

                    {/* Amount */}
                    <div className="flex flex-col items-center justify-center bg-gradient-to-br from-indigo-50 to-blue-50 border border-indigo-100 rounded-2xl py-5">
                        <p className="text-xs font-semibold text-indigo-400 uppercase tracking-widest mb-1">Amount Due</p>
                        <p className="text-4xl font-black text-indigo-700">
                            ₹ {paymentRequest?.amount ? paymentRequest.amount  : '0.00'}
                        </p>
                    </div>

                    {/* Details */}
                    <div className="flex flex-col gap-2">
                        {[
                            {label: "Payment ID",    value: paymentRequest?.paymentId},
                            {label: "Transaction ID", value: paymentRequest?.transactionId},
                            {label: "Order ID",       value: paymentRequest?.razorpayOrderId},
                            {label: "Description",    value: paymentRequest?.description},
                        ].map(({label, value}) => value && (
                            <div key={label} className="flex items-center justify-between px-4 py-2.5 bg-gray-50 rounded-xl border border-gray-100">
                                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide">{label}</p>
                                <p className="text-sm font-semibold text-gray-700 font-mono truncate max-w-[180px]">{value}</p>
                            </div>
                        ))}

                        {/* Gateway Chip */}
                        {paymentRequest?.paymentGateway && (
                            <div className="flex items-center justify-between px-4 py-2.5 bg-gray-50 rounded-xl border border-gray-100">
                                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Gateway</p>
                                <Chip
                                    icon={<PaymentIcon sx={{fontSize: 14}}/>}
                                    label={paymentRequest.paymentGateway}
                                    size="small"
                                    color="primary"
                                    variant="outlined"
                                    sx={{fontWeight: 700, fontSize: '0.7rem'}}
                                />
                            </div>
                        )}
                    </div>

                    <Divider/>

                    {/* Buttons */}
                    <Button
                        variant="contained"
                        fullWidth
                        size="large"
                        startIcon={<OpenInNewIcon/>}
                        disabled={!paymentRequest?.checkoutUrl}
                        onClick={handleProceedToPay}
                        disableElevation
                        sx={{
                            fontWeight: 700,
                            borderRadius: 2.5,
                            textTransform: 'none',
                            fontSize: '0.95rem',
                            background: 'linear-gradient(135deg, #4f46e5, #2563eb)',
                            '&:hover': {background: 'linear-gradient(135deg, #4338ca, #1d4ed8)'},
                        }}
                    >
                        Proceed to Pay
                    </Button>

                    <Button
                        variant="text"
                        fullWidth
                        onClick={onClose}
                        sx={{color: '#9ca3af', textTransform: 'none', fontWeight: 600}}
                    >
                        Cancel
                    </Button>

                </div>
            </DialogContent>
        </Dialog>
    );
};

export default PaymentInitiateDialog;
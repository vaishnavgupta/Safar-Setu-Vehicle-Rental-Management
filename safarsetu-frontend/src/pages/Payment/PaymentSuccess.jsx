import React, {useEffect, useState} from 'react';
import {useNavigate, useSearchParams} from "react-router";
import {verifyPayment} from "../../services/subscriptionService.js";
import toast from "react-hot-toast";
import {CircularProgress} from "@mui/material";
import ErrorIcon from "@mui/icons-material/Error";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const PaymentSuccess = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const [status, setStatus] = useState('loading');
    const [payment, setPayment] = useState(null);

    const handlePaymentVerification = async (payment_id) => {
        try {
            const response = await verifyPayment({
                razorpayPaymentId: payment_id
            });
            setPayment(response.data);
            setStatus('success');
        }
        catch (error) {
            console.error(error);
            toast.error('Failed to verify payment');
            setStatus('failed');
        }
    }

    useEffect(() => {
        const razorpay_payment_id = searchParams.get("razorpay_payment_id");
        const razorpay_payment_link_status = searchParams.get("razorpay_payment_link_status");

        if(razorpay_payment_link_status === "paid" && razorpay_payment_id) {
            handlePaymentVerification(razorpay_payment_id);
        }
        else {
            setStatus('failed');
        }
    }, []);

    if (status === 'loading') return (
        <div className="min-h-screen flex flex-col items-center justify-center gap-4">
            <CircularProgress size={48} sx={{ color: '#6366f1' }} />
            <p className="text-gray-500 font-semibold text-lg">Verifying your payment...</p>
        </div>
    );

    if (status === 'failed') return (
        <div className="min-h-screen flex flex-col items-center justify-center gap-4">
            <ErrorIcon sx={{ fontSize: 64, color: '#ef4444' }} />
            <h2 className="text-2xl font-bold text-gray-800">Payment Verification Failed</h2>
            <p className="text-gray-500">Please contact support with your payment ID.</p>
            <button onClick={() => navigate('/')}
                    className="mt-4 px-6 py-2 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700">
                Go Home
            </button>
        </div>
    );


  return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-6 px-4">
          <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 p-10 flex flex-col items-center gap-4 max-w-md w-full">
              <CheckCircleIcon sx={{ fontSize: 72, color: '#16a34a' }} />
              <h2 className="text-2xl font-black text-gray-800">Payment Successful!</h2>
              <p className="text-gray-400 text-sm text-center">Your subscription has been activated.</p>

              {payment && (
                  <div className="w-full flex flex-col gap-2 mt-2">
                      {[
                          { label: 'Payment ID', value: payment.id },
                          { label: 'Amount', value: `₹ ${payment.amount }` },
                          { label: 'Status', value: payment.paymentStatus },
                          {label: 'Transaction Id', value: payment.transactionId },
                      ].map(({ label, value }) => (
                          <div key={label} className="flex justify-between px-4 py-2.5 bg-gray-50 rounded-xl">
                              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide">{label}</p>
                              <p className="text-sm font-bold text-gray-700">{value}</p>
                          </div>
                      ))}
                  </div>
              )}

              <button onClick={() => navigate('/')}
                      className="w-full mt-2 py-3 bg-gradient-to-r from-indigo-600 to-blue-600 text-white rounded-2xl font-bold hover:opacity-90 transition-all">
                  Continue
              </button>
          </div>
      </div>
  );
};

export default PaymentSuccess;

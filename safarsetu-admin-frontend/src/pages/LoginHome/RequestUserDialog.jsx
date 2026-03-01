import React from 'react';
import {
    Dialog, DialogContent, DialogTitle, IconButton, Divider, Typography
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';

const RequestUserDialog = ({ open, onClose }) => {
    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="xs"
            fullWidth
            PaperProps={{
                sx: {
                    borderRadius: 4,
                    boxShadow: '0 24px 64px rgba(139,0,0,0.15)',
                    overflow: 'hidden',
                }
            }}
        >
            {/* Header */}
            <div style={{ background: 'linear-gradient(135deg, #c0392b, #8b0000)', padding: '20px 24px' }}>
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <SupportAgentIcon style={{ color: 'white', fontSize: 28 }} />
                        <div>
                            <Typography variant="h6" style={{ color: 'white', fontWeight: 700, lineHeight: 1.2 }}>
                                Request New Account
                            </Typography>
                            <Typography variant="caption" style={{ color: 'rgba(255,255,255,0.75)' }}>
                                Contact our support team
                            </Typography>
                        </div>
                    </div>
                    <IconButton onClick={onClose} size="small" sx={{ color: 'white' }}>
                        <CloseIcon />
                    </IconButton>
                </div>
            </div>

            <DialogContent sx={{ p: 3 }}>
                <Typography variant="body2" color="text.secondary" className="mb-4" sx={{ mb: 2.5 }}>
                    New admin accounts are created by the Safar Setu support team. Reach out via any of the channels below and we'll get you set up quickly.
                </Typography>

                <Divider sx={{ mb: 2.5 }} />

                <div className="flex flex-col gap-3">
                    {/* Email */}
                    <a href="mailto:vaishnav23oct@gmail.com"
                       className="flex items-center gap-3 p-3 rounded-xl transition-all hover:scale-[1.01]"
                       style={{ background: '#fff5f5', border: '1px solid #fecaca', textDecoration: 'none' }}>
                        <div className="w-9 h-9 rounded-lg flex items-center justify-center"
                             style={{ background: 'linear-gradient(135deg, #ef4444, #c0392b)' }}>
                            <EmailIcon style={{ color: 'white', fontSize: 18 }} />
                        </div>
                        <div>
                            <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: '#9b2222' }}>Email Us</p>
                            <p className="text-sm font-medium text-gray-700">vaishnav23oct@gmail.com</p>
                        </div>
                    </a>

                    {/* Phone */}
                    <a href="tel:+917266860224"
                       className="flex items-center gap-3 p-3 rounded-xl transition-all hover:scale-[1.01]"
                       style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', textDecoration: 'none' }}>
                        <div className="w-9 h-9 rounded-lg flex items-center justify-center"
                             style={{ background: 'linear-gradient(135deg, #22c55e, #16a34a)' }}>
                            <PhoneIcon style={{ color: 'white', fontSize: 18 }} />
                        </div>
                        <div>
                            <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: '#166534' }}>Call Us</p>
                            <p className="text-sm font-medium text-gray-700">+91 7266860224 (Charges apply)</p>
                        </div>
                    </a>

                </div>

                <Typography variant="caption" color="text.disabled" sx={{ display: 'block', textAlign: 'center', mt: 3 }}>
                    Support available Mon–Sat, 9 AM – 6 PM IST
                </Typography>
            </DialogContent>
        </Dialog>
    );
};

export default RequestUserDialog;
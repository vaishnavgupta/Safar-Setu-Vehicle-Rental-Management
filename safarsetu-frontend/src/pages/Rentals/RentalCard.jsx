import React from 'react';
import {Box, Button, Card, CardContent, Divider, Typography} from "@mui/material";
import HandshakeIcon from '@mui/icons-material/Handshake';
import NumbersIcon from '@mui/icons-material/Numbers';
import BusinessIcon from '@mui/icons-material/Business';
import DateRangeIcon from '@mui/icons-material/DateRange';
import FastRewindIcon from '@mui/icons-material/FastRewind';
import toast from "react-hot-toast";

const RentalCard = ({rental}) => {
  return (
    <Card>
        <CardContent sx={{p:3}}>
            <Box sx={{display: 'flex', gap: 3, flexDirection: {xs: 'column', md: 'row'}}}>
                {/*  Cover Icon  */}
                <Box sx={{
                    width: 80,
                    height: 120,
                    borderRadius: 2,
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    cursor: 'pointer',
                    transition: 'transform 0.3s',
                    '&:hover': {
                        transform: 'scale(1.05)',
                    }
                }}>
                    <HandshakeIcon sx={{fontSize: 60, color: 'white', opacity: 0.9}} />
                </Box>

                {/*  Vehicle Detail  */}
                <Box sx={{flex: 1 }}>
                    <Typography variant="h6">
                        {rental.vehicleModelName}
                    </Typography>
                    <Box sx={{display: 'flex', alignItems: 'center', gap:1, mb:1}}>
                        <BusinessIcon sx={{fontSize: 16,}} />
                        <Typography variant="body2" sx={{color: 'text.secondary'}}>
                            {rental.vehicleBrand}
                        </Typography>
                    </Box>
                    <Box sx={{display: 'flex', alignItems: 'center', gap:1, mb:1}}>
                        <NumbersIcon sx={{fontSize: 16,}} />
                        <Typography variant="body2" sx={{color: 'text.secondary'}}>
                            {rental.vehicleRegsNo}
                        </Typography>
                    </Box>
                </Box>

                {/*  Rental Detail  */}
                <Divider orientation="vertical" flexItem sx={{ display: { xs: 'none', md: 'block' } }} />
                <Box sx={{flex: 1}}>
                    <Box sx={{display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap:2, md: 2}}>
                        {/* Checkout Date */}
                        <Box>
                            <Typography variant="caption" sx={{color: 'text.secondary', display: 'block', mb:1}}>
                                Checkout Date
                                <Box sx={{display: 'flex', alignItems: 'center', gap: 1}}>
                                    <DateRangeIcon sx={{fontSize: 14, color: '#667eea'}} />
                                    <Typography variant='body2' sx= {{ fontWeight: 600 }}>
                                        {rental.checkoutDate}
                                    </Typography>
                                </Box>
                            </Typography>
                        </Box>
                        {/*  Due DAte  */}
                        <Box>
                            <Typography variant="caption" sx={{color: 'text.secondary', display: 'block', mb:1}}>
                                Due Date
                                <Box sx={{display: 'flex', alignItems: 'center', gap: 1}}>
                                    <DateRangeIcon sx={{fontSize: 14, color: '#667eea'}} />
                                    <Typography variant='body2' sx= {{ fontWeight: 600 }}>
                                        {rental.dueDate}
                                    </Typography>
                                </Box>
                            </Typography>
                        </Box>
                        {/*  Return Date (if RETURNED)  */}
                        { rental.returnDate && <Box>
                            <Typography variant="caption" sx={{color: 'text.secondary', display: 'block', mb:1}}>
                                Return Date
                                <Box sx={{display: 'flex', alignItems: 'center', gap: 1}}>
                                    <FastRewindIcon sx={{fontSize: 14, color: '#667eea'}} />
                                    <Typography variant='body2' sx= {{ fontWeight: 600 }}>
                                        {rental.returnDate}
                                    </Typography>
                                </Box>
                            </Typography>
                        </Box>
                        }
                    </Box>
                </Box>
            </Box>
            {rental.notes && <Box sx={{
                mt: 3,
                p: 2,
                borderRadius: 2,
                bgcolor: 'rgba(59, 130, 246, 0.05)',
                border: '1px solid rgba(59, 130, 246, 0.2)'
            }}>
                <Typography variant="body1" sx={{color: 'text.secondary', fontStyle: 'italic'}}>
                    <strong className="underline">Note:</strong> {rental.notes}
                </Typography>
            </Box>
            }
            <Divider orientation="horizontal" sx={{my:2, height:'10px'  }} />

            {/*  Action Buttons  */}
            <Box className="flex flex-row gap-2 justify-end">
                <Button
                    variant="contained"
                    size="medium"
                    sx={{fontWeight: 'bold'}}
                >
                    View Details
                </Button>

                {rental.status === "ACTIVE" && !rental.returnDate &&
                    <Button
                        variant="contained"
                        size="medium"
                        color="warning"
                        onClick={() => toast.error("Visit Offline center to return vehicle")}
                        sx={{fontWeight: 'bold',
                        }}
                    >
                        Return Vehicle
                    </Button>
                }
            </Box>
        </CardContent>
    </Card>
  );
};

export default RentalCard;

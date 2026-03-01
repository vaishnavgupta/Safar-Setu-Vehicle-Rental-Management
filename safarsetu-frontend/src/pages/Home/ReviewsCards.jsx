import React from 'react';
import {Avatar, Rating} from "@mui/material";

const ReviewsCards = ({ feature }) => {
    return (
        <div
            className="relative flex flex-col gap-4
           bg-white
           rounded-2xl
           shadow-lg
           hover:shadow-2xl
           transition-all duration-300
           items-center justify-center
           py-8 px-6
           overflow-hidden"
        >
            <div className="absolute -top-10 -right-10
                w-32 h-32
                bg-indigo-400/20
                rounded-full
                blur-2xl" />
            <Rating value={feature.rating} precision={0.5} readOnly size="large" />

            <p className="text-md text-gray-700 text-center leading-relaxed">
                {feature.review}
            </p>

            <div className="flex items-center gap-4 mt-4">
                <Avatar
                    alt={feature.username}
                    src={feature.imgUrl}
                    className="shadow-md"
                />
                <p className="text-gray-900 font-semibold">
                    {feature.username}
                </p>
            </div>
        </div>
    );
};


export default ReviewsCards;

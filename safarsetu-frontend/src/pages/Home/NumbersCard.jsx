import React from 'react';

const NumbersCard = ({feature}) => {
    const IconComponent = feature.icon;
  return (
      <div className={`flex flex-col gap-3 shadow-md rounded-xl hover:shadow-xl transition-all duration-300 items-center justify-center ${feature.cardBg} py-8 px-6`} >
          <div
              className={`w-12 h-12 flex items-center justify-center rounded-xl p-2 ${feature.iconBg}`}
          >
              <IconComponent className={`text-2xl ${feature.iconColor}`} />
          </div>
          <h3
              className="
              text-4xl  font-bold tracking-wide
              ">
              {feature.title}
              <span className={feature.iconColor}>{feature.symbol}</span></h3>
          <p className="text-md text-gray-800">{feature.description}</p>
      </div>
  );
};

export default NumbersCard;

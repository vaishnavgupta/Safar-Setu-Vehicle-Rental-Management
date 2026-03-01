import React from 'react';
import {activityTypeConfig} from "./constants.js";

const ActivityTypeBadge = ({type}) => {

    const config = activityTypeConfig[type];

    if (!config) {
        return (
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-600">
        {type}
      </span>
        );
    }

    const { icon: Icon, chipClass, label } = config;

    return (
        <span className={`inline-flex items-center gap-1.5 px-3 rounded-full text-sm font-semibold ${chipClass}`}>
      <Icon style={{ fontSize: 16 }} />
            {label}
    </span>
    );
};

export default ActivityTypeBadge;

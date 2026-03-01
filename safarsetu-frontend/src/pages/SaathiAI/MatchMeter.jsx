import React, { useState, useEffect } from 'react';

const MatchMeter = ({ value }) => {
    const [displayed, setDisplayed] = useState(0);

    useEffect(() => {
        let current = 0;
        const step = () => {
            current += 2;
            if (current <= value) {
                setDisplayed(current);
                requestAnimationFrame(step);
            } else {
                setDisplayed(value);
            }
        };
        const raf = requestAnimationFrame(step);
        return () => cancelAnimationFrame(raf);
    }, [value]);

    const color =
        displayed >= 80 ? '#16a34a' : displayed >= 60 ? '#d97706' : '#dc2626';
    const bgColor =
        displayed >= 80 ? '#dcfce7' : displayed >= 60 ? '#fef3c7' : '#fee2e2';
    const labelColor =
        displayed >= 80 ? 'text-green-700' : displayed >= 60 ? 'text-amber-700' : 'text-red-700';

    const R = 38;
    const circumference = 2 * Math.PI * R;
    const strokeDash = (displayed / 100) * circumference;

    return (
        <div className="flex flex-col items-center">
            <div style={{ position: 'relative', width: 96, height: 96 }}>
                <svg width={96} height={96} style={{ transform: 'rotate(-90deg)' }}>
                    <circle cx={48} cy={48} r={R} fill={bgColor} stroke="#e5e7eb" strokeWidth={7} />
                    <circle
                        cx={48} cy={48} r={R}
                        fill="none"
                        stroke={color}
                        strokeWidth={7}
                        strokeDasharray={`${strokeDash} ${circumference}`}
                        strokeLinecap="round"
                        style={{ transition: 'stroke-dasharray 0.05s' }}
                    />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className={`text-2xl font-extrabold ${labelColor}`} style={{ fontFamily: 'inherit', lineHeight: 1 }}>
            {displayed}%
          </span>
                </div>
            </div>
            <span className="text-xs text-gray-400 font-semibold uppercase tracking-widest mt-1">Match</span>
        </div>
    );
};

export default MatchMeter;
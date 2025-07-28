import React from 'react';

const WinRateBar = ({ winRate, color }) => {
    const barWidth = (winRate * 100).toFixed(1);
    const barColor = color || '#4CAF50'; // Default color if not provided

    return (
        <div className="bg-gray-500 rounded-full h-1.5 w-20">
            <div
                className="rounded-full h-1.5"
                style={{
                    width: `${barWidth}%`,
                    backgroundColor: barColor,
                }}
            ></div>
        </div>
    );
};

export default WinRateBar;
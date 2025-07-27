import React from 'react';
import PropTypes from 'prop-types';

const PickRateBar = ({ pickRate, color }) => {
    return (
        <div className="w-20 h-1.5 bg-gray-500 rounded-md overflow-hidden">
            <div
                className="h-full rounded-md transition-width duration-300 ease-in-out"
                style={{
                    width: `${pickRate * 100}%`,
                    backgroundColor: color,
                }}
            ></div>
        </div>
    );
};

PickRateBar.propTypes = {
    pickRate: PropTypes.number.isRequired, // Value between 0 and 1
    color: PropTypes.string.isRequired,   // Color in HSL or HEX
};

export default PickRateBar;
import React from 'react';

const SearchBar = ({ value, onChange, onSearch }) => {
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            onSearch();
        }
    };

    return (
        <div className="flex items-center space-x-2">
            <input
                className="h-10 px-3 border rounded-md focus:outline-none"
                type="text"
                placeholder="Enter Player ID"
                value={value}
                onChange={onChange}
                onKeyDown={handleKeyDown}
            />
            <button
                className="h-10 px-4 bg-primary text-text rounded flex items-center justify-center focus:outline-none cursor-pointer"
                onClick={onSearch}
            >
                Search
            </button>
        </div>
    );
};

export default SearchBar;
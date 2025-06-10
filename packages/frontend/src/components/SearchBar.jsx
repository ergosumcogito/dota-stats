import React from 'react';

const SearchBar = ({ value, onChange, onSearch }) => {
    return (
        <div className="flex flex-col items-center p-4">
            <input
                className="p-2 border rounded-md"
                type="text"
                placeholder="Enter Player ID"
                value={value}
                onChange={onChange}
            />
            <button
                className="mt-2 p-2 bg-primary text-text rounded"
                onClick={onSearch}
            >
                Search
            </button>
        </div>
    );
};

export default SearchBar;

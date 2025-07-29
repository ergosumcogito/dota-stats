import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';
import SearchBar from './SearchBar';

const Navbar = () => {
    const [searchValue, setSearchValue] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setSearchValue(e.target.value);
    };

    const handleSearch = () => {
        if (searchValue.trim()) {
            navigate(`/player-search/${searchValue.trim()}`);
            setSearchValue('');
        }
    };

    return (
        <nav className="sticky top-0 left-0 right-0 bg-gray-800 h-16 flex items-center justify-between px-4 z-50 mb-4">
            {/* Left group: Logo and navigation links */}
            <div className="flex items-center">
                <Link to="/" className="flex-shrink-0">
                    <img src={logo} alt="Site Logo" className="h-10 w-auto" />
                </Link>
                <ul className="flex space-x-6 ml-6">
                    <li>
                        <Link
                            to="/player-search"
                            className="text-white font-medium hover:text-primary transition"
                        >
                            Player&apos;s Profile
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/hero-list"
                            className="text-white font-medium hover:text-primary transition"
                        >
                            Heroes List
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/hero-matrix"
                            className="text-white font-medium hover:text-primary transition"
                        >
                            Heroes Stats
                        </Link>
                    </li>
                </ul>
            </div>

            {/* Right group: Search bar */}
            <div className="ml-4">
                <SearchBar
                    value={searchValue}
                    onChange={handleChange}
                    onSearch={handleSearch}
                />
            </div>
        </nav>
    );
};

export default Navbar;
// src/components/SearchBar.js
import React from 'react';

const SearchBar = ({ searchTerm, onSearch }) => {
    return (
        <div className="search-bar">
            <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => onSearch(e.target.value)}
            />
        </div>
    );
};

export default SearchBar;

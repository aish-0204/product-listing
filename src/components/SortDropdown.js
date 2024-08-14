// src/components/SortDropdown.js
import React from 'react';


const SortDropdown = ({ sortOption, onSort }) => {
    return (
        <div className="sort-dropdown">
            <label htmlFor="sort">Sort by:</label>
            <select id="sort" value={sortOption} onChange={(e) => onSort(e.target.value)}>
                <option value="asc">Price: Low to High</option>
                <option value="desc">Price: High to Low</option>
            </select>
        </div>
    );
};

export default SortDropdown;

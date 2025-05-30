import React from 'react';

const SearchBar = ({ onSearch, value }) => {
  return (
    <input
      type="text"
      placeholder="Search items..."
      value={value}
      onChange={onSearch}
      className="search-bar"
    />
  );
};

export default SearchBar;

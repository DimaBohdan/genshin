import React from 'react';

const SortButton = ({ onSort, sortOrder }) => {
  return (
    <div className='sort'>
    <button className='sort-button' onClick={onSort}>
      Sort {sortOrder === 'asc' ? 'A-Z' : 'Z-A'}
    </button>
    </div>
  );
};

export default SortButton;

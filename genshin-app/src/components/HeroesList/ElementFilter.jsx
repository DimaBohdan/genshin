import React from 'react';

const BASE_URL = 'https://genshin.jmp.blue/elements';

const ELEMENTS = [
  { name: 'Pyro', icon: `${BASE_URL}/pyro/icon` },
  { name: 'Hydro', icon: `${BASE_URL}/hydro/icon` },
  { name: 'Anemo', icon: `${BASE_URL}/anemo/icon` },
  { name: 'Electro', icon: `${BASE_URL}/electro/icon` },
  { name: 'Geo', icon: `${BASE_URL}/geo/icon` },
  { name: 'Dendro', icon: `${BASE_URL}/dendro/icon` },
];

const ElementFilter = ({ onFilter }) => {
  return (
    <div className="element-filter">
      {/* Map over elements to create buttons dynamically */}
      {ELEMENTS.map((element) => (
        <button key={element.name} className='element-filter' onClick={() => onFilter(element.name)}>
          <img
            src={element.icon}
            alt={element.name}
            className="element-icon"
          />{' '}
          {element.name}
        </button>
      ))}
      {/* Clear Filter Button */}
      <button onClick={() => onFilter('')}>
        Clear Filter
      </button>
    </div>
  );
};

export default ElementFilter;

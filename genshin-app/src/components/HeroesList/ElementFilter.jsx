import React from 'react';
import { BASE_URL } from '../../consts';

const ELEMENT_URL = `${BASE_URL}/elements`;

const ELEMENTS = [
  { name: 'Pyro', icon: `${ELEMENT_URL}/pyro/icon` },
  { name: 'Hydro', icon: `${ELEMENT_URL}/hydro/icon` },
  { name: 'Anemo', icon: `${ELEMENT_URL}/anemo/icon` },
  { name: 'Electro', icon: `${ELEMENT_URL}/electro/icon` },
  { name: 'Geo', icon: `${ELEMENT_URL}/geo/icon` },
  { name: 'Dendro', icon: `${ELEMENT_URL}/dendro/icon` },
];

const ElementFilter = ({ onFilter }) => {
  return (
    <div className="element-filter">
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
      <button onClick={() => onFilter('')}>
        Clear Filter
      </button>
    </div>
  );
};

export default ElementFilter;

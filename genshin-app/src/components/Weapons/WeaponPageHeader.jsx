import React from 'react';
import { BASE_URL } from '../../consts';

const WeaponPageHeader = ({ hero, heroName}) => {
  return (
    <div className="hero-header">
      <img
        src={`${BASE_URL}/weapons/${heroName}/icon`}
        alt={hero.name}
        className="hero-portrait"
      />
      <div className="hero-info">
        <h1 className="hero-name">{hero.name}</h1>
        <p className="hero-title">{hero.passiveName}</p>
        <p className="hero-description">{hero.passiveDesc}</p>
      </div>
    </div>
  );
};

export default WeaponPageHeader;

import React from 'react';
import { BASE_URL } from '../../consts';

const FoodPageHeader = ({ hero, heroName}) => {
  return (
    <div className="hero-header">
      <img
        src={`${BASE_URL}/consumables/food/${heroName}/`}
        alt={hero.name}
        className="hero-portrait"
      />
      <div className="hero-info">
        <h1 className="hero-name">{hero.name}</h1>
        <p className="hero-description"><strong>Effect:</strong> {hero.effect}</p>
        <p className="hero-description">{hero.description}</p>
      </div>
    </div>
  );
};

export default FoodPageHeader;

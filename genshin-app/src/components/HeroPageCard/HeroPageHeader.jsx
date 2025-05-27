import React from 'react';
import { BASE_URL } from '../../consts';
const HeroPageHeader = ({ hero, heroName}) => {
  const elementIconUrl = `${BASE_URL}/elements/${hero.vision.toLowerCase()}/icon`;

  return (
    <div className="hero-header">
      <img
        src={`${BASE_URL}/characters/${heroName}/card`}
        alt={hero.name}
        className="hero-portrait"
      />
      <div className="hero-info">
        <h1 className="hero-name">{hero.name}</h1>
        <p className="hero-title">{hero.title}</p>
        <div className="hero-element">
          <img
            src={elementIconUrl}
            alt={hero.element}
            className="element-icon"
          />
          <span>{hero.element}</span>
        </div>
        <p className="hero-description">{hero.description}</p>
      </div>
    </div>
  );
};

export default HeroPageHeader;

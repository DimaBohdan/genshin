import React from 'react';

const HeroPageHeader = ({ hero, heroName, BASE_URL }) => {
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
      <img
        src={`${BASE_URL}/characters/${heroName}/gacha-splash`}
        alt={hero.name}
        className="hero-image"
      />
    </div>
  );
};

export default HeroPageHeader;

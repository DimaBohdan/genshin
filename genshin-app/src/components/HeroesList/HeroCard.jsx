import React from 'react';
import { useNavigate } from 'react-router-dom';
import HeroRarity from '../HeroRarity';
import { BASE_URL } from '../../consts';

const HeroCard = ({ filteredHeroes }) => {
  const navigate = useNavigate();
  console.dir(filteredHeroes[0])
  return (
    <div className="hero-grid">
      {filteredHeroes.map((hero) => (
        <div
          className="hero-card"
          key={hero.name}
          onClick={() => navigate(`/hero/${hero.name}`)}
        >
          <img
            src={`${BASE_URL}/characters/${hero.name}/icon`}
            alt={hero.name}
            className="hero-image"
          />
          <div className="hero-info">
            <h2>{hero.name}</h2>
          </div>
          <HeroRarity rarity={hero.rarity} />

        </div>
      ))}
    </div>
  );
};

export default HeroCard;

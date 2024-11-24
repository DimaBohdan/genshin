import React from 'react';
import { useNavigate } from 'react-router-dom';
import HeroRarity from './HeroRarity';
const HeroCard = ({ filteredHeroes }) => {
  const navigate = useNavigate(); // Correctly call useNavigate inside the component
  console.dir(filteredHeroes[0])
  return (
    <div className="hero-grid">
      {filteredHeroes.map((hero) => (
        <div
          className="hero-card"
          key={hero.name}
          onClick={() => navigate(`/hero/${hero.name}`)} // Use navigate here
        >
          <img
            src={`https://genshin.jmp.blue/characters/${hero.name}/icon`}
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

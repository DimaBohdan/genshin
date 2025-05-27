import React from 'react';
import { useNavigate } from 'react-router-dom';
import HeroRarity from '../HeroRarity';
import { BASE_URL } from '../../consts';
const WeaponCard = ({ weapons }) => {
  const navigate = useNavigate();
  return (
    <div className="hero-grid">
      {weapons.map((weapon) => (
        <div
          className="hero-card"
          key={weapon.name}
          onClick={() => navigate(`/weapon/${weapon.name}`)}
        >
          <img
            src={`${BASE_URL}/weapons/${weapon.name}/icon`}
            alt={weapon.name}
            className="hero-image"
          />
          <div className="hero-info">
            <h2>{weapon.name}</h2>
          </div>
          <HeroRarity rarity={weapon.rarity} />

        </div>
      ))}
    </div>
  );
};

export default WeaponCard;

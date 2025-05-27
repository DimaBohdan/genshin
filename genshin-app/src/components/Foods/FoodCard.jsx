import React from 'react';
import { useNavigate } from 'react-router-dom';
import HeroRarity from '../HeroRarity';
import { BASE_URL } from '../../consts';

const FoodCard = ({ foods }) => {
  const navigate = useNavigate();
  return (
    <div className="hero-grid">
      {foods.map((food) => (
        <div
          className="hero-card"
          key={food.name}
          onClick={() => navigate(`/food/${food.name}`)}
        >
          <img
            src={`${BASE_URL}/consumables/food/${food.name}/`}
            alt={food.name}
            className="hero-image"
          />
          <div className="hero-info">
            <h2>{food.name}</h2>
          </div>
          <HeroRarity rarity={food.rarity} />

        </div>
      ))}
    </div>
  );
};

export default FoodCard;

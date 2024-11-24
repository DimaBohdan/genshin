import React from "react";

const HeroRarity = ({ rarity }) => {
  const stars = Array(rarity).fill("★");

  return (
    <div className="hero-rarity">
      {stars.map((star, index) => (
        <span key={index} className="star">
          {star}
        </span>
      ))}
    </div>
  );
};

export default HeroRarity;

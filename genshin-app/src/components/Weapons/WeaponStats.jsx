import React from 'react';
import HeroRarity from '../HeroRarity';

const WeaponStats = ({ weapon }) => (
  <div className="hero-stats">
    <div>
      <strong>Type:</strong> {weapon.type}
    </div>
    <div>
      <strong>Base Attack:</strong> {weapon.baseAttack}
    </div>
    <div>
      <strong>Ascension Material:</strong> {weapon.ascensionMaterial}
    </div>
    <div>
      <strong>Location:</strong> {weapon.location}
    </div>
    <div>
      <strong>SubStat:</strong> {weapon.subStat}
    </div>
    <HeroRarity rarity={weapon.rarity} />
  </div>
);

export default WeaponStats;

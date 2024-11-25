import React from 'react';
import HeroRarity from '../HeroRarity';

const HeroStats = ({ hero, getMonthName, TALENT_URL }) => (
  <div className="hero-stats">
    <div>
      <strong>Weapon:</strong> {hero.weapon}
    </div>
    <div>
      <strong>Affiliation:</strong> {hero.affiliation}
    </div>
    <div>
      <strong>Constellation:</strong> {hero.constellation}
      <img
        src={`${TALENT_URL}/constellation-shape`}
        width="25px"
        alt={hero.constellation}
      />
    </div>
    <div>
      <strong>Birthday:</strong>{' '}
      {`${getMonthName(hero.birthday.split('-')[1])} ${
        hero.birthday.split('-')[2]
      }`}
    </div>
    <div>
      <strong>Gender:</strong> {hero.gender}
    </div>
    <div>
      <strong>Nation:</strong> {hero.nation}
    </div>
    <div>
      <strong>Release:</strong> {hero.release}
    </div>
    <HeroRarity rarity={hero.rarity} />
  </div>
);

export default HeroStats;

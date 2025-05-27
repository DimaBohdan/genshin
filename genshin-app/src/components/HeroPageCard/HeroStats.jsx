import React from 'react';
import HeroRarity from '../HeroRarity';
import { BASE_URL } from '../../consts';

const NATION_URL = `${BASE_URL}/nations`;
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
      <strong>Nation:</strong> {hero.nation}
      <img src={`${NATION_URL}/${hero.nation.toLowerCase()}/icon`}
        width="25px"
        alt={hero.nation}
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
      <strong>Release:</strong> {hero.release}
    </div>
    <HeroRarity rarity={hero.rarity} />
  </div>
);

export default HeroStats;

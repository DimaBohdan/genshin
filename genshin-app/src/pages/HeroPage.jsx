import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchHeroDetails } from '../api/genshinApi';
import HeroRarity from '../components/HeroRarity';
import '../styles/HeroPage.css';

const HeroPage = () => {
  const { heroName } = useParams();
  const [hero, setHero] = useState(null);
  const BASE_URL = 'https://genshin.jmp.blue';

  useEffect(() => {
    const getHeroDetails = async () => {
      const data = await fetchHeroDetails(heroName);
      setHero(data);
    };
    getHeroDetails();
  }, [heroName]);

  if (!hero) {
    return <div>Loading...</div>;
  }

  const monthTranslations = {
    "01": "January",
    "02": "February",
    "03": "March",
    "04": "April",
    "05": "May",
    "06": "June",
    "07": "July",
    "08": "August",
    "09": "September",
    "10": "October",
    "11": "November",
    "12": "December"
  };
  
  const getMonthName = (monthNumber) => monthTranslations[monthNumber] || "Invalid month";
  const TALENT_URL = `${BASE_URL}/characters/${hero.name.toLowerCase().replace(' ', '-')}`
  console.log(hero.constellations[0].name)
  return (
    <div className="hero-page">
      <div className="hero-page-card">
        <div className="hero-header">
          <img
            src={`${BASE_URL}/characters/${heroName}/card`}
            alt={hero.name}
            className="hero-portrait"
          />
          <div className="hero-info">
            <h1 className="hero-name">{hero.name}</h1>
            <div className="hero-element">
            <p className="hero-title">{hero.title}</p>
            <div className="hero-element">
              <img
                src={`${BASE_URL}/elements/${hero.vision.toLowerCase()}/icon`}
                alt={hero.element}
                className="element-icon"
              />
              
              </div>
              <span>{hero.element}</span>
            </div>
            <p className="hero-description">{hero.description}</p>
          </div>
        </div>
        <div className="hero-stats">
          <div>
            <strong>Weapon:</strong> {hero.weapon}
          </div>
          <div>
            <strong>Affiliation:</strong> {hero.affiliation}
          </div>
          <div>
            <strong>Constellation:</strong> {hero.constellation}
            <img src={`${TALENT_URL}/constellation-shape`} width='25px' alt={hero.constellation} />
          </div>
          <div>
            <strong>Birthday:</strong> {getMonthName(hero.birthday.split('-')[1])} {hero.birthday.split('-')[2]}
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
      <div class="hero-talents">
      <div class="talent-icon">
        <img src={`${TALENT_URL}/talent-burst`} alt="Talent Burst" />
        <p>Talent Burst</p>
      </div>
      <div class="talent-icon">
        <img src={`${TALENT_URL}/talent-na`} alt="Normal Attack" />
        <p>Normal Attack</p>
      </div>
      <div class="talent-icon">
        <img src={`${TALENT_URL}/talent-passive-0`} alt="Passive Talent 1" />
        <p>Passive Talent 1</p>
      </div>
      <div class="talent-icon">
        <img src={`${TALENT_URL}/talent-passive-1`} alt="Passive Talent 2" />
        <p>Passive Talent 2</p>
      </div>
      <div class="talent-icon">
        <img src={`${TALENT_URL}/talent-passive-2`} alt="Passive Talent 3" />
        <p>Passive Talent 3</p>
      </div>
      <div class="talent-icon">
        <img src={`${TALENT_URL}/talent-skill`} alt="Talent Skill" />
        <p>Talent Skill</p>
      </div>
    </div>
    <div class="hero-talents">
      <div class="talent-icon">
        <img src={`${TALENT_URL}/constellation-1`} alt={hero.constellations[0]} />
        <h5>{hero.constellations[0].name}</h5>
      </div>
      <div class="talent-icon">
        <img src={`${TALENT_URL}/constellation-2`} alt="Constellation 2" />
        <h5>{hero.constellations[1].name}</h5>
      </div>
      <div class="talent-icon">
        <img src={`${TALENT_URL}/constellation-3`} alt="Constellation 3" />
        <h5>{hero.constellations[2].name}</h5>
      </div>
      <div class="talent-icon">
        <img src={`${TALENT_URL}/constellation-4`} alt="Constellation 4" />
        <h5>{hero.constellations[3].name}</h5>
      </div>
      <div class="talent-icon">
        <img src={`${TALENT_URL}/constellation-5`} alt="Constellation 5" />
        <h5>{hero.constellations[4].name}</h5>
      </div>
      <div class="talent-icon">
        <img src={`${TALENT_URL}/constellation-6`} alt="Constellation 6" />
        <h5>{hero.constellations[5].name}</h5>
      </div>
    </div>
        </div>
      </div>
  );
};

export default HeroPage;

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchHeroDetails } from '../api/genshinApi';
import HeroPageHeader from '../components/HeroPageCard/HeroPageHeader';
import HeroConstellations from '../components/HeroPageCard/HeroConstellations';
import HeroStats from '../components/HeroPageCard/HeroStats';
import HeroTalents from '../components/HeroPageCard/HeroTalents';
import '../styles/HeroPage.css';

const HeroPage = () => {
  const { heroName } = useParams();
  const [hero, setHero] = useState(null);
  const BASE_URL = 'https://genshin.jmp.blue';
  const TALENT_URL = `${BASE_URL}/characters/${heroName.toLowerCase().replace(' ', '-')}`;

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
    '01': 'January',
    '02': 'February',
    '03': 'March',
    '04': 'April',
    '05': 'May',
    '06': 'June',
    '07': 'July',
    '08': 'August',
    '09': 'September',
    '10': 'October',
    '11': 'November',
    '12': 'December',
  };

  const getMonthName = (monthNumber) =>
    monthTranslations[monthNumber] || 'Invalid month';

  return (
    <div className="hero-page">
      <div className="hero-page-card">
        <HeroPageHeader hero={hero} heroName={heroName} BASE_URL={BASE_URL} />
        <HeroConstellations
          constellations={hero.constellations}
          TALENT_URL={TALENT_URL}
        />
        <HeroStats
          hero={hero}
          getMonthName={getMonthName}
          TALENT_URL={TALENT_URL}
        />
        <HeroTalents
          skillTalents={hero.skillTalents}
          passiveTalents={hero.passiveTalents}
          TALENT_URL={TALENT_URL}
        />
      </div>
    </div>
  );
};

export default HeroPage;

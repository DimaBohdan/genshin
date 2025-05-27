import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchWeaponDetails } from '../api/genshinApi';
import '../styles/HeroPage.css';
import WeaponStats from '../components/Weapons/WeaponStats';
import WeaponPageHeader from '../components/Weapons/WeaponPageHeader';
import Loader from '../components/Loader';
import { BASE_URL } from '../consts';

const WeaponPage = () => {
  const { weaponName } = useParams();
  const [weapon, setWeapon] = useState(null);

  useEffect(() => {
    const getWeaponDetails = async () => {
      const data = await fetchWeaponDetails(weaponName);
      setWeapon(data);
    };
    getWeaponDetails();
  }, [weaponName]);

  if (!weapon) {
    return <Loader></Loader>;
  }


  return (
    <div className="hero-page">
      <div className="hero-page-card">
        <WeaponPageHeader hero={weapon} heroName={weaponName} BASE_URL={BASE_URL} />
        <WeaponStats
          weapon={weapon}
        />
      </div>
    </div>
  );
};

export default WeaponPage;

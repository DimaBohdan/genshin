import axios from 'axios';
import { BASE_URL } from '../consts';

export const fetchAllHeroes = async () => {
  const response = await axios.get(`${BASE_URL}/characters`);
  console.log(`${response.data}`);
  return response.data;
  
};

export const fetchHeroDetails = async (heroName) => {
  const response = await axios.get(`${BASE_URL}/characters/${heroName}`);
  return response.data;
};

export const fetchAllWeapons= async () => {
  const response = await axios.get(`${BASE_URL}/weapons`);
  return response.data;
  
};
export const fetchWeaponDetails = async (weaponName) => {
  const response = await axios.get(`${BASE_URL}/weapons/${weaponName}`);
  return response.data;
};

export const fetchAllFoods= async () => {
  const response = await axios.get(`${BASE_URL}/consumables/food/`);
  return response.data;
  
};
export const fetchFoodDetails = async (foodName) => {
  const response = await axios.get(`${BASE_URL}/consumables/food/`);
  return response.data[foodName];
};
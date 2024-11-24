import axios from 'axios';

const BASE_URL = 'https://genshin.jmp.blue';

export const fetchAllHeroes = async () => {
  const response = await axios.get(`${BASE_URL}/characters`);
  console.log(`${response.data}`);
  return response.data;
  
};

export const fetchHeroDetails = async (heroName) => {
  const response = await axios.get(`${BASE_URL}/characters/${heroName}`);
  return response.data;
};

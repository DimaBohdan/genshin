import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchAllFoods} from '../api/genshinApi';
import '../styles/HeroPage.css';
import '../styles/RecipeList.css';
import RecipeList from '../components/Foods/RecipeList';
import FoodPageHeader from '../components/Foods/FoodPageHeader';
import Loader from '../components/Loader';
import { BASE_URL } from '../consts';

const FoodPage = () => {
  const { foodName } = useParams();
  const [food, setFood] = useState(null);

  useEffect(() => {
    const getFoodDetails = async () => {
      const data = await fetchAllFoods();
      setFood(data[foodName]);
    };
    getFoodDetails();
  }, [foodName]);

  if (!food) {
    return <Loader></Loader>;
  }


  return (
    <div className="hero-page">
      <div className="hero-page-card">
        <FoodPageHeader hero={food} heroName={foodName} BASE_URL={BASE_URL} />
        <RecipeList recipe={food.recipe} />
      </div>
    </div>
  );
};

export default FoodPage;

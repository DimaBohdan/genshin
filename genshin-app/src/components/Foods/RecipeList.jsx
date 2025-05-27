import React from 'react';

const RecipeList = ({ recipe }) => {
  if (!recipe || recipe.length === 0) {
    return <p>No recipe available.</p>;
  }

  return (
    <div className="recipe-container">
      <h2>Recipe</h2>
      <ul className="recipe-list">
        {recipe.map((item, index) => (
          <li key={index} className="recipe-item">
            <span className="item-name">{item.item}</span>
            <span className="item-quantity">x{item.quantity}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecipeList;

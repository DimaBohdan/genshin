import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import HeroPage from './pages/HeroPage';
import WeaponsPage from './pages/WeaponsPage';
import WeaponPage from './pages/WeaponPage';
import FoodsPage from './pages/FoodsPage';
import FoodPage from './pages/FoodPage';
import NotFoundPage from './pages/NotFoundPage';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/hero/:heroName" element={<HeroPage />} />
          <Route path="/weapons" element={<WeaponsPage />} />
          <Route path="/weapon/:weaponName" element={<WeaponPage />} />
          <Route path="/foods" element={<FoodsPage />} />
          <Route path="/food/:foodName" element={<FoodPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;


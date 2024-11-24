import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import HeroPage from './pages/HeroPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/hero/:heroName" element={<HeroPage />} />
      </Routes>
    </Router>
  );
}

export default App;


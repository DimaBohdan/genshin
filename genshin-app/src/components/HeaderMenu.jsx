import React from 'react';
import { NavLink } from 'react-router-dom';
import '../styles/HeaderMenu.css';

const HeaderMenu = () => {
  return (
    <header className="header-menu">
      <nav className="nav-bar">
        <ul className="nav-links">
          <li>
            <NavLink to="/" className={({ isActive }) => isActive ? 'your-active-class' : ''}>
              Characters
            </NavLink>
          </li>
          <li>
            <NavLink to="/weapons" className={({ isActive }) => isActive ? 'your-active-class' : ''}>
              Weapons
            </NavLink>
          </li>
          <li>
            <NavLink to="/foods" className={({ isActive }) => isActive ? 'your-active-class' : ''}>
              Foods
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default HeaderMenu;

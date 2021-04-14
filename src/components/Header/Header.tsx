import React from 'react';
import { NavLink } from 'react-router-dom';
import UserMenu from './UserMenu';

const Header: React.FC = () => (
  <header className="app-header">
    <h1 className="app-title">
      <NavLink to="/">Realworld Blog</NavLink>
    </h1>
    <UserMenu />
  </header>
);

export default Header;

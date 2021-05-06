import React from 'react';
import { NavLink } from 'react-router-dom';
import cn from 'classnames';
import UserMenu from './UserMenu';

const Header: React.FC = () => (
  <header className={cn("app-header")}>
    <h1 className={cn("app-title")}>
      <NavLink to="/">Realworld Blog</NavLink>
    </h1>
    <UserMenu />
  </header>
);

export default Header;

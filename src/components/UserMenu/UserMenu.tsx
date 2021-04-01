import React from 'react';
import { Link } from 'react-router-dom';
import { UserMenuProps } from './types';
import profileAvatar from './user-avatar.png';

const UserMenu: React.FC<UserMenuProps> = ({ isLogged }) => isLogged
  ? (
    <div className="UserMenu">
      <Link to="/new-article" className="link link_new-article" title="Create new article">
        Create article
      </Link>
      <Link to="/profile" className="link link_edit-profile" title="Edit profile">
        John Doe 
        <img src={profileAvatar} alt="Avatar" className="avatar" />
      </Link>
      <Link to="/logout" className="link link_logout">
        Log Out
      </Link>
    </div>
    )
  : (
    <div className="UserMenu">
      <Link to="/sign-in" className="link link_sign-in">
        Sign In
      </Link>
      <Link to="/sign-up" className="link link_sign-up">
        Sign Up
      </Link>
    </div>
  );

export default UserMenu;

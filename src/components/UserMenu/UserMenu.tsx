import React from 'react';
import { Link } from 'react-router-dom';
import { UserMenuProps } from './types';
import profileAvatar from './user-avatar.png';

const UserMenu: React.FC<UserMenuProps> = ({ isLogged }) => isLogged
  ? (
    <div className="UserMenu">
      <Link to="/new-article" className="NewArticleLink" title="Create new article">
        Create article
      </Link>
      <Link to="/profile" className="EditProfileLink" title="Edit profile">
        John Doe 
        <img src={profileAvatar} alt="Avatar" className="Avatar" />
      </Link>
      <Link to="/logout" className="LogOutLink">
        Log Out
      </Link>
    </div>
    )
  : (
    <div className="UserMenu">
      <Link to="/sign-in" className="SignInLink">
        Sign In
      </Link>
      <Link to="/sign-up" className="SignUpLink">
        Sign Up
      </Link>
    </div>
  );

export default UserMenu;

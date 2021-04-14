import React, { Dispatch } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { UserMenuProps } from './types';
import { logoutUser, UserAction } from '../../../store/actions';
import { UserState } from '../../../store/userReducer';
import { avatarFallback } from '../../../common';


const UserMenu: React.FC<UserMenuProps> = (props) => {
  const { user, isLogged, handleLogout } = props;

  return isLogged? (
    <div className="UserMenu">
      <Link to="/new-article" className="link link_new-article" title="Create new article">
        Create article
      </Link>
      <Link to="/profile" className="link link_edit-profile" title="Edit profile">
        { user && user.username } 
        <img src={ user && user.image || '' } title={ user && user.bio } 
          alt="Avatar" className="avatar"
          onError={ avatarFallback }
        />
      </Link>
      <Link to="/logout" className="link link_logout" onClick={(evt) => handleLogout(evt)}>
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
}

const mapStateToProps = (state: {user: UserState}) => ({
  loading: state.user.loading, 
  error: state.user.error,
  user: state.user.user,
  isLogged: state.user.isLogged,
});

const mapDispatchToProps = (dispatchFn: Dispatch<UserAction>) => ({
  handleLogout: (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    dispatchFn( logoutUser() );
   },
});

export default connect(mapStateToProps, mapDispatchToProps)(UserMenu);

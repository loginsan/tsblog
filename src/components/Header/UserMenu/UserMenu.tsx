import React from 'react';
import { Link } from 'react-router-dom';
import { connect, useDispatch } from 'react-redux';
import { useCookies } from 'react-cookie';
import cn from 'classnames';
import { UserMenuProps } from '../../../types';
import { clearEdit } from '../../../store/edit/actions';
import { UserState } from '../../../store/user/types';
import { avatarFallback } from '../../../common';


const UserMenu: React.FC<UserMenuProps> = (props) => {
  const { loading, user, isLogged } = props;
  const dispatch = useDispatch();
  const [cookies] = useCookies(['token']);

  function checkClearEdit(evt: React.MouseEvent<HTMLAnchorElement>) {
    dispatch( clearEdit(true) );
  }

  if (loading || (!isLogged && cookies.token)) {
    return (
      <div className={cn("user-menu")}>
        <span>…</span>
      </div>
    )
  }

  return isLogged? (
    <div className={cn("user-menu")}>
      <Link to="/new-article"
        className={cn("link", "link_new-article")}
        title="Create new article"
        onClick={checkClearEdit}
      >
        Create article
      </Link>
      <Link to="/profile" className={cn("link", "link_edit-profile")} title="Edit profile">
        { user.username } 
        <img src={ user.image } title={ user.bio } 
          alt="Avatar" className={cn("avatar")}
          onError={ avatarFallback }
        />
      </Link>
      <Link to="/logout" className={cn("link", "link_logout")}>
        Log Out
      </Link>
    </div>
    )
  : (
    <div className={cn("user-menu")}>
      <Link to="/sign-in" className={cn("link", "link_sign-in")}>
        Sign In
      </Link>
      <Link to="/sign-up" className={cn("link", "link_sign-up")}>
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

export default connect(mapStateToProps, {})(UserMenu);

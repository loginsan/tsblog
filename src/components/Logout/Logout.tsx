import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useCookies } from 'react-cookie';
import cn from 'classnames';
import { logoutUser } from '../../store/user/actions';


const Logout: React.FC = () => {
  const dispatch = useDispatch();
  const [, , removeCookie] = useCookies(['token']);

  useEffect(() => {
    dispatch( logoutUser() );
    removeCookie('token', { path: '/' });
  }, [dispatch, removeCookie]);

  return (
    <section className={cn('form')}>
      <h2>You had logout, but still can:</h2>
      <ul className={cn('bullets', 'no-bottom-margin')}>
        <li>View <Link to="/articles/">articles</Link> and comments</li>
        <li>View authors profile information</li>
        <li><Link to="/sign-in">Sign-in</Link> once again</li>
      </ul>
    </section>
  )
}

export default Logout;

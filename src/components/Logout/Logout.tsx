import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useCookies } from 'react-cookie';
import { logoutUser } from '../../store/userActions';


const Logout: React.FC = () => {
  const dispatch = useDispatch();
  const [, , removeCookie] = useCookies(['token']);

  useEffect(() => () => {
    dispatch( logoutUser() );
    removeCookie('token');
  });

  return <Redirect to="/" />
}

export default Logout;

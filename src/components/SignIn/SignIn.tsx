import React, { useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, connect } from 'react-redux';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useCookies } from 'react-cookie';
import cn from 'classnames';

import { UserMenuProps } from '../../types';
import { mapUserStateToProps } from '../../store/user/reducer';
import { asyncGetAuth } from '../../store/user/actions';
import * as kit from '../../common';


interface FieldSet {
  email: string,
  password: string
}

type Keys = keyof FieldSet;

const schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required(),
});


const SignIn: React.FC<UserMenuProps> = (props) => {
  const { loading, error, user, isLogged } = props;
  const dispatch = useDispatch();
  const [cookies, setCookie] = useCookies(['token']);
  const history = useHistory();

  kit.setPageTitle(`Sign-In Form`);

  useEffect(() => {
    if (user.token && !cookies.token) {
      setCookie('token', user.token, { path: "/" });
    }
  }, [user, cookies, setCookie]);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors } 
  } = useForm<FieldSet>({ resolver: yupResolver(schema) });

  function onSubmit(data: FieldSet) {
    dispatch( asyncGetAuth(data.email, data.password) );
  }

  useEffect(() => {
    if (error) {
      const [, errorData] = error.split('|');
      const errorList = kit.parseError(errorData);
      for (let i = 0; i < errorList.length; i++) {
        const [key, value] = errorList[i].split(': ');
        if (key.includes(" or ")) {
          setError("email", { type: "manual", message: value });
          setError("password", { type: "manual", message: value });
        } else {
          setError(key as Keys, { type: "manual", message: value })
        }
      }
    }
  }, [error, setError]);

  useEffect(() => {
    let timerId: ReturnType<typeof setTimeout>;
    if (isLogged) {
      timerId = setTimeout(() => {
        history.push(`/profiles/${user.username}`);        
      }, 3000);
    }
    return () => {
      if (timerId) {
        clearTimeout(timerId);
      }
    }
  }, [isLogged, history, user.username]);

  return (
    <section className={cn("form")}>
      { kit.elemLoading(loading) }
      { kit.elemAlert(error) }
      { !loading && !error && isLogged
        ? (<>
          <h2>{`Welcome, ${user.username}!`}</h2>
          <p className={cn("long-text")}>{`Your token is ${user.token}`}</p>
          <p className={cn("no-bottom-margin")}>
            You will be redirected to your <Link to={`/profiles/${user.username}`}>personal profile page…</Link>
          </p>
        </>)
        : (<>
          <h2 className={cn("form__title")}>Sign In</h2>
          <form className={cn("form__body")} onSubmit={ handleSubmit(onSubmit) }>
            <ul className={cn("form__field-list", "nolist")}>
              { kit.formInputField("email", "Email address", errors.email, register("email")) }
              { kit.formInputField("password", "Password", errors.password, register("password")) }
                            
              <li className={cn("form__field")}>
                <button type="submit" className={cn("btn_submit")}>Login</button>
                <span className={cn("note_foot")}>
                  Don't have an account? <Link to="/sign-up">Sign Up</Link>.
                </span>
              </li>
            </ul>
          </form>
          </>
        ) }
    </section>
  )
}

export default connect(mapUserStateToProps, {})(SignIn);

import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, connect } from 'react-redux';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useCookies } from 'react-cookie';

import { mapUserStateToProps } from '../../store/userReducer';
import { asyncGetAuth } from '../../store/userActions';
import * as kit from '../../common';
import { UserMenuProps } from '../../types';


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

  kit.setPageTitle(`Sign-In Form`);

  useEffect(() => {
    if (user.token && !cookies.token) {
      setCookie('token', user.token);
    }
  }, [user, cookies, setCookie]);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors } 
  } = useForm<FieldSet>({ resolver: yupResolver(schema) });

  function onSubmit(data: FieldSet) {
    // console.log(data);
    dispatch( asyncGetAuth(data.email, data.password) );
    //  bambrillo@ya.ru  lin_RwB180 → S1mpleP@ss
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

  return (
    <section className="form">
      { kit.elemLoading(loading) }
      { kit.elemAlert(error) }
      { !loading && !error && isLogged
        ? (<>
          <h2>{`Welcome, ${user.username}!`}</h2>
          <p className="long-text">{`Your token is ${user.token}`}</p>
        </>)
        : (<>
          <h2 className="form__title">Sign In</h2>
          <form className="form__body" onSubmit={ handleSubmit(onSubmit) }>
            <ul className="form__field-list nolist">
              <li className="form__field">
                <label className="label" htmlFor="email">
                  Email address
                </label>
                <input type="email" id="email"
                  className={`control control_input${errors.email? " error" : ""}`}
                  placeholder="Email address"
                  {...register("email")}
                />
                { kit.fieldErrorTip(errors.email) }
              </li>
              <li className="form__field">
                <label className="label" htmlFor="password">
                  Password
                </label>
                <input type="password" id="password"
                  className={`control control_input${errors.password? " error" : ""}`}
                  placeholder="Password"
                  {...register("password")}
                />
                { kit.fieldErrorTip(errors.password) }
              </li>
              
              <li className="form__field">
                <button type="submit" className="btn_submit">Login</button>
                <span className="note_foot">
                  Don't have an account? <Link to="/sign-up">Sign Up</Link>.
                </span>
              </li>
            </ul>
          </form>
          </>
        ) }
    </section>
  )
};

export default connect(mapUserStateToProps, {})(SignIn);
// export default SignIn;

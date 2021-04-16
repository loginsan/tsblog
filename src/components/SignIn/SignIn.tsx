import React from 'react';
import { Link } from 'react-router-dom';
import { useStore, useDispatch, connect } from 'react-redux';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup'
import { useCookies } from 'react-cookie';

import { UserState } from '../../store/userReducer';
import { asyncGetAuth } from '../../store/userActions';
import { elemLoading, elemAlert } from '../../common';


interface FieldSet {
  email: string,
  password: string
}

const schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required(),
});

const SignIn: React.FC = () => {

  const store = useStore();
  const dispatch = useDispatch();
  const { loading, error, user, isLogged } = store.getState().user;
  const [cookies, setCookie] = useCookies(['token']);

  if (user.token && !cookies.token) {
    setCookie('token', user.token);
  }

  const { register, handleSubmit, formState: { errors } } = useForm<FieldSet>({
    resolver: yupResolver(schema)
  });

  function onSubmit(data: FieldSet) {
    // console.log(data);
    dispatch( asyncGetAuth(data.email, data.password) );
    //  bambrillo@ya.ru  lin_RwB180 → S1mpleP@ss
  }

  return (
    <section className="form">
      { elemLoading(loading) }
      { elemAlert(error) }
      { !loading && !error && isLogged
        ? (<>
          <h2>{`Welcome, ${user.username}!`}</h2>
          <p className="long-text">{`Your token is ${user.token}`}</p>
        </>)
        : (<>
          <h2 className="form__title">Sign In</h2>
          <form 
            className="form__body"
            onSubmit={ handleSubmit(onSubmit) }
          >
            <ul className="form__field-list nolist">
              <li className="form__field">
                <label className="label" htmlFor="email">
                  Email address
                </label>
                <input
                  className={`control control_input${errors.email? " error" : ""}`}
                  type="email"
                  id="email"
                  placeholder="Email address"
                  {...register("email")}
                />
                { errors.email && (
                  <span className="note_field error show">
                    { errors.email?.message }
                  </span>
                )}
              </li>
              <li className="form__field">
                <label className="label" htmlFor="password">
                  Password
                </label>
                <input
                  className={`control control_input${errors.password? " error" : ""}`}
                  type="password"
                  id="password"
                  placeholder="Password"
                  {...register("password")}
                />
                { errors.password && (
                  <span className="note_field error show">
                    { errors.password?.message }
                  </span>
                )}
              </li>
              
              <li className="form__field">
                <button type="submit" className="btn_submit">
                  Login
                </button>
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


const mapStateToProps = (state: {user: UserState}) => ({
  loading: state.user.loading, 
  error: state.user.error,
  user: state.user.user,
});

export default connect(mapStateToProps, {})(SignIn);

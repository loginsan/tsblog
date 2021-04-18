import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useStore, useDispatch, connect } from 'react-redux';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { mapUserStateToProps } from '../../store/userReducer';
import { asyncRegister } from '../../store/userActions';
import { elemLoading, elemAlert, fieldErrorTip, parseError } from '../../common';


interface FieldSet {
  username: string,
  email: string,
  password: string,
  repeatPassword: string,
  agreement: boolean,
}

type Keys = "password" | "username" | "email" | "repeatPassword" | "agreement";

const schema = yup.object().shape({
  username: yup
    .string()
    .min(3, 'Username must be at least 3 characters long')
    .max(20, 'Max 20 characters long for Username')
    .required(),
  email: yup.string().email().required(),
  password: yup
    .string()
    .min(8)
    .max(40)
    .required(),
  repeatPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Must match'),
  agreement: yup.boolean().oneOf([true], 'Must check'),
});


const SignUp: React.FC = () => {

  const store = useStore();
  const dispatch = useDispatch();
  const { loading, error, user, isLogged } = store.getState().user;

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors }
  } = useForm<FieldSet>({ resolver: yupResolver(schema) });

  useEffect(() => {
    if (error) {
      const [, errorData] = error.split('|');
      const errorList = parseError(errorData);
      for (let i = 0; i < errorList.length; i++) {
        const [key, value] = errorList[i].split(': ');
        setError(key as Keys, { type: "manual", message: value });
      }
    }
  }, [error, setError]);

  function onSubmit(data: FieldSet) {
    // console.log(data);
    const userData = { 
      username: data.username, 
      email: data.email, 
      password: data.password,
    };
    dispatch( asyncRegister(userData) );
  }

  return (
    <section className="form">
      { elemLoading(loading) }
      { elemAlert(error) }
      { !loading && !error && isLogged
        ? (<>
            <h2>{`Welcome, ${user.username}!`}</h2>
            <p className="long-text">Have a nice time in Realworld Blog!</p>
          </>)
        : (<>
            <h2 className="form__title">Create new account</h2>
            <form className="form__body" onSubmit={ handleSubmit(onSubmit) }>
              <ul className="form__field-list nolist">
                <li className="form__field">
                  <label className="label" htmlFor="username">
                    Username
                  </label>
                  <input type="text"
                    className={`control control_input${errors.username? " error" : ""}`}
                    id="username"
                    placeholder="Username"
                    {...register("username")}
                  />
                  { fieldErrorTip(errors.username) }
                </li>
                <li className="form__field">
                  <label className="label" htmlFor="email">
                    Email address
                  </label>
                  <input type="email"
                    className={`control control_input${errors.email? " error" : ""}`}
                    id="email"
                    placeholder="Email address"
                    {...register("email")}
                  />
                  { fieldErrorTip(errors.email) }
                </li>
                <li className="form__field">
                  <label className="label" htmlFor="password">
                    Password
                  </label>
                  <input type="password"
                    className={`control control_input${errors.password? " error" : ""}`}
                    id="password"
                    placeholder="Password"
                    {...register("password", { required: true })}
                  />
                  { fieldErrorTip(errors.password) }
                </li>
                <li className="form__field">
                  <label className="label" htmlFor="repeatPassword">
                    Repeat Password
                  </label>
                  <input type="password"
                    className={`control control_input${errors.repeatPassword? " error" : ""}`}
                    id="repeatPassword"
                    placeholder="Password"
                    {...register("repeatPassword", { required: true })}
                  />
                  { fieldErrorTip(errors.repeatPassword) }
                </li>
                <li className="form__field h-rule">
                  <label className="label with-check" htmlFor="agreement">
                    <input type="checkbox"
                      className="control_checkbox"
                      id="agreement"
                      {...register("agreement", { required: true })}
                    />
                    I agree to the processing of my personal information
                  </label>
                  { fieldErrorTip(errors.agreement) }
                </li>
                <li className="form__field">
                  <button type="submit" className="btn_submit">
                    Create
                  </button>
                  <span className="note_foot">
                    Already have an account? <Link to="/sign-in">Sign In</Link>.
                  </span>
                </li>
              </ul>
            </form>
          </>
        )
      }
  </section>
  )
};

export default connect(mapUserStateToProps, {})(SignUp);


// {"errors":
//   {"email":["has already been taken"],
//    "password":["is too short (minimum is 8 characters)"],
//    "username":["can't be blank","is too short (minimum is 1 character)"]
// }}

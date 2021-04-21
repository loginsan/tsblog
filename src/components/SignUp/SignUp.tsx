import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, connect } from 'react-redux';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { mapUserStateToProps } from '../../store/userReducer';
import { asyncRegister } from '../../store/userActions';
import * as kit from '../../common';
import { UserMenuProps } from '../Header/UserMenu/types';


interface FieldSet {
  username: string,
  email: string,
  password: string,
  repeatPassword: string,
  agreement: boolean,
}

type Keys = keyof FieldSet;

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


const SignUp: React.FC<UserMenuProps> = (props) => {
  const { loading, error, user, isLogged } = props;
  const dispatch = useDispatch();

  kit.setPageTitle(`Sign-Up Form`);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors }
  } = useForm<FieldSet>({ resolver: yupResolver(schema) });

  useEffect(() => {
    if (error) {
      const [, errorData] = error.split('|');
      const errorList = kit.parseError(errorData);
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
      { kit.elemLoading(loading) }
      { kit.elemAlert(error) }
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
                  <input type="text" id="username"
                    className={`control control_input${errors.username? " error" : ""}`}
                    placeholder="Username"
                    {...register("username")}
                  />
                  { kit.fieldErrorTip(errors.username) }
                </li>
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
                    {...register("password", { required: true })}
                  />
                  { kit.fieldErrorTip(errors.password) }
                </li>
                <li className="form__field">
                  <label className="label" htmlFor="repeatPassword">
                    Repeat Password
                  </label>
                  <input type="password" id="repeatPassword"
                    className={`control control_input${errors.repeatPassword? " error" : ""}`}
                    placeholder="Password"
                    {...register("repeatPassword", { required: true })}
                  />
                  { kit.fieldErrorTip(errors.repeatPassword) }
                </li>
                <li className="form__field h-rule">
                  <label className="label with-check" htmlFor="agreement">
                    <input type="checkbox" id="agreement"
                      className="control_checkbox"
                      {...register("agreement", { required: true })}
                    />
                    I agree to the processing of my personal information
                  </label>
                  { kit.fieldErrorTip(errors.agreement) }
                </li>
                <li className="form__field">
                  <button type="submit" className="btn_submit">Create</button>
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

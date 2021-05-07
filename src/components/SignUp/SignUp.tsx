import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, connect } from 'react-redux';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import cn from 'classnames';

import { UserMenuProps } from '../../types';
import { mapUserStateToProps } from '../../store/user/reducer';
import { asyncRegister } from '../../store/user/actions';
import * as kit from '../../common';


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
  const [enabledSubmit, setEnabledSubmit] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const history = useHistory();

  function toggleEnable() {
    setEnabledSubmit(!enabledSubmit);
  }

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

  useEffect(() => {
    let timerId: ReturnType<typeof setTimeout>;
    if (isLogged) {
      timerId = setTimeout(() => { history.push(`/`) }, 3000);
    }
    return () => {
      if (timerId) {
        clearTimeout(timerId);
      }
    }
  }, [isLogged, history]);

  function onSubmit(data: FieldSet) {
    const userData = { 
      username: data.username, 
      email: data.email, 
      password: data.password,
    };
    dispatch( asyncRegister(userData) );
    setSubmitted(true);
  }

  return (
    <section className={cn("form")}>
      { kit.elemLoading(loading) }
      { kit.elemAlert(error) }
      { !loading && !error && submitted
        ? (<>
            <h2>{`Welcome, ${user.username}!`}</h2>
            <p className={cn("long-text", "no-bottom-margin")}>Have a nice time in Realworld Blog!<br /> 
            You will be redirected to <Link to="/">articles page</Link> …</p>
          </>)
        : (<>
            <h2 className={cn("form__title")}>Create new account</h2>
            <form className={cn("form__body")} onSubmit={ handleSubmit(onSubmit) }>
              <ul className={cn("form__field-list", "nolist")}>
                { kit.formInputField("username", "Username", errors.username, register("username")) }
                { kit.formInputField("email", "Email address", errors.email, register("email")) }
                { kit.formInputField("password", "Password", errors.password, register("password")) }
                { kit.formInputField("repeatPassword", "Repeat Password", errors.repeatPassword, register("repeatPassword")) }
                <li className={cn("form__field", "h-rule")}>
                  <label className={cn("label", "with-check")} htmlFor="agreement">
                    <input type="checkbox" id="agreement"
                      className={cn("control_checkbox")}
                      {...register("agreement", { required: true })}
                      onClick={ toggleEnable }
                    />
                    I agree to the processing of my personal information
                  </label>
                  { kit.fieldErrorTip(errors.agreement) }
                </li>
                <li className={cn("form__field")}>
                  <button
                    type="submit"
                    className={cn("btn_submit")}
                    disabled={ !enabledSubmit }
                  >
                    Create
                  </button>
                  <span className={cn("note_foot")}>
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
}

export default connect(mapUserStateToProps, {})(SignUp);

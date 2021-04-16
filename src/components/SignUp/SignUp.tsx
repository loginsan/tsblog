import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useStore, useDispatch, connect } from 'react-redux';
import { UserState } from '../../store/userReducer';
import { asyncRegister } from '../../store/userActions';
import { elemLoading, elemAlert } from '../../common';


const SignUp: React.FC = () => {

  const store = useStore();
  const dispatch = useDispatch();
  const { loading, error, user, isLogged } = store.getState().user;

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatpassword, setRepeatPassword] = useState('');
  const [agree, setAgree] = useState(false);

  type SetterFunction = typeof setEmail;

  function handleChange(
    evt: React.ChangeEvent<HTMLInputElement>,
    fn: SetterFunction
  ): void {
    const val: string = evt.currentTarget.value;
    fn(val);
  }

  function toggleAgree(
    evt: React.ChangeEvent<HTMLInputElement>
  ): void {
    const val: boolean = evt.currentTarget.checked;
    setAgree(val);
  }

  function handleSubmit(
    evt: React.MouseEvent<HTMLButtonElement>
  ) {
    // TODO: form validation
    const userData = { username, email, password };
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
            <ul className="form__field-list nolist">
              <li className="form__field">
                <label className="label" htmlFor="username1">
                  Username
                </label>
                <input
                  className="control control_input"
                  type="text"
                  id="username1"
                  name="username"
                  placeholder="Username"
                  value={username}
                  onChange={(evt) => handleChange(evt, setUsername)}
                />
                <span className="note_field error">
                  Пользователь с таким именем уже есть
                </span>
                <span className="note_field show">Use A-Za-z0-9_ characters</span>
              </li>
              <li className="form__field">
                <label className="label" htmlFor="email">
                  Email address
                </label>
                <input
                  className="control control_input"
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Email address"
                  value={email}
                  onChange={(evt) => handleChange(evt, setEmail)}
                />
                <span className="note_field error">
                  Неверный формат электронной почты
                </span>
                <span className="note_field">1</span>
              </li>
              <li className="form__field">
                <label className="label" htmlFor="password">
                  Password
                </label>
                <input
                  className="control control_input"
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Password"
                  value={password}
                  onChange={(evt) => handleChange(evt, setPassword)}
                />
                <span className="note_field error">
                  Your password needs to be at least 8 characters
                </span>
                <span className="note_field">2</span>
              </li>
              <li className="form__field">
                <label className="label" htmlFor="repeatpassword">
                  Repeat Password
                </label>
                <input
                  className="control control_input"
                  type="password"
                  id="repeatpassword"
                  name="repeatpassword"
                  placeholder="Password"
                  value={repeatpassword}
                  onChange={(evt) => handleChange(evt, setRepeatPassword)}
                />
                <span className="note_field error">Passwords must match</span>
                <span className="note_field">3</span>
              </li>
              <li className="form__field h-rule">
                <label className="label with-check" htmlFor="agreement">
                  <input
                    className="control_checkbox"
                    type="checkbox"
                    id="agreement"
                    name="agreement"
                    checked={agree}
                    onChange={(evt) => toggleAgree(evt)}
                  />
                  I agree to the processing of my personal information
                </label>
              </li>
              <li className="form__field">
                <button
                  type="submit"
                  className="btn_submit"
                  onClick={(evt) => handleSubmit(evt)}
                >
                  Create
                </button>
                <span className="note_foot">
                  Already have an account? <Link to="/sign-in">Sign In</Link>.
                </span>
              </li>
            </ul>
          </>
        )
      }
  </section>
  )
};

const mapStateToProps = (state: {user: UserState}) => ({
  loading: state.user.loading, 
  error: state.user.error,
  user: state.user.user,
  isLogged: state.user.isLogged,
});

export default connect(mapStateToProps, {})(SignUp);

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useStore, useDispatch, connect } from 'react-redux';
import { UserState } from '../../store/userReducer';
import { asyncGetAuth } from '../../store/actions';
import { elemLoading, elemAlert } from '../../common';


const SignIn: React.FC = () => {

  const store = useStore();
  const dispatch = useDispatch();
  const { loading, error, user, isLogged } = store.getState().user;

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  type SetterFunction = typeof setEmail;

  function handleChange(
    evt: React.ChangeEvent<HTMLInputElement>,
    fn: SetterFunction
  ): void {
    const val: string = evt.currentTarget.value;
    fn(val);
  };

  function handleSubmit(
    evt: React.FormEvent<HTMLFormElement>
  ) {
    // TODO: form validation
    dispatch( asyncGetAuth(email, password) );
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
            onSubmit={(evt) => handleSubmit(evt)}
          >
            <ul className="form__field-list nolist">
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
                  Wrong password
                </span>
                <span className="note_field">2</span>
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

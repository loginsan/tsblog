import React, { useState, useCallback } from 'react';
import { Link } from 'react-router-dom';

const SignUp: React.FC = () => {

  const [fields, setFields] = useState({
    username: '',
    email: '',
    password: '',
    repeatpassword: ''
  });

  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>, field: string): void => {
    const val: string = evt.currentTarget.value;
    console.log(val);
    setFields( { [field]: val, ...fields } );
  };

  return (
    <section className="form">
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
          value={fields.username}
          onChange={(evt) => handleChange(evt, 'username')}
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
          value={fields.email}
          onChange={(evt) => handleChange(evt, 'email')}
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
          className="control control_input error"
          type="password"
          id="password"
          name="password"
          placeholder="Password"
          value={fields.password}
          onChange={(evt) => handleChange(evt, 'password')}
        />
        <span className="note_field error show">
          Your password needs to be at least 8 characters
        </span>
        <span className="note_field">2</span>
      </li>
      <li className="form__field">
        <label className="label" htmlFor="repeatpassword">
          Repeat Password
        </label>
        <input
          className="control control_input error"
          type="password"
          id="repeatpassword"
          name="repeatpassword"
          placeholder="Password"
          value={fields.repeatpassword}
          onChange={(evt) => handleChange(evt, 'repeatpassword')}
        />
        <span className="note_field error show">Passwords must match</span>
        <span className="note_field">3</span>
      </li>
      <li className="form__field h-rule">
        <label className="label with-check" htmlFor="agreement">
          <input
            className="control_checkbox"
            type="checkbox"
            id="agreement"
            name="agreement"
          />
          I agree to the processing of my personal information
        </label>
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
  </section>
  )
};

export default SignUp;

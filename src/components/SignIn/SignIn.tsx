import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const SignIn: React.FC = () => {

  const [fields, setFields] = useState({
    email: '',
    password: '',
  });

  const handleChange = (
    evt: React.ChangeEvent<HTMLInputElement>, 
    field: string
  ): void => {
    const val: string = evt.currentTarget.value;
    // console.log(val);
    setFields( { [field]: val, ...fields } );
  };

  return (
    <section className="form">
    <h2 className="form__title">Sign In</h2>
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
  </section>
  )
};

export default SignIn;
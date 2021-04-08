import React, { useState } from 'react';

const Profile: React.FC = () => {

  const [fields, setFields] = useState({
    username: '',
    email: '',
    password: '',
    bio: '',
    avatar: '',
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
    <h2 className="form__title">Edit Profile</h2>
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
          autoComplete="off"
          value={fields.username}
          onChange={(evt) => handleChange(evt, 'username')}
        />
        <span className="note_field error">
          Пользователь с таким именем уже есть
        </span>
        <span className="note_field">Use A-Za-z0-9_ characters</span>
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
          autoComplete="off"
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
          className="control control_input"
          type="password"
          id="password"
          name="password"
          placeholder="Password"
          value={fields.password}
          onChange={(evt) => handleChange(evt, 'password')}
        />
        <span className="note_field error">
          Wrong password
        </span>
        <span className="note_field">2</span>
      </li>
      <li className="form__field">
        <label className="label" htmlFor="bio">
          Bio
        </label>
        <textarea
          className="control control_textarea"
          id="bio"
          name="bio"
          cols={30}
          rows={5}
          placeholder="Bio"
          defaultValue="&nbsp;"
        />        
        <span className="note_field error">
          Your text needs to be at least 80 characters
        </span>
        <span className="note_field">2</span>
      </li>
      <li className="form__field">
        <label className="label" htmlFor="avatar">
          Avatar image (url)
        </label>
        <input
          className="control control_input"
          type="text"
          id="avatar"
          name="avatar"
          placeholder="Avatar image"
          autoComplete="off"
          value={fields.avatar}
          onChange={(evt) => handleChange(evt, 'avatar')}
        />
        <span className="note_field error">
          Something odd…
        </span>
        <span className="note_field">4</span>
      </li>
      
      <li className="form__field">
        <button type="submit" className="btn_submit">
          Save
        </button>
      </li>
    </ul>
  </section>
  )
};

export default Profile;

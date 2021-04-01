import React, { useState, useCallback } from 'react';
import { BrowserRouter as Router, Link, NavLink } from 'react-router-dom';
import UserMenu from './UserMenu';
import './App.scss';
import profileAvatar from './UserMenu/user-avatar.png';


const App: React.FC = () => {
  const [fields, setFields] = useState({
    username: '',
    email: '',
    password: '',
    repeatpassword: ''
  });

  const [article, setArticle] = useState({
    title: '',
    short: '',
    text: '',
    tags: []
  });

  const handleChange = useCallback(
    (evt: React.FormEvent<HTMLInputElement>, field: string) => {
    // console.log(evt);
    const val: string = evt.currentTarget.value;
    setFields( { [field]: val, ...fields } );
  }, []);

  return (
    <Router>
      <div className="app">
        <header className="app-header">
          <h1 className="app-title">
            <NavLink to="/">Realworld Blog</NavLink>
          </h1>
          <UserMenu isLogged={false} />
        </header>

        <main className="app-main">
          <section className="form">
  <h2 className="form__title">Create new account</h2>
  <ul className="form__field-list">
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
          onChange={() => {}}
          checked
        />
        I agree to the processing of my personal information
      </label>
    </li>
    <li className="form__field">
      <button type="submit" className="btn_submit">
        Create
      </button>
      <span className="note_foot">
        Already have an account? <a href="/sign-in">Sign In</a>.
      </span>
    </li>
  </ul>
</section>


<section className="form form_article">
  <h2 className="form__title">Create new article</h2>
  <ul className="form__field-list">
    <li className="form__field">
      <label className="label" htmlFor="title">
        Title
      </label>
      <input
        className="control control_input"
        type="text"
        id="title"
        name="title"
        placeholder="Title"
        value={fields.username}
        onChange={(evt) => handleChange(evt, 'username')}
      />
      <span className="note_field error">
        Пользователь с таким именем уже есть
      </span>
      <span className="note_field">Use A-Za-z0-9_ characters</span>
    </li>
    <li className="form__field">
      <label className="label" htmlFor="short">
        Short description
      </label>
      <input
        className="control control_input"
        type="text"
        id="short"
        name="short"
        placeholder="Short description"
        value={fields.email}
        onChange={(evt) => handleChange(evt, 'email')}
      />
      <span className="note_field error">
        Неверный формат электронной почты
      </span>
      <span className="note_field">1</span>
    </li>
    <li className="form__field">
      <label className="label" htmlFor="text">
        Text
      </label>
      <textarea
        className="control control_textarea error"
        id="text"
        name="text"
        cols={30}
        rows={5}
        placeholder="Text with Markdown"
        defaultValue="&nbsp;"
      />        
      <span className="note_field error show">
        Your text needs to be at least 80 characters
      </span>
      <span className="note_field">2</span>
    </li>
    <li className="form__field">
      <label className="label" htmlFor="tag_main">
        Tags
      </label>
      <ul className="tags-list">
        <li className="tag-line">
          <input
            className="control control_input control_tag"
            type="text"
            id="tag_main"
            name="tag_main"
            placeholder="Tag"
          />
          <button type="button" className="btn_delete btn_tag">
            Delete
          </button>
          <button type="button" className="btn_add btn_tag">
            Add Tag
          </button>
        </li>
        <li className="tag-line">
          <input
            className="control control_input control_tag"
            type="text"
            id="tag_next"
            name="tag_next"
            placeholder="Tag"
          />
          <button type="button" className="btn_delete btn_tag">
            Delete
          </button>
          <button type="button" className="btn_add btn_tag">
            Add Tag
          </button>
        </li>
      </ul>
      
      <span className="note_field error">Passwords must match</span>
      <span className="note_field">3</span>
    </li>
    <li className="form__field">
      <button type="submit" className="btn_submit">
        Send
      </button>
      <span className="note_foot">
        * All changes are saved.
      </span>
    </li>
  </ul>
</section>
          
        </main>
      </div>
    </Router>
  );
}

export default App;

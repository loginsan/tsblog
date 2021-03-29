import React, { useState, useCallback } from 'react';
import { BrowserRouter as Router, Link, NavLink } from 'react-router-dom';
import './App.scss';
import profileAvatar from './user-avatar.png';


function App() {
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
      <div className="App">
        <header className="App-header">
          <h1 className="AppTitle">
            <NavLink to="/">Realworld Blog</NavLink>
          </h1>
          <div className="UserMenu">
            <Link to="/sign-in" className="SignInLink">
              Sign In
            </Link>
            <Link to="/sign-up" className="SignUpLink">
              Sign Up
            </Link>
          </div>
        </header>

        <main className="AppMain">
          <section className="PageContent">Page Content</section>
          <section className="PageContent">Page Content</section>
          
        </main>
      </div>
    </Router>
  );
}

export default App;

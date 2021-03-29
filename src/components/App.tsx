import React from "react";
import { BrowserRouter as Router, Link, NavLink } from "react-router-dom";
import "./App.scss";
import profileAvatar from "./user-avatar.png";

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <h1 className="AppTitle"><NavLink to="/">Realworld Blog</NavLink></h1>
          <div className="UserMenu">
            <Link to="/sign-in" className="SignInLink">Sign In</Link>
            <Link to="/sign-up" className="SignUpLink">Sign Up</Link>
            <Link to="/new-article" className="NewArticleLink" title="Create new article">Create article</Link>
            <Link to="/profile" className="EditProfileLink" title="Edit profile">John Doe <img src={profileAvatar} alt="Avatar" className="Avatar" /></Link>
            <Link to="/logout" className="LogOutLink">Log Out</Link>
          </div>
        </header>
        <main className="AppMain">
          <section className="PageContent">
            Page Content
          </section>
          <section className="FormContent">
            Form Content
          </section>
        </main>
      </div>
    </Router>
  );
}

export default App;

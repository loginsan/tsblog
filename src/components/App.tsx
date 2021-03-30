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
      <div className="App">
        <header className="App-header">
          <h1 className="AppTitle">
            <NavLink to="/">Realworld Blog</NavLink>
          </h1>
          <UserMenu isLogged={true} />
        </header>

        <main className="AppMain">
          <section className="PageContent">
            <article className="Article ArticleShort">

              <header className="ArticleHead">
                <div className="ArticleInfo">
                  <h2>
                    <a className="ArticleTitle" href="/">How about a real very very long creative unique awesome clickbate superb article title?</a>
                    <a href="/sign-in" className="Like Like__Unset">0</a>
                  </h2>
                  <ul className="ArticleTagList">
                    <li className="Tag Tag__Main"><a href="/">React</a></li>
                    <li className="Tag"><a href="/">JS</a></li>
                    <li className="Tag"><a href="/">TypeScript</a></li>
                  </ul>
                  <p className="ArticleExcerpt">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                </div>
                <aside className="PubInfo">
                  <Link to="/profile" className="Author" title="Author">
                    <span>
                      John Doe
                      <time className="PubDate">March 5, 2020</time>
                    </span>
                    <img src={profileAvatar} alt="Avatar" className="Avatar" />
                  </Link>
                </aside>
              </header>

            </article>
          </section>

          <section className="PageContent">
            <article className="Article ArticleFull">

              <header className="ArticleHead">
                <div className="ArticleInfo">
                  <h2>
                    <a className="ArticleTitle" href="/">Ta da</a>
                    <a href="/sign-in" className="Like Like__Unset">0</a>
                  </h2>
                  <ul className="ArticleTagList">
                    <li className="Tag Tag__Main"><a href="/">React</a></li>
                    <li className="Tag"><a href="/">JS</a></li>
                    <li className="Tag"><a href="/">TypeScript</a></li>
                  </ul>
                  <p className="ArticleExcerpt">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                </div>
                <aside className="PubInfo">
                  <Link to="/profile" className="Author" title="Author">
                    <span>
                      John Doe
                      <time className="PubDate">March 5, 2020</time>
                    </span>
                    <img src={profileAvatar} alt="Avatar" className="Avatar" />
                  </Link>
                  
                  <div className="EditLinks hide">
                    <a href="/" className="DeleteArticleLink">Delete</a>
                    <a href="/" className="EditArticleLink">Edit</a>
                    <div className="ConfirmDeleteFlyBox">
                      <span>Are you sure to delete this article?</span>
                      <button type="button" className="btn">No</button>
                      <button type="button" className="btn btn-primary">Yes</button>
                    </div>
                  </div>
                </aside>
              </header>
              <main className="ArticleMarkdown">
                <h5>Est Ampyciden pater patent</h5>
                <h6>Amor saxa inpiger</h6>
                <p>Lorem markdownum Stygias neque is referam fudi, breve per. Et Achaica tamen: nescia ista occupat, illum se ad potest humum et.</p>
                <h6>Qua deos has fontibus</h6>
                <p>Recens nec ferro responsaque dedere armenti opes momorderat pisce, vitataque et fugisse. Et iamque incipiens, qua huius suo omnes ne pendentia citus pedum.</p>
                <h6>Quamvis pronuba</h6>
                <p>Ulli labore facta. Io cervis non nosterque nullae, vides: aethere Delphice subit, tamen <a href="/">Romane ob cubilia Rhodopen calentes</a> librata! Nihil populorum flava, inrita? Sit hic nunc, hoc formae Esse illo? Umeris eram similis, crudelem de est relicto ingemuit finiat Pelia uno cernunt Venus draconem, hic, Methymnaeae.</p>
                <ol>
                  <li>Clamoribus haesit tenentem iube Haec munera</li>
                  <li>Vincla venae</li>
                  <li>Paris includere etiam tamen</li>
                  <li>Superi te putria imagine Deianira</li>
                  <li>Tremore hoste Esse sed perstat capillis siqua</li>
                </ol>
              </main> 
            </article>
          </section>
          
        </main>
      </div>
    </Router>
  );
}

export default App;

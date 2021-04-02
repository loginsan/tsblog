import React from 'react';
import { Link } from 'react-router-dom';
import profileAvatar from '../../assets/user-avatar.png';

const ArticleList: React.FC = () => (
  <section className="page">
    <article className="article article_short">

      <header className="article__head">
        <div className="article__info">
          <h2>
            <Link className="article__title" to="/articles/start">How about a real very very long creative unique awesome clickbate superb article title?</Link>
            <Link to="/sign-up" className="like like_unset">0</Link>
          </h2>
          <ul className="article__tag-list nolist">
            <li className="tag tag_main"><a href="/">React</a></li>
            <li className="tag"><a href="/">JS</a></li>
            <li className="tag"><a href="/">TypeScript</a></li>
          </ul>
          <p className="article__excerpt">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
        </div>
        <aside className="pub-info">
          <Link to="/profile" className="author" title="Author">
            <span>
              John Doe
              <time className="pub-date">March 5, 2020</time>
            </span>
            <img src={profileAvatar} alt="Avatar" className="avatar" />
          </Link>
        </aside>
      </header>

    </article>
  </section>
);

export default ArticleList;

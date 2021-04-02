import React from 'react';
import { Link } from 'react-router-dom';
import profileAvatar from '../../assets/user-avatar.png';

type ArticleViewProps = {};

const ArticleView: React.FC<ArticleViewProps> = () => (
  <section className="page">
    <article className="article article_full">

      <header className="article__head">
        <div className="article__info">
          <h2>
            <Link className="article__title" title="К списку статей" to="/articles/">Ta da</Link>
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
          
          <div className="edit-links">
            <Link to="/" className="link link_delete-article">Delete</Link>
            <Link to="/articles/start/edit" className="link link_edit-article">Edit</Link>
            <div className="delete-confirm hide">
              <span>Are you sure to delete this article?</span>
              <button type="button" className="btn">No</button>
              <button type="button" className="btn btn_primary">Yes</button>
            </div>
          </div>
        </aside>
      </header>
      <main className="article__markdown">
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
);

export default ArticleView;

import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import 'antd/dist/antd.css';
import Header from '../Header';
import ArticleView from '../ArticleView';
import ArticleList from '../ArticleList';
import SignUp from '../SignUp';
import SignIn from '../SignIn';
import Profile from '../Profile';
import EditArticle from '../EditArticle';
import NewArticle from '../NewArticle';
import './App.scss';


const App: React.FC = () => (
    <Router>
      <div className="app">
        <Header />

        <main className="app-main">
          <Switch>
            <Route path="/" exact>
              <ArticleList />
            </Route>
            <Route path="/articles/" exact>
              <ArticleList />
            </Route>
            <Route path="/articles/:slug" exact 
              render={({ match }) => {
                const { slug } = match.params;
                return <ArticleView id={ slug } />
              }}
            />
            <Route path="/articles/:slug/edit">
              <EditArticle />
            </Route>
            <Route path="/new-article">
              <NewArticle />
            </Route>
            
            <Route path="/sign-up">
              <SignUp />
            </Route>
            <Route path="/sign-in">
              <SignIn />
            </Route>
            <Route path="/profile">
              <Profile />
            </Route>
            <Route>
              <h5>There is no page with such address</h5>
            </Route>
          </Switch>
        </main>
      </div>
    </Router>
  );

export default App;

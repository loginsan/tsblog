import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Header from './Header';
import ArticleView from './ArticleView';
import ArticleList from './ArticleList';
import SignUp from './SignUp';
import EditArticle from './EditArticle';
import './App.scss';


const App: React.FC = () => {
  console.log(`start app`)  ;

  return (
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
            <Route path="/articles/:some" exact>
              <ArticleView />
            </Route>
            
            <Route path="/sign-up">
              <SignUp />
            </Route>
            <Route path="/articles/:some/edit">
              <EditArticle />
            </Route>
            
          </Switch>
        </main>
      </div>
    </Router>
  );
}

export default App;

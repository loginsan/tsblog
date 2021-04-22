import React from 'react';
import ArticleForm from '../ArticleForm';

const NewArticle: React.FC = () => {
  const title = "Create new article";
  
  return (
    <ArticleForm slug="" formTitle={title} />
  )
}

export default NewArticle;

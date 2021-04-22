import React from 'react';
import ArticleForm from '../ArticleForm';

interface ArticleEditProps {
  slug: string,
}

const EditArticle: React.FC<ArticleEditProps> = ({ slug }) => {
  const title = "Edit article";
  
  return (
    <ArticleForm slug={slug} formTitle={title}  />
  )

}

export default EditArticle;

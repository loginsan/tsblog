import React from 'react';
import { useStore } from 'react-redux';
import { Link } from 'react-router-dom';
import { Comment } from '../../types';
import { formatDate, elemLoading, elemAlert } from '../../common';


interface CommentsProps {
  data: Comment[],
  token: string,
}

function renderComments(data: Comment[]): React.ReactNode {
  if (data.length === 0) return null;
  const items = data.map(elem => {
    const { id, updatedAt, body, author } = elem;
    const key = `comment-${id}-${updatedAt}`;
    return (<li key={key} className="long-text">
      <em>{ body }</em>, &mdash;&nbsp; 
      <Link to={`/profiles/${author && author.username}`}>
        {author && author.username}
      </Link>
      &nbsp;by <time className="pub-time">{ formatDate(updatedAt) }</time>
    </li>)
  });
  return <ul>{ items }</ul>;
}

const CommentsList: React.FC<CommentsProps> = ({ data, token = '' }) => {
  const store = useStore();
  const { commentsLoading, commentsError } = store.getState().view;

  return (
    <div>
      <h3>{ data.length > 0? 'Comments:' : 'No comments yet…' }</h3>
      { token !== '' && (
        <sup className="long-text">
          Authenticated users can post comments…
        </sup>) }
      
      { elemLoading(commentsLoading) }
      { elemAlert(commentsError) }
      { !commentsError && !commentsLoading && renderComments(data) }
    </div>
  );
}

export default CommentsList;

import React from 'react';  // , { SetStateAction } 
import { Link } from 'react-router-dom';
import { Alert } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import avatarDefault from './assets/user-avatar.png';


export function formatDate(dateStr?: string, locale: string = "en"): string {
  const date = dateStr? new Date(dateStr) : new Date();
  const yy = new Intl.DateTimeFormat(locale, { year: 'numeric' }).format(date);
  const mm = new Intl.DateTimeFormat(locale, { month: 'long' }).format(date);
  const dd = new Intl.DateTimeFormat(locale, { day: 'numeric' }).format(date);
  return `${mm} ${dd}, ${yy}`;
}

export function randomArticleImage(): React.ReactNode {
  const seed = Math.round( Math.random() * 100 + 1 );
  return (
    <img alt="placeholder" 
      className="article_img" 
      src={`https://picsum.photos/seed/${seed}/907/130`} 
    />
  );
}

type ErrorEvent = React.SyntheticEvent<HTMLImageElement>;

export function avatarFallback(event: ErrorEvent): void { 
  const ev = event; 
  ev.currentTarget.onerror = null; 
  ev.currentTarget.src = avatarDefault;
}

export function placeTags(tags?: string[]): React.ReactNode {
  if (!tags || tags.length === 0) {
    return null
  }
  return (
    <ul className="article__tag-list nolist">
      { tags && tags.map((el, index) => (
        <li key={el} className={`tag${index === 0? " tag_main" : ""}`}>
          <Link to="/" title="Tag functional is incomplete in this release">{el}</Link>
        </li>
      ))}
    </ul>
  )
}

export function elemLoading(loading: boolean): React.ReactNode {
  return loading && <div className="loading"><LoadingOutlined /></div>;
}

export function elemAlert(error: string): React.ReactNode {
  return (
    error && 
    <Alert 
      className="alert-box" 
      message="Error ocured" 
      description={error} 
      type="error" 
      showIcon 
    />
  )
}

// function handleChange(
//   evt: React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement>,
//   fn: SetStateAction<string | ((prevState: string | null) => string | null)>
// ): void {
//   const val: string = evt.currentTarget.value;
//   fn(val);
// };

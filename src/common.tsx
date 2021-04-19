import React from 'react';
import { Link } from 'react-router-dom';
import { FieldError } from 'react-hook-form';
import { Alert } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import avatarDefault from './assets/user-avatar.png';


export function formatDate(dateStr?: string, locale: string = 'en'): string {
  const date = dateStr? new Date(dateStr) : new Date();
  const fd = new Intl.DateTimeFormat(
    locale, 
    { year: 'numeric',  month: 'long', day: 'numeric' }
  ).format(date);
  return `${fd}`;
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

export function parseError(data: string): string[] {
  const container = JSON.parse(data);
  const obj = container.errors;
  const messages = [];
  for (const [key, value] of Object.entries(obj)) {
    messages.push(`${key}: ${(value as string[]).join(", ")}`);
  }
  return messages;
}

export function elemAlert(error: string): React.ReactNode {
  if (!error) return null;
  if (error.indexOf('|') === -1) {
    return (<Alert 
      className="alert-box" 
      message="Error occurred" 
      description={ error } 
      type="error" 
      showIcon 
    />)
  }
  const [status, data] = error.split('|');
  const list = parseError(data); 
  return (
    error && 
    <Alert 
      className="alert-box" 
      message={`Error occurred (code ${status})`} 
      description={ list.join("; ") } 
      type="error" 
      showIcon 
    />
  )
}

export function fieldErrorTip(error: FieldError | undefined): React.ReactNode {
  return error && (
    <span className="note_field error show">
      { error?.message }
    </span>
  )
}

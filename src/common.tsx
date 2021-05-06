import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { FieldError, UseFormRegisterReturn } from 'react-hook-form';
import { Alert } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import cn from 'classnames';
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
      className={cn('article_img')} 
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
    <ul className={cn("article__tag-list", "nolist")}>
      { tags && tags.map((el, index) => (
        <li key={el} className={cn('tag', { 'tag_main': index === 0 })}>
          <Link to="/" title="Tag functional is incomplete in this release">{el}</Link>
        </li>
      ))}
    </ul>
  )
}

export function elemLoading(loading: boolean): React.ReactNode {
  return loading && <div className={cn('loading')}><LoadingOutlined /></div>;
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
      className={cn("alert-box")} 
      message="Error occurred" 
      description={ error } 
      type="error" 
      showIcon 
    />)
  }
  const [status, data] = error.split('|');
  if (status === "404") {
    return (<Alert 
      className={cn("alert-box")} 
      message="No resource returned (code 404)" 
      description="Mario, our Princess is in another castle…"
      type="error" 
      showIcon 
    />)
  }
  const list = parseError(data); 
  return (
    error && 
    <Alert 
      className={cn("alert-box")}
      message={`Error occurred (code ${status})`} 
      description={ list.join("; ") } 
      type="error" 
      showIcon 
    />
  )
}

export function fieldErrorTip(error: FieldError | undefined): React.ReactNode {
  return error && (
    <span className={cn('note_field', 'error', 'show')}>
      { error?.message }
    </span>
  )
}

export function setPageTitle(str: string) {
  const cut = str.trim().substr(0, 119);
  document.title = `TS Blog. ${cut}`;
}

export function formInputField(
  id: string,
  title: string,
  error: FieldError | undefined,
  reg: UseFormRegisterReturn
): React.ReactNode {
  const fieldType = id.toLowerCase().includes("password")? "password" : "text";
  return (
    <li className={cn('form__field')}>
      <label className={cn('label')} htmlFor={id}>{ title }</label>
      <input type={fieldType} id={id}
        className={cn('control', 'control_input', { 'error': error })}
        placeholder={title}
        {...reg}
      />
      { fieldErrorTip(error) }
    </li>
  );
}

export function formTextAreaField(
  id: string,
  title: string,
  error: FieldError | undefined,
  reg: UseFormRegisterReturn
): React.ReactNode {
  return (
    <li className={cn('form__field')}>
      <label className={cn('label')} htmlFor={id}>{ title }</label>
      <textarea id={id}
        className={cn('control', 'control_textarea', { 'error': error })}
        cols={30} rows={5}
        placeholder={title}
        {...reg}
      />
      { fieldErrorTip(error) }
    </li>
  );
}

export function notifyBox(
  title: string,
  body: React.ReactNode,
  url: string = ''
): React.ReactNode {
  return (<>
    <h2>{title}</h2>
    <p className={cn('long-text')}>{body}</p>
    { url && <Redirect to={url} /> }
  </>
  )
}

export const guestPop = (
  <div>You must <Link to="/sign-in">sign-in</Link> first to like the articles…</div>
)

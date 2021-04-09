import React from 'react';
import avatarDefault from './assets/user-avatar.png';


export const formatDate = (dateStr: string, locale: string = "en"): string => {
  const date = new Date(dateStr);
  const yy = new Intl.DateTimeFormat(locale, { year: 'numeric' }).format(date);
  const mm = new Intl.DateTimeFormat(locale, { month: 'long' }).format(date);
  const dd = new Intl.DateTimeFormat(locale, { day: 'numeric' }).format(date);
  return `${mm} ${dd}, ${yy}`;
}

export const randomArticleImage = (): React.ReactNode => {
  const seed = Math.round( Math.random() * 100 + 1 );
  return (
    <img alt="placeholder" 
      className="article_img" 
      src={`https://picsum.photos/seed/${seed}/907/130`} 
    />
  );
}

export const avatarFallback = (event: React.SyntheticEvent<HTMLImageElement>): void => { 
  const ev = event; 
  ev.currentTarget.onerror = null; 
  ev.currentTarget.src = avatarDefault;
}
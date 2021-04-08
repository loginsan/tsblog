import React, { useState } from 'react';

const NewArticle: React.FC = () => {
  
  const [article, setArticle] = useState({
    title: '',
    short: '',
    text: '',
    tags: []
  });

  const handleChange = (
    evt: React.ChangeEvent<HTMLInputElement>, 
    field: string
  ): void => {
    const val: string = evt.currentTarget.value;
    // console.log(val);
    setArticle( { [field]: val, ...article } );
  };

  return (
    <section className="form form_article">
      <h2 className="form__title">Create new article</h2>
      <ul className="form__field-list nolist">
        <li className="form__field">
          <label className="label" htmlFor="title">
            Title
          </label>
          <input
            className="control control_input"
            type="text"
            id="title"
            name="title"
            placeholder="Title"
            value={article.title}
            onChange={(evt) => handleChange(evt, 'title')}
          />
          <span className="note_field error">
            Пользователь с таким именем уже есть
          </span>
          <span className="note_field">Use A-Za-z0-9_ characters</span>
        </li>
        <li className="form__field">
          <label className="label" htmlFor="short">
            Short description
          </label>
          <input
            className="control control_input"
            type="text"
            id="short"
            name="short"
            placeholder="Short description"
            value={article.short}
            onChange={(evt) => handleChange(evt, 'short')}
          />
          <span className="note_field error">
            Неверный формат электронной почты
          </span>
          <span className="note_field">1</span>
        </li>
        <li className="form__field">
          <label className="label" htmlFor="text">
            Text
          </label>
          <textarea
            className="control control_textarea error"
            id="text"
            name="text"
            cols={30}
            rows={5}
            placeholder="Text with Markdown"
            defaultValue="&nbsp;"
          />        
          <span className="note_field error show">
            Your text needs to be at least 80 characters
          </span>
          <span className="note_field">2</span>
        </li>
        <li className="form__field">
          <label className="label" htmlFor="tag_main">
            Tags
          </label>
          <ul className="tags-list nolist">
            <li className="tag-line">
              <input
                className="control control_input control_tag"
                type="text"
                id="tag_main"
                name="tag_main"
                placeholder="Tag"
              />
              <button type="button" className="btn_delete btn_tag">
                Delete
              </button>
              <button type="button" className="btn_add btn_tag">
                Add Tag
              </button>
            </li>
            <li className="tag-line">
              <input
                className="control control_input control_tag"
                type="text"
                id="tag_next"
                name="tag_next"
                placeholder="Tag"
              />
              <button type="button" className="btn_delete btn_tag">
                Delete
              </button>
              <button type="button" className="btn_add btn_tag">
                Add Tag
              </button>
            </li>
          </ul>
          
          <span className="note_field error">Passwords must match</span>
          <span className="note_field">3</span>
        </li>
        <li className="form__field">
          <button type="submit" className="btn_submit">
            Send
          </button>
          <span className="note_foot">
            * All changes are saved.
          </span>
        </li>
      </ul>
    </section>
  );
}

export default NewArticle;

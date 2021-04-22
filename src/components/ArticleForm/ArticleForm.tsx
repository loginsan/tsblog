import React, { useState, useEffect } from 'react';
import { useDispatch, connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useCookies } from 'react-cookie';

import * as kit from '../../common';
import { ArticleFormProps } from '../../types';
import { EditState } from '../../store/editReducer';
import { UserState } from '../../store/userReducer';
import { ArticleState } from '../../store/singleReducer';
import { asyncCreateArticle, asyncUpdateArticle } from '../../store/editActions';

// const mock: ArticleData = {
//     "article": {
//         "title": "Some kind of wonderful",
//         "description": "A film i didn't saw yet, and Lea Thompson is acting in it",
//         "body": "# Some header\n\nA paragraph of **Some kind of wonderful** film synopsis…",
//         "tagList": [ "some", "kind", "of", "wonderful", "film", "lea thompson" ]
//     }
// }

interface FieldSet {
  title: string,
  description: string,
  body: string,
  tagList: string,
}

type Keys = keyof FieldSet;

const schema = yup.object().shape({
  title: yup.string().required(),
  description: yup.string().required(),
  body: yup.string().required(),
  tagList: yup.string(),
});


const ArticleForm: React.FC<ArticleFormProps> = (props) => {
  const { 
    loading,
    error,
    article,
    slug,
    formTitle,
    original,
    user,
  } = props;
  const dispatch = useDispatch();
  const [cookies] = useCookies(['token']);
  const userToken = cookies.token || '';

  kit.setPageTitle(formTitle);

  const { 
    register, 
    handleSubmit, 
    formState: { errors }, 
    setValue,
    setError,
  } = useForm<FieldSet>({ resolver: yupResolver(schema) });

  const [submitted, setSubmitted] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setValue('title', (slug && original.title) || '');
    setValue('description', (slug && original.description) || '');
    setValue('body', (slug && original.body) || '');
    setValue('tagList', ((slug && original.tagList) || []).join(', '));
  }, [setValue, original, slug]);

  function onSubmit(data: FieldSet) {
    const articleSend = {
      ...data,
      tagList: data.tagList.split(', ')
    };
    if (slug) {
      dispatch( asyncUpdateArticle(slug, articleSend, userToken) );
    } else {
      dispatch( asyncCreateArticle(articleSend, userToken) );
    }
    setSubmitted(true);
  }

  useEffect(() => {
    if (error) {
      const [, errorData] = error.split('|');
      const errorList = kit.parseError(errorData);
      for (let i = 0; i < errorList.length; i++) {
        const [key, value] = errorList[i].split(': ');
        setError(key as Keys, { type: "manual", message: value });
      }
    }
  }, [error, setError]);

  useEffect(() => {
    if (user.username) {
      // console.log(slug, user.username, original.author?.username);
      setVisible(!slug || user.username === original.author?.username);
    }
  }, [slug, user, original]);

  return (
    <section className="form form_article">
      { kit.elemLoading(loading) }
      { kit.elemAlert(error) }

      { !userToken && (<>
          <h2>Access denied</h2>
          <p className="long-text">You must sign-in first</p>
          <Redirect to="/" />
        </>)
      }

      { !visible && slug && (<>
          <h2>Access denied</h2>
          <p className="long-text">You can edit only your articles</p>
        </>)
      }

      { !visible && !slug && (<>
          <h2>Form loading</h2>
          <p className="long-text">Just wait a second…</p>
        </>)
      }

      { submitted && (<>
          <h2>Form submitted successfully</h2>
          <p className="long-text">
            You can now&nbsp;
            <Link to={`/articles/${article.slug}`}>view the article</Link>
          </p>
        </>)
      }

      { visible && !submitted && (<>
        <h2 className="form__title">{ formTitle }</h2>
        <form className="form__body" onSubmit={ handleSubmit(onSubmit) }>
          <ul className="form__field-list nolist">
            <li className="form__field">
              <label className="label" htmlFor="title">
                Title
              </label>
              <input type="text" id="title"
                className={`control control_input${errors.title? " error" : ""}`}
                placeholder="Title"
                {...register("title")}
              />
              { kit.fieldErrorTip(errors.title) }
            </li>
            <li className="form__field">
              <label className="label" htmlFor="description">
                Short description
              </label>
              <input type="text" id="description"
                className={`control control_input${errors.description? " error" : ""}`}
                placeholder="Short description"
                {...register("description")}
              />
              { kit.fieldErrorTip(errors.description) }
            </li>
            <li className="form__field">
              <label className="label" htmlFor="body">
                Text
              </label>
              <textarea id="body"
                className={`control control_textarea${errors.body? " error" : ""}`}
                cols={30} rows={5}
                placeholder="Text with Markdown"
                {...register("body")}
              />        
              { kit.fieldErrorTip(errors.body) }
            </li>
            <li className="form__field">
              <label className="label" htmlFor="tagList">
                Tags
              </label>
              <input type="text" id="tagList"
                className="control control_input"
                {...register("tagList")}
              />
              { kit.fieldErrorTip(errors.tagList) }
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
            </li>
            
            <li className="form__field">
              <button type="submit" className="btn_submit">
                { slug? 'Save' : 'Send' }
              </button>
              { slug && (<span className="note_foot">
                  * Editing article <u>{ slug }</u> …
                </span>) }
            </li>
          </ul>
        </form>
      </>) }


    </section>
  );
}

const mapStateToProps = (state: {
  edit: EditState, 
  user: UserState,
  view: ArticleState,
}) => ({
  loading: state.edit.loading, 
  error: state.edit.error,
  article: state.edit.article,
  original: state.view.article,
  user: state.user.user,
});

// const mapDispatchToProps = (dispatchFn: Dispatch<ArticleAction>) => ({
// 
// });

export default connect(mapStateToProps, {})(ArticleForm);

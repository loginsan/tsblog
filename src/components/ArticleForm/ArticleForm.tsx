import React, { useState, useEffect, Dispatch } from 'react';
import { useDispatch, connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { useForm } from 'react-hook-form';
import { useCookies } from 'react-cookie';

import * as kit from '../../common';
import { ArticleFormProps, Tag } from '../../types';
import { EditState } from '../../store/editReducer';
import { UserState } from '../../store/userReducer';
import { ArticleState } from '../../store/singleReducer';
import { asyncCreateArticle, asyncUpdateArticle,
  initTags, editTag, addTag, removeTag, clearEdit } from '../../store/editActions';
import { asyncGetArticle, ArticleAction } from '../../store/articlesActions';

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
}

type Keys = keyof FieldSet;

function buildTagLines(
  tags: Tag[],
  dispatchFn: Dispatch<ArticleAction>
): React.ReactNode {

  function addTagField(key: number) {
    dispatchFn( addTag(key) )
  }

  function removeTagField(key: number) {
    dispatchFn( removeTag(key) )
  }

  function handleChange(evt: React.ChangeEvent<HTMLInputElement>, key: number) {
    const val = evt?.currentTarget.value;
    const tag: Tag = { order: key, text: val };
    // console.log(val);
    dispatchFn( editTag(tag) )
  }

  return tags.map(elem => {
    const tagId = `tag-index_${elem.order}`;
    const key = elem.order;
    
    return (
      <li className="tag-line" key={key}>
        <input type="text" id={tagId}
          className="control control_input control_tag"
          placeholder="Tag"
          autoComplete="off"
          defaultValue={elem.text}
          name={`tag.${key}`}
          onChange={(evt) => handleChange(evt, key)}
        />
        <button type="button" 
          className="btn_delete btn_tag"
          onClick={() => removeTagField(key)}
        >
          Delete
        </button>
        <button type="button"
          className="btn_add btn_tag"
          onClick={() => addTagField(key)}
        >
          Add Tag
        </button>
      </li>
    )
  })
}


const ArticleForm: React.FC<ArticleFormProps> = (props) => {
  const { 
    loading,
    error,
    article,
    slug,
    formTitle,
    tagList,
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
  } = useForm<FieldSet>();

  const [submitted, setSubmitted] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (slug && userToken && !original.author) {
      dispatch( asyncGetArticle(slug, userToken) );
    }
  }, [slug, userToken, original, dispatch]);

  useEffect(() => {
    setValue('title', slug && original.title || '');
    setValue('description', slug && original.description || '');
    setValue('body', slug && original.body || '');
    if (slug) {
      dispatch( initTags(original.tagList?.length && original.tagList || ['']) );
    } else {
      dispatch( initTags(['']) );
    }
  }, [slug, setValue, original, dispatch]);

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
      setVisible(!slug || !!original.title || 
        user.username === original.author?.username);
    }
  }, [slug, user, original]);

  function onSubmit(data: FieldSet) {
    const articleSend = {
      ...data,
      tagList: tagList.map(({ order, text }) => text)
    };
    // console.log(data);
    // console.log(tagList);
    if (slug) {
      dispatch( asyncUpdateArticle(slug, articleSend, userToken) );
      dispatch( clearEdit(true) );
    } else {
      dispatch( asyncCreateArticle(articleSend, userToken) );
    }
    setSubmitted(true);
  }

  // useEffect(() => { console.log(tagList) }, [tagList]);


  return (
    <section className="form form_article">
      { kit.elemLoading(loading) }
      { kit.elemAlert(error) }

      { !userToken && 
        kit.notifyBox("Access denied", "You must sign-in first", "/")
      }

      { !visible && slug && !!original.title &&
        kit.notifyBox("Access denied", "You can edit only your articles")
      }

      { !visible && slug && !original.title &&
        kit.notifyBox("Form loading", "Just wait a second…")
      }

      { !visible && !slug &&
        kit.notifyBox("Form loading", "Just wait a second…")
      }

      { submitted &&
        kit.notifyBox("Form submitted successfully",
          (<>You can now&nbsp;
            <Link to={`/articles/${article.slug}`}>view the article</Link>
          </>)
        )
      }

      { visible && !submitted && (<>
        <h2 className="form__title">{ formTitle }</h2>
        <form className="form__body" onSubmit={ handleSubmit(onSubmit) }>
          <ul className="form__field-list nolist">
            <li className="form__field">
              <label className="label" htmlFor="title">Title</label>
              <input type="text" id="title"
                className={`control control_input${errors.title && " error"}`}
                placeholder="Title"
                { ...register("title", { required: "true" }) }
              />
              { kit.fieldErrorTip(errors.title) }
            </li>
            {/* kit.formInputField("title", "Title", errors.title, register("title")) */}
            <li className="form__field">
              <label className="label" htmlFor="description">Short description</label>
              <input type="text" id="description"
                className={`control control_input${errors.description && " error"}`}
                placeholder="Short description"
                { ...register("description", { required: "true" }) }
              />
              { kit.fieldErrorTip(errors.description) }
            </li>
            {/* kit.formInputField("description", "Short description", errors.description, register("description")) */}
            <li className="form__field">
              <label className="label" htmlFor="body">Text</label>
              <textarea id="body"
                className={`control control_textarea${errors.body? " error" : ""}`}
                cols={30} rows={5}
                placeholder="Text"
                { ...register("body", { required: "true" }) }
              />
              { kit.fieldErrorTip(errors.body) }
            </li>
            {/* kit.formTextAreaField("body", "Text", errors.body, register("body")) */}
            {/* kit.formInputField("tagList", "Tags", errors.tagList, register("tagList")) */}
            
            
            <li className="form__field">
              <label className="label" htmlFor="tag-index_0">Tags</label>
              <ul className="tags-list nolist">
              { buildTagLines(tagList, dispatch) }
              </ul>
            </li>
            
            <li className="form__field">
              <button type="submit" className="btn_submit">
                { slug? 'Save' : 'Send' }
              </button>
              { slug && (<span className="note_foot">
                  * Editing article <Link to={`/articles/${slug}`}>{ slug }</Link> …
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
  tagList: state.edit.tagList,
  original: state.view.article,
  user: state.user.user,
});

export default connect(mapStateToProps, {})(ArticleForm);

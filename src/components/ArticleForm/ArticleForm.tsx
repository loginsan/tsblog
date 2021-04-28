import React, { useState, useEffect, useRef, Dispatch } from 'react';
import { useDispatch, connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { useForm, UseFormRegister } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useCookies } from 'react-cookie';

import * as kit from '../../common';
import { ArticleFormProps, Tag } from '../../types';
import { EditState } from '../../store/editReducer';
import { UserState } from '../../store/userReducer';
import { ArticleState } from '../../store/singleReducer';
import { asyncCreateArticle, asyncUpdateArticle,
  initTags, editTag, addTag, removeTag } from '../../store/editActions';
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
  tagList: string[],
}

type Keys = keyof FieldSet;


const schema = yup.object().shape({
  title: yup.string().required(),
  description: yup.string().required(),
  body: yup.string().required(),
  tagList: yup.mixed(),
});

function buildTagLines(
  tags: Tag[],
  dispatchFn: Dispatch<ArticleAction>,
  reg: UseFormRegister<FieldSet>
): React.ReactNode {

  // console.log(reg);

  function addTagField(key: number) {
    dispatchFn( addTag(key) )
  }

  function removeTagField(key: number) {
    dispatchFn( removeTag(key) )
  }

  function handleChange(evt: React.ChangeEvent<HTMLInputElement>, key: number) {
    const val = evt?.currentTarget.value;
    const tag: Tag = { order: key, text: val };
    dispatchFn( editTag(tag) )
  }

  return tags.map(elem => {
    const tagId = `tag-index_${elem.order}`;
    const key = elem.text !== ''? elem.order : Date.now();
    
    return (
      <li className="tag-line" key={key}>
        <input type="text" id={tagId}
          className="control control_input control_tag"
          placeholder="Tag"
          autoComplete="off"
          { ...reg("tagList") }
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

const zeroTag: Tag = { order: 0, text: '' };


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
  // const tagsRef = useRef<HTMLUListElement>(null);

  kit.setPageTitle(formTitle);

  const { 
    register, 
    handleSubmit, 
    formState: { errors }, 
    setValue,
    setError,
  } = useForm<FieldSet>({ resolver: yupResolver(schema) });

  // const [tagFields, setTagFields] = useState([zeroTag]); // `80's`, `lea thompson`, `film`, `wonderful`, `kind of`, `some`
  const [submitted, setSubmitted] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (slug && userToken && !original.author) {
      dispatch( asyncGetArticle(slug, userToken) );
    }
  }, [slug, userToken, original, dispatch]);

  useEffect(() => {
    setValue('title', original.title || '');
    setValue('description', original.description || '');
    setValue('body', original.body || '');
    setValue('tagList', original.tagList || ['']);
    dispatch( initTags(original.tagList || ['']) );
  }, [setValue, original, initTags]);

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
      tagList: data.tagList
    };
    console.log(articleSend);
    /* if (slug) {
      dispatch( asyncUpdateArticle(slug, articleSend, userToken) );
    } else {
      dispatch( asyncCreateArticle(articleSend, userToken) );
    } */
    setSubmitted(true);
  }

  useEffect(() => { console.log(tagList) }, [tagList]);


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
            { kit.formInputField("title", "Title", errors.title, register("title")) }
            { kit.formInputField("description", "Short description", errors.description, register("description")) }
            { kit.formTextAreaField("body", "Text", errors.body, register("body")) }
            {/* kit.formInputField("tagList", "Tags", errors.tagList, register("tagList")) */}
            
            
            <li className="form__field">
              <label className="label" htmlFor="tag-index_0">Tags</label>
              <ul className="tags-list nolist">
              { buildTagLines(tagList, dispatch, register)
              }
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

// const mapDispatchToProps = (dispatchFn: Dispatch<ArticleAction>) => ({
// 
// });

export default connect(mapStateToProps, {})(ArticleForm);

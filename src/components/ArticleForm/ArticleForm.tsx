import React, { useState, useEffect, Dispatch } from 'react';
import { useDispatch, connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { useForm } from 'react-hook-form';
import { useCookies } from 'react-cookie';
import cn from 'classnames';

import * as kit from '../../common';
import { ArticleFormProps, Tag } from '../../types';
import { EditState } from '../../store/edit/types';
import { UserState } from '../../store/user/types';
import { ArticleState, ArticleAction, ArticleCore } from '../../store/single/types';
import { asyncCreateArticle, asyncUpdateArticle, initTags, editTag, addTag,
  removeTag, clearEdit } from '../../store/edit/actions';
import { asyncGetArticle } from '../../store/single/actions';


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
    dispatchFn( editTag(tag) )
  }

  return tags.map(elem => {
    const key = elem.order;
    const tagId = `tag-index_${key}`;
    
    return (
      <li className={cn("tag-line")} key={key}>
        <input type="text" id={tagId}
          className={cn("control", "control_input", "control_tag")}
          placeholder="Tag"
          autoComplete="off"
          defaultValue={elem.text}
          name={`tag.${key}`}
          onChange={(evt) => handleChange(evt, key)}
        />
        <button type="button" 
          className={cn("btn_delete", "btn_tag")}
          onClick={() => removeTagField(key)}
        >
          Delete
        </button>
        <button type="button"
          className={cn("btn_add", "btn_tag")}
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
        user.username === original.author.username);
    }
  }, [slug, user, original]);

  function onSubmit(data: FieldSet) {
    const articleSend: ArticleCore = {
      ...data,
      tagList: tagList.map(({ order, text }) => text)
    };
    if (slug) {
      dispatch( asyncUpdateArticle(slug, articleSend, userToken) );
      dispatch( clearEdit(true) );
    } else {
      dispatch( asyncCreateArticle(articleSend, userToken) );
    }
    setSubmitted(true);
  }

  return (
    <section className={cn("form", "form_article")}>
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
          slug? (<>You can now&nbsp;
            <Link to={`/articles/${slug}`}>view the article</Link>
          </>) : (<>You can now&nbsp;
            <Link to="/articles/">view articles</Link> 
            {original && original.slug? original.slug : '-'}
          </>)
        )
      }

      { visible && !submitted && (<>
        <h2 className={cn("form__title")}>{ formTitle }</h2>
        <form className={cn("form__body")} onSubmit={ handleSubmit(onSubmit) }>
          <ul className={cn("form__field-list", "nolist")}>
            { kit.formInputField("title", "Title", errors.title, register("title", { required: "Value required" })) }
            { kit.formInputField("description", "Short description", errors.description, register("description", { required: "Value required" })) }
            { kit.formTextAreaField("body", "Text", errors.body, register("body", { required: "Value required" })) }
            
            <li className={cn("form__field")}>
              <label className={cn("label")} htmlFor="tag-index_0">Tags</label>
              <ul className={cn("tags-list", "nolist")}>
              { buildTagLines(tagList, dispatch) }
              </ul>
            </li>
            
            <li className={cn("form__field")}>
              <button type="submit" className={cn("btn_submit")}>
                { slug? 'Save' : 'Send' }
              </button>
              { slug && (<span className={cn("note_foot")}>
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

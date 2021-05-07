import React, { useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import cn from 'classnames';
import {
  asyncGetProfile,
  asyncGetAuthorArticles
} from '../../store/profile/actions';
import { ProfileState } from '../../store/profile/types';
import { Profile, Article } from '../../types';
import { elemLoading, elemAlert, setPageTitle } from '../../common';


interface ProfilesProps {
  username: string,
  loading: boolean 
  error: string,
  profile: Profile,
  listLoading: boolean,
  listError: string,
  list: Article[],
  total: number,
}

const Profiles: React.FC<ProfilesProps> = (props) => {
  const { username, loading, error, profile, 
    listLoading, listError, list, total } = props;
  const dispatch = useDispatch();
  const [cookies] = useCookies(['token']);
  const userToken = cookies.token || '';
  const label = "User: ";

  setPageTitle(`User ${profile.username} profile`);

  useEffect(() => {
    dispatch( asyncGetProfile(username, userToken) );
    if (username) {
      dispatch( asyncGetAuthorArticles(username, userToken) );
    }
  }, [dispatch, username, userToken]);

  const links: React.ReactNode[] = [];
  const original: string[] = [];
  for (let i = 0; i < list.length; i++) {
    const { slug, title } = list[i];
    if ( !original.includes(title) ) {
      original.push(title);
      links.push( (<li key={slug}>
        <Link to={`/articles/${slug}`}>{title}</Link>
      </li>) );
    }
  }
  const hitsCount = original.length;
  const coeff = total === 0? 0 : Math.round(hitsCount / total * 1e3) / 1e3;

  const elemArticlesStat = !listLoading && !listError && (
    <div>
      <h3><b>Articles statistics</b></h3>
      <p className={cn("stats")}>
        {`Total: ${total} | Original: ${hitsCount} | Coeff: ${coeff}`}
      </p>
    </div>
  );

  const elemChosenArticles = !listLoading && !listError && (hitsCount >= 0) &&
  (
    <div>
      <h3><b>Chosen Articles</b></h3>
      { hitsCount > 0 ? (<ul className={cn("bullets", "no-bottom-margin")}>
          { links }
        </ul>) : (<p className={cn("long-text")}>
          Author has no published articles yet…
        </p>) 
      }
    </div>
  );

  const elemProfile = !loading && !error && (
    <article className={cn("article", "article_full")}>
      <h2><b>{ label }</b>{ profile.username }</h2>
      <ul className={cn("bullets")}>
        <li className={cn("long-text")}><b>Bio: </b>{ profile.bio}</li>
        <li className={cn("long-text")}><b>Image: </b>{ profile.image}</li>
        <li><b>Following: </b>{ profile.following? 'yes' : 'no' }</li>
      </ul>
      <hr />
      { elemLoading(listLoading) }
      { elemAlert(listError) }
      { elemArticlesStat }
      <hr />
      { elemChosenArticles }
    </article>
  );

  return (
    <section className={cn("page")}>
      { elemLoading(loading) }
      { elemAlert(error) }
      { elemProfile }
    </section>
  );
}

const mapStateToProps = (state: {profile: ProfileState}) => {
  const props = state.profile;
  return {
    loading: props.loading, 
    error: props.error,
    profile: props.profile,
    listLoading: props.listLoading,
    listError: props.listError,
    list: props.list,
    total: props.total,
  }
}

export default connect(mapStateToProps, {})(Profiles);

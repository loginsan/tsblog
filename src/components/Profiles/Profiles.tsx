import React, { useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { asyncGetProfile, asyncGetAuthorArticles } from '../../store/profileActions';
import { ProfileState } from '../../store/profileReducer';
import { elemLoading, elemAlert } from '../../common';
import { Profile, Article } from '../../types';


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

  useEffect(() => {
    dispatch( asyncGetProfile(username, userToken) );
    dispatch( asyncGetAuthorArticles(username || '', userToken) );
  }, [dispatch, username, userToken]);

  const links: React.ReactNode[] = [];
  const original: string[] = []; // ...new Set( list.map(elem => elem.title ))
  for (let i = 0; i < list.length; i++) {
    const { slug, title } = list[i];
    if ( !original.includes(title || '') ) {
      original.push(title || '');
      links.push( (<li key={slug}>
        <Link to={`/articles/${slug}`}>{title}</Link>
      </li>) );
    }
  }
  const hitsCount = original.length;
  const coeff = total === 0? 0 : Math.round(hitsCount / total * 1e3) / 1e3;
  // for (let i = 0; i < hitsCount; i++) {
  //   const searchTitle = original[i];
  //   const index = list.findIndex(elem => elem.title === searchTitle);
  //   if (index !== -1) {
  //     slugs.push( list[index].slug || '' )
  //   }
  // }

  const elemArticlesStat = !listLoading && !listError && (
    <div>
      <h3>Articles statistics</h3>
      <p className="stats">
        {`Total: ${total} | Original: ${hitsCount} | Coeff: ${coeff}`}
      </p>
    </div>
  );

  const elemChosenArticles = !listLoading && !listError && hitsCount && (
    <div>
      <h3>Chosen Articles</h3>
      <ul className="bullets no-bottom-margin">
        { links }
      </ul>
    </div>
  );

  const elemProfile = !loading && !error && (
    <article className="article article_full">
      <h2><b>{ label }</b>{ profile.username }</h2>
      <ul className="bullets">
        <li className="long-text"><b>Bio: </b>{ profile.bio}</li>
        <li className="long-text"><b>Image: </b>{ profile.image}</li>
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
    <section className="page">
      { elemLoading(loading) }
      { elemAlert(error) }
      { elemProfile }
    </section>
  );
}

const mapStateToProps = (state: {profile: ProfileState}) => ({
  loading: state.profile.loading, 
  error: state.profile.error,
  profile: state.profile.profile,
  listLoading: state.profile.listLoading,
  listError: state.profile.listError,
  list: state.profile.list,
  total: state.profile.total,
});

// const mapDispatchToProps = (dispatchFn: Dispatch<ArticleAction>) => ({
// 
// });

export default connect(mapStateToProps, {})(Profiles);
// export default Profiles;

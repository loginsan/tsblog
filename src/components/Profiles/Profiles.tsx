import React, { useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
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
  }, [dispatch, username]);

  const original = [...new Set(list.map(elem => elem.title))];
  const hitsCount = original.length;
  const coeff = total === 0? 0 : Math.round(hitsCount / total * 1e3) / 1e3;

  const elemArticlesStat = !listLoading && !listError && (
    <div>
      <h3>Articles statistics</h3>
      <p>{`Total: ${total} | Original: ${hitsCount} | Coeff: ${coeff}`}</p>
    </div>
  )

  const elemProfile = !loading && !error && (
    <article className="article article_full">
      <h2>{label}{ profile.username }</h2>
      <ul>
        <li className="long-text"><b>Bio: </b>{ profile.bio}</li>
        <li className="long-text"><b>Image: </b>{ profile.image}</li>
        <li><b>Following: </b>{ profile.following? 'yes' : 'no' }</li>
      </ul>
      <hr />
      { elemLoading(listLoading) }
      { elemAlert(listError) }
      { elemArticlesStat }
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

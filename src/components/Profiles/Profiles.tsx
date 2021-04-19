import React, { useEffect } from 'react';
import { connect, useStore, useDispatch } from 'react-redux';
import { asyncGetProfile } from '../../store/profileActions';
import { ProfileState } from '../../store/profileReducer';
import { elemLoading, elemAlert } from '../../common';


interface ProfilesProps {
  username: string,
}

const Profiles: React.FC<ProfilesProps> = ({ username }) => {
  const label = "User: ";
  const store = useStore();
  const dispatch = useDispatch();
  const { loading, error, profile } = store.getState().profile;

  useEffect(() => {
    dispatch( asyncGetProfile(username) );
  }, [dispatch, username]);

  const elemProfile = !loading && !error && (
    <article className="article article_full">
      <h2>{label}{ profile.username }</h2>
      <ul>
        <li className="long-text"><b>Bio: </b>{ profile.bio}</li>
        <li className="long-text"><b>Image: </b>{ profile.image}</li>
        <li><b>Following: </b>{ profile.following? 'yes' : 'no' }</li>
      </ul>
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
});

// const mapDispatchToProps = (dispatchFn: Dispatch<ArticleAction>) => ({
// 
// });

export default connect(mapStateToProps, {})(Profiles);
// export default Profiles;

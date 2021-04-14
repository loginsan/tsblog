import React, { useState } from 'react';
import { useStore, useDispatch, connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { UserState } from '../../store/userReducer';
import { asyncUpdateProfile } from '../../store/actions';
import { elemLoading, elemAlert } from '../../common';


const Profile: React.FC = () => {

  const store = useStore();
  const dispatch = useDispatch();
  const { loading, error, user, isLogged } = store.getState().user;

  const [username, setUsername] = useState(user.username || '');
  const [email, setEmail] = useState(user.email || '');
  const [password, setPassword] = useState('');
  const [bio, setBio] = useState(user.bio || '');
  const [image, setImage] = useState(user.image || '');
  const [submitted, setSubmitted] = useState(false);

  type SetterFunction = typeof setEmail;

  function handleChange(
    evt: React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement>,
    fn: SetterFunction
  ): void {
    const val: string = evt.currentTarget.value;
    fn(val);
  };

  function handleSubmit(
    evt: React.MouseEvent<HTMLButtonElement>
  ) {
    // TODO: form validation
    const userData = { username, email, password, bio, image };
    dispatch( asyncUpdateProfile(user.token, userData) );
    setSubmitted(true);
  }


  return (
    <section className="form">
      { elemLoading(loading) }
      { elemAlert(error) }
      { !isLogged && (<>
          <h2>Access denied</h2>
          <p className="long-text">You must sign-in first</p>
          <Redirect to="/" />
        </>)
      }
      { isLogged && submitted && (<>
          <h2>Profile updated successfully</h2>
          <p className="long-text">Have a nice time in Realworld Blog!</p>
        </>)
      }
      { isLogged && !submitted && (<>
          <h2 className="form__title">Edit Profile</h2>
          <ul className="form__field-list nolist">
            <li className="form__field">
              <label className="label" htmlFor="username">
                Username
              </label>
              <input
                className="control control_input"
                type="text"
                id="username"
                name="username"
                placeholder="Username"
                autoComplete="off"
                value={username}
                onChange={(evt) => handleChange(evt, setUsername)}
              />
              <span className="note_field error">
                Пользователь с таким именем уже есть
              </span>
              <span className="note_field">Use A-Za-z0-9_ characters</span>
            </li>
            <li className="form__field">
              <label className="label" htmlFor="email">
                Email address
              </label>
              <input
                className="control control_input"
                type="email"
                id="email"
                name="email"
                placeholder="Email address"
                autoComplete="off"
                value={email}
                onChange={(evt) => handleChange(evt, setEmail)}
              />
              <span className="note_field error">
                Неверный формат электронной почты
              </span>
              <span className="note_field">1</span>
            </li>
            <li className="form__field">
              <label className="label" htmlFor="password">
                New password
              </label>
              <input
                className="control control_input"
                type="password"
                id="password"
                name="password"
                placeholder="New password"
                value={password}
                onChange={(evt) => handleChange(evt, setPassword)}
              />
              <span className="note_field error">
                Wrong password
              </span>
              <span className="note_field">2</span>
            </li>
            <li className="form__field">
              <label className="label" htmlFor="bio">
                Bio
              </label>
              <textarea
                className="control control_textarea"
                id="bio"
                name="bio"
                cols={30}
                rows={5}
                placeholder="Bio"
                value={bio}
                onChange={(evt => handleChange(evt, setBio))}
              />        
              <span className="note_field error">
                Your text needs to be at least 80 characters
              </span>
              <span className="note_field">2</span>
            </li>
            <li className="form__field">
              <label className="label" htmlFor="avatar">
                Avatar image (url)
              </label>
              <input
                className="control control_input"
                type="text"
                id="avatar"
                name="avatar"
                placeholder="Avatar image"
                autoComplete="off"
                value={image}
                onChange={(evt) => handleChange(evt, setImage)}
              />
              <span className="note_field error">
                Something odd…
              </span>
              <span className="note_field">4</span>
            </li>
            
            <li className="form__field">
              <button
                type="submit"
                className="btn_submit"
                onClick={handleSubmit}
              >
                Save
              </button>
            </li>
          </ul>
        </>)
      }
    </section>
  )
};

const mapStateToProps = (state: {user: UserState}) => ({
  loading: state.user.loading, 
  error: state.user.error,
  user: state.user.user,
  isLogged: state.user.isLogged,
});

export default connect(mapStateToProps, {})(Profile);

/*
{
  "errors": {
    "password": ["is too short (minimum is 8 characters)"]
  }
}
{"errors":{"email or password":["is invalid"]}}

{
  "user": {
    "id": 155730,
    "email": "linsykt@gmail.com",
    "createdAt": "2021-04-01T22:27:50.073Z",
    "updatedAt": "2021-04-13T23:36:47.013Z",
    "username": "Yoshy Lin",
    "bio": "Trying the best i can",
    "image": "https://cdn.pixabay.com/photo/2016/03/31/19/58/avatar-1295429_960_720.png",
    "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MTU1NzMwLCJ1c2VybmFtZSI6Illvc2h5IExpbiIsImV4cCI6MTYyMzU0MTAwN30.onCIlniPAlp55X8S1NliG9BozFODRLC8Mk1J9dL0igQ"
  }
}
*/

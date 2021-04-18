import React, { useState, useEffect } from 'react';
import { useDispatch, connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useCookies } from 'react-cookie';

import { mapUserStateToProps } from '../../store/userReducer';
import { asyncUpdateProfile } from '../../store/userActions';
import { elemLoading, elemAlert, fieldErrorTip, parseError } from '../../common';
import { UserMenuProps } from '../Header/UserMenu/types';


interface FieldSet {
  username: string,
  email: string,
  password?: string,
  bio?: string,
  image?: string,
}

type Keys = "username" | "password" | "email" | "bio" | "image";

const schema = yup.object().shape({
  username: yup.string().required(),
  email: yup.string().email().required(),
  password: yup
    .mixed()
    .test('passwordTest', 
      'Password must be empty or has length from 8 to 40 characters',
      value => value === '' || (value.length >= 8 &&  value.length <= 40)
    ),
  bio: yup.string(),
  image: yup.string().url(),
});


const Profile: React.FC<UserMenuProps> = (props) => {
  const { loading, error, user, isLogged } = props;
  const dispatch = useDispatch();

  const [cookies] = useCookies(['token']);
  const { 
    register, 
    handleSubmit, 
    formState: { errors }, 
    setValue,
    setError,
  } = useForm<FieldSet>({ resolver: yupResolver(schema) });

  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    setValue('username', user.username || '');
    setValue('email', user.email || '');
    setValue('bio', user.bio || '');
    setValue('image', user.image || '');
  }, [user, setValue]);

  function onSubmit(data: FieldSet) {
    // console.log(data);
    const userData: FieldSet = { 
      username: data.username, 
      email: data.email
    } 
    if (data.password !== '') {
      userData.password = data.password
    }
    if (data.bio !== '') {
      userData.bio = data.bio
    }
    if (data.image !== '') {
      userData.image = data.image
    }
    dispatch( asyncUpdateProfile(user.token!, userData) );
    setSubmitted(true);
  }

  useEffect(() => {
    if (error) {
      const [, errorData] = error.split('|');
      const errorList = parseError(errorData);
      for (let i = 0; i < errorList.length; i++) {
        const [key, value] = errorList[i].split(': ');
        setError(key as Keys, { type: "manual", message: value });
      }
    }
  }, [error, setError]);

  return (
    <section className="form">
      { elemLoading(loading) }
      { elemAlert(error) }
      { !isLogged && !cookies.token && (<>
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
        <form className="form__body" onSubmit={ handleSubmit(onSubmit) }>
          <ul className="form__field-list nolist">
            <li className="form__field">
              <label className="label" htmlFor="username">
                Username
              </label>
              <input type="text"
                className={`control control_input${errors.username? " error" : ""}`}
                id="username"
                placeholder="Username"
                autoComplete="off"
                {...register("username")}
              />
              { fieldErrorTip(errors.username) }
            </li>
            <li className="form__field">
              <label className="label" htmlFor="email">
                Email address
              </label>
              <input type="email"
                className={`control control_input${errors.email? " error" : ""}`}
                id="email"
                placeholder="Email address"
                autoComplete="off"
                {...register("email")}
              />
              { fieldErrorTip(errors.email) }
            </li>
            <li className="form__field">
              <label className="label" htmlFor="password">
                New password
              </label>
              <input type="password"
                className={`control control_input${errors.password? " error" : ""}`}
                id="password"
                placeholder="New password"
                {...register("password")}
              />
              { fieldErrorTip(errors.password) }
            </li>
            <li className="form__field">
              <label className="label" htmlFor="bio">
                Bio
              </label>
              <textarea
                className={`control control_textarea${errors.bio? " error" : ""}`}
                id="bio"
                cols={30}
                rows={5}
                placeholder="Bio"
                {...register("bio")}
              />        
              { fieldErrorTip(errors.bio) }
            </li>
            <li className="form__field">
              <label className="label" htmlFor="image">
                Avatar image (url)
              </label>
              <input type="text"
                className={`control control_input${errors.image? " error" : ""}`}
                id="image"
                placeholder="Avatar image"
                autoComplete="off"
                {...register("image")}
              />
              { fieldErrorTip(errors.image) }
            </li>
            
            <li className="form__field">
              <button type="submit" className="btn_submit">
                Save
              </button>
            </li>
          </ul>
          </form>
        </>)
      }
    </section>
  )
};

export default connect(mapUserStateToProps, {})(Profile);

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

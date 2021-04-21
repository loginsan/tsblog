import React, { useState, useEffect } from 'react';
import { useDispatch, connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useCookies } from 'react-cookie';

import { mapUserStateToProps } from '../../store/userReducer';
import { asyncUpdateProfile } from '../../store/userActions';
import * as kit from '../../common';
import { UserMenuProps } from '../Header/UserMenu/types';


interface FieldSet {
  username: string,
  email: string,
  password?: string,
  bio?: string,
  image?: string,
}

type Keys = keyof FieldSet;

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

  kit.setPageTitle(`Edit user profile Form`);

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
      const errorList = kit.parseError(errorData);
      for (let i = 0; i < errorList.length; i++) {
        const [key, value] = errorList[i].split(': ');
        setError(key as Keys, { type: "manual", message: value });
      }
    }
  }, [error, setError]);

  return (
    <section className="form">
      { kit.elemLoading(loading) }
      { kit.elemAlert(error) }
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
              <input type="text" id="username"
                className={`control control_input${errors.username? " error" : ""}`}
                placeholder="Username"
                {...register("username")}
              />
              { kit.fieldErrorTip(errors.username) }
            </li>
            <li className="form__field">
              <label className="label" htmlFor="email">
                Email address
              </label>
              <input type="email" id="email"
                className={`control control_input${errors.email? " error" : ""}`}
                placeholder="Email address"
                {...register("email")}
              />
              { kit.fieldErrorTip(errors.email) }
            </li>
            <li className="form__field">
              <label className="label" htmlFor="password">
                New password
              </label>
              <input type="password" id="password"
                className={`control control_input${errors.password? " error" : ""}`}
                placeholder="New password"
                {...register("password")}
              />
              { kit.fieldErrorTip(errors.password) }
            </li>
            <li className="form__field">
              <label className="label" htmlFor="bio">
                Bio
              </label>
              <textarea id="bio"
                className={`control control_textarea${errors.bio? " error" : ""}`}
                cols={30} rows={5}
                placeholder="Bio"
                {...register("bio")}
              />        
              { kit.fieldErrorTip(errors.bio) }
            </li>
            <li className="form__field">
              <label className="label" htmlFor="image">
                Avatar image (url)
              </label>
              <input type="text" id="image"
                className={`control control_input${errors.image? " error" : ""}`}
                placeholder="Avatar image"
                {...register("image")}
              />
              { kit.fieldErrorTip(errors.image) }
            </li>
            
            <li className="form__field">
              <button type="submit" className="btn_submit">Save</button>
            </li>
          </ul>
          </form>
        </>)
      }
    </section>
  )
};

export default connect(mapUserStateToProps, {})(Profile);

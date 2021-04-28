import React, { useState, useEffect } from 'react';
import { useDispatch, connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useCookies } from 'react-cookie';

import { mapUserStateToProps } from '../../store/userReducer';
import { asyncUpdateProfile } from '../../store/userActions';
import * as kit from '../../common';
import { UserMenuProps } from '../../types';


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
      { !isLogged && !cookies.token && 
        kit.notifyBox("Access denied", "You must sign-in first", "/")
      }
      { isLogged && submitted && 
        kit.notifyBox("Profile updated successfully", "Have a nice time in Realworld Blog!")
      }
      { isLogged && !submitted && (<>
        <h2 className="form__title">Edit Profile</h2>
        <form className="form__body" onSubmit={ handleSubmit(onSubmit) }>
          <ul className="form__field-list nolist">
            
            { kit.formInputField("username", "Username", errors.username, register("username")) }
            { kit.formInputField("email", "Email address", errors.email, register("email")) }
            { kit.formInputField("password", "New password", errors.password, register("password")) }
            { kit.formTextAreaField("bio", "Bio", errors.bio, register("bio")) }
            { kit.formInputField("image", "Avatar image (url)", errors.image, register("image")) }
            
            <li className="form__field">
              <button type="submit" className="btn_submit">Save</button>
              <span className="note_foot">
                * Editing profile <Link to={`/profiles/${user.username}`}>{ user.username }</Link> …
              </span>
            </li>
          </ul>
          </form>
        </>)
      }
    </section>
  )
};

export default connect(mapUserStateToProps, {})(Profile);

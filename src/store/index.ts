import { combineReducers } from 'redux';
import articles from './articles/reducer';
import user from './user/reducer';
import view from './single/reducer';
import profile from './profile/reducer';
import edit from './edit/reducer';

const reducer = combineReducers({ articles, view, user, profile, edit });

export default reducer;

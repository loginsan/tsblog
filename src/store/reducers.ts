import { combineReducers } from "redux";
import articles from "./articlesReducer";
import user from "./userReducer";
import view from "./singleReducer";
import profile from "./profileReducer";
import edit from "./editReducer";

const reducer = combineReducers({ articles, view, user, profile, edit });

export default reducer;

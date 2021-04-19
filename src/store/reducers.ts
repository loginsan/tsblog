import { combineReducers } from "redux";
import articles from "./articlesReducer";
import user from "./userReducer";
import view from "./singleReducer";
import profile from "./profileReducer";

const reducer = combineReducers({ articles, view, user, profile });

export default reducer;

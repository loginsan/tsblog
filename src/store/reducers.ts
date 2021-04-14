import { combineReducers } from "redux";
import articles from "./articlesReducer";
import user from "./userReducer";
import view from "./singleReducer";

const reducer = combineReducers({ articles, view, user });

export default reducer;

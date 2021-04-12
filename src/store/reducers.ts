import { combineReducers } from "redux";
import articles from "./articlesReducer";
import view from "./singleReducer";
import auth from "./authReducer";

const reducer = combineReducers({ articles, view, auth });

export default reducer;

import { combineReducers } from "redux";
import articles from "./articlesReducer";
import view from "./singleReducer";

const reducer = combineReducers({ articles, view });

export default reducer;

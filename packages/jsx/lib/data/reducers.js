import {combineReducers} from "redux-immutable";
import api from "./api";
import error from "./error";
import posts from "./posts";
import routing from "./routing";

export default combineReducers({
    api,
    error,
    posts,
    routing
});

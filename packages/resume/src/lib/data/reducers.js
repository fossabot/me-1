import {emojiReducer, errorReducer} from "@randy.tarampi/jsx";
import {combineReducers} from "redux-immutable";
import api from "./api";
import resume from "./resume";

export const reducers = {
    api,
    resume,
    emoji: emojiReducer,
    error: errorReducer
};

export const combinedReducers = combineReducers(reducers);

export default combinedReducers;

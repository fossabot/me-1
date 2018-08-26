import {fromJS, Map} from "immutable";
import {DateTime} from "luxon";
import {createSelector} from "reselect";
import {
    FETCHING_POSTS,
    FETCHING_POSTS_CANCELLED,
    FETCHING_POSTS_FAILURE,
    FETCHING_POSTS_SUCCESS
} from "../actions/fetchPosts";

export default (state = Map(), action) => {
    switch (action.type) {
        case FETCHING_POSTS: {
            const currentFetchUrlState = state.get(action.payload.fetchUrl) || Map();

            return state.set(action.payload.fetchUrl, fromJS({
                ...currentFetchUrlState.toJS(),
                isLoading: true
            }));
        }

        case FETCHING_POSTS_CANCELLED: {
            const currentFetchUrlState = state.get(action.payload.fetchUrl) || Map();

            return state.set(action.payload.fetchUrl, fromJS({
                ...currentFetchUrlState.toJS(),
                isLoading: false
            }));
        }

        case FETCHING_POSTS_FAILURE: {
            const currentFetchUrlState = state.get(action.payload.fetchUrl) || Map();

            return state.set(action.payload.fetchUrl, fromJS({
                ...currentFetchUrlState.toJS(),
                error: action.payload.error,
                isLoading: false
            }));
        }

        case FETCHING_POSTS_SUCCESS: {
            const currentFetchUrlState = state.get(action.payload.fetchUrl) || Map();

            return state.set(action.payload.fetchUrl, fromJS({
                ...currentFetchUrlState.toJS(),
                oldest: action.payload.oldest && DateTime.fromISO(action.payload.oldest),
                newest: action.payload.newest && DateTime.fromISO(action.payload.newest),
                isLoading: false
            }));
        }

        default:
            return state;
    }
};

// NOTE-RT: Global selectors
export const getApiState = state => state;
export const getApiStateForUrl = (state, url) => getApiState(state).get(url) || null;

// NOTE-RT: Utility functions
export const isUrlStateLoading = urlState => urlState ? !!urlState.get("isLoading") : null;
export const getErrorForUrlState = urlState => urlState ? urlState.get("error") : null;
const getApiStateForUrlFromGlobalState = (state, url) => getApiStateForUrl(state.get("api"), url);

// NOTE-RT: Private selectors for individual containers
export const createIsLoadingUrlSelector = () => createSelector(
    getApiStateForUrlFromGlobalState,
    isUrlStateLoading
);
export const createGetErrorForUrlSelector = () => createSelector(
    getApiStateForUrlFromGlobalState,
    getErrorForUrlState
);

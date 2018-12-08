import {Gallery, Photo, sortPostsByDate} from "@randy.tarampi/js";
import _ from "lodash";
import searchPosts from "../../lib/sources/searchPosts";
import {postTypes} from "../../lib/util";
import parseQueryStringParametersIntoSearchParams from "./parseQueryStringParametersIntoSearchParams";

export const getPostsForParsedQuerystringParameters = ({type, ...queryParameters} = {}) => {
    let postTypesToFetch = postTypes.filter(postType => type ? postType === type : true);

    switch (type) {
        case Photo.type:
        case Gallery.type:
            postTypesToFetch = [Gallery.type, Photo.type];
            break;
    }

    return Promise.all(
        postTypesToFetch
            .map(postType => searchPosts(parseQueryStringParametersIntoSearchParams({type: postType})(queryParameters)))
        )
        .then(results => {
            const flattenedPosts = _.flatten(results.map(result => result.posts));
            const uniquePosts = Object.values(flattenedPosts.reduce((keyedPosts, post) => {
                if (post) {
                    keyedPosts[post.uid] = post;
                }
                return keyedPosts;
            }, {}));
            const sortedPosts = uniquePosts.sort(sortPostsByDate);
            const paginatedPosts = sortedPosts.slice(0, queryParameters && queryParameters.perPage || 100);
            const relevantResults = results.filter(result => result.total > 0);

            return {
                posts: paginatedPosts,
                total: {
                    global: relevantResults.reduce((globalTotal, result) => globalTotal + result.total, 0),
                    ...(_.zipObject(postTypesToFetch, results.map(result => result.total)))
                },
                first: {
                    global: _.sortBy(relevantResults, result => result && result.first && result.first.date)[0].first,
                    ...(_.zipObject(postTypesToFetch, results.map(result => result.first)))
                },
                last: {
                    global: _.sortBy(relevantResults, result => result && result.last && result.last.date)[relevantResults.length - 1].last,
                    ...(_.zipObject(postTypesToFetch, results.map(result => result.last)))
                }
            };
        });
};

export default getPostsForParsedQuerystringParameters;

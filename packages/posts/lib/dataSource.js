/**
 * A generic data source that fetches [Post(s)]{@link Post} from some service
 * @abstract
 */
class DataSource {
    /**
     * Build a data source that fetches [Post(s)]{@link Post} from some service using some client
     * @param type {string} The type of [Posts]{@link Post} returned by this data source
     * @param client {object} A client that wraps some service that serves content to be transformed into [Posts]{@link Post}
     */
    constructor(type, client) {
        this.type = type;
        this.client = client;
        this.initializing = Promise.resolve(this);
    }

    /**
     * A convenience function that returns `true` if we should care about this data source
     * @returns {boolean}
     */
    get isEnabled() {
        const type = this.type.toUpperCase();
        return !!process.env[`${type}_API_KEY`] &&
            !!process.env[`${type}_API_SECRET`];
    }

    /**
     * A hook to do some processing of params before we query the client for posts
     * @param params {object} [Client]{@link DataSource.client} specific query parameters
     * @returns {object} The maybe decorated params to be used by [postsGetter]{@link postsGetter}
     */
    async beforePostsGetter(params) { // eslint-disable-line no-unused-vars
        return Promise.resolve(params);
    }

    /**
     * The method that actually uses the [client]{@link DataSource.client} to query for raw data for transformation into [Posts]{@link Post}
     * @abstract
     * @param params {object} [Client]{@link DataSource.client} specific query parameters
     * @returns {Post[]} [Post]{@link Post} entities transformed from data retrieved from the wrapped client
     */
    async postsGetter(params) {
        return Promise.reject(new Error(`Looking for ${params} – Please specify an actual postsGetter implementation`));
    }

    /**
     * A hook to do some processing of [Posts]{@link Post} after they're returned by the client
     * @param posts {Post[]} [Post]{@link Post} entities transformed from data retrieved from the wrapped client
     * @param params {object} [Client]{@link DataSource.client} specific query parameters
     * @returns {Post[]} The maybe decorated [Posts]{@link Post} from the wrapped client
     */
    async afterPostsGetter(posts, params) { // eslint-disable-line no-unused-vars
        return Promise.resolve(posts);
    }

    /**
     * A generic method that returns some [Posts]{@link Post}
     * @param params {object} [Client]{@link DataSource.client} specific query parameters
     * @returns {Post[]} [Post]{@link Post} entities transformed from data retrieved from the wrapped client
     */
    async getPosts(params) {
        const decoratedParams = await this.beforePostsGetter(params);
        const retrievedPosts = await this.postsGetter(decoratedParams);
        const decoratedPosts = await this.afterPostsGetter(retrievedPosts, decoratedParams);

        return decoratedPosts;
    }

    /**
     * A hook to do some processing of params before we query the client for a post
     * @param postId {string} A single post to retrieve from the [client]{@link DataSource.client}
     * @param params {object} [Client]{@link DataSource.client} specific query parameters
     * @returns {object} The maybe decorated params to be used by [postGetter]{@link postGetter}
     */
    async beforePostGetter(postId, params) { // eslint-disable-line no-unused-vars
        return Promise.resolve(params);
    }

    /**
     * The method that actually uses the [client]{@link DataSource.client} to query for raw data for transformation into a [Post]{@link Post}
     * @abstract
     * @param postId {string} A single post to retrieve from the [client]{@link DataSource.client}
     * @param params {object} [Client]{@link DataSource.client} specific query parameters
     * @returns {Post} [Post]{@link Post} entities transformed from data retrieved from the wrapped client
     */
    async postGetter(postId, params) {
        return Promise.reject(new Error(`Looking for ${postId} with ${params} – Please specify an actual postGetter implementation`));
    }

    /**
     * A hook to do some processing of [Post]{@link Post} after they're returned by the client
     * @param post {Post} A single [Post]{@link Post} transformed from data retrieved from the wrapped client
     * @param params {object} [Client]{@link DataSource.client} specific query parameters
     * @returns {Post} The maybe decorated [Post]{@link Post} from the wrapped client
     */
    async afterPostGetter(post, params) { // eslint-disable-line no-unused-vars
        return Promise.resolve(post);
    }

    /**
     * A generic method that returns some [Post]{@link Post}
     * @param postId {string} A single post to retrieve from the [client]{@link DataSource.client}
     * @param params {object} [Client]{@link DataSource.client} specific query parameters
     * @returns {Post} A single [Post]{@link Post} transformed from data retrieved from the wrapped client
     */
    async getPost(postId, params) {
        const decoratedParams = await this.beforePostGetter(postId, params);
        const retrievedPost = await this.postGetter(postId, decoratedParams);
        const decoratedPost = await this.afterPostGetter(retrievedPost, decoratedParams);

        return decoratedPost;
    }

    /**
     * Transform some raw JSON response from the [client]{@link DataSource.client} into a single [Post]{@link Post}
     * @param postJson {object} The raw post content returned from the [client]{@link DataSource.client}
     * @returns {Post}
     */
    jsonToPost(postJson) {
        throw new Error(`Trying to turn ${postJson} into a Post – Please specify an actual Post transformation`);
    }
}

export default DataSource;
import {Creator, Post} from "@randy.tarampi/js";
import tumblr from "tumblr.js";
import {processCaptionHtml} from "../../photos/tumblr/photoSource";
import SearchParams from "../../photos/searchParams";
import WordSource from "../wordSource";

class TumblrWordSource extends WordSource {
    constructor(dataClient, cacheClient) {
        super("Tumblr",
            dataClient || tumblr.createClient({
                consumer_key: process.env.TUMBLR_API_KEY,
                consumer_secret: process.env.TUMBLR_API_SECRET,
                returnPromises: true
            })
            , cacheClient
        );
    }

    get isEnabled() {
        return process.env.TUMBLR_API_KEY && process.env.TUMBLR_API_SECRET;
    }

    async postsGetter(params) {
        params = params instanceof SearchParams ? params : new SearchParams(params);
        params.type = "text";

        return this.client.blogPosts(process.env.TUMBLR_USER_NAME, params.Tumblr)
            .then(response => response.posts.map(postJson => this.jsonToPost(postJson, response.blog)));
    }

    async postGetter(id, params) {
        params = params instanceof SearchParams ? params : new SearchParams(params);

        return this.client.blogPosts(process.env.TUMBLR_USER_NAME, Object.assign({id}, params.Tumblr))
            .then(response => response.posts.map(postJson => this.jsonToPost(postJson, response.blog))[0]);
    }

    jsonToPost(postJson, blogJson) {
        return new Post(
            postJson.id,
            null,
            this.type,
            postJson.date,
            null,
            postJson.title,
            processCaptionHtml(postJson.body),
            postJson.post_url,
            blogJson && new Creator(blogJson.name, blogJson.name, blogJson.title, blogJson.url)
        );
    }
}

export default TumblrWordSource;

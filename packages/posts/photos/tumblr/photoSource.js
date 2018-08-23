import {Creator, Photo, SizedPhoto} from "@randy.tarampi/js";
import _ from "lodash";
import {DateTime} from "luxon";
import tumblr from "tumblr.js";
import PhotoSource from "../photoSource";

class TumblrSource extends PhotoSource {
    constructor(dataClient, cacheClient) {
        super("Tumblr",
            dataClient || tumblr.createClient({
                consumer_key: process.env.TUMBLR_API_KEY,
                consumer_secret: process.env.TUMBLR_API_SECRET,
                returnPromises: true
            }),
            cacheClient
        );
    }

    async postsGetter(searchParams) {
        return this.client.blogPosts(process.env.TUMBLR_USER_NAME, searchParams.Tumblr)
            .then(response =>
                _.flatten(response.posts.map(postJson => postJson.photos.map(photoJson => this.jsonToPost(photoJson, postJson, response.blog))))
            );
    }

    async postGetter(id, searchParams) {
        return this.client.blogPosts(process.env.TUMBLR_USER_NAME, searchParams.set("id", id).Tumblr)
            .then(response =>
                _.flatten(response.posts.map(postJson => postJson.photos.map(photoJson => this.jsonToPost(photoJson, postJson, response.blog))))[0]
            );
    }

    jsonToPost(photoJson, postJson, blogJson) {
        const sizedPhotos = photoJson.alt_sizes.map((photo) => {
            return new SizedPhoto(photo.url, photo.width, photo.height);
        });
        const dateString = postJson.date;
        const dateStringWithoutTimezone = dateString.slice(0, -4);
        const timezone = dateString.slice(-3);
        const date = DateTime.fromSQL(dateStringWithoutTimezone, {zone: timezone});

        return new Photo(
            postJson.id,
            null,
            this.type,
            date,
            null,
            _.last(_.sortBy(sizedPhotos, ["width"])).width,
            _.last(_.sortBy(sizedPhotos, ["height"])).height,
            sizedPhotos,
            postJson.post_url,
            null,
            processCaptionHtml(photoJson.caption || postJson.caption),
            new Creator(
                blogJson.name,
                blogJson.name,
                blogJson.title,
                blogJson.url
            )
        );
    }
}

// # NOTE-RT: This is pretty gross modifying the HTML we're passing along, but I think this'll be more common than not for other post providers going forwards, especially the more sophisticated platforms.
export const processCaptionHtml = caption => {
    return caption
        .replace(/<p>/g, "<p><span class=\"photo-text\">")
        .replace(/<\/p>/g, "</span></p>");
};

export default TumblrSource;

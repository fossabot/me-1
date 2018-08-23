import {Photo} from "@randy.tarampi/js";
import {expect} from "chai";
import {DateTime} from "luxon";
import sinon from "sinon";
import Unsplash from "unsplash-js";
import SearchParams from "../../../../lib/searchParams";
import UnsplashPhotoSource from "../../../../photos/unsplash/photoSource";
import dummyClassesGenerator from "../../../lib/dummyClassesGenerator";
import {timedPromise} from "../../../lib/util";

describe("UnsplashPhotoSource", function () {
    let stubServiceClient;
    let stubPost;
    let stubPosts;
    let stubBeforePostsGetter;
    let stubPostsGetter;
    let stubAfterPostsGetter;
    let stubBeforePostGetter;
    let stubPostGetter;
    let stubAfterPostGetter;
    let stubBeforeCachedPostsGetter;
    let stubCachedPostsGetter;
    let stubAfterCachedPostsGetter;
    let stubBeforeCachedPostGetter;
    let stubCachedPostGetter;
    let stubAfterCachedPostGetter;
    let stubJsonToPost;
    let DummyCacheClient;
    let stubCreatePosts;
    let stubGetPosts;
    let stubCreatePost;
    let stubGetPost;
    let stubCacheClient;
    let builtDummyClasses;
    let dummyClassBuilderArguments;

    let unsplashUser;
    let unsplashPhoto;
    let unsplashPhotos;

    beforeEach(function () {
        process.env.UNSPLASH_API_KEY = "UNSPLASH_API_KEY";
        process.env.UNSPLASH_API_SECRET = "UNSPLASH_API_SECRET";
        process.env.UNSPLASH_USER_NAME = "UNSPLASH_USER_NAME";

        stubPost = Photo.fromJSON({id: "woof"});
        stubPosts = [stubPost, Photo.fromJSON({id: "meow"}), Photo.fromJSON({id: "grr"})];

        unsplashUser = {
            url: "woof://woof.woof",
            username: process.env.UNSPLASH_USER_NAME,
            name: "Woof!",
            id: "woof",
            links: {
                html: "woof://woof.woof"
            },
            profile_image: {
                large: "woof://woof.woof"
            }
        };
        unsplashPhoto = {
            id: stubPost.id,
            created_at: DateTime.utc().toISO(),
            width: 1000,
            height: 1000,
            links: {
                html: "woof://woof.woof"
            },
            urls: {
                raw: "woof://woof.woof/?size=raw",
                full: "woof://woof.woof/?size=full",
                regular: "woof://woof.woof/?size=regular",
                small: "woof://woof.woof/?size=small",
            },
            user: unsplashUser
        };
        unsplashPhotos = stubPosts.map(stubPost => Object.assign({}, unsplashPhoto, {id: stubPost.id}));
        stubServiceClient = {
            photos: {
                getPost: sinon.stub().callsFake((id, width, height, crop) => {
                    const post = unsplashPhotos.find(unsplashBlogPost => unsplashBlogPost.id === id);

                    if (post) {
                        if (width) {
                            post.width = width;
                        }
                        if (height) {
                            post.height = height;
                        }
                        if (crop) {
                            const cropArgument = crop.split(",");
                            post.width = cropArgument[2];
                            post.height = cropArgument[3];
                        }
                    }

                    return Promise.resolve({
                        json: () => post
                    });
                })
            },
            users: {
                photos: sinon.stub().callsFake((user, page, perPage, orderBy) => { // eslint-disable-line no-unused-vars
                    return Promise.resolve({
                        json: () => perPage === 420 ? [] : unsplashPhotos
                    });
                })
            }
        };

        stubBeforePostsGetter = sinon.stub().callsFake(params => timedPromise(params));
        stubPostsGetter = sinon.stub().callsFake(params => timedPromise(stubPosts)); // eslint-disable-line no-unused-vars
        stubAfterPostsGetter = sinon.stub().callsFake((posts, params) => timedPromise(posts)); // eslint-disable-line no-unused-vars

        stubBeforePostGetter = sinon.stub().callsFake((postId, params) => timedPromise(params));
        stubPostGetter = sinon.stub().callsFake((postId, params) => timedPromise(stubPosts.find(post => post.id === postId) || null)); // eslint-disable-line no-unused-vars
        stubAfterPostGetter = sinon.stub().callsFake((post, params) => timedPromise(post)); // eslint-disable-line no-unused-vars

        stubBeforeCachedPostsGetter = sinon.stub().callsFake(params => timedPromise(params));
        stubCachedPostsGetter = sinon.stub().callsFake(params => timedPromise(stubPosts)); // eslint-disable-line no-unused-vars
        stubAfterCachedPostsGetter = sinon.stub().callsFake((posts, params) => timedPromise(posts)); // eslint-disable-line no-unused-vars

        stubBeforeCachedPostGetter = sinon.stub().callsFake((postId, params) => timedPromise(params));
        stubCachedPostGetter = sinon.stub().callsFake((postId, params) => timedPromise(stubPosts.find(post => post.id === postId) || null)); // eslint-disable-line no-unused-vars
        stubAfterCachedPostGetter = sinon.stub().callsFake((post, params) => timedPromise(post)); // eslint-disable-line no-unused-vars

        stubJsonToPost = sinon.stub().callsFake(Photo.fromJSON);

        stubCreatePosts = sinon.stub().callsFake(posts => timedPromise(posts));
        stubGetPosts = sinon.stub().callsFake(params => timedPromise(stubPosts)); // eslint-disable-line no-unused-vars

        stubCreatePost = sinon.stub().callsFake(post => timedPromise(post));
        stubGetPost = sinon.stub().callsFake(params => timedPromise(stubPost)); // eslint-disable-line no-unused-vars

        dummyClassBuilderArguments = {
            stubBeforePostsGetter,
            stubPostsGetter,
            stubAfterPostsGetter,

            stubBeforePostGetter,
            stubPostGetter,
            stubAfterPostGetter,

            stubBeforeCachedPostsGetter,
            stubCachedPostsGetter,
            stubAfterCachedPostsGetter,

            stubBeforeCachedPostGetter,
            stubCachedPostGetter,
            stubAfterCachedPostGetter,

            stubJsonToPost,

            stubGetPosts,
            stubCreatePosts,

            stubGetPost,
            stubCreatePost
        };
        builtDummyClasses = dummyClassesGenerator(dummyClassBuilderArguments);

        DummyCacheClient = builtDummyClasses.DummyCacheClient;

        stubCacheClient = new DummyCacheClient("ᶘ ◕ᴥ◕ᶅ");
    });

    describe("constructor", function () {
        it("should build a `UnsplashPhotoSource` instance (including the default `unsplash` client)", function () {
            const unsplashPhotoSource = new UnsplashPhotoSource(null, stubCacheClient);

            expect(unsplashPhotoSource.type).to.eql("Unsplash");
            expect(unsplashPhotoSource.client).to.be.instanceof(Unsplash);
            expect(unsplashPhotoSource.cacheClient).to.eql(stubCacheClient);
            expect(unsplashPhotoSource.initializing).to.be.instanceOf(Promise);
            expect(unsplashPhotoSource).to.be.instanceOf(UnsplashPhotoSource);
        });

        it("should build a `UnsplashPhotoSource` instance (with stubbed client)", function () {
            const unsplashPhotoSource = new UnsplashPhotoSource(stubServiceClient, stubCacheClient);

            expect(unsplashPhotoSource.type).to.eql("Unsplash");
            expect(unsplashPhotoSource.client).to.eql(stubServiceClient);
            expect(unsplashPhotoSource.cacheClient).to.eql(stubCacheClient);
            expect(unsplashPhotoSource.initializing).to.be.instanceOf(Promise);
            expect(unsplashPhotoSource).to.be.instanceOf(UnsplashPhotoSource);
        });
    });

    describe("#postsGetter", function () {
        it("passes `serviceClient` the expected parameters", function () {
            const unsplashPhotoSource = new UnsplashPhotoSource(stubServiceClient, stubCacheClient);
            const stubParams = SearchParams.fromJS({perPage: 30, page: 2, orderBy: "woof"});

            return unsplashPhotoSource.postsGetter(stubParams)
                .then(posts => {
                    expect(posts).to.be.ok;
                    expect(posts).to.be.instanceof(Array);
                    posts.map(post => {
                        expect(post).to.be.ok;
                        expect(post).to.be.instanceof(Photo);
                    });
                    sinon.assert.calledOnce(stubServiceClient.users.photos);
                    sinon.assert.calledWith(stubServiceClient.users.photos, process.env.UNSPLASH_USER_NAME, stubParams.page, stubParams.perPage, "latest");
                });
        });

        it("finds no posts", function () {
            const unsplashPhotoSource = new UnsplashPhotoSource(stubServiceClient, stubCacheClient);
            const stubParams = SearchParams.fromJS({perPage: 420});

            return unsplashPhotoSource.postsGetter(stubParams)
                .then(posts => {
                    expect(posts).to.be.ok;
                    expect(posts).to.be.instanceof(Array);
                    expect(posts).to.be.empty;
                    sinon.assert.calledOnce(stubServiceClient.users.photos);
                    sinon.assert.calledWith(stubServiceClient.users.photos, process.env.UNSPLASH_USER_NAME, 1, stubParams.perPage, "latest");
                });
        });
    });

    describe("#postGetter", function () {
        it("passes `serviceClient` the expected parameters", function () {
            const unsplashPhotoSource = new UnsplashPhotoSource(stubServiceClient, stubCacheClient);
            const stubParams = SearchParams.fromJS({width: 500, height: 500, crop: "0,0,400,400"});

            return unsplashPhotoSource.postGetter(stubPost.id, stubParams)
                .then(post => {
                    expect(post).to.be.ok;
                    expect(post).to.be.instanceof(Photo);
                    sinon.assert.calledOnce(stubServiceClient.photos.getPost);
                    sinon.assert.calledWith(stubServiceClient.photos.getPost, stubPost.id, stubParams.width, stubParams.height, stubParams.crop);
                });
        });

        it("finds no post", function () {
            const unsplashPhotoSource = new UnsplashPhotoSource(stubServiceClient, stubCacheClient);
            const stubParams = SearchParams.fromJS({width: 500, height: 500, crop: "0,0,400,400"});

            return unsplashPhotoSource.postGetter("foo", stubParams)
                .then(post => {
                    expect(post).to.not.be.ok;
                    sinon.assert.calledOnce(stubServiceClient.photos.getPost);
                    sinon.assert.calledWith(stubServiceClient.photos.getPost, "foo", stubParams.width, stubParams.height, stubParams.crop);
                });
        });
    });
});

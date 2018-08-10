import {Post} from "@randy.tarampi/js";
import {expect} from "chai";
import sinon from "sinon";
import tumblr from "tumblr.js";
import TumblrWordSource from "../../../../words/tumblr/wordSource";
import dummyClassesGenerator from "../../../lib/dummyClassesGenerator";
import {timedPromise} from "../../../lib/util";

describe("TumblrWordSource", function () {
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

    let tumblrBlog;
    let tumblrBlogPost;
    let tumblrBlogPosts;

    beforeEach(function () {
        process.env.TUMBLR_USER_NAME = "TUMBLR_USER_NAME";

        stubPost = Post.fromJSON({id: "woof"});
        stubPosts = [stubPost, Post.fromJSON({id: "meow"}), Post.fromJSON({id: "grr"})];

        tumblrBlog = {
            url: "woof://woof.woof",
            title: "ʕ•ᴥ•ʔﾉ゛",
            name: "Woof!",
            userName: process.env.TUMBLR_USER_NAME
        };
        tumblrBlogPost = {
            id: stubPost.id,
            date: Date.now(),
            title: "ʕ•ᴥ•ʔ",
            body: "<p>Woof woof woof</p>",
            post_url: "woof://woof.woof/woof/woof/woof"
        };
        tumblrBlogPosts = stubPosts.map(stubPost => Object.assign({}, tumblrBlogPost, {id: stubPost.id}));
        stubServiceClient = {
            blogPosts: sinon.stub().callsFake((tumblrUser, params) => timedPromise({
                posts: params.limit === 420 // NOTE-RT: 420 is a sentinel value for an empty array
                    ? []
                    : (params.id ? [tumblrBlogPosts.find(tumblrBlogPost => tumblrBlogPost.id === params.id)] : tumblrBlogPosts).filter(value => !!value),
                blog: tumblrBlog
            }))
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

        stubJsonToPost = sinon.stub().callsFake(Post.fromJSON);

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
        it("should build a `TumblrWordSource` instance (including the default `tumblr` client)", function () {
            const tumblrWordSource = new TumblrWordSource(null, stubCacheClient);

            expect(tumblrWordSource.type).to.eql("Tumblr");
            expect(tumblrWordSource.client).to.be.instanceof(tumblr.Client);
            expect(tumblrWordSource.cacheClient).to.eql(stubCacheClient);
            expect(tumblrWordSource.initializing).to.be.instanceOf(Promise);
            expect(tumblrWordSource).to.be.instanceOf(TumblrWordSource);
        });

        it("should build a `TumblrWordSource` instance (with stubbed client)", function () {
            const tumblrWordSource = new TumblrWordSource(stubServiceClient, stubCacheClient);

            expect(tumblrWordSource.type).to.eql("Tumblr");
            expect(tumblrWordSource.client).to.eql(stubServiceClient);
            expect(tumblrWordSource.cacheClient).to.eql(stubCacheClient);
            expect(tumblrWordSource.initializing).to.be.instanceOf(Promise);
            expect(tumblrWordSource).to.be.instanceOf(TumblrWordSource);
        });
    });

    describe("#postsGetter", function () {
        it("passes `serviceClient` the expected parameters", function () {
            const tumblrWordSource = new TumblrWordSource(stubServiceClient, stubCacheClient);
            const stubParams = {perPage: 30, page: 2};

            return tumblrWordSource.postsGetter(stubParams)
                .then(posts => {
                    expect(posts).to.be.ok;
                    expect(posts).to.be.instanceof(Array);
                    posts.map(post => {
                        expect(post).to.be.ok;
                        expect(post).to.be.instanceof(Post);
                    });
                    sinon.assert.calledOnce(stubServiceClient.blogPosts);
                    sinon.assert.calledWith(stubServiceClient.blogPosts, process.env.TUMBLR_USER_NAME, sinon.match({
                        type: "text",
                        limit: stubParams.perPage || 20,
                        offset: (stubParams.perPage || 20) * (stubParams.page - 1)
                    }));
                });
        });

        it("finds no posts", function () {
            const tumblrWordSource = new TumblrWordSource(stubServiceClient, stubCacheClient);
            const stubParams = {perPage: 420};

            return tumblrWordSource.postsGetter(stubParams)
                .then(posts => {
                    expect(posts).to.be.ok;
                    expect(posts).to.be.instanceof(Array);
                    expect(posts).to.be.empty;
                    sinon.assert.calledOnce(stubServiceClient.blogPosts);
                    sinon.assert.calledWith(stubServiceClient.blogPosts, process.env.TUMBLR_USER_NAME, sinon.match({
                        type: "text",
                        limit: stubParams.perPage
                    }));
                });
        });
    });

    describe("#postGetter", function () {
        it("passes `serviceClient` the expected parameters", function () {
            const tumblrWordSource = new TumblrWordSource(stubServiceClient, stubCacheClient);

            return tumblrWordSource.postGetter(stubPost.id)
                .then(post => {
                    expect(post).to.be.ok;
                    expect(post).to.be.instanceof(Post);
                    sinon.assert.calledOnce(stubServiceClient.blogPosts);
                    sinon.assert.calledWith(stubServiceClient.blogPosts, process.env.TUMBLR_USER_NAME, sinon.match({
                        id: stubPost.id
                    }));
                });
        });

        it("finds no post", function () {
            const tumblrWordSource = new TumblrWordSource(stubServiceClient, stubCacheClient);

            return tumblrWordSource.postGetter("foo")
                .then(post => {
                    expect(post).to.not.be.ok;
                    sinon.assert.calledOnce(stubServiceClient.blogPosts);
                    sinon.assert.calledWith(stubServiceClient.blogPosts, process.env.TUMBLR_USER_NAME, sinon.match({
                        id: "foo"
                    }));
                });
        });
    });
});
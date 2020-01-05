import {HelloBear as HelloBearEntity} from "@randy.tarampi/js";
import {expect} from "chai";
import {Map} from "immutable";
import proxyquire from "proxyquire";
import React from "react";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import sinon from "sinon";
import {shallow} from "../../../../../../../src/test/util";

// FIXME-RT: Unignore these tests when I figure out how to pass `<Provider store={store}...` to enzyme
xdescribe("ConnectedHelloBear", function () {
    let mockStore;
    let stubMiddleware;
    let stubInitialState;
    let stubStore;

    beforeEach(function () {
        stubMiddleware = [thunk];
        mockStore = configureStore(stubMiddleware);
        stubInitialState = Map();
        stubStore = mockStore(stubInitialState);
    });

    it("receives default props", function () {
        const stubProps = {id: "emoji"};
        const onHelloBearComponentClickStub = sinon.stub().returns({type: "MEOW"});
        const proxyquiredBear = proxyquire("../../../../../../../src/lib/containers/emoji/bear/helloBear", {
            "../../../actions/emoji/onHelloBearComponentClick": {
                "default": onHelloBearComponentClickStub
            }
        });
        const Bear = proxyquiredBear.default;

        const rendered = shallow(stubStore)(<Bear {...stubProps} />);

        expect(rendered).to.have.props(stubProps);
        expect(rendered).to.have.prop("emoji");

        const defaultEmoji = rendered.prop("emoji");
        expect(defaultEmoji).to.be.instanceof(HelloBearEntity);
        expect(defaultEmoji.id).to.eql(null); // NOTE-RT: This actually gets set by the wrapped `Emoji` container

        expect(onHelloBearComponentClickStub.notCalled).to.eql(true);
    });

    it("falls back to a given emoji", function () {
        const stubProps = {id: "meow", emoji: HelloBearEntity.fromJS({id: "meow"})};
        const onHelloBearComponentClickStub = sinon.stub().returns({type: "MEOW"});
        const proxyquiredBear = proxyquire("../../../../../../../src/lib/containers/emoji/bear/helloBear", {
            "../../../actions/emoji/onHelloBearComponentClick": {
                "default": onHelloBearComponentClickStub
            }
        });
        const Bear = proxyquiredBear.default;

        const rendered = shallow(stubStore)(<Bear {...stubProps} />);

        expect(rendered).to.have.props(stubProps);
        expect(rendered).to.have.prop("emoji");

        const defaultEmoji = rendered.prop("emoji");
        expect(defaultEmoji).to.be.instanceof(HelloBearEntity);
        expect(defaultEmoji.id).to.eql(stubProps.id);

        expect(onHelloBearComponentClickStub.notCalled).to.eql(true);
    });

    it("dispatches `onComponentClick` properly", function () {
        const stubProps = {id: "meow", emoji: HelloBearEntity.fromJS({id: "meow"})};
        const onHelloBearComponentClickStub = sinon.stub().returns({type: "MEOW"});
        const proxyquiredBear = proxyquire("../../../../../../../src/lib/containers/emoji/bear/helloBear", {
            "../../../actions/emoji/onHelloBearComponentClick": {
                "default": onHelloBearComponentClickStub
            }
        });
        const Bear = proxyquiredBear.default;

        const rendered = shallow(stubStore)(<Bear {...stubProps} />);

        expect(rendered).to.have.props(stubProps);
        expect(rendered).to.have.prop("emoji");

        const passedEmoji = rendered.prop("emoji");
        expect(passedEmoji).to.be.instanceof(HelloBearEntity);
        expect(passedEmoji.id).to.eql(stubProps.id);

        expect(onHelloBearComponentClickStub.notCalled).to.eql(true);

        const mappedOnComponentClick = rendered.prop("onComponentClick");
        const stubComponentId = "grr";
        const stubClickEvent = "rawr";

        mappedOnComponentClick(stubComponentId, stubClickEvent);

        expect(onHelloBearComponentClickStub.calledOnce).to.eql(true);
        sinon.assert.calledWith(onHelloBearComponentClickStub, passedEmoji.id, stubComponentId, stubClickEvent);
    });

    it("dispatches passed `onComponentClick` properly", function () {
        const onComponentClickStub = sinon.stub().returns({type: "MEOW"});
        const stubProps = {
            id: "meow",
            emoji: HelloBearEntity.fromJS({id: "meow"}),
            onComponentClick: onComponentClickStub
        };
        const onHelloBearComponentClickStub = sinon.stub().returns({type: "MEOW"});
        const proxyquiredBear = proxyquire("../../../../../../../src/lib/containers/emoji/bear/helloBear", {
            "../../../actions/emoji/onHelloBearComponentClick": {
                "default": onHelloBearComponentClickStub
            }
        });
        const Bear = proxyquiredBear.default;

        const rendered = shallow(stubStore)(<Bear {...stubProps} />);

        expect(rendered).to.have.props(stubProps);
        expect(rendered).to.have.prop("emoji");

        const passedEmoji = rendered.prop("emoji");
        expect(passedEmoji).to.be.instanceof(HelloBearEntity);
        expect(passedEmoji.id).to.eql(stubProps.id);

        expect(onHelloBearComponentClickStub.notCalled).to.eql(true);
        expect(onComponentClickStub.notCalled).to.eql(true);

        const mappedOnComponentClick = rendered.prop("onComponentClick");
        const stubComponentId = "grr";
        const stubClickEvent = "rawr";

        mappedOnComponentClick(stubComponentId, stubClickEvent);

        expect(onHelloBearComponentClickStub.notCalled).to.eql(true);
        expect(onComponentClickStub.calledOnce).to.eql(true);
        sinon.assert.calledWith(onComponentClickStub, stubComponentId, stubClickEvent);
    });
});

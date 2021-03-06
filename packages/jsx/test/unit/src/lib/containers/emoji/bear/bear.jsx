import {Bear as BearEntity} from "@randy.tarampi/js";
import {expect} from "chai";
import {Map} from "immutable";
import React from "react";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import sinon from "sinon";
import {ConnectedBear} from "../../../../../../../src/lib";
import * as onBearComponentClickAction from "../../../../../../../src/lib/actions/emoji/onBearComponentClick";
import {shallow} from "../../../../../../../src/test/util";

// FIXME-RT: Unignore these tests when I figure out how to pass `<Provider store={store}...` to enzyme
xdescribe("ConnectedBear", function () {
    let mockStore;
    let stubMiddleware;
    let stubInitialState;
    let stubStore;

    beforeEach(function () {
        stubMiddleware = [thunk];
        mockStore = configureStore(stubMiddleware);
        stubInitialState = Map();
        stubStore = mockStore(stubInitialState);

        sinon.stub(onBearComponentClickAction, "onBearComponentClickCreator").returns({type: "MEOW"});
    });

    afterEach(function () {
        onBearComponentClickAction.onBearComponentClickCreator.restore();
    });

    it("receives default props", function () {
        const stubProps = {id: "emoji"};

        const rendered = shallow(stubStore)(<ConnectedBear {...stubProps} />);

        expect(rendered).to.have.props(stubProps);
        expect(rendered).to.have.prop("emoji");

        const defaultEmoji = rendered.prop("emoji");
        expect(defaultEmoji).to.be.instanceof(BearEntity);
        expect(defaultEmoji.id).to.eql(null); // NOTE-RT: This actually gets set by the wrapped `Emoji` container

        expect(onBearComponentClickAction.onBearComponentClickCreator.notCalled).to.eql(true);
    });

    it("falls back to a given emoji", function () {
        const stubProps = {id: "meow", emoji: BearEntity.fromJS({id: "meow"})};

        const rendered = shallow(stubStore)(<ConnectedBear {...stubProps} />);

        expect(rendered).to.have.props(stubProps);
        expect(rendered).to.have.prop("emoji");

        const defaultEmoji = rendered.prop("emoji");
        expect(defaultEmoji).to.be.instanceof(BearEntity);
        expect(defaultEmoji.id).to.eql(stubProps.id);

        expect(onBearComponentClickAction.onBearComponentClickCreator.notCalled).to.eql(true);
    });

    it("dispatches `onComponentClick` properly", function () {
        const stubProps = {id: "meow", emoji: BearEntity.fromJS({id: "meow"})};

        const rendered = shallow(stubStore)(<ConnectedBear {...stubProps} />);

        expect(rendered).to.have.props(stubProps);
        expect(rendered).to.have.prop("emoji");

        const passedEmoji = rendered.prop("emoji");
        expect(passedEmoji).to.be.instanceof(BearEntity);
        expect(passedEmoji.id).to.eql(stubProps.id);

        expect(onBearComponentClickAction.onBearComponentClickCreator.notCalled).to.eql(true);

        const mappedOnComponentClick = rendered.prop("onComponentClick");
        const stubComponentId = "grr";
        const stubClickEvent = "rawr";

        mappedOnComponentClick(stubComponentId, stubClickEvent);

        expect(onBearComponentClickAction.onBearComponentClickCreator.calledOnce).to.eql(true);
        sinon.assert.calledWith(onBearComponentClickAction.onBearComponentClickCreator, passedEmoji.id, stubComponentId, stubClickEvent);
    });

    it("dispatches passed `onComponentClick` properly", function () {
        const onComponentClickStub = sinon.stub().returns({type: "MEOW"});
        const stubProps = {id: "meow", emoji: BearEntity.fromJS({id: "meow"}), onComponentClick: onComponentClickStub};

        const rendered = shallow(stubStore)(<ConnectedBear {...stubProps} />);

        expect(rendered).to.have.props(stubProps);
        expect(rendered).to.have.prop("emoji");

        const passedEmoji = rendered.prop("emoji");
        expect(passedEmoji).to.be.instanceof(BearEntity);
        expect(passedEmoji.id).to.eql(stubProps.id);

        expect(onBearComponentClickAction.onBearComponentClickCreator.notCalled).to.eql(true);
        expect(onComponentClickStub.notCalled).to.eql(true);

        const mappedOnComponentClick = rendered.prop("onComponentClick");
        const stubComponentId = "grr";
        const stubClickEvent = "rawr";

        mappedOnComponentClick(stubComponentId, stubClickEvent);

        expect(onBearComponentClickAction.onBearComponentClickCreator.notCalled).to.eql(true);
        expect(onComponentClickStub.calledOnce).to.eql(true);
        sinon.assert.calledWith(onComponentClickStub, stubComponentId, stubClickEvent);
    });
});

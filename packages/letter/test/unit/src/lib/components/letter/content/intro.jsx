import {shallow} from "@randy.tarampi/jsx/test";
import {expect} from "chai";
import {Map} from "immutable";
import React from "react";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import LetterIntro from "../../../../../../../src/lib/components/letter/content/intro";
import LetterSection from "../../../../../../../src/lib/letterSection";

describe("LetterIntro", function () {
    let stubContentConfiguration;
    let mockStore;
    let stubMiddleware;
    let stubInitialState;
    let stubStore;

    beforeEach(function () {
        stubContentConfiguration = LetterSection.fromJS({
            type: "intro"
        });
        stubMiddleware = [thunk];
        mockStore = configureStore(stubMiddleware);
        stubInitialState = Map();
        stubStore = mockStore(stubInitialState);
    });

    it("renders (default content)", function () {
        const rendered = shallow(stubStore)(<LetterIntro contentConfiguration={stubContentConfiguration}/>);

        expect(rendered).to.have.descendants(".letter-intro__content");

        expect(rendered.find(".letter-intro__content").length).to.eql(2);
        expect(rendered.find(".letter-intro__content").first().html()).to.match(/I hope this letter finds you well./);
        expect(rendered.find(".letter-intro__content + .letter-intro__content").html()).to.match(/Give this a shot and keep reading/);
    });

    it("renders (custom content)", function () {
        stubContentConfiguration = LetterSection.fromJS({
            ...stubContentConfiguration.toJS(),
            contentProps: {
                intro: <span className="Woof">Woof woof woof</span>
            }
        });

        const rendered = shallow(stubStore)(<LetterIntro contentConfiguration={stubContentConfiguration}/>);

        expect(rendered).to.have.descendants(".letter-intro__content");
        expect(rendered).to.contain(stubContentConfiguration.contentProps.intro);

        expect(rendered.find(".letter-intro__content").length).to.eql(2);
        expect(rendered.find(".letter-intro__content > span").html()).to.match(/Woof woof woof/);
        expect(rendered.find(".letter-intro__content + .letter-intro__content").html()).to.match(/Give this a shot and keep reading/);
    });
});

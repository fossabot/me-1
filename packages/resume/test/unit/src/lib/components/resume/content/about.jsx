import {PrintableSection} from "@randy.tarampi/jsx";
import {expect} from "chai";
import {shallow} from "enzyme";
import React from "react";
import ResumeAbout from "../../../../../../../src/lib/components/resume/content/about";
import testResumeJson from "../../../../../../../src/resumes/some-awesome-company";

describe("ResumeAbout", function () {
    const testResumeJsonString = JSON.stringify(testResumeJson);
    let stubResume;

    beforeEach(function () {
        stubResume = JSON.parse(testResumeJsonString);
    });

    it("renders", function () {
        const rendered = shallow(<ResumeAbout resume={stubResume}/>);

        expect(rendered).to.have.descendants(".resume-about__summary");

        const printableSection = rendered.find(PrintableSection);
        expect(printableSection).to.have.length(1);
        expect(printableSection).to.have.prop("printableType", "resume");
        expect(printableSection).to.have.prop("type", "about");
        expect(printableSection).to.have.prop("label", "About");
    });
});

import React from "react";
import {expect} from "chai";
import {shallow} from "enzyme";
import Letter from "../../../../../public/components/letter";
import LetterEntity from "../../../../../lib/letter";
import {Printable} from "@randy.tarampi/jsx";

const {PrintableHeader} = Printable;

describe("Letter", function () {
    let stubPersonJs;
    let stubSenderJs;
    let stubRecipientJs;
    let stubLetterContentComponent;
    let stubLetter;

    beforeEach(function () {
        stubPersonJs = {
            name: null,
            firstName: "Woof",
            lastName: "Woof",
            worksFor: null,
            jobTitle: null,
            label: "Woof",
            picture: null,
            email: "woof@randytarampi.ca",
            phone: "+1234567890",
            website: "woof.woof/woof",
            summary: "Woof woof woof",
            location: {
                address: "woof",
                postalCode: "meow",
                city: "grr",
                countryCode: "CA",
                region: "BC"
            }
        };
        stubSenderJs = Object.assign({}, stubPersonJs);
        stubRecipientJs = Object.assign({}, stubPersonJs, {firstName: "Meow", email: "meow@randytarampi.ca"});

        stubLetterContentComponent = () => <span className="rawr">foo</span>;
        stubLetter = LetterEntity.fromJS({
            sender: stubSenderJs,
            recipient: stubRecipientJs,
            id: "foo",
            fileName: null,
            content: [],
            renderOptions: {
                format: "bar"
            }
        });
    });

    it("renders", function () {
        const rendered = shallow(<Letter letter={stubLetter}/>);

        expect(rendered).to.be.ok;
        expect(rendered).to.have.className("printable");
        expect(rendered).to.have.className("letter");
        expect(rendered).to.have.descendants("title");
        expect(rendered).to.have.descendants(".letter-content");
        expect(rendered).to.contain(<PrintableHeader printable={stubLetter}/>);
    });

    it("renders (custom content component)", function () {
        stubLetter = LetterEntity.fromJS({
            sender: stubSenderJs,
            recipient: stubRecipientJs,
            id: "foo",
            fileName: null,
            content: [
                {
                    component: stubLetterContentComponent
                }
            ],
            renderOptions: {
                format: "bar"
            }
        });

        const rendered = shallow(<Letter letter={stubLetter}/>);

        expect(rendered).to.be.ok;
        expect(rendered).to.have.className("printable");
        expect(rendered).to.have.className("letter");
        expect(rendered).to.have.descendants("title");
        expect(rendered).to.have.descendants(".letter-content");
        expect(rendered).to.contain(<PrintableHeader printable={stubLetter}/>);
        stubLetter.content.map(contentConfiguration => {
            const ContentComponent = contentConfiguration.component
                ? contentConfiguration.component
                : require(`../../../../../public/components/letter/content/${contentConfiguration.contentKey}`).default;
            expect(rendered).to.have.contain(<ContentComponent
                letter={stubLetter}
                contentConfiguration={contentConfiguration}
            />);
        });
    });

    it("renders (plain content block)", function () {
        stubLetter = LetterEntity.fromJS({
            sender: stubSenderJs,
            recipient: stubRecipientJs,
            id: "foo",
            fileName: null,
            content: [
                {
                    contentKey: "intro"
                },
            ],
            renderOptions: {
                format: "bar"
            }
        });

        const rendered = shallow(<Letter letter={stubLetter}/>);

        expect(rendered).to.be.ok;
        expect(rendered).to.have.className("printable");
        expect(rendered).to.have.className("letter");
        expect(rendered).to.have.descendants("title");
        expect(rendered).to.have.descendants(".letter-content");
        expect(rendered).to.contain(<PrintableHeader printable={stubLetter}/>);
        stubLetter.content.map(contentConfiguration => {
            const ContentComponent = contentConfiguration.component
                ? contentConfiguration.component
                : require(`../../../../../public/components/letter/content/${contentConfiguration.contentKey}`).default;
            expect(rendered).to.have.contain(<ContentComponent
                letter={stubLetter}
                contentConfiguration={contentConfiguration}
            />);
        });
    });

    it("renders (customized content block)", function () {
        stubLetter = LetterEntity.fromJS({
            sender: stubSenderJs,
            recipient: stubRecipientJs,
            id: "foo",
            fileName: null,
            content: [
                {
                    contentKey: "date",
                    sectionId: "woof",
                    contentProps: {
                        meow: "grr"
                    }
                },
            ],
            renderOptions: {
                format: "bar"
            }
        });

        const rendered = shallow(<Letter letter={stubLetter}/>);

        expect(rendered).to.be.ok;
        expect(rendered).to.have.className("printable");
        expect(rendered).to.have.className("letter");
        expect(rendered).to.have.descendants("title");
        expect(rendered).to.have.descendants(".letter-content");
        expect(rendered).to.contain(<PrintableHeader printable={stubLetter}/>);
        stubLetter.content.map(contentConfiguration => {
            const ContentComponent = contentConfiguration.component
                ? contentConfiguration.component
                : require(`../../../../../public/components/letter/content/${contentConfiguration.contentKey}`).default;
            expect(rendered).to.have.contain(<ContentComponent
                letter={stubLetter}
                contentConfiguration={contentConfiguration}
            />);
        });
    });
});

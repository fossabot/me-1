import {expect} from "chai";
import Emoji, {Character, defaultComponents} from "../../lib/emoji";

describe("Emoji", () => {
    describe(".fromJS", () => {
        it("should instantiate a. Emoji object from some plain JS Object", () => {
            const emojiJs = {
                id: "•ᴥ•",
                components: defaultComponents
            };
            const instantiatedEmoji = Emoji.fromJS(emojiJs);

            expect(instantiatedEmoji).to.be.ok;
            expect(instantiatedEmoji).to.be.instanceof(Emoji);
            expect(instantiatedEmoji.id).to.eql(emojiJs.id);
            expect(instantiatedEmoji.components.length).to.eql(Object.keys(defaultComponents).length);
            Object.values(defaultComponents).forEach(component => {
                const emojiComponent = instantiatedEmoji.getIn(["components", component.id]);
                expect(emojiComponent).to.be.ok;
                expect(emojiComponent).to.be.instanceof(Character);
                expect(emojiComponent.character).to.eql(component.character);
            });
        });
    });

    describe("fromJSON", () => {
        it("should instantiate a. Emoji object from some plain JS Object", () => {
            const emojiJson = {
                type: "woof",
                components: defaultComponents
            };
            const instantiatedEmoji = Emoji.fromJSON(emojiJson);

            expect(instantiatedEmoji).to.be.ok;
            expect(instantiatedEmoji).to.be.instanceof(Emoji);
            expect(instantiatedEmoji.type).to.eql(emojiJson.type);
            expect(instantiatedEmoji.components.length).to.eql(Object.keys(defaultComponents).length);
            Object.values(defaultComponents).forEach(component => {
                const emojiComponent = instantiatedEmoji.getIn(["components", component.id]);
                expect(emojiComponent).to.be.ok;
                expect(emojiComponent).to.be.instanceof(Character);
                expect(emojiComponent.character).to.eql(component.character);
            });
        });
    });
});
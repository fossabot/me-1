import * as viewsBuildPugLocalsModule from "@randy.tarampi/views/lib/buildPugLocals";
import {expect} from "chai";
import sinon from "sinon";
import {buildPugLocalsBuilder} from "../../../lib/buildPugLocals";
import * as renderCssModule from "../../../lib/renderCss";
import * as renderJsxModule from "../../../lib/renderJsx";
import packageJson from "../../../package";

describe("buildPugLocalsBuilder", function () {
    let stubRenderedCss;
    let stubRenderedJsx;
    let stubJsxRenderer;
    let stubRenderedHelmet;
    let stubRenderLocals;
    let stubPrintableComponent;
    let stubPrintableStylesPath;

    beforeEach(function () {
        stubRenderedJsx = "woof";
        stubJsxRenderer = sinon.stub().returns(stubRenderedJsx);
        sinon.stub(renderJsxModule, "renderJsx").returns(stubJsxRenderer);

        stubRenderedHelmet = "meow";
        sinon.stub(renderJsxModule, "getRenderedHelmet").returns(stubRenderedHelmet);

        stubRenderedCss = "grr";
        sinon.stub(renderCssModule, "renderCss").returns(stubRenderedCss);

        sinon.stub(viewsBuildPugLocalsModule, "buildPugLocals").callsFake(renderLocals => renderLocals);

        stubRenderLocals = {
            rawr: 1
        };
        stubPrintableComponent = {
            argh: 2
        };
        stubPrintableStylesPath = "/foo/bar";
    });

    afterEach(function () {
        renderJsxModule.renderJsx.restore();
        renderJsxModule.getRenderedHelmet.restore();
        renderCssModule.renderCss.restore();
        viewsBuildPugLocalsModule.buildPugLocals.restore();
    });

    it("calls `views.buildPugLocals` with the correct parameters", function () {
        const pugLocalsBuilder = buildPugLocalsBuilder({
            printableComponent: stubPrintableComponent,
            printableStylesPath: stubPrintableStylesPath
        });
        expect(pugLocalsBuilder).to.be.ok;
        expect(pugLocalsBuilder).to.be.instanceof(Function);
        expect(renderJsxModule.renderJsx.calledOnce).to.be.ok;
        sinon.assert.calledWith(renderJsxModule.renderJsx, stubPrintableComponent);
        expect(renderCssModule.renderCss.calledOnce).to.be.ok;
        sinon.assert.calledWith(renderCssModule.renderCss, stubPrintableStylesPath);

        const pugLocalsBuilderOutput = pugLocalsBuilder(stubRenderLocals);
        expect(pugLocalsBuilderOutput).to.be.ok;
        expect(pugLocalsBuilderOutput).to.eql({
            packageJson,
            content: stubRenderedJsx,
            css: stubRenderedCss,
            helmetContent: stubRenderedHelmet,
            environment: "printable",
            ...stubRenderLocals
        });
        expect(stubJsxRenderer.calledOnce).to.be.ok;
        sinon.assert.calledWithExactly(stubJsxRenderer, stubRenderLocals);
        expect(renderJsxModule.getRenderedHelmet.calledOnce).to.be.ok;
        sinon.assert.calledWithExactly(renderJsxModule.getRenderedHelmet);
    });
});

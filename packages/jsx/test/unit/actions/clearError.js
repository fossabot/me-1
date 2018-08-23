import {expect} from "chai";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import clearError, {CLEAR_ERROR} from "../../../lib/actions/clearError";

describe("clearError", function () {
    let mockStore;
    let stubMiddleware;
    let stubInitialState;
    let stubStore;

    beforeEach(function () {
        stubMiddleware = [thunk];
        mockStore = configureStore(stubMiddleware);
        stubInitialState = {};
        stubStore = mockStore(stubInitialState);
    });

    describe("CLEAR_ERROR", function () {
        it("is dispatched with the expected payload", function () {
            stubStore.dispatch(clearError());

            const actions = stubStore.getActions();

            expect(actions).to.be.ok;
            expect(actions).to.have.length(1);
            expect(actions).to.eql([{type: CLEAR_ERROR}]);
        });
    });
});

import createBrowserHistory from "history/createBrowserHistory";
import React from "react";
import {render} from "react-dom";
import ClientReduxRoot from "../../../lib/clientReduxRoot";
import combinedReducers from "../../../lib/data/reducers";
import configureStore from "../../../lib/store/configureStore";
import routes from "../routes";

const history = createBrowserHistory();
const store = configureStore(undefined, history, combinedReducers);

render(
    <ClientReduxRoot store={store} history={history} routes={routes}/>,
    document.querySelector(".content")
);
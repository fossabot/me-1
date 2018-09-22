import PropTypes from "prop-types";
import React from "react";
import {Provider} from "react-redux";
import {renderRoutes} from "react-router-config";
import {StaticRouter} from "react-router-dom";
import ErrorWrapper from "./containers/errorWrapper";

export const ServerReduxRoot = ({store, context, routes, ...props}) => <Provider store={store}>
    <ErrorWrapper {...props}>
        <StaticRouter context={context}>
            {renderRoutes(routes, props)}
        </StaticRouter>
    </ErrorWrapper>
</Provider>;

ServerReduxRoot.propTypes = {
    store: PropTypes.object.isRequired,
    context: PropTypes.object.isRequired,
    routes: PropTypes.array.isRequired
};

ServerReduxRoot.defaultProps = {
    context: {}
};

export default ServerReduxRoot;
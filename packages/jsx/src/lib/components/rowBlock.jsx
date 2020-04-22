import PropTypes from "prop-types";
import React from "react";
import {Row} from "@randy.tarampi/react-materialize";

export const RowBlock = ({name, className, ...props}) =>
    <Row id={name} name={name} {...props} className={["block", `block--${name}`, className].join(" ").trim()}/>;

RowBlock.propTypes = {
    name: PropTypes.string.isRequired,
    className: PropTypes.string
};

RowBlock.defaultProps = {
    className: ""
};

export default RowBlock;

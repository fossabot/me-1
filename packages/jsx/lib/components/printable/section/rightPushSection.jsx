import PropTypes from "prop-types";
import React from "react";
import {Col, Row} from "react-materialize";

export const RightPushSection = ({printableType, type, hideOnPrint, showOnLetter, showOnA4, showOnLegal, hideOnScreen, verticallyAlignContent, className, children, sideContent}) => {
    const classNames = [
        "printable-section",
        "printable-section--push",
        "printable-section--push-right",
        "printable-" + type,
        `${printableType}-${type}`
    ];

    if (hideOnScreen) {
        classNames.push("hide-on-screen");
    }

    if (showOnA4) {
        classNames.push("show-on-a4");
    }

    if (showOnLetter) {
        classNames.push("show-on-letter");
    }

    if (showOnLegal) {
        classNames.push("show-on-legal");
    }

    if (hideOnPrint && !showOnA4 && !showOnLetter && !showOnLegal) {
        classNames.push("hide-on-print");
    }

    return <section id={type} className={classNames.concat(className).join(" ").trim()}>
        <Row className={verticallyAlignContent ? "valign-wrapper" : null}>
            <aside className="col m3 printable-section__header hide-on-small-only">
                {sideContent}
            </aside>
            <Col m={9} className="printable-section__content">
                {children}
            </Col>
        </Row>
    </section>;
};

RightPushSection.propTypes = {
    className: PropTypes.string,
    sideContent: PropTypes.node,
    printableType: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    hideOnPrint: PropTypes.bool,
    hideOnScreen: PropTypes.bool,
    showOnA4: PropTypes.bool,
    showOnLegal: PropTypes.bool,
    showOnLetter: PropTypes.bool,
    verticallyAlignContent: PropTypes.bool
};

RightPushSection.defaultProps = {
    hideOnPrint: false,
    hideOnScreen: false,
    showOnA4: false,
    showOnLegal: false,
    showOnLetter: false,
    verticallyAlignContent: false
};

export default RightPushSection;
import {Post as PostEntity} from "@randy.tarampi/js";
import isHtml from "is-html";
import PropTypes from "prop-types";
import React, {Component} from "react";
import Dimensions from "react-dimensions";
import {Col, Row} from "react-materialize";
import Link from "./link";

export class PostComponent extends Component {
    get width() {
        return this.containerWidth;
    }

    get height() {
        return this.containerHeight;
    }

    get containerWidth() {
        return this.props.containerWidth;
    }

    get containerHeight() {
        return this.props.containerHeight;
    }

    get scaledHeight() {
        return this.containerWidth * this.height / this.width;
    }

    get title() {
        return this.props.post.title || "Untitled";
    }

    get date() {
        return this.props.post.datePublished;
    }

    componentWillUnmount() {
        this.props.post._lastHeight = this.containerHeight;
        this.props.post._lastWidth = this.containerWidth;
    }

    render() {
        return <Row
            className="post"
            id={this.props.post.uid}
        >
            <Col
                className="post-metadata"
                s={12}
            >
                <h1 className="post-title">
                    {
                        this.props.post.url ?
                            <Link className="post-text" href={this.props.post.url}>{this.title}</Link> :
                            <span className="post-text">{this.title}</span>
                    }
                </h1>
                <p className="post-date">
                    <strong className="post-text">Posted:</strong>
                    <span className="post-text">{this.date.format("LL")}</span>
                    {
                        this.props.post.dateCreated ?
                            <span>
                                <strong className="post-text">Modified:</strong>
                                <span className="post-text">{this.props.post.dateCreated.format("LLLL")}</span>
                            </span> :
                            null
                    }
                </p>
                {
                    typeof this.props.post.body === "string"
                        ? <div className="post-body">
                            {
                                isHtml(this.props.post.body)
                                    ? <div dangerouslySetInnerHTML={{__html: this.props.post.body}}></div>
                                    : <span className="post-text" dangerouslySetInnerHTML={{__html: this.props.post.body}}/>
                            }
                        </div> :
                        null
                }
                {
                    Array.isArray(this.props.post.body)
                        ? this.props.post.body.map((htmlString, index) => {
                            return <div className="post-body" key={index}>
                                {
                                    isHtml(htmlString)
                                        ? <div dangerouslySetInnerHTML={{__html: htmlString}}></div>
                                        : <span className="post-text" dangerouslySetInnerHTML={{__html: htmlString}}/>
                                }
                            </div>;
                        })
                        : null
                }
            </Col>
        </Row>;
    }
}

PostComponent.propTypes = {
    post: PropTypes.instanceOf(PostEntity).isRequired,
    containerWidth: PropTypes.number,
    containerHeight: PropTypes.number
};

export default Dimensions({
    elementResize: true
})(PostComponent);

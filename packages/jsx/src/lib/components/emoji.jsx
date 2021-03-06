import PropTypes from "prop-types";
import React, {Fragment, PureComponent} from "react";

export class Emoji extends PureComponent {
    constructor(props, context, updater) {
        super(props, context, updater);

        if (this.props.instantiateEmoji) {
            this.props.instantiateEmoji(props.emoji);
        }
    }

    componentWillUnmount() {
        if (!this.props.persistentEmoji) {
            if (this.props.clearEmoji) {
                this.props.clearEmoji(this.props.emoji);
            }
        }
    }

    render() {
        const emoji = this.props.emoji;
        const emojiString = emoji.toString();
        const TextEffectWrapper = this.props.textEffect
            ? props => <span className="text">{props.children}</span>
            : Fragment;

        return <div
            id={this.props.htmlId || emoji.id}
            className={[emoji.type, `${emoji.type}--${emojiString}`].join(" ")}
        >
            <TextEffectWrapper>
                {
                    emoji.components.map(component =>
                            <span
                                key={component.id}
                                data-metrics-event-name="emoji-component"
                                data-metrics-type="onClick"
                                data-metrics-name={`${emoji.id}__${component.id}`}
                                data-metrics-label={component.character}
                                data-metrics-value={this.props.onComponentClick && this.props.onComponentClick.name}
                                className={[`${emoji.id}__${component.id}`, `${emoji.type}__${component.id}`, `${emoji.type}__${component.id}--${emojiString}`].join(" ")}
                                onClick={(event) => this.props.onComponentClick && this.props.onComponentClick(component.id, event)}
                            >
                    {component.character}
                </span>
                    )
                }
            </TextEffectWrapper>
            {
                this.props.children
                    ? <div className={[`${emoji.type}__children`, `${emoji.type}__children--${emojiString}`].join(" ")}>
                        {this.props.children}
                    </div>
                    : null
            }
        </div>;
    }
}

Emoji.propTypes = {
    htmlId: PropTypes.string,
    id: PropTypes.string,
    emoji: PropTypes.object.isRequired,
    persistentEmoji: PropTypes.bool,
    instantiateEmoji: PropTypes.func,
    clearEmoji: PropTypes.func,
    onComponentClick: PropTypes.func,
    textEffect: PropTypes.bool,
};

Emoji.defaultProps = {
    persistentEmoji: true,
    textEffect: false
};

export default Emoji;

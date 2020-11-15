import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {onLoadTrigger} from "../../../helpers";
import {connect} from "react-redux";

class TextLink extends PureComponent { // eslint-disable-line react/prefer-stateless-function
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        const { actions, dispatch } = this.props;
        onLoadTrigger(actions, dispatch)
    }

    render() {
        const { style, href } = this.props;
        return (<a href={href} style={style}>
            {this.props.children}
        </a>);
    }
}

TextLink.propTypes = {
    style: PropTypes.object,
    href: PropTypes.string,
};
TextLink.defaultProps = {
    style: {},
    href: '#',
};
export default connect () (TextLink);

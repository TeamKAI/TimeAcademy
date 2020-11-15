import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {checkForOnClick, getContent, onClickTrigger, onLoadTrigger} from "../../../helpers";
import {connect} from "react-redux";

class Span extends PureComponent { // eslint-disable-line react/prefer-stateless-function
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        const { actions, dispatch } = this.props;
        onLoadTrigger(actions, dispatch)
    }
    render() {
        const { style, actions,dispatch } = this.props;
        return (
            <span style={style} onClick={checkForOnClick(actions,dispatch) ?
                () => onClickTrigger(actions,dispatch) : null}>
            {this.props.children}
        </span>);
    }
}

Span.propTypes = {
    style: PropTypes.object,
};
Span.defaultProps = {
    style: {},
};

export default connect () (Span);

/**
 *
 * List
 *
 */

import React, { PureComponent } from 'react';
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {checkForOnClick, onClickTrigger, onLoadTrigger} from "../../../helpers";

class List extends PureComponent { // eslint-disable-line react/prefer-stateless-function
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        const { actions, dispatch } = this.props;
        onLoadTrigger(actions, dispatch)
    }
    render() {
        const { style, type, actions, dispatch } = this.props;
        switch (type) {
            case 'ol':
                return (
                    <ol style={style} onClick={checkForOnClick(actions,dispatch) ?
                        () => onClickTrigger(actions,dispatch) : null}>
                        {this.props.children}
                    </ol>
                );
            default:
                return (
                    <ul style={style} onClick={checkForOnClick(actions,dispatch) ?
                        () => onClickTrigger(actions,dispatch) : null}>
                        {this.props.children}
                    </ul>
                );
        }

    }
}

List.propTypes = {
    style: PropTypes.object,
    type: PropTypes.string
};
List.defaultProps = {
    style: {},
    type: {}
};

export default connect () (List);

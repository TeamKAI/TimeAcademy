/**
 *
 * DivBlock
 *
 */

import React, { PureComponent } from 'react';
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {checkForOnClick, onClickTrigger, onLoadTrigger} from "../../../helpers";

class DivBlock extends PureComponent { // eslint-disable-line react/prefer-stateless-function
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        const { actions, dispatch } = this.props;
        onLoadTrigger(actions, dispatch)
    }

    render() {

        const { className, style, actions, dispatch } = this.props;
        return (
            <div className={className} style={style} onClick={checkForOnClick(actions,dispatch) ?
                () => onClickTrigger(actions,dispatch) : null}>
                {this.props.children}
            </div>
        );
    }
}

DivBlock.propTypes = {
    style: PropTypes.object,
};

DivBlock.defaultProps = {
    style: {},
};

export default connect () (DivBlock);

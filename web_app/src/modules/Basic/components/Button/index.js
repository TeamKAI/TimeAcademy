import React, { PureComponent } from 'react';
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {checkForOnClick, onLoadTrigger, onClickTrigger} from '../../../helpers'

class Button extends PureComponent { // eslint-disable-line react/prefer-stateless-function

    constructor(props) {
        super(props);
    }

    componentWillMount() {
        const { actions, dispatch } = this.props;
        onLoadTrigger(actions, dispatch);
    }


    render() {

        const { style, actions, dispatch, className } = this.props;

        return (
            <button className={className} style={style}
                    onClick={checkForOnClick(actions,dispatch) ?
                        () => onClickTrigger(actions,dispatch) : null}>
                {this.props.children}
            </button>
        );
    }
}

Button.propTypes = {
    style: PropTypes.object,
    actions: PropTypes.array
};
Button.defaultProps = {
    style: {},
    action: {}
};

export default connect () (Button);



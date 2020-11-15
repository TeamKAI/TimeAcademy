import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {checkForOnClick, onClickTrigger, onLoadTrigger} from "../../../helpers";
import {connect} from "react-redux";

class Paragraph extends PureComponent { // eslint-disable-line react/prefer-stateless-function
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        const { actions, dispatch } = this.props;
        onLoadTrigger(actions, dispatch)
    }

    render() {
        const { style,actions,dispatch  } = this.props;
        return (<p style={style} onClick={checkForOnClick(actions,dispatch) ?
            () => onClickTrigger(actions,dispatch) : null}>

            {this.props.children}

        </p>);
    }
}

Paragraph.propTypes = {
    style: PropTypes.object,
};
Paragraph.defaultProps = {
    style: {},
};

export default connect () (Paragraph);

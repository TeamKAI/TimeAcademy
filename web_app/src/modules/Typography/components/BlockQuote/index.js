import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {checkForOnClick, onClickTrigger, onLoadTrigger} from "../../../helpers";
import {connect} from "react-redux";

const blockQuoteContainer = {
    marginTop: 25,
    marginBottom: 25,
    marginLeft: 0,
    marginRight: 0,
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 30,
    paddingRight: 30,
    borderLeftWidth: 5,
    borderLeftColor: '#e2e2e2',
    borderLeftStyle: 'solid',
    width: 'fit-content',
};

class BlockQuote extends PureComponent { // eslint-disable-line react/prefer-stateless-function
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        const { actions, dispatch } = this.props;
        onLoadTrigger(actions, dispatch)
    }

    render() {
        const { style,actions,dispatch } = this.props;
        console.log(this);
        return (
            <blockquote style={{ ...blockQuoteContainer, ...style }}
                        onClick={checkForOnClick(actions,dispatch) ?
                            () => onClickTrigger(actions,dispatch) : null}>
                {this.props.children}
            </blockquote>
        );
    }
}

BlockQuote.propTypes = {
    style: PropTypes.object,
};
BlockQuote.defaultProps = {
    style: {},
};
export default connect () (BlockQuote);

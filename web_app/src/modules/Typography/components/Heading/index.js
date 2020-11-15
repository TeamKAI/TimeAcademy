import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {checkForOnClick, onClickTrigger, onLoadTrigger} from "../../../helpers";
import {connect} from "react-redux";

class Heading extends PureComponent { // eslint-disable-line react/prefer-stateless-function
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        const { actions, dispatch } = this.props;
        onLoadTrigger(actions, dispatch)
    }

    render() {
        const { style, type ,actions,dispatch, className  } = this.props;
        switch (type) {
            case 'h1':
                return (
                    <h1 className={className} style={style}
                        onClick={checkForOnClick(actions,dispatch) ?
                            () => onClickTrigger(actions,dispatch) : null}>
                        {this.props.children}
                    </h1>
                );
            case 'h2':
                return (
                    <h2 className={className} style={style}
                        onClick={checkForOnClick(actions,dispatch) ?
                            () => onClickTrigger(actions,dispatch) : null}>
                        {this.props.children}
                    </h2>
                );
            case 'h3':
                return (
                    <h3 className={className} style={style}
                        onClick={checkForOnClick(actions,dispatch) ?
                            () => onClickTrigger(actions,dispatch) : null}>
                        {this.props.children}
                    </h3>
                );
            case 'h4':
                return (
                    <h4 className={className} style={style}
                        onClick={checkForOnClick(actions,dispatch) ?
                            () => onClickTrigger(actions,dispatch) : null}>
                        {this.props.children}
                    </h4>
                );
            case 'h5':
                return (
                    <h5 className={className} style={style}
                        onClick={checkForOnClick(actions,dispatch) ?
                            () => onClickTrigger(actions,dispatch) : null}>
                        {this.props.children}
                    </h5>
                );
            case 'h6':
                return (
                    <h6 className={className} style={style}
                        onClick={checkForOnClick(actions,dispatch) ?
                            () => onClickTrigger(actions,dispatch) : null}>
                        {this.props.children}
                    </h6>
                );
            default:
                return (
                    <h1 className={className} style={style}
                        onClick={checkForOnClick(actions,dispatch) ?
                            () => onClickTrigger(actions,dispatch) : null}>
                        {this.props.children}
                    </h1>
                );
        } // eslint-disable-line
    }
}

Heading.propTypes = {
    style: PropTypes.object,
    type: PropTypes.string,
};
Heading.defaultProps = {
    style: {},
    type: 'h1',
};

export default connect () (Heading);

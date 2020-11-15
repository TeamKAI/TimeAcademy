import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import {onLoadTrigger} from "../../../helpers";

class FormBlock extends PureComponent { // eslint-disable-line react/prefer-stateless-function

    constructor() {
        super();
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentWillMount() {
        const { actions, dispatch } = this.props;
        onLoadTrigger(actions, dispatch)
    }

    handleSubmit(event) {
        event.preventDefault();

        const { dispatch, actions } = this.props;

        if(actions) {
            actions.forEach((a) => {
                if (a.trigger === "onclick") {
                    let action_name = a.action.replace(/\s/g, "_").toUpperCase()
                    dispatch({type: action_name})
                }
            })
        }
    }

    render() {
        const { style, store, className } = this.props;
        return (
            <form
                className={className}
                style={{ width: '100%', display: 'flex', flexDirection: 'column', ...style }}
                onSubmit={this.handleSubmit}
            >
                {this.props.children}
            </form>
        );
    }
}

FormBlock.propTypes = {
    style: PropTypes.object,
};
FormBlock.defaultProps = {
    style: {},
};

const mapStateToProps = function(state){
    return {
        store: state.reducer,
    }
}

export default connect (mapStateToProps, null) (FormBlock);

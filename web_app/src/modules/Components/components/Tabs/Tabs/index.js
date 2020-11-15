import React, { PureComponent, Children} from 'react';
import { connect } from 'react-redux';
import PropTypes from "prop-types";
import ReactTabs from '../react-tabs/Tabs';
import {checkForOnClick, onClickTrigger, onLoadTrigger} from "../../../../helpers";

class Tabs extends PureComponent { // eslint-disable-line react/prefer-stateless-function
    constructor(props) {
        super(props);
        this.state = {
            name: props.name ? props.name : "default"
        }
    }
    
    componentWillMount() {
        const { actions, dispatch } = this.props;
        onLoadTrigger(actions, dispatch);
    }

    handleSelect = (index) => {
        const { name } = this.state;
        const { dispatch } = this.props;
        dispatch({
            type: "change_input",
            payload: {name: name, value: index}
        });
    }

    render() {
        const { style, children, className, store } = this.props;
        const { name } = this.state;

        return (
            <ReactTabs selectedIndex={store && store[name] && Number.isInteger(store[name]) ? store[name] : 0} onSelect={this.handleSelect} style={style} className={className}>
                {children}
            </ReactTabs>
        );
    }    
}

Tabs.propTypes = {
    style: PropTypes.object,
};
Tabs.defaultProps = {
    style: {},
};
const mapStateToProps = function(state){
    return {
        store: state.reducer,
    }
}

export default connect (mapStateToProps, null) (Tabs);


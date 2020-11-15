import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import { getContent, onLoadTrigger } from "../../../helpers";

class TextInput extends PureComponent { // eslint-disable-line react/prefer-stateless-function

    constructor(props) {
        super(props);
        this.state = { 
            value: props.initialValue ? getContent(props.initialValue, props.store) : '',
        };
    }

    componentWillMount() {
        // Update store with initial values.
        const { value } = this.state;
        this.setValue(value);

        // Run onload triggers.
        const { actions, dispatch } = this.props;
        onLoadTrigger(actions, dispatch)
    }

    getValue = (value) => {
        if(this.props.type === 'number' && !isNaN(Number(value))) {
            value = Number(value);
        } 

        return value;
    }

    setValue = (value) => {
        value = this.getValue(value);

        const { dispatch, name } = this.props;
        if(name && name.length > 0) {
            dispatch({
                type: "change_input",
                payload: {name: name, value: value}
            });
        }
        
        this.setState({ value: value });
    }

    handleChange = (event) => {
        this.setValue(event.target.value);
    }

    render() {
        const { style, store } = this.props;

        return (
            <input
                className={this.props.className}
                style={{ ...style }}
                required={this.props.isRequired}
                name={this.props.name}
                type={this.props.type}
                value={this.state.value}
                placeholder={this.props.placeholder}
                onChange={this.handleChange}
            />
        );
    }
}

TextInput.propTypes = {
    style: PropTypes.object,
    isRequired: PropTypes.bool,
    name: PropTypes.string,
    placeholder: PropTypes.string,
    type: PropTypes.string,
};
TextInput.defaultProps = {
    style: {},
    isRequired: false,
    type: 'text',
    placeholder: 'Lorem Ipsum',
    name: '',
};

const mapStateToProps = function(state){
    return {
        store: state.reducer,
    }
}

export default connect (mapStateToProps, null) (TextInput);


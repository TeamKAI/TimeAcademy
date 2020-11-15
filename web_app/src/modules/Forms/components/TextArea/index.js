import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import { getContent, onLoadTrigger } from "../../../helpers";

class TextArea extends PureComponent { // eslint-disable-line react/prefer-stateless-function

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

    setValue = (value) => {
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
        const { style, className } = this.props;
        return (
            <textarea
                className={className}
                style={{ resize: 'none', ...style }}
                required={this.props.isRequired}
                name={this.props.name}
                value={this.state.value}
                placeholder={this.props.placeholder}
                rows={this.props.rows}
                onChange={this.handleChange}
            />
        );
    }
}

TextArea.propTypes = {
    style: PropTypes.object,
    isRequired: PropTypes.bool,
    name: PropTypes.string,
    placeholder: PropTypes.string,
    rows: PropTypes.number,
};
TextArea.defaultProps = {
    style: {},
    isRequired: false,
    name: '',
    placeholder: 'Lorem Ipsum',
    rows: 3,
};

const mapStateToProps = function(state){
    return {
        store: state.reducer,
    }
}

export default connect (mapStateToProps, null) (TextArea);


import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import { getContent, onLoadTrigger } from "../../../helpers";

class SelectDropDown extends PureComponent { // eslint-disable-line react/prefer-stateless-function

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
        const { style, options, store, dataSet, dataSetValue, dataSetLabel, className } = this.props;
        let selectOptions = [];
        if (dataSet) {
            if(store[dataSet]) {
                store[dataSet] ? store[dataSet].map((d,index) => {
                    let input = {
                        value: d[dataSetValue],
                        label: d[dataSetLabel]
                    }
                    selectOptions.push(input)
                }) : selectOptions = []
            }
        } else {
            selectOptions = options
        }
        return (
            <select
                className={className}
                style={{ ...style }}
                name={this.props.name}
                required={this.props.isRequired}
                value={this.state.value}
                onChange={this.handleChange}
            >
                {/* Map through data from options properties*/}
                {selectOptions.map((item, index) =>
                    (<option key={index} value={item.value}>{item.label}</option>)
                )}

                {/* Display Child components*/}
                {this.props.children}
            </select>
        );
    }
}

SelectDropDown.propTypes = {
    style: PropTypes.object,
    isRequired: PropTypes.bool,
    name: PropTypes.string,
    options: PropTypes.array,
};
SelectDropDown.defaultProps = {
    style: {},
    isRequired: false,
    name: '',
    options: [],
    dataSet: "",
    dataSetValue: "id",
    dataSetLabel: "name"
};

const mapStateToProps = function(state){
    return {
        store: state.reducer,
    }
}

export default connect (mapStateToProps, null) (SelectDropDown);


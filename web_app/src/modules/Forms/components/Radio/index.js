import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {connect} from "react-redux";

class Radio extends PureComponent { // eslint-disable-line react/prefer-stateless-function

    constructor(props) {
        super(props);
        this.state = {
            value: '',
        };
    }

    handleChange = (event) => {
        const { dispatch } = this.props;
        dispatch({
            type: "change_input",
            payload: {name: event.target.name, value: event.target.value}
        })
        this.setState({ value: event.target.value });
    }

    renderChildren(name) {
        const { children } = this.props;
        return React.Children.map(children, child => {
            return React.cloneElement(child, {
                name: name,
            })
        });
    }

    render() {
        const { style, options, store, dataSet, dataSetValue, dataSetLabel } = this.props;

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
            <div
                style={{ display: 'flex', flexDirection: this.props.useRow ? 'row' : 'column', ...style }}
            >
                {/* Map through data from options properties*/}
                {selectOptions.map((item, index) =>
                    <div key={index} style={{ display: 'flex', flexDirection: 'row' }}>
                        <input name={this.props.name} type="radio"
                               value={item.value}
                            /* checked={store[this.props.name] === item.value}*/
                               onChange={this.handleChange}
                        />
                        <label>{item.label}</label>
                    </div>
                )}

                {/* Display Child components*/}
                {this.renderChildren(this.props.name)}
            </div>
        );
    }
}

Radio.propTypes = {
    style: PropTypes.object,
    radioStyle: PropTypes.object,
    useRow: PropTypes.bool,
    options: PropTypes.array,
};
Radio.defaultProps = {
    style: {},
    radioStyle: {},
    useRow: false,
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

export default connect (mapStateToProps, null) (Radio);


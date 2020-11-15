import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import {onLoadTrigger} from "../../../helpers";

class CheckBox extends PureComponent { // eslint-disable-line react/prefer-stateless-function

    constructor(props) {
        super(props);
        this.state = {
            value: '',
            selected: [],
        };
    }

    componentWillMount() {
        const { actions, dispatch } = this.props;
        onLoadTrigger(actions, dispatch)
    }

    handleChange = (event) => {
        const { dispatch, store, name } = this.props;
        let selected = store[name] ? store[name] : [];
        if (event.target.checked) {
            let i = selected.indexOf(event.target.value);
            if (i === -1) {
                selected.push(event.target.value);
            }
        } else {
            let i = selected.indexOf(event.target.value);
            if (i > -1) {
                selected.splice(i, 1);
            }
        }
        dispatch({
            type: "change_input",
            payload: {name: event.target.name, value: selected}
        });
        this.setState({ value: event.target.value, selected: selected });
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
                        <input name={this.props.name} type="checkbox" onChange={this.handleChange} value={item.value}/>
                        <label>{item.label}</label>
                    </div>
                )}

                {/* Display Child components*/}
                {this.renderChildren(this.props.name)}
            </div>
        );
    }
}

CheckBox.propTypes = {
    style: PropTypes.object,
    checkBoxStyle: PropTypes.object,
    useRow: PropTypes.bool,
    options: PropTypes.array,
};
CheckBox.defaultProps = {
    style: {},
    checkBoxStyle: {},
    useRow: false,
    options: [],
};

const mapStateToProps = function(state){
    return {
        store: state.reducer,
    }
}

export default connect (mapStateToProps, null) (CheckBox);


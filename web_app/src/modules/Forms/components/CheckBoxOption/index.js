import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import {onLoadTrigger} from "../../../helpers";

class CheckBoxOption extends PureComponent { // eslint-disable-line react/prefer-stateless-function

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
        const { dispatch, store,name } = this.props;
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

    render() {
        const { style, options, value, label } = this.props;
        return (
            <div style={{ display: 'flex', flexDirection: 'row', ...style }}>
                <input name={this.props.name} type="checkbox"
                       onChange={this.handleChange}
                       value={value}/>
                <label>{label}</label>
            </div>
        );
    }
}

CheckBoxOption.propTypes = {
    style: PropTypes.object,
    groupName: PropTypes.string,
    name: PropTypes.string,
};
CheckBoxOption.defaultProps = {
    style: {},
    value: 1,
    label: "",
    name: '',
};

const mapStateToProps = function(state){
    return {
        store: state.reducer,
    }
}

export default connect (mapStateToProps, null) (CheckBoxOption);


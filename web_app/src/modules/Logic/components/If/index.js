import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {connect} from "react-redux";

import { getTypeName, getContent, render, onLoadTrigger } from '../../../helpers.js';

export function Then(props) {
	return render(props);
}

Then.displayName = "Then";

export function Else(props) {
	return render(props);
}

Else.displayName = "Else";

class If extends PureComponent { // eslint-disable-line react/prefer-stateless-function
	constructor(props) {
        super(props);
    }

    componentWillMount() {
        const { actions, dispatch } = this.props;
        onLoadTrigger(actions, dispatch)
    }

	render() {
		let {
			condition,
			children,
			store
		} = this.props;

		if (children == null) {
			return null;
		}

		condition = getContent(condition, store);
		let conditionResult = false;
		try {
			conditionResult = eval(condition);
		} catch(e) {
			console.warn(`Invalid condition ${e}`);
		}

		return (
			<div style={{...this.props.style}} className={this.props.className}>
				{[].concat(children).find(c => (getTypeName(c) !== Else.name) ^ !conditionResult) || null}
			</div>
		);
	}
}

If.displayName = "If";

If.propTypes = {
	style: PropTypes.object,
	condition: PropTypes.string,
};
If.defaultProps = {
	style: {},
	condition: "",
};

const mapStateToProps = function(state){
	return {
		store: state.reducer,
	}
}

export default connect (mapStateToProps, null) (If);
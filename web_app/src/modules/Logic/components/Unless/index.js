import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {connect} from "react-redux";

import { getContent, render } from '../../../helpers.js';

class Unless extends PureComponent { // eslint-disable-line react/prefer-stateless-function
	render() {
		let {
			condition,
			children,
			store
		} = this.props;

		condition = getContent(condition, store);
		let conditionResult = false;
		try {
			conditionResult = eval(condition);
		} catch(e) {
			console.warn(`Invalid condition ${e}`);
		}

		return !conditionResult && children ? render({ condition, children }) : null;
	}
}

Unless.propTypes = {
	style: PropTypes.object,
	condition: PropTypes.string,
};
Unless.defaultProps = {
	style: {},
	condition: "",
};

const mapStateToProps = function(state){
	return {
		store: state.reducer,
	}
}

export default connect (mapStateToProps, null) (Unless);
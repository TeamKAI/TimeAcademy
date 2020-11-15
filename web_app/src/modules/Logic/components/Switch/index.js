import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {connect} from "react-redux";

import { getTypeName, getContent, render } from '../../../helpers.js';

export function Case(props) {
	return render(props);
}

Case.displayName = "Case";

export function Default(props) {
	return render(props);
}

Default.displayName = "Default";

class Switch extends PureComponent { // eslint-disable-line react/prefer-stateless-function
	render() {
		let {
			children,
			store
		} = this.props;

		let matchingCase;
		let defaultCase;

		React.Children.forEach(children, child => {
			if(!React.isValidElement(child)) {
				return
			};

			if(!matchingCase && getTypeName(child) === Case.name) {
				let condition = getContent(child.props.condition, store);
				let conditionResult = false;
				try {
					conditionResult = eval(condition);
				} catch(e) {
					console.warn(`Invalid condition ${e}`);
				}

				if(conditionResult) {
					matchingCase = child
				}

			} else if (!defaultCase && getTypeName(child) === Default.name) {
				defaultCase = child
			}
		});

		return matchingCase || defaultCase || null;
	}
}

Switch.propTypes = {
	style: PropTypes.object,
	condition: PropTypes.string,
};
Switch.defaultProps = {
	style: {},
	condition: "",
};

const mapStateToProps = function(state){
	return {
		store: state.reducer,
	}
}

export default connect (mapStateToProps, null) (Switch);
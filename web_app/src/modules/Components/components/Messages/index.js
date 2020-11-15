import React, { PureComponent } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from "prop-types";
import {connect} from "react-redux";

import { log_task_errored, logTaskClose } from '../../../../redux/actions.js';

const overlayStyle = {
	position: 'fixed',
	width: '30em',
	padding: '.5em 1.5em .5em .5em',
	right: '0px',
	top: '0px',
	zIndex: '9999'
};

const alertCommonStyle = {
	padding: "1rem",
	borderRadius: ".25rem",
	borderRadius: ".25rem"
}

const alertErrorStyle = {
    color: "#a94442",
    backgroundColor: "#f2dede",
    borderColor: "#ebccd1",
}

const alertSuccessStyle = {
	color: "#3c763d",
    backgroundColor: "#dff0d8",
    borderColor: "#d6e9c6"
}

const closeButton = {
	marginLeft: "15px",
  	color: "white",
  	fontWeight: "bold",
  	float: "right",
  	fontSize: "1.5rem",
  	lineHeight: "20px",
  	cursor: "pointer",
  	transition: "0.3s"
}

class Messages extends PureComponent { // eslint-disable-line react/prefer-stateless-function
	constructor(props) {
        super(props);
    }

    componentDidMount () {
		this._mountNode = document.createElement('div');
		this._mountNode.style['z-index'] = '9999';
		document.body.appendChild(this._mountNode);
		ReactDOM.render(this._overlay, this._mountNode);
	}

	componentWillUnmount () {
		ReactDOM.unmountComponentAtNode(this._mountNode);
		this._mountNode = null;
	}

	componentDidUpdate () {
		if (this._mountNode) {
			ReactDOM.render(this._overlay, this._mountNode);
		}
	}

	render () {
		const { children, store, style, className, dispatch } = this.props;
		let messages = store.messages;
		if(messages && messages.size > 0) {
			let messagesItems = [];
			if(children && React.children.toArray(children).length > 0) {
				// TODO 
			} else {
				messages.forEach((item, key) => {
					let errored = item.type === log_task_errored;
					let className = errored ? "error" : "success";
					let alertStyle = errored ? { ...alertCommonStyle, ...alertErrorStyle } : { ...alertCommonStyle, ...alertSuccessStyle};
					
					let messageText = item.text;
					let textNeedCut = messageText && messageText.length > 300;
					if (textNeedCut) {
						messageText = messageText.substr(0, 300) + '...';
					}

					messagesItems.push(
						<div key={key} style={alertStyle}>
							<span onClick={() => dispatch(logTaskClose(key))} style={closeButton}>&times;</span>
							{messageText}
						</div>
					);
				});
			}

			this._overlay = (
				<div
					className={className}
					style={ {...overlayStyle, ...style } }
				>
					<div style={{position: 'relative', width: '100%', height: '100%'}}>
						{messagesItems}
					</div>
				</div>
			);

		} else {
			this._overlay = (
				<span />
			);
		}
		
		return (
			<span />
		);
	}
}

Messages.propTypes = {
    style: PropTypes.object,
};
Messages.defaultProps = {
    style: {},
};

const mapStateToProps = function(state){
    return {
        store: state.reducer,
    }
}

export default connect (mapStateToProps, null) (Messages);
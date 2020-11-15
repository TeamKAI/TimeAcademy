import React, { PureComponent, Children} from 'react';
import { connect } from 'react-redux';
import PropTypes from "prop-types";
import ReactTabList from '../react-tabs/TabList';
import {checkForOnClick, onClickTrigger, onLoadTrigger} from "../../../../helpers";

const DefaultStyle = {
	listStyle: "none",
	display: "flex",
}

class TabList extends PureComponent { // eslint-disable-line react/prefer-stateless-function
	constructor(props) {
		super(props);
		this.state = {
			menuToggle: false,
		}
	}

	toggleMenu = () => {
        this.setState({ menuToggle: !this.state.menuToggle });
    }

	render() {
		const { children, style, position } = this.props;

		if(position === "top") {
			return (
				<div className={`nav ${this.state.menuToggle ? 'active' : ''} `}>
		            <button
		                type="button"
		                className={'hamburger-bar'}
		                onClick={() => {
		                    this.toggleMenu();
		                }}>
		                <span/>
		                <span/>
		                <span/>
		            </button>
	            	<ReactTabList style={{ ...DefaultStyle, ...style }}>
						{children}
					</ReactTabList>
	        	</div>
			);
		}
		
		return (
			<ReactTabList style={{ ...style }}>
				{children}
			</ReactTabList>
		);
	}
}

export default TabList;
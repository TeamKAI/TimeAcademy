import React from 'react';
import * as d3 from 'd3';

class Tooltip extends React.Component {
	handleClick = (e) => {
		if(!this.tooltip.contains(e.target)) {
			this.props.deconstruct();
		}
	}

	componentDidMount() {
		document.addEventListener('click', this.handleClick, true);
	}

	componentWillUnmount() {
		document.removeEventListener('click', this.handleClick, true);
	}

	render() {
		const windowWidth = window.innerWidth;
		const windowHeight = window.innerHeight;
		const pageY = this.props.pageY;
		const pageX = this.props.pageX;
		const style = {};
		
		// Up or down tooltip.
		if(pageY > windowHeight / 2) {
			style.bottom = `${windowHeight - pageY}px`;
			style.maxHeight = `${windowHeight - (windowHeight - pageY)}px`;
		} else {
			style.top = `${pageY}px`;
			style.maxHeight = `${windowHeight - pageY}px`;
		}

		// Left or right tooltip.
		if(pageX > windowWidth / 2) {
			style.right = `${windowWidth - pageX}px`;
			style.maxWidth = `${Math.min(340, windowWidth - (windowWidth - pageX))}px`;
		} else {
			style.left = `${pageX}px`;
			style.maxWidth = `${Math.min(340, windowWidth - pageX)}px`;
		}

		style.position = 'fixed';

		return (
			<div className='d3-tooltip-new selectable' style={style} ref={el => this.tooltip = el}>
				{Object.keys(this.props.data).map((key, index) => {
					return (
						<div className="tooltip-row" key={index}>
							<div title={key} className="tooltip-header" style={{display: "inline-block"}}>
								{key}:
							</div>
							<div className="tooltip-value" style={{display: "inline-block"}}>
								{`${this.props.data[key]}`}
							</div>
						</div>
					);
				})}
			</div>
		);
	}
}

export default Tooltip;
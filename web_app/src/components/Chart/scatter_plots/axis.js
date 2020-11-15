import React from 'react';
import * as d3Axis from 'd3-axis';
import { select as d3Select } from 'd3-selection';

class Axis extends React.Component {
	componentDidMount() {
		this.renderAxis();
	}

	componentDidUpdate(prevProps, prevState) {
		this.renderAxis();
	}

	renderAxis() {
		const axisElement = d3Select(this.axisElement);
		
		// Render the axis.
		const axisType = `axis${this.props.orient}`
		const axis = d3Axis[axisType]()
			.scale(this.props.scale);

		axisElement.call(axis);

		// Color the axis.
		axisElement
			.selectAll('line').attr('stroke', this.props.color)
			.selectAll('path').attr('stroke', this.props.color)
			.selectAll('text').attr('fill', this.props.color);

		if(this.props.rotate) {
			axisElement
				.selectAll("text")
				.style("text-anchor", "end")
				.attr("dx", "-.8em")
				.attr("dy", ".15em")
				.attr("transform", function(d) {
					return "rotate(-65)" 
				});			
		}
	}

	render() {
		return (
			<g
				className={`Axis Axis-${this.props.orient}`}
				ref={(el) => { this.axisElement = el; }}
				transform={this.props.translate}
			/>
		);
	}
}

export default Axis;